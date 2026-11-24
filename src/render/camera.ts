import * as THREE from 'three';

export type CameraPreset = 'overview' | 'street' | 'newcity';

export interface CameraInputHooks {
  isToolActive: () => boolean;
  onHover?: (clientX: number, clientY: number) => void;
  onToolDown?: (clientX: number, clientY: number, pointerType: string) => void;
  onToolMove?: (clientX: number, clientY: number, pointerType: string) => void;
  onToolUp?: (clientX: number, clientY: number, pointerType: string, dragged: boolean) => void;
  onToolCancel?: () => void;
  onTapSelect?: (clientX: number, clientY: number) => void;
  onLongPress?: (clientX: number, clientY: number) => void;
  onRightClick?: () => void;
  onKeyDown?: (e: KeyboardEvent) => void;
}

interface TrackedPointer {
  id: number;
  x: number;
  y: number;
  startX: number;
  startY: number;
  button: number;
  pointerType: string;
}

function isEditableElement(target: EventTarget | null): boolean {
  if (!(target instanceof HTMLElement)) return false;
  const tag = target.tagName;
  return tag === 'INPUT' || tag === 'TEXTAREA' || tag === 'SELECT' || target.isContentEditable;
}

export class RtsCameraController {
  readonly camera: THREE.PerspectiveCamera;
  readonly target = new THREE.Vector3(205, 8, 90);

  yaw = -0.34; // radians around Y (0 = looking north from +Z)
  pitch = 0.56; // elevation angle above horizon in radians
  distance = 490;

  private readonly keys = new Set<string>();
  private readonly domElement: HTMLElement;
  private hooks: CameraInputHooks = { isToolActive: () => false };

  private readonly pointers = new Map<number, TrackedPointer>();
  private mode: 'none' | 'pan' | 'orbit' | 'tool' | 'multitouch' = 'none';
  private primaryPointerId: number | null = null;
  private maxTravel = 0;

  // Multi-touch state (pinch zoom + twist rotate + vertical drag tilt)
  private lastPinchDist = 0;
  private lastPinchAngle = 0;
  private lastMidX = 0;
  private lastMidY = 0;

  // Long-press timer for touch building inspection
  private longPressTimer: ReturnType<typeof setTimeout> | null = null;
  private longPressFired = false;

  // Raycast helpers for zoom-to-cursor
  private readonly raycaster = new THREE.Raycaster();
  private readonly ndc = new THREE.Vector2();
  private readonly groundPlane = new THREE.Plane(new THREE.Vector3(0, 1, 0), 0);
  private readonly tmpHitA = new THREE.Vector3();
  private readonly tmpHitB = new THREE.Vector3();

  constructor(domElement: HTMLElement, aspect = 16 / 9) {
    this.domElement = domElement;
    this.domElement.style.touchAction = 'none';
    this.camera = new THREE.PerspectiveCamera(42, aspect, 2, 3400);
    this.applyPreset('overview');
    this.bindEvents();
  }

  setHooks(hooks: CameraInputHooks): void {
    this.hooks = hooks;
  }

  applyPreset(preset: CameraPreset): void {
    if (preset === 'street') {
      // Low-angle vibrant avenue view looking north along the 4-lane boulevard & downtown core
      this.target.set(222, 14, 25);
      this.yaw = -0.26;
      this.pitch = 0.21;
      this.distance = 168;
    } else if (preset === 'newcity') {
      // New empty coastal valley framing northern highway connection, river, bay & buildable plain
      this.target.set(130, 8, -20);
      this.yaw = -0.34;
      this.pitch = 0.56;
      this.distance = 580;
    } else {
      // Sunlit coastal miniature diorama overview framing bay, river estuary, curved waterfront & city
      this.target.set(190, 6, 95);
      this.yaw = -0.36;
      this.pitch = 0.56;
      this.distance = 520;
    }
    this.syncCamera();
  }

  focusPoint(x: number, y: number, z: number, dist?: number): void {
    this.target.set(x, y, z);
    if (dist !== undefined) {
      this.distance = dist;
    }
    this.syncCamera();
  }

