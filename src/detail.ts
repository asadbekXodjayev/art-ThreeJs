import gsap from 'gsap';
import { nextArtwork, type Artwork } from './data/artworks';
import { toRoman } from './gallery';

function el<T extends HTMLElement>(id: string): T {
  const node = document.getElementById(id);
  if (!node) throw new Error(`Missing element #${id}`);
  return node as T;
}

interface DetailOptions {
  /** user clicked [CLOSE] / pressed Esc — the router decides where to go */
  requestClose: () => void;
  /** user clicked OPUS SEQUENS */
  requestNext: (next: Artwork) => void;
}

/**
 * Artwork detail page: clip-path wipe + staggered content reveal,
 * with in-place content swap for art → art navigation.
 */
export class DetailPage {
  private root = el<HTMLElement>('detail');
  isOpen = false;
  private next: Artwork | null = null;

  private get children(): NodeListOf<HTMLElement> {
    return this.root.querySelectorAll<HTMLElement>(
      '.detail-top, .d-title, .d-ornament, .d-meta, .d-figure, .d-body, .d-catalogue, .d-section, .d-facts-block, .d-palette-block, .d-next'
    );
  }

  constructor(options: DetailOptions) {
    el<HTMLButtonElement>('d-close').addEventListener('click', options.requestClose);
    el<HTMLButtonElement>('d-next').addEventListener('click', () => {
      if (this.next) options.requestNext(this.next);
    });
  }

  open(artwork: Artwork): void {
    if (this.isOpen) return;
    this.isOpen = true;
    this.fill(artwork);

    this.root.setAttribute('aria-hidden', 'false');
    this.root.scrollTop = 0;

    gsap
      .timeline()
      .set(this.root, { visibility: 'visible' })
      .fromTo(
        this.root,
        { clipPath: 'inset(100% 0 0 0)' },
        { clipPath: 'inset(0% 0 0 0)', duration: 0.85, ease: 'expo.inOut' }
      )
      .fromTo(
        this.children,
        { y: 48, autoAlpha: 0 },
        { y: 0, autoAlpha: 1, duration: 0.7, ease: 'power3.out', stagger: 0.07 },
        '-=0.25'
      );
  }

  /** Animate content out, replace it, animate back in (same overlay). */
  swap(artwork: Artwork): void {
    if (!this.isOpen) {
      this.open(artwork);
      return;
    }
    const children = this.children;
    gsap
      .timeline()
      .to(children, { y: -28, autoAlpha: 0, duration: 0.3, ease: 'power2.in', stagger: 0.03 })
      .add(() => {
        this.fill(artwork);
        this.root.scrollTop = 0;
      })
      .fromTo(
        children,
        { y: 44, autoAlpha: 0 },
        { y: 0, autoAlpha: 1, duration: 0.6, ease: 'power3.out', stagger: 0.06 }
      );
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

  private fill(artwork: Artwork): void {
    el<HTMLSpanElement>('d-client').textContent = artwork.artist;
    el<HTMLHeadingElement>('d-title').textContent = artwork.title;
    el<HTMLSpanElement>('d-year').textContent = artwork.yearLabel
      ? `CIRCA ${toRoman(artwork.year)}`
      : `ANNO ${toRoman(artwork.year)}`;
    el<HTMLSpanElement>('d-cat').textContent = artwork.era;
    el<HTMLParagraphElement>('d-desc').textContent = artwork.desc;

    const img = el<HTMLImageElement>('d-img');
    img.src = artwork.img;
    img.alt = `${artwork.title} — ${artwork.artist}`;

    const tags = el<HTMLDivElement>('d-tags');
    tags.innerHTML = '';
    for (const tag of artwork.tags) {
      const span = document.createElement('span');
      span.textContent = tag;
      tags.appendChild(span);
    }

    // catalogue entry
    const catalogue = el<HTMLDListElement>('d-cat-grid');
    catalogue.innerHTML = '';
    const rows: Array<[string, string | undefined]> = [
      ['MEDIUM', artwork.medium],
      ['DIMENSIONS', artwork.dimensions],
      ['HOUSED AT', artwork.location],
      ['MOVEMENT', artwork.movement],
      ['GENRE', artwork.genre],
      ['COMMISSIONED BY', artwork.commissionedBy],
    ];
    for (const [label, value] of rows) {
      if (!value) continue;
      const dt = document.createElement('dt');
      dt.textContent = label;
      const dd = document.createElement('dd');
      dd.textContent = value;
      catalogue.append(dt, dd);
    }

    // long-form sections
    const sections = el<HTMLDivElement>('d-sections');
    sections.innerHTML = '';
    const parts: Array<[string, string]> = [
      ['OVERVIEW', artwork.overview],
      ['COMPOSITION', artwork.composition],
      ['TECHNIQUE', artwork.technique],
      ['SYMBOLISM', artwork.symbolism],
      ['LEGACY', artwork.legacy],
    ];
    for (const [heading, body] of parts) {
      const section = document.createElement('section');
      section.className = 'd-section';
      const h2 = document.createElement('h2');
      h2.className = 'd-sec-label';
      h2.textContent = heading;
      section.appendChild(h2);
      for (const paragraph of body.split('\n\n')) {
        const p = document.createElement('p');
        p.textContent = paragraph;
        section.appendChild(p);
      }
      sections.appendChild(section);
    }

    // facts
    const facts = el<HTMLUListElement>('d-facts');
    facts.innerHTML = '';
    for (const fact of artwork.facts) {
      const li = document.createElement('li');
      li.textContent = fact;
      facts.appendChild(li);
    }

    // palette
    const palette = el<HTMLDivElement>('d-palette');
    palette.innerHTML = '';
    for (const color of artwork.palette) {
      const cell = document.createElement('div');
      cell.className = 'd-swatch';
      cell.innerHTML = `
        <span class="d-swatch-color" style="background:${color.hex}"></span>
        <span class="d-swatch-hex">${color.hex.toUpperCase()}</span>
        <span class="d-swatch-name">${color.name}</span>
      `;
      palette.appendChild(cell);
    }

    this.next = nextArtwork(artwork);
    el<HTMLSpanElement>('d-next-title').textContent = this.next.title;
  }
}
