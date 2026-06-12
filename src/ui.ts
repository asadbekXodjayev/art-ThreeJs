import gsap from 'gsap';
import { ERAS, ARTWORKS, type Artwork } from './data/artworks';

function el<T extends HTMLElement>(id: string): T {
  const node = document.getElementById(id);
  if (!node) throw new Error(`Missing element #${id}`);
  return node as T;
}

/* ----------------------------- filter ----------------------------- */
export function buildFilter(onChange: (artworks: Artwork[]) => void): void {
  const btn = el<HTMLButtonElement>('filter-btn');
  const panel = el<HTMLDivElement>('filter-panel');

  for (const era of ERAS) {
    const count = era === 'ALL' ? ARTWORKS.length : ARTWORKS.filter((a) => a.era === era).length;
    const opt = document.createElement('button');
    opt.type = 'button';
    opt.className = `filter-opt${era === 'ALL' ? ' is-active' : ''}`;
    opt.innerHTML = `<span>${era}</span><span class="filter-count">${count}</span>`;
    opt.addEventListener('click', () => {
      panel.querySelectorAll('.filter-opt').forEach((b) => b.classList.remove('is-active'));
      opt.classList.add('is-active');
      onChange(era === 'ALL' ? ARTWORKS : ARTWORKS.filter((a) => a.era === era));
      togglePanel(false);
    });
    panel.appendChild(opt);
  }

  const togglePanel = (open: boolean): void => {
    panel.classList.toggle('is-open', open);
    panel.setAttribute('aria-hidden', String(!open));
    btn.setAttribute('aria-expanded', String(open));
  };

  btn.addEventListener('click', () => {
    togglePanel(!panel.classList.contains('is-open'));
  });
  document.addEventListener('pointerdown', (e) => {
    if (!panel.classList.contains('is-open')) return;
    const target = e.target as Node;
    if (!panel.contains(target) && target !== btn) togglePanel(false);
  });
}

/* ----------------------------- loader ----------------------------- */
export function updateLoader(ratio: number): void {
  el<HTMLSpanElement>('loader-num').textContent = String(Math.round(ratio * 100));
}

export function hideLoader(): Promise<void> {
  return new Promise((resolve) => {
    const loader = el<HTMLDivElement>('loader');
    gsap.to(loader, {
      autoAlpha: 0,
      duration: 0.8,
      ease: 'power2.inOut',
      delay: 0.25,
      onComplete: () => {
        loader.remove();
        resolve();
      },
    });
  });
}
