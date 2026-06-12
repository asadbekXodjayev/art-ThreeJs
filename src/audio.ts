import gsap from 'gsap';

/**
 * Background soundtrack: public-domain / CC recordings served locally
 * (no streaming service involved).
 *   1. Beethoven — Für Elise (Wikimedia Commons, public domain)
 *   2. Mozart — Requiem, Lacrimosa, piano arrangement
 *      (Wikimedia Commons, CC BY-SA 4.0)
 * Loops through the playlist at low volume; starts only on user gesture.
 */
const TRACKS = ['/audio/fur-elise.ogg', '/audio/lacrimosa.ogg'];
const VOLUME = 0.12;

export class GalleryAudio {
  enabled = false;
  private audio: HTMLAudioElement | null = null;
  private trackIndex = 0;

  /** Returns the new enabled state. */
  toggle(): boolean {
    this.enabled = !this.enabled;
    if (this.enabled) this.play();
    else this.fadeOut();
    return this.enabled;
  }

  private ensure(): HTMLAudioElement {
    if (this.audio) return this.audio;
    const audio = new Audio();
    audio.preload = 'none'; // never costs bandwidth until the user opts in
    audio.addEventListener('ended', () => {
      this.trackIndex = (this.trackIndex + 1) % TRACKS.length;
      if (this.enabled) this.play();
    });
    this.audio = audio;
    return audio;
  }

  private play(): void {
    const audio = this.ensure();
    const src = TRACKS[this.trackIndex];
    if (!audio.src.endsWith(src)) {
      audio.src = src;
    }
    audio.volume = 0;
    void audio.play().catch(() => {
      /* autoplay rejected — user can press the toggle again */
    });
    gsap.to(audio, { volume: VOLUME, duration: 2, ease: 'power1.inOut', overwrite: true });
  }

  private fadeOut(): void {
    const audio = this.audio;
    if (!audio) return;
    gsap.to(audio, {
      volume: 0,
      duration: 0.9,
      ease: 'power1.out',
      overwrite: true,
      onComplete: () => audio.pause(),
    });
  }
}
