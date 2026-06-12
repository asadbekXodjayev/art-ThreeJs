import * as THREE from 'three';
import type { Artwork } from './data/artworks';

export const SPHERE_RADIUS = 10;
const COLS = 9;
const ROWS = 4;
const ROW_ANGLE = 0.5; // rad — latitude span per row
const GAP = 0.016; // rad — gap between tiles

const TILE_W = 1024;
const TILE_H = 728;

interface TileAssets {
  texture: THREE.CanvasTexture;
  material: THREE.MeshBasicMaterial;
}

const assetCache = new Map<string, TileAssets>();
const imageCache = new Map<string, HTMLImageElement>();
const imagePromiseCache = new Map<string, Promise<HTMLImageElement | null>>();

/* ------------------------------------------------------------------ */
/*  Card texture drawing (2D canvas → CanvasTexture)                   */
/* ------------------------------------------------------------------ */
function roundedRect(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  w: number,
  h: number,
  r: number
): void {
  ctx.beginPath();
  ctx.roundRect(x, y, w, h, r);
}

const GOLD = '#D4AF77';
const PARCHMENT = '#F5E8C7';

export function toRoman(year: number): string {
  const map: Array<[number, string]> = [
    [1000, 'M'],
    [900, 'CM'],
    [500, 'D'],
    [400, 'CD'],
    [100, 'C'],
    [90, 'XC'],
    [50, 'L'],
    [40, 'XL'],
    [10, 'X'],
    [9, 'IX'],
    [5, 'V'],
    [4, 'IV'],
    [1, 'I'],
  ];
  let n = year;
  let out = '';
  for (const [value, glyph] of map) {
    while (n >= value) {
      out += glyph;
      n -= value;
    }
  }
  return out;
}

function drawCard(
  ctx: CanvasRenderingContext2D,
  artwork: Artwork,
  img: HTMLImageElement | null
): void {
  ctx.clearRect(0, 0, TILE_W, TILE_H);

  // parchment-dark panel with a faint warm radial sheen
  ctx.fillStyle = '#1c1610';
  ctx.fillRect(0, 0, TILE_W, TILE_H);
  const sheen = ctx.createRadialGradient(
    TILE_W / 2,
    TILE_H / 2,
    60,
    TILE_W / 2,
    TILE_H / 2,
    TILE_W * 0.7
  );
  sheen.addColorStop(0, 'rgba(212,175,119,0.05)');
  sheen.addColorStop(1, 'rgba(16,12,9,0.4)');
  ctx.fillStyle = sheen;
  ctx.fillRect(0, 0, TILE_W, TILE_H);

  // gilded double border (manuscript plate)
  ctx.strokeStyle = 'rgba(212,175,119,0.5)';
  ctx.lineWidth = 2.5;
  ctx.strokeRect(2, 2, TILE_W - 4, TILE_H - 4);
  ctx.strokeStyle = 'rgba(212,175,119,0.2)';
  ctx.lineWidth = 1.5;
  ctx.strokeRect(14, 14, TILE_W - 28, TILE_H - 28);

  // painting at its NATIVE aspect ratio, contain-fitted to a max box —
  // portraits hang tall, panoramas hang wide, nothing is cropped
  const maxW = 600;
  const maxH = 408;
  let drawX: number;
  let drawY: number;
  let drawW: number;
  let drawH: number;
  if (img) {
    const scale = Math.min(maxW / img.naturalWidth, maxH / img.naturalHeight);
    drawW = Math.round(img.naturalWidth * scale);
    drawH = Math.round(img.naturalHeight * scale);
    drawX = Math.round((TILE_W - drawW) / 2);
    drawY = Math.round((TILE_H - drawH) / 2) - 4;
    ctx.drawImage(img, drawX, drawY, drawW, drawH);
  } else {
    drawW = 420;
    drawH = 320;
    drawX = (TILE_W - drawW) / 2;
    drawY = (TILE_H - drawH) / 2 - 4;
    ctx.fillStyle = '#181208';
    ctx.fillRect(drawX, drawY, drawW, drawH);
  }
  // gilded picture frame + matting line hugging the painting's true edges
  ctx.strokeStyle = 'rgba(212,175,119,0.7)';
  ctx.lineWidth = 2.5;
  ctx.strokeRect(drawX - 1.5, drawY - 1.5, drawW + 3, drawH + 3);
  ctx.strokeStyle = 'rgba(212,175,119,0.25)';
  ctx.lineWidth = 1;
  ctx.strokeRect(drawX - 9, drawY - 9, drawW + 18, drawH + 18);

  // artist — top left, gold small caps
  ctx.textBaseline = 'top';
  ctx.textAlign = 'left';
  ctx.fillStyle = GOLD;
  ctx.font = '600 23px "Cinzel"';
  ctx.fillText(artwork.artist, 50, 54);

  // title — top right (wraps to two lines max), parchment
  ctx.textAlign = 'right';
  ctx.font = '600 21px "Cinzel"';
  ctx.fillStyle = PARCHMENT;
  const maxTitle = 500;
  const words = artwork.title.split(' ');
  let line = '';
  let ty = 56;
  for (const word of words) {
    const probe = line ? `${line} ${word}` : word;
    if (ctx.measureText(probe).width > maxTitle && line) {
      ctx.fillText(line, TILE_W - 50, ty);
      ty += 32;
      line = word;
    } else {
      line = probe;
    }
  }
  ctx.fillText(line, TILE_W - 50, ty);

  // year — bottom left, roman numerals in gold
  ctx.textAlign = 'left';
  ctx.textBaseline = 'middle';
  const rowY = TILE_H - 66;
  ctx.font = '600 19px "Cinzel"';
  ctx.fillStyle = 'rgba(212,175,119,0.8)';
  const yearText = toRoman(artwork.year);
  ctx.fillText(yearText, 50, rowY);

  // tag chips — after the year, gold-bordered
  let px = 50 + ctx.measureText(yearText).width + 30;
  ctx.font = '500 16px "Cinzel"';
  for (const tag of artwork.tags.slice(0, 3)) {
    const tw = ctx.measureText(tag).width;
    const pw = tw + 30;
    const ph = 40;
    ctx.strokeStyle = 'rgba(212,175,119,0.45)';
    ctx.lineWidth = 1.4;
    roundedRect(ctx, px, rowY - ph / 2, pw, ph, 3);
    ctx.stroke();
    ctx.fillStyle = 'rgba(245,232,199,0.85)';
    ctx.fillText(tag, px + 15, rowY + 1);
    px += pw + 12;
    if (px > TILE_W - 200) break;
  }

  // category — bottom right
  ctx.textAlign = 'right';
  ctx.fillStyle = 'rgba(212,175,119,0.75)';
  ctx.font = '600 18px "Cinzel"';
  ctx.fillText(artwork.era, TILE_W - 50, rowY);
}

