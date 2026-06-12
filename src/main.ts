import * as THREE from 'three';
import { EffectComposer } from 'three/addons/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/addons/postprocessing/RenderPass.js';
import { ShaderPass } from 'three/addons/postprocessing/ShaderPass.js';
import { OutputPass } from 'three/addons/postprocessing/OutputPass.js';
import gsap from 'gsap';

import './style.css';
import { ARTWORKS, findBySlug, type Artwork } from './data/artworks';
import { SphereGallery, preloadImages } from './gallery';
import { SphereControls } from './controls';
import { LensShader } from './lens';
import { DetailPage } from './detail';
import { PageOverlay, ListPage } from './pages';
import { buildFilter, updateLoader, hideLoader } from './ui';

const BASE_FOV = 72;
const FOCUS_FOV = 50;
const IDLE_DELAY = 3500; // ms before auto-drift kicks in
const IDLE_DRIFT = 0.022; // rad/s

type Route =
  | { name: 'home' }
  | { name: 'about' }
  | { name: 'list' }
  | { name: 'work'; artwork: Artwork };

function parseRoute(pathname: string): Route {
  const path = pathname.replace(/\/+$/, '') || '/';
  if (path === '/about') return { name: 'about' };
  if (path === '/list') return { name: 'list' };
  const match = path.match(/^\/art\/([a-z0-9-]+)$/);
  if (match) {
    const artwork = findBySlug(match[1]);
    if (artwork) return { name: 'work', artwork };
  }
  return { name: 'home' };
}

function routePath(route: Route): string {
  switch (route.name) {
    case 'home':
      return '/';
    case 'work':
      return `/art/${route.artwork.slug}`;
    default:
      return `/${route.name}`;
  }
}

function routeTitle(route: Route): string {
  switch (route.name) {
    case 'home':
      return 'CODEX LUMINARA — A PORTAL TO THE RENAISSANCE';
    case 'list':
      return 'CODEX LUMINARA — INDEX OPERUM';
    case 'about':
      return 'CODEX LUMINARA — DE CODICE';
    case 'work':
      return `CODEX LUMINARA — ${route.artwork.title}`;
  }
}