  private syncCamera(): void {
    this.pitch = Math.max(0.14, Math.min(1.38, this.pitch));
    this.distance = Math.max(45, Math.min(1150, this.distance));
    this.target.x = Math.max(-780, Math.min(780, this.target.x));
    this.target.z = Math.max(-780, Math.min(780, this.target.z));

    const horiz = Math.cos(this.pitch) * this.distance;
    const dy = Math.sin(this.pitch) * this.distance;
    const dx = Math.sin(this.yaw) * horiz;
    const dz = Math.cos(this.yaw) * horiz;

    this.camera.position.set(this.target.x + dx, Math.max(6, this.target.y + dy), this.target.z + dz);
    this.camera.lookAt(this.target);
    this.camera.updateMatrixWorld();
  }

  private intersectGroundAtClient(clientX: number, clientY: number, out: THREE.Vector3): boolean {
    const rect = this.domElement.getBoundingClientRect();
    if (rect.width <= 0 || rect.height <= 0) return false;
    this.ndc.set(
      ((clientX - rect.left) / rect.width) * 2 - 1,
      -((clientY - rect.top) / rect.height) * 2 + 1
    );
    this.raycaster.setFromCamera(this.ndc, this.camera);
    this.groundPlane.constant = -this.target.y;
    const hit = this.raycaster.ray.intersectPlane(this.groundPlane, out);
    return hit !== null;
  }

  private panByScreenDelta(dx: number, dy: number): void {
    const scale = this.distance * 0.00145;
    const fwdX = -Math.sin(this.yaw);
    const fwdZ = -Math.cos(this.yaw);
    const rightX = Math.cos(this.yaw);
    const rightZ = -Math.sin(this.yaw);
    this.target.x += (-dx * rightX + dy * fwdX) * scale;
    this.target.z += (-dx * rightZ + dy * fwdZ) * scale;
  }

  update(dt: number): void {
    const panSpeed = this.distance * 0.85 * dt;
    const rotSpeed = 1.45 * dt;

    // Forward along XZ from camera toward target
    const fwdX = -Math.sin(this.yaw);
    const fwdZ = -Math.cos(this.yaw);
    const rightX = Math.cos(this.yaw);
    const rightZ = -Math.sin(this.yaw);

    let moved = false;
    if (this.keys.has('KeyW') || this.keys.has('ArrowUp')) {
      this.target.x += fwdX * panSpeed;
      this.target.z += fwdZ * panSpeed;
      moved = true;
    }
    if (this.keys.has('KeyS') || this.keys.has('ArrowDown')) {
      this.target.x -= fwdX * panSpeed;
      this.target.z -= fwdZ * panSpeed;
      moved = true;
    }
    if (this.keys.has('KeyA') || this.keys.has('ArrowLeft')) {
      this.target.x -= rightX * panSpeed;
      this.target.z -= rightZ * panSpeed;
      moved = true;
    }
    if (this.keys.has('KeyD') || this.keys.has('ArrowRight')) {
      this.target.x += rightX * panSpeed;
      this.target.z += rightZ * panSpeed;
      moved = true;
    }
    if (this.keys.has('KeyQ')) {
      this.yaw -= rotSpeed;
      moved = true;
    }
    if (this.keys.has('KeyE')) {
      this.yaw += rotSpeed;
      moved = true;
    }

    if (moved) {
      this.syncCamera();
    }
  }

  private clearLongPress(): void {
    if (this.longPressTimer !== null) {
      clearTimeout(this.longPressTimer);
      this.longPressTimer = null;
    }
  }

  private initMultiTouch(): void {
    const list = Array.from(this.pointers.values());
    if (list.length < 2) return;
    const a = list[0];
    const b = list[1];
    this.lastPinchDist = Math.max(10, Math.hypot(b.x - a.x, b.y - a.y));
    this.lastPinchAngle = Math.atan2(b.y - a.y, b.x - a.x);
    this.lastMidX = (a.x + b.x) * 0.5;
    this.lastMidY = (a.y + b.y) * 0.5;
  }

  private bindEvents(): void {
    window.addEventListener('keydown', this.onKeyDown);
    window.addEventListener('keyup', this.onKeyUp);
    window.addEventListener('blur', this.onWindowBlur);
    this.domElement.addEventListener('pointerdown', this.onPointerDown);
    window.addEventListener('pointermove', this.onPointerMove);
    window.addEventListener('pointerup', this.onPointerUp);
    window.addEventListener('pointercancel', this.onPointerUp);
    this.domElement.addEventListener('wheel', this.onWheel, { passive: false });
    this.domElement.addEventListener('contextmenu', this.onContextMenu);
    // Block native browser touch pinch-zoom / page scroll on canvas
    this.domElement.addEventListener('touchstart', this.preventTouchDefault, { passive: false });
    this.domElement.addEventListener('touchmove', this.preventTouchDefault, { passive: false });
  }

