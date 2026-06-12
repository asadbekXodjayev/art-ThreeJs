import gsap from 'gsap';
import type { Artwork } from './data/artworks';
import { toRoman } from './gallery';

/**
 * Generic full-screen page overlay: clip-path wipe in from the bottom,
 * staggered reveal of `.reveal` children, wipe up on close.
 */
export class PageOverlay {
  protected root: HTMLElement;
  isOpen = false;
  private items: HTMLElement[];

  constructor(id: string) {
    const node = document.getElementById(id);
    if (!node) throw new Error(`Missing page #${id}`);
    this.root = node;
    this.items = Array.from(node.querySelectorAll<HTMLElement>('.reveal'));
  }

  open(): void {
    if (this.isOpen) return;
    this.isOpen = true;
    this.root.setAttribute('aria-hidden', 'false');
    this.root.scrollTop = 0;

    const tl = gsap
      .timeline()
      .set(this.root, { visibility: 'visible' })
      .fromTo(
        this.root,
        { clipPath: 'inset(100% 0 0 0)' },
        { clipPath: 'inset(0% 0 0 0)', duration: 0.85, ease: 'expo.inOut' }
      );
    if (this.items.length > 0) {
      tl.fromTo(
        this.items,
        { y: 52, autoAlpha: 0 },
        { y: 0, autoAlpha: 1, duration: 0.7, ease: 'power3.out', stagger: 0.08 },
        '-=0.25'
      );
    }
  }

  close(): void {
    if (!this.isOpen) return;
    this.isOpen = false;
    if (document.activeElement instanceof HTMLElement) document.activeElement.blur();
    this.root.setAttribute('aria-hidden', 'true');
    gsap
      .timeline({ onComplete: () => gsap.set(this.root, { visibility: 'hidden' }) })
      .to(this.root, { clipPath: 'inset(0 0 100% 0)', duration: 0.7, ease: 'expo.inOut' });
  }
}

/**
 * List view of all works: numbered rows + a preview thumbnail that
 * chases the cursor with lenis-style lag.
 */
export class ListPage extends PageOverlay {
  constructor(artworks: Artwork[], onSelect: (project: Artwork) => void) {
    super('list');

    const rows = document.getElementById('list-rows');
    const count = document.getElementById('list-count');
    const thumb = document.getElementById('list-thumb') as HTMLImageElement | null;
    if (!rows || !count || !thumb) throw new Error('List view markup missing');

    count.textContent = String(artworks.length);

    artworks.forEach((artwork, i) => {
      const li = document.createElement('li');
      li.className = 'reveal';
      const row = document.createElement('button');
      row.type = 'button';
      row.className = 'list-row';
      row.innerHTML = `
        <span class="lr-index">${toRoman(i + 1)}</span>
        <span class="lr-title">${artwork.title}</span>
        <span class="lr-client">${artwork.artist}</span>
        <span class="lr-cat">${artwork.era}</span>
        <span class="lr-year">${toRoman(artwork.year)}</span>
      `;
      row.addEventListener('click', () => onSelect(artwork));
      row.addEventListener('mouseenter', () => {
        thumb.src = artwork.img;
        gsap.to(thumb, {
          opacity: 1,
          rotation: gsap.utils.random(-3, 3),
          duration: 0.35,
          ease: 'power2.out',
        });
      });
      row.addEventListener('mouseleave', () => {
        gsap.to(thumb, { opacity: 0, duration: 0.25, ease: 'power2.out' });
      });
      li.appendChild(row);
      rows.appendChild(li);
    });

    // cursor-chasing thumbnail (smoothed)
    const toX = gsap.quickTo(thumb, 'x', { duration: 0.55, ease: 'power3' });
    const toY = gsap.quickTo(thumb, 'y', { duration: 0.55, ease: 'power3' });
    this.root.addEventListener('mousemove', (e) => {
      toX(e.clientX - 180 + 60);
      toY(e.clientY - 110);
    });
  }
}