async function boot(): Promise<void> {
  const app = document.getElementById('app');
  if (!app) throw new Error('Missing #app');

  /* ------------------------- renderer / scene ------------------------- */
  const renderer = new THREE.WebGLRenderer({ antialias: true, powerPreference: 'high-performance' });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.setSize(window.innerWidth, window.innerHeight);
  app.appendChild(renderer.domElement);

  const scene = new THREE.Scene();
  scene.background = new THREE.Color(0x16110d);

  const camera = new THREE.PerspectiveCamera(
    BASE_FOV,
    window.innerWidth / window.innerHeight,
    0.1,
    50
  );
  camera.rotation.order = 'YXZ';
  scene.add(camera);

  /* --------------------------- post-processing ------------------------ */
  const composer = new EffectComposer(renderer);
  composer.addPass(new RenderPass(scene, camera));
  const lensPass = new ShaderPass(LensShader);
  composer.addPass(lensPass);
  composer.addPass(new OutputPass());

  /* ------------------------------ gallery ----------------------------- */
  await document.fonts.load('600 23px "Cinzel"');
  await document.fonts.load('500 16px "Cinzel"');

  const gallery = new SphereGallery(renderer);
  gallery.build(ARTWORKS);
  scene.add(gallery.group);

  /* ----------------------------- controls ----------------------------- */
  const controls = new SphereControls(renderer.domElement);

  /* ------------------------------ router ------------------------------ */
  let route: Route = { name: 'home' };
  let workReturnPath = '/';

  const detail = new DetailPage({
    requestClose: () => navigate(workReturnPath),
    requestNext: (next) => navigate(`/art/${next.slug}`),
  });
  const about = new PageOverlay('about');
  const list = new ListPage(ARTWORKS, (artwork) => navigate(`/art/${artwork.slug}`));

  const navWork = document.getElementById('nav-work');
  const navAbout = document.getElementById('nav-about');
  const vtGrid = document.getElementById('vt-grid');
  const vtList = document.getElementById('vt-list');

  function syncChrome(): void {
    document.title = routeTitle(route);
    document.body.dataset.route = route.name;

    navWork?.classList.toggle(
      'is-active',
      route.name === 'home' || route.name === 'list' || route.name === 'work'
    );
    navAbout?.classList.toggle('is-active', route.name === 'about');
    vtGrid?.classList.toggle('is-active', route.name === 'home');
    vtList?.classList.toggle('is-active', route.name === 'list');

    const isHome = route.name === 'home';
    controls.enabled = isHome;
    if (isHome) {
      controls.lastInteraction = performance.now();
      gsap.to(camera, {
        fov: BASE_FOV,
        duration: 0.9,
        ease: 'expo.out',
        onUpdate: () => camera.updateProjectionMatrix(),
      });
    }
  }

  function navigate(path: string, push = true): void {
    const next = parseRoute(path);
    if (routePath(next) === routePath(route)) return;
    const prev = route;
    route = next;
    if (push) history.pushState(null, '', routePath(next));

    // art → art: swap content inside the open overlay
    if (prev.name === 'work' && next.name === 'work') {
      detail.swap(next.artwork);
      syncChrome();
      return;
    }

    if (prev.name === 'work') detail.close();
    if (prev.name === 'about') about.close();
    if (prev.name === 'list') list.close();

    if (next.name === 'work') {
      workReturnPath = prev.name === 'list' ? '/list' : '/';
      detail.open(next.artwork);
    }
    if (next.name === 'about') about.open();
    if (next.name === 'list') list.open();

    syncChrome();
  }

  window.addEventListener('popstate', () => navigate(location.pathname, false));
  window.addEventListener('keydown', (e) => {
    if (e.key !== 'Escape') return;
    if (route.name === 'work') navigate(workReturnPath);
    else if (route.name !== 'home') navigate('/');
  });
  document.querySelectorAll<HTMLAnchorElement>('a[data-route-link]').forEach((a) => {
    a.addEventListener('click', (e) => {
      e.preventDefault();
      navigate(a.getAttribute('href') ?? '/');
    });
  });
  vtGrid?.addEventListener('click', () => navigate('/'));
  vtList?.addEventListener('click', () => navigate('/list'));

  /* ------------------------- tap → focus → open ----------------------- */
  const raycaster = new THREE.Raycaster();
  const pointer = new THREE.Vector2();

  controls.setTapHandler((x, y) => {
    pointer.set((x / window.innerWidth) * 2 - 1, -(y / window.innerHeight) * 2 + 1);
    raycaster.setFromCamera(pointer, camera);
    const hit = raycaster.intersectObjects(gallery.raycastTargets, false)[0];
    if (!hit) return;

    const artwork = hit.object.userData.artwork as Artwork;
    const dir = SphereGallery.tileDirection(hit.object as THREE.Mesh);
    const targetYaw = Math.atan2(-dir.x, -dir.z);
    const targetPitch = Math.asin(THREE.MathUtils.clamp(dir.y, -1, 1));

    // unwrap yaw so the camera takes the short way around
    const twoPi = Math.PI * 2;
    let yawGoal = targetYaw;
    while (yawGoal - controls.yaw > Math.PI) yawGoal -= twoPi;
    while (yawGoal - controls.yaw < -Math.PI) yawGoal += twoPi;

    controls.enabled = false;
    controls.lookAt(yawGoal, targetPitch);

    gsap.to(camera, {
      fov: FOCUS_FOV,
      duration: 0.75,
      ease: 'power3.inOut',
      onUpdate: () => camera.updateProjectionMatrix(),
      onComplete: () => navigate(`/art/${artwork.slug}`),
    });
  });

  /* --------------------------- hover focus ---------------------------- */
  const hoverPointer = new THREE.Vector2();
  let pointerOnScreen = false;
  let hovered: THREE.Mesh | null = null;

  window.addEventListener('pointermove', (e) => {
    hoverPointer.set((e.clientX / window.innerWidth) * 2 - 1, -(e.clientY / window.innerHeight) * 2 + 1);
    pointerOnScreen = true;
  });
  document.addEventListener('pointerleave', () => {
    pointerOnScreen = false;
  });

  /* ------------------------------- HUD -------------------------------- */
  buildFilter((filtered) => {
    gallery.build(filtered);
    gsap.fromTo(
      lensPass.uniforms.uDistortion,
      { value: 0.55 },
      { value: 0.12, duration: 1.1, ease: 'expo.out' }
    );
  });

  /* ------------------------------ loading ----------------------------- */
  await preloadImages(ARTWORKS, updateLoader);
  void hideLoader();

  // intro: swing in from the side while the lens "focuses"
  controls.yaw = -1.1;
  controls.pitch = 0.3;
  controls.lookAt(0, 0);
  camera.fov = 95;
  camera.updateProjectionMatrix();
  gsap.to(camera, {
    fov: BASE_FOV,
    duration: 1.8,
    ease: 'expo.out',
    delay: 0.15,
    onUpdate: () => camera.updateProjectionMatrix(),
  });
  gsap.fromTo(
    lensPass.uniforms.uDistortion,
    { value: 0.5 },
    { value: 0.12, duration: 1.8, ease: 'expo.out', delay: 0.15 }
  );

  // deep link (/art/slug, /about, …) — apply after the loader clears
  const initial = parseRoute(location.pathname);
  if (initial.name !== 'home') navigate(location.pathname, false);

  /* ----------------------------- render loop -------------------------- */
  const clock = new THREE.Clock();
  renderer.setAnimationLoop(() => {
    const dt = Math.min(clock.getDelta(), 0.05);

    // idle auto-drift
    if (controls.enabled && performance.now() - controls.lastInteraction > IDLE_DELAY) {
      controls.targetYaw += IDLE_DRIFT * dt;
    }

    controls.update(dt);
    camera.rotation.set(controls.pitch, controls.yaw, 0);

    // hover focus: brighten the hovered tile, gently dim the rest
    if (route.name === 'home' && controls.enabled && pointerOnScreen && !controls.isDragging) {
      raycaster.setFromCamera(hoverPointer, camera);
      hovered = (raycaster.intersectObjects(gallery.raycastTargets, false)[0]?.object ??
        null) as THREE.Mesh | null;
    } else {
      hovered = null;
    }
    renderer.domElement.classList.toggle('is-hover', hovered !== null);
    const fade = 1 - Math.exp(-9 * dt);
    for (const mesh of gallery.raycastTargets) {
      const target = hovered === null ? 1 : mesh === hovered ? 1 : 0.62;
      const current = mesh.userData.brightness as number;
      const value = current + (target - current) * fade;
      mesh.userData.brightness = value;
      (mesh.material as THREE.MeshBasicMaterial).color.setScalar(value);
    }

    lensPass.uniforms.uTime.value = clock.elapsedTime;
    composer.render();
  });

  /* ------------------------------- resize ----------------------------- */
  window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
    composer.setSize(window.innerWidth, window.innerHeight);
  });
}

void boot();