  private readonly preventTouchDefault = (e: TouchEvent) => {
    if (e.cancelable) e.preventDefault();
  };

  private readonly onWindowBlur = () => {
    this.keys.clear();
    this.pointers.clear();
    this.mode = 'none';
    this.primaryPointerId = null;
    this.clearLongPress();
  };

  private readonly onKeyDown = (e: KeyboardEvent) => {
    if (isEditableElement(e.target)) return;
    this.keys.add(e.code);
    this.hooks.onKeyDown?.(e);
  };

  private readonly onKeyUp = (e: KeyboardEvent) => {
    this.keys.delete(e.code);
  };

  private readonly onContextMenu = (e: MouseEvent) => {
    e.preventDefault();
  };

  private readonly onPointerDown = (e: PointerEvent) => {
    if (e.pointerType === 'touch') {
      e.preventDefault();
    }
    this.domElement.setPointerCapture?.(e.pointerId);

    const tracked: TrackedPointer = {
      id: e.pointerId,
      x: e.clientX,
      y: e.clientY,
      startX: e.clientX,
      startY: e.clientY,
      button: e.button,
      pointerType: e.pointerType,
    };
    this.pointers.set(e.pointerId, tracked);

    // 2+ pointers -> multi-touch camera gesture (pinch zoom + twist rotate + vertical tilt)
    if (this.pointers.size >= 2) {
      this.clearLongPress();
      if (this.mode === 'tool') {
        this.hooks.onToolCancel?.();
      }
      this.mode = 'multitouch';
      this.primaryPointerId = null;
      this.initMultiTouch();
      return;
    }

    this.primaryPointerId = e.pointerId;
    this.maxTravel = 0;
    this.longPressFired = false;
    this.clearLongPress();

    const spaceHeld = this.keys.has('Space');
    const toolActive = this.hooks.isToolActive();

    if (e.button === 2) {
      // Right button: orbit on drag, cancel tool on short click
      this.mode = 'orbit';
    } else if (e.button === 1) {
      // Middle button: always pan
      this.mode = 'pan';
    } else if (e.button === 0) {
      if (e.shiftKey && e.pointerType === 'mouse' && !toolActive) {
        this.mode = 'orbit';
      } else if (!toolActive || spaceHeld || e.altKey) {
        this.mode = 'pan';
        // Long-press on touch for inspecting building info
        if (e.pointerType === 'touch') {
          const lx = e.clientX;
          const ly = e.clientY;
          this.longPressTimer = setTimeout(() => {
            if (this.mode === 'pan' && this.maxTravel < 10 && this.pointers.size === 1) {
              this.longPressFired = true;
              this.hooks.onLongPress?.(lx, ly);
            }
          }, 460);
        }
      } else {
        this.mode = 'tool';
        this.hooks.onToolDown?.(e.clientX, e.clientY, e.pointerType);
      }
    }
  };