function buildAssets(artwork: Artwork, renderer: THREE.WebGLRenderer): TileAssets {
  const cached = assetCache.get(artwork.id);
  if (cached) return cached;

  const canvas = document.createElement('canvas');
  canvas.width = TILE_W;
  canvas.height = TILE_H;
  const ctx = canvas.getContext('2d');
  if (!ctx) throw new Error('2D context unavailable');

  drawCard(ctx, artwork, imageCache.get(artwork.id) ?? null);

  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.anisotropy = Math.min(8, renderer.capabilities.getMaxAnisotropy());
  // viewed from inside the sphere (BackSide) the map is mirrored — flip U
  texture.wrapS = THREE.RepeatWrapping;
  texture.repeat.x = -1;
  texture.offset.x = 1;

  const material = new THREE.MeshBasicMaterial({
    map: texture,
    side: THREE.BackSide,
    toneMapped: false,
  });

  const assets: TileAssets = { texture, material };
  assetCache.set(artwork.id, assets);

  // redraw once the preview image arrives
  void loadImage(artwork).then((img) => {
    if (!img) return;
    drawCard(ctx, artwork, img);
    texture.needsUpdate = true;
  });

  return assets;
}

function loadImage(artwork: Artwork): Promise<HTMLImageElement | null> {
  // promise-level cache: concurrent callers share one fetch + one decode
  const pending = imagePromiseCache.get(artwork.id);
  if (pending) return pending;
  const promise = new Promise<HTMLImageElement | null>((resolve) => {
    const img = new Image();
    img.decoding = 'async';
    img.onload = () => {
      imageCache.set(artwork.id, img);
      resolve(img);
    };
    img.onerror = () => resolve(null);
    img.src = artwork.img;
  });
  imagePromiseCache.set(artwork.id, promise);
  return promise;
}

/** Preload every preview, reporting progress 0..1. */
export function preloadImages(
  artworks: Artwork[],
  onProgress: (ratio: number) => void
): Promise<void> {
  let done = 0;
  return Promise.all(
    artworks.map((p) =>
      loadImage(p).then(() => {
        done += 1;
        onProgress(done / artworks.length);
      })
    )
  ).then(() => undefined);
}

/* ------------------------------------------------------------------ */
/*  Sphere grid                                                        */
/* ------------------------------------------------------------------ */
export class SphereGallery {
  readonly group = new THREE.Group();
  private meshes: THREE.Mesh[] = [];

  constructor(private renderer: THREE.WebGLRenderer) {}

  build(artworks: Artwork[]): void {
    this.dispose();
    if (artworks.length === 0) return;

    const thetaTotal = ROWS * ROW_ANGLE;
    const thetaStart0 = (Math.PI - thetaTotal) / 2;
    const phiPerCol = (Math.PI * 2) / COLS;

    for (let row = 0; row < ROWS; row += 1) {
      for (let col = 0; col < COLS; col += 1) {
        const index = row * COLS + col;
        const artwork = artworks[index % artworks.length];
        const assets = buildAssets(artwork, this.renderer);

        const geometry = new THREE.SphereGeometry(
          SPHERE_RADIUS,
          24,
          16,
          col * phiPerCol + GAP / 2,
          phiPerCol - GAP,
          thetaStart0 + row * ROW_ANGLE + GAP / 2,
          ROW_ANGLE - GAP
        );
        // clone per mesh so hover focus can dim tiles individually
        const material = assets.material.clone();
        const mesh = new THREE.Mesh(geometry, material);
        mesh.userData.artwork = artwork;
        mesh.userData.brightness = 1;
        this.group.add(mesh);
        this.meshes.push(mesh);
      }
    }
  }

  get raycastTargets(): THREE.Mesh[] {
    return this.meshes;
  }

  /** Unit direction from the camera (sphere center) to a tile's center. */
  static tileDirection(mesh: THREE.Mesh): THREE.Vector3 {
    mesh.geometry.computeBoundingSphere();
    const center = mesh.geometry.boundingSphere?.center ?? new THREE.Vector3(0, 0, 1);
    return center.clone().normalize();
  }

  private dispose(): void {
    for (const mesh of this.meshes) {
      this.group.remove(mesh);
      mesh.geometry.dispose();
      (mesh.material as THREE.Material).dispose(); // clone only; cached texture survives
    }
    this.meshes = [];
  }
}
