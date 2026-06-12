/**
 * Inside-the-sphere look controls.
 * Pointer drag + wheel write to *target* yaw/pitch; the camera follows
 * with exponential smoothing (lenis-style), and a release flick adds
 * inertia by projecting recent velocity onto the target.
 */
const PITCH_LIMIT = 0.58; // rad — keep the poles out of view
const EASE = 5.2; // smoothing speed (per second)
const DRAG_SENS = 2.4; // radians per full viewport width
const FLICK = 0.09; // inertia strength
const WHEEL_SENS = 0.00055;

export class SphereControls {
  yaw = 0;
  pitch = 0;
  targetYaw = 0;
  targetPitch = 0;
  enabled = true;

  /** epoch ms of the last user interaction (for idle auto-drift) */
  lastInteraction = performance.now();

  private dragging = false;
  private lastX = 0;
  private lastY = 0;
  private velX = 0;
  private velY = 0;
  private lastMoveTime = 0;
  private downX = 0;
  private downY = 0;
  private downTime = 0;

  private onTap: ((x: number, y: number) => void) | null = null;

  constructor(private dom: HTMLElement) {
    dom.addEventListener('pointerdown', this.handleDown);
    window.addEventListener('pointermove', this.handleMove);
    window.addEventListener('pointerup', this.handleUp);
    dom.addEventListener('wheel', this.handleWheel, { passive: false });
  }

  setTapHandler(fn: (x: number, y: number) => void): void {
    this.onTap = fn;
  }

  get isDragging(): boolean {
    return this.dragging;
  }

  /** Instantly retarget (used by intro + card-focus animations). */
  lookAt(yaw: number, pitch: number): void {
    this.targetYaw = yaw;
    this.targetPitch = Math.max(-PITCH_LIMIT, Math.min(PITCH_LIMIT, pitch));
  }

  update(dt: number): void {
    const k = 1 - Math.exp(-EASE * dt);
    this.yaw += (this.targetYaw - this.yaw) * k;
    this.pitch += (this.targetPitch - this.pitch) * k;
  }

  private handleDown = (e: PointerEvent): void => {
    if (!this.enabled || e.button !== 0) return;
    this.dragging = true;
    this.lastX = this.downX = e.clientX;
    this.lastY = this.downY = e.clientY;
    this.downTime = this.lastMoveTime = performance.now();
    this.velX = 0;
    this.velY = 0;
    this.lastInteraction = this.downTime;
    this.dom.classList.add('is-dragging');
  };

  private handleMove = (e: PointerEvent): void => {
    if (!this.dragging || !this.enabled) return;
    const now = performance.now();
    const dt = Math.max(8, now - this.lastMoveTime);
    const dx = e.clientX - this.lastX;
    const dy = e.clientY - this.lastY;
    const sens = DRAG_SENS / window.innerWidth;

    this.targetYaw += dx * sens;
    this.targetPitch += dy * sens;
    this.targetPitch = Math.max(-PITCH_LIMIT, Math.min(PITCH_LIMIT, this.targetPitch));

    this.velX = (dx / dt) * 16.7; // px per frame-ish
    this.velY = (dy / dt) * 16.7;
    this.lastX = e.clientX;
    this.lastY = e.clientY;
    this.lastMoveTime = now;
    this.lastInteraction = now;
  };

  private handleUp = (e: PointerEvent): void => {
    if (!this.dragging) return;
    this.dragging = false;
    this.dom.classList.remove('is-dragging');
    this.lastInteraction = performance.now();

    const sens = DRAG_SENS / window.innerWidth;
    // inertia flick
    this.targetYaw += this.velX * FLICK * sens * 16;
    this.targetPitch += this.velY * FLICK * sens * 16;
    this.targetPitch = Math.max(-PITCH_LIMIT, Math.min(PITCH_LIMIT, this.targetPitch));

    // tap detection (small movement, short duration)
    const dist = Math.hypot(e.clientX - this.downX, e.clientY - this.downY);
    const elapsed = performance.now() - this.downTime;
    if (dist < 8 && elapsed < 350 && this.enabled && this.onTap) {
      this.onTap(e.clientX, e.clientY);
    }
  };

  private handleWheel = (e: WheelEvent): void => {
    if (!this.enabled) return;
    e.preventDefault();
    this.targetPitch += e.deltaY * WHEEL_SENS;
    this.targetPitch = Math.max(-PITCH_LIMIT, Math.min(PITCH_LIMIT, this.targetPitch));
    this.targetYaw += e.deltaX * WHEEL_SENS;
    this.lastInteraction = performance.now();
  };
}