  private readonly onPointerMove = (e: PointerEvent) => {
    const tracked = this.pointers.get(e.pointerId);

    // Mouse hover with no buttons pressed
    if (!tracked) {
      if (e.pointerType === 'mouse' && e.buttons === 0) {
        const rect = this.domElement.getBoundingClientRect();
        if (
          e.clientX >= rect.left &&
          e.clientX <= rect.right &&
          e.clientY >= rect.top &&
          e.clientY <= rect.bottom
        ) {
          this.hooks.onHover?.(e.clientX, e.clientY);
        }
      }
      return;
    }

    const dx = e.clientX - tracked.x;
    const dy = e.clientY - tracked.y;
    tracked.x = e.clientX;
    tracked.y = e.clientY;

    const travel = Math.hypot(e.clientX - tracked.startX, e.clientY - tracked.startY);
    if (travel > this.maxTravel) {
      this.maxTravel = travel;
      if (this.maxTravel > 10) {
        this.clearLongPress();
      }
    }

    if (this.mode === 'multitouch' && this.pointers.size >= 2) {
      const list = Array.from(this.pointers.values());
      const a = list[0];
      const b = list[1];
      const dist = Math.max(10, Math.hypot(b.x - a.x, b.y - a.y));
      const angle = Math.atan2(b.y - a.y, b.x - a.x);
      const midX = (a.x + b.x) * 0.5;
      const midY = (a.y + b.y) * 0.5;

      // 1. Pinch zoom
      const ratio = this.lastPinchDist / dist;
      if (Number.isFinite(ratio) && ratio > 0.5 && ratio < 2.0) {
        this.distance *= ratio;
      }

      // 2. Twist rotate (shortest angle delta)
      let dAngle = angle - this.lastPinchAngle;
      while (dAngle > Math.PI) dAngle -= Math.PI * 2;
      while (dAngle < -Math.PI) dAngle += Math.PI * 2;
      if (Math.abs(dAngle) < 0.6) {
        this.yaw -= dAngle * 1.1;
      }

      // 3. Two-finger vertical drag -> pitch tilt; horizontal drag -> gentle pan
      const midDx = midX - this.lastMidX;
      const midDy = midY - this.lastMidY;
      this.pitch += midDy * 0.0045;
      this.panByScreenDelta(midDx * 0.65, 0);

      this.lastPinchDist = dist;
      this.lastPinchAngle = angle;
      this.lastMidX = midX;
      this.lastMidY = midY;
      this.syncCamera();
      return;
    }

    if (e.pointerId !== this.primaryPointerId) return;

    if (this.mode === 'orbit') {
      this.yaw -= dx * 0.0065;
      this.pitch += dy * 0.0055;
      this.syncCamera();
    } else if (this.mode === 'pan') {
      if (this.maxTravel > 4) {
        this.panByScreenDelta(dx, dy);
        this.syncCamera();
      }
    } else if (this.mode === 'tool') {
      this.hooks.onToolMove?.(e.clientX, e.clientY, tracked.pointerType);
    }
  };

  private readonly onPointerUp = (e: PointerEvent) => {
    const tracked = this.pointers.get(e.pointerId);
    if (!tracked) return;

    this.pointers.delete(e.pointerId);
    this.clearLongPress();

    if (this.mode === 'multitouch') {
      if (this.pointers.size < 2) {
        this.mode = 'none';
        this.primaryPointerId = null;
      } else {
        this.initMultiTouch();
      }
      return;
    }

    if (e.pointerId === this.primaryPointerId) {
      const wasShortClick = this.maxTravel <= 7;
      const prevMode = this.mode;
      this.mode = 'none';
      this.primaryPointerId = null;

      if (prevMode === 'orbit' && tracked.button === 2 && wasShortClick) {
        this.hooks.onRightClick?.();
      } else if (prevMode === 'pan' && tracked.button === 0 && wasShortClick && !this.longPressFired) {
        this.hooks.onTapSelect?.(e.clientX, e.clientY);
      } else if (prevMode === 'tool') {
        this.hooks.onToolUp?.(e.clientX, e.clientY, tracked.pointerType, this.maxTravel > 16);
      }
    }
  };

  private readonly onWheel = (e: WheelEvent) => {
    e.preventDefault();
    const factor = e.deltaY > 0 ? 1.11 : 0.9;

    // Zoom to cursor: keep ground point under mouse pointer anchored
    const hasBefore = this.intersectGroundAtClient(e.clientX, e.clientY, this.tmpHitA);
    this.distance *= factor;
    this.syncCamera();

    if (hasBefore) {
      const hasAfter = this.intersectGroundAtClient(e.clientX, e.clientY, this.tmpHitB);
      if (hasAfter) {
        const shiftX = this.tmpHitA.x - this.tmpHitB.x;
        const shiftZ = this.tmpHitA.z - this.tmpHitB.z;
        // Clamp extreme horizon shifts
        if (Math.hypot(shiftX, shiftZ) < this.distance * 0.8) {
          this.target.x += shiftX;
          this.target.z += shiftZ;
          this.syncCamera();
        }
      }
    }
  };

  dispose(): void {
    this.clearLongPress();
    window.removeEventListener('keydown', this.onKeyDown);
    window.removeEventListener('keyup', this.onKeyUp);
    window.removeEventListener('blur', this.onWindowBlur);
    this.domElement.removeEventListener('pointerdown', this.onPointerDown);
    window.removeEventListener('pointermove', this.onPointerMove);
    window.removeEventListener('pointerup', this.onPointerUp);
    window.removeEventListener('pointercancel', this.onPointerUp);
    this.domElement.removeEventListener('wheel', this.onWheel);
    this.domElement.removeEventListener('contextmenu', this.onContextMenu);
    this.domElement.removeEventListener('touchstart', this.preventTouchDefault);
    this.domElement.removeEventListener('touchmove', this.preventTouchDefault);
  }
}
