import * as THREE from 'three';
import { TiltShiftBloomPipeline, type PostProcessParams } from './postprocess.ts';
import type { QualityProfile } from './quality.ts';

export interface LightingMood {
  zenith: THREE.Color;
  horizon: THREE.Color;
  sunColor: THREE.Color;
  sunIntensity: number;
  sunPos: THREE.Vector3;
  sunDir: THREE.Vector3;
  hemiSky: THREE.Color;
  hemiGround: THREE.Color;
  hemiIntensity: number;
  exposure: number;
  emissiveStrength: number; // 0 = day, 1 = night
  isNight: boolean;
}

interface PhaseKeyframe {
  hour: number;
  zenith: string;
  horizon: string;
  sunColor: string;
  sunIntensity: number;
  sunAzimuthDeg: number;
  sunElevationDeg: number;
  hemiSky: string;
  hemiGround: string;
  hemiIntensity: number;
  exposure: number;
  emissive: number;
}

// Harmonized warm coastal miniature lighting schedule (grounded, natural atmosphere)
const PHASE_KEYFRAMES: PhaseKeyframe[] = [
  {
    hour: 0.0,
    zenith: '#091022',
    horizon: '#182542',
    sunColor: '#8FB2E4',
    sunIntensity: 0.36,
    sunAzimuthDeg: 35,
    sunElevationDeg: 36,
    hemiSky: '#2A406E',
    hemiGround: '#101520',
    hemiIntensity: 0.28,
    exposure: 0.96,
    emissive: 1.0,
  },
  {
    hour: 5.0,
    zenith: '#091022',
    horizon: '#182542',
    sunColor: '#8FB2E4',
    sunIntensity: 0.36,
    sunAzimuthDeg: 55,
    sunElevationDeg: 32,
    hemiSky: '#2A406E',
    hemiGround: '#101520',
    hemiIntensity: 0.28,
    exposure: 0.96,
    emissive: 1.0,
  },
  {
    hour: 6.5,
    zenith: '#6588BD',
    horizon: '#F3C7A3',
    sunColor: '#FFB87E',
    sunIntensity: 1.95,
    sunAzimuthDeg: 85,
    sunElevationDeg: 18,
    hemiSky: '#A3BDE0',
    hemiGround: '#82776B',
    hemiIntensity: 0.72,
    exposure: 1.02,
    emissive: 0.28,
  },
  {
    hour: 9.5,
    zenith: '#4A8FD2',
    horizon: '#D2E5F2',
    sunColor: '#FFEBC8',
    sunIntensity: 2.68,
    sunAzimuthDeg: 136,
    sunElevationDeg: 36,
    hemiSky: '#AFD4F6',
    hemiGround: '#9B8F74',
    hemiIntensity: 0.88,
    exposure: 1.03,
    emissive: 0.0,
  },
  {
    hour: 15.5,
    zenith: '#4A8FD2',
    horizon: '#D2E5F2',
    sunColor: '#FFE9C2',
    sunIntensity: 2.68,
    sunAzimuthDeg: 224,
    sunElevationDeg: 37,
    hemiSky: '#AFD4F6',
    hemiGround: '#9B8F74',
    hemiIntensity: 0.88,
    exposure: 1.03,
    emissive: 0.0,
  },
  {
    hour: 18.2,
    zenith: '#495E9B',
    horizon: '#E5B29A',
    sunColor: '#FFB378',
    sunIntensity: 2.25,
    sunAzimuthDeg: 268,
    sunElevationDeg: 18,
    hemiSky: '#A4A6D2',
    hemiGround: '#7A685E',
    hemiIntensity: 0.74,
    exposure: 1.02,
    emissive: 0.68,
  },
  {
    hour: 20.2,
    zenith: '#091022',
    horizon: '#182542',
    sunColor: '#8FB2E4',
    sunIntensity: 0.36,
    sunAzimuthDeg: 315,
    sunElevationDeg: 36,
    hemiSky: '#2A406E',
    hemiGround: '#101520',
    hemiIntensity: 0.28,
    exposure: 0.96,
    emissive: 1.0,
  },
  {
    hour: 24.0,
    zenith: '#091022',
    horizon: '#182542',
    sunColor: '#8FB2E4',
    sunIntensity: 0.36,
    sunAzimuthDeg: 395,
    sunElevationDeg: 36,
    hemiSky: '#2A406E',
    hemiGround: '#101520',
    hemiIntensity: 0.28,
    exposure: 0.96,
    emissive: 1.0,
  },
];

function createAtmosphericSkyDome(): {
  mesh: THREE.Mesh;
  uniforms: {
    uZenith: { value: THREE.Color };
    uHorizon: { value: THREE.Color };
    uSunDir: { value: THREE.Vector3 };
    uSunColor: { value: THREE.Color };
    uNightFactor: { value: number };
    uTime: { value: number };
  };
} {
  const geo = new THREE.SphereGeometry(2500, 32, 20);
  const uniforms = {
    uZenith: { value: new THREE.Color('#4C92D4') },
    uHorizon: { value: new THREE.Color('#CEE3F2') },
    uSunDir: { value: new THREE.Vector3(0.4, 0.7, 0.5).normalize() },
    uSunColor: { value: new THREE.Color('#FFF3DC') },
    uNightFactor: { value: 0.0 },
    uTime: { value: 0.0 },
  };

  const mat = new THREE.ShaderMaterial({
    side: THREE.BackSide,
    depthWrite: false,
    fog: false,
    uniforms,
    vertexShader: /* glsl */ `
      varying vec3 vDir;
      void main() {
        vDir = normalize(position);
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }
    `,
    fragmentShader: /* glsl */ `
      uniform vec3 uZenith;
      uniform vec3 uHorizon;
      uniform vec3 uSunDir;
      uniform vec3 uSunColor;
      uniform float uNightFactor;
      uniform float uTime;
      varying vec3 vDir;

      float hash21(vec2 p) {
        p = fract(p * vec2(234.34, 435.345));
        p += dot(p, p + 34.23);
        return fract(p.x * p.y);
      }

      float noise2(vec2 p) {
        vec2 i = floor(p);
        vec2 f = fract(p);
        vec2 u = f * f * (3.0 - 2.0 * f);
        return mix(
          mix(hash21(i), hash21(i + vec2(1.0, 0.0)), u.x),
          mix(hash21(i + vec2(0.0, 1.0)), hash21(i + vec2(1.0, 1.0)), u.x),
          u.y
        );
      }

      void main() {
        vec3 d = normalize(vDir);
        float h = clamp(d.y, 0.0, 1.0);
        vec3 col = mix(uHorizon, uZenith, pow(h, 0.62));

        // Subtle warm coastal glow band right above the horizon
        float horizGlow = exp(-abs(d.y) * 9.0);
        vec3 warmBand = mix(vec3(0.95, 0.92, 0.85), vec3(0.28, 0.22, 0.34), uNightFactor);
        col = mix(col, warmBand, horizGlow * mix(0.22, 0.30, uNightFactor));

        // Soft Mie scattering around sun / moon
        float sunDot = max(dot(d, normalize(uSunDir)), 0.0);
        col += uSunColor * pow(sunDot, 12.0) * mix(0.22, 0.08, uNightFactor);
        col += uSunColor * pow(sunDot, 220.0) * mix(0.65, 0.22, uNightFactor);

        // Soft high-altitude wispy clouds by day/dusk
        if (d.y > 0.03) {
          vec2 cloudUv = d.xz / (d.y + 0.24) * 1.45 + vec2(uTime * 0.004, 0.0);
          float c = noise2(cloudUv) * 0.65 + noise2(cloudUv * 2.3 + 4.1) * 0.35;
          float cloudMask = smoothstep(0.56, 0.82, c) * smoothstep(0.03, 0.22, d.y) * (1.0 - uNightFactor * 0.78);
          vec3 cloudCol = mix(vec3(0.96, 0.97, 0.99), vec3(0.24, 0.32, 0.48), uNightFactor);
          col = mix(col, cloudCol, cloudMask * 0.38);
        }

        // Crisp subtle stars in the upper night sky
        if (uNightFactor > 0.25 && d.y > 0.08) {
          vec2 starGrid = floor((d.xz / (d.y + 0.45)) * 180.0);
          float s = hash21(starGrid);
          float star = smoothstep(0.993, 0.999, s) * smoothstep(0.08, 0.32, d.y) * uNightFactor;
          col += vec3(0.85, 0.92, 1.0) * star * 1.15;
        }

        gl_FragColor = vec4(col, 1.0);
        #include <colorspace_fragment>
      }
    `,
  });

  const mesh = new THREE.Mesh(geo, mat);
  mesh.renderOrder = -100;
  mesh.frustumCulled = false;
  return { mesh, uniforms };
}

export class SceneRenderer {
  readonly renderer: THREE.WebGLRenderer;
  readonly scene: THREE.Scene;
  readonly sunLight: THREE.DirectionalLight;
  readonly fillLight: THREE.DirectionalLight;
  readonly hemiLight: THREE.HemisphereLight;
  readonly fog: THREE.Fog;
  readonly mood: LightingMood;

  private quality: QualityProfile;
  private postProcess: TiltShiftBloomPipeline | null = null;
  private envRT: THREE.WebGLRenderTarget | null = null;
  private postParams: PostProcessParams = {
    exposure: 1.04,
    tiltShiftStrength: 0.85,
    focusY: 0.48,
    focusBand: 0.14,
    bloomIntensity: 0.14,
    bloomThreshold: 0.92,
    saturation: 1.06,
    vignetteStrength: 0.16,
  };
  private readonly sky: ReturnType<typeof createAtmosphericSkyDome>;
  private readonly container: HTMLElement;
  private rafId: number | null = null;
  private lastTime = 0;
  private lastAppliedHour = -1;
  private elapsed = 0;

  private readonly tmpA = new THREE.Color();
  private readonly tmpB = new THREE.Color();
  private readonly shadowCenter = new THREE.Vector3(205, 0, 80);

  constructor(container: HTMLElement, quality: QualityProfile) {
    this.container = container;
    this.quality = quality;

    const initW = container.clientWidth || window.innerWidth;
    const initH = container.clientHeight || window.innerHeight;

    // Mandatory WebGL2 renderer (reliable on both GPU and headless Chrome SwiftShader)
    this.renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: false,
      powerPreference: 'high-performance',
    });
    const dpr = Math.min(window.devicePixelRatio || 1, quality.pixelRatioCap);
    this.renderer.setPixelRatio(dpr);
    this.renderer.setSize(initW, initH);
    this.renderer.outputColorSpace = THREE.SRGBColorSpace;
    this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
    this.renderer.toneMappingExposure = 1.04;
    this.renderer.shadowMap.enabled = true;
    this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;

    const canvas = this.renderer.domElement;
    canvas.style.display = 'block';
    canvas.style.width = '100%';
    canvas.style.height = '100%';
    container.appendChild(canvas);

    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color('#CEE3F2');

    // Atmospheric coastal haze starting gently past city core so town stays crisp while ridges fade softly
    this.fog = new THREE.Fog('#CFE4F2', 680, 2250);
    this.scene.fog = this.fog;

    this.sky = createAtmosphericSkyDome();
    this.scene.add(this.sky.mesh);

    // Lightweight procedural coastal sky PMREM environment so glass curtain walls & metal glint naturally
    this.buildProceduralEnvMap();

    // Primary Sun / Moon directional light with soft miniature diorama shadows
    this.sunLight = new THREE.DirectionalLight('#FFF3DC', 2.38);
    this.sunLight.position.set(220, 440, 310);
    this.sunLight.target.position.set(205, 0, 80);
    this.sunLight.castShadow = true;
    this.sunLight.shadow.mapSize.set(quality.shadowMapSize, quality.shadowMapSize);
    this.sunLight.shadow.camera.near = 60;
    this.sunLight.shadow.camera.far = 1480;
    const shadowBound = 460;
    this.sunLight.shadow.camera.left = -shadowBound;
    this.sunLight.shadow.camera.right = shadowBound;
    this.sunLight.shadow.camera.top = shadowBound;
    this.sunLight.shadow.camera.bottom = -shadowBound;
    this.sunLight.shadow.bias = -0.00045;
    this.sunLight.shadow.normalBias = 0.045;
    this.scene.add(this.sunLight);
    this.scene.add(this.sunLight.target);

    // Cool sky bounce fill from opposite azimuth so shadow sides stay airy & miniature
    this.fillLight = new THREE.DirectionalLight('#B8DAFA', 0.56);
    this.fillLight.position.set(-280, 210, -240);
    this.scene.add(this.fillLight);

    // Hemisphere ambient sky/ground light (contributes soft AO separation between ground & sky)
    this.hemiLight = new THREE.HemisphereLight('#B8DBFA', '#928D7B', 0.96);
    this.scene.add(this.hemiLight);

    this.mood = {
      zenith: new THREE.Color('#4C92D4'),
      horizon: new THREE.Color('#CEE3F2'),
      sunColor: new THREE.Color('#FFF3DC'),
      sunIntensity: 2.38,
      sunPos: new THREE.Vector3(220, 440, 310),
      sunDir: new THREE.Vector3(0.32, 0.72, 0.56).normalize(),
      hemiSky: new THREE.Color('#B2D5F6'),
      hemiGround: new THREE.Color('#8A8675'),
      hemiIntensity: 0.86,
      exposure: 1.04,
      emissiveStrength: 0,
      isNight: false,
    };

    // Initialize WebGL2 tilt-shift + bloom post-process pipeline (with safe direct fallback)
    this.postProcess = new TiltShiftBloomPipeline(
      this.renderer,
      Math.round(initW * dpr),
      Math.round(initH * dpr),
      quality
    );

    this.applyTimeOfDay(10.5);
  }

  private buildProceduralEnvMap(): void {
    try {
      const pmrem = new THREE.PMREMGenerator(this.renderer);
      const envScene = new THREE.Scene();
      const domeGeo = new THREE.SphereGeometry(20, 16, 12);
      const pos = domeGeo.attributes.position as THREE.BufferAttribute;
      const cols = new Float32Array(pos.count * 3);
      const cTop = new THREE.Color('#66AEEB');
      const cMid = new THREE.Color('#E3F1FA');
      const cBot = new THREE.Color('#7C8A6D');
      const tmp = new THREE.Color();
      for (let i = 0; i < pos.count; i++) {
        const y = pos.getY(i) / 20;
        if (y >= 0) {
          tmp.copy(cMid).lerp(cTop, Math.pow(y, 0.7));
        } else {
          tmp.copy(cMid).lerp(cBot, Math.min(1, -y * 1.4));
        }
        cols[i * 3] = tmp.r;
        cols[i * 3 + 1] = tmp.g;
        cols[i * 3 + 2] = tmp.b;
      }
      domeGeo.setAttribute('color', new THREE.BufferAttribute(cols, 3));
      const domeMat = new THREE.MeshBasicMaterial({ vertexColors: true, side: THREE.BackSide });
      const dome = new THREE.Mesh(domeGeo, domeMat);
      envScene.add(dome);

      // Subtle warm sun highlight patch in the environment map
      const sunDisc = new THREE.Mesh(
        new THREE.SphereGeometry(3.2, 8, 8),
        new THREE.MeshBasicMaterial({ color: '#FFF5E0' })
      );
      sunDisc.position.set(8, 12, 10);
      envScene.add(sunDisc);

      this.envRT = pmrem.fromScene(envScene, 0.04);
      this.scene.environment = this.envRT.texture;
      this.scene.environmentIntensity = 0.72;

      domeGeo.dispose();
      domeMat.dispose();
      sunDisc.geometry.dispose();
      (sunDisc.material as THREE.Material).dispose();
      pmrem.dispose();
    } catch {
      this.scene.environment = null;
    }
  }

  getQuality(): QualityProfile {
    return this.quality;
  }

  isPostProcessActive(): boolean {
    return Boolean(this.postProcess?.active);
  }

  setQuality(quality: QualityProfile): void {
    this.quality = quality;
    const dpr = Math.min(window.devicePixelRatio || 1, quality.pixelRatioCap);
    const w = this.container.clientWidth || window.innerWidth;
    const h = this.container.clientHeight || window.innerHeight;
    this.renderer.setPixelRatio(dpr);
    this.renderer.setSize(w, h);
    this.postProcess?.setMode(quality.postProcessMode);
    this.postProcess?.resize(Math.round(w * dpr), Math.round(h * dpr));
  }

  /**
   * Adjusts tilt-shift miniature depth-of-field strength smoothly from camera zoom & pitch:
   * stronger dreamy diorama blur at aerial overview, gentler cinematic depth at street cam.
   */
  updateCameraVisuals(target: THREE.Vector3, distance: number, pitch: number): void {
    // Center directional shadow frustum smoothly around camera target (snapped to avoid jitter)
    const snap = 16;
    this.shadowCenter.set(
      Math.round(target.x / snap) * snap,
      0,
      Math.round(target.z / snap) * snap
    );
    const bound = Math.max(240, Math.min(520, distance * 0.92));
    if (Math.abs(this.sunLight.shadow.camera.right - bound) > 25) {
      this.sunLight.shadow.camera.left = -bound;
      this.sunLight.shadow.camera.right = bound;
      this.sunLight.shadow.camera.top = bound;
      this.sunLight.shadow.camera.bottom = -bound;
      this.sunLight.shadow.camera.updateProjectionMatrix();
    }
    this.sunLight.target.position.copy(this.shadowCenter);
    this.sunLight.position.copy(this.shadowCenter).addScaledVector(this.mood.sunDir, 620);

    // Tilt-shift strength scales up as camera pulls back & pitches into diorama angle
    const distT = Math.max(0, Math.min(1, (distance - 140) / 340));
    const pitchT = Math.max(0, Math.min(1, (pitch - 0.16) / 0.42));
    const dioramaFactor = Math.max(0.28, distT * 0.65 + pitchT * 0.35);

    this.postParams.tiltShiftStrength = 0.24 + dioramaFactor * 0.68; // ~0.34 street, ~0.88 overview
    this.postParams.focusBand = 0.25 - dioramaFactor * 0.11; // wider sharp zone at street, tighter diorama band at overview
    this.postParams.focusY = pitch < 0.3 ? 0.44 : 0.49;
  }

  applyTimeOfDay(hoursRaw: number): LightingMood {
    const h = ((hoursRaw % 24) + 24) % 24;
    if (Math.abs(h - this.lastAppliedHour) < 0.002) {
      return this.mood;
    }
    this.lastAppliedHour = h;

    let k0 = PHASE_KEYFRAMES[0];
    let k1 = PHASE_KEYFRAMES[PHASE_KEYFRAMES.length - 1];
    for (let i = 0; i < PHASE_KEYFRAMES.length - 1; i++) {
      if (h >= PHASE_KEYFRAMES[i].hour && h <= PHASE_KEYFRAMES[i + 1].hour) {
        k0 = PHASE_KEYFRAMES[i];
        k1 = PHASE_KEYFRAMES[i + 1];
        break;
      }
    }
    const span = Math.max(1e-4, k1.hour - k0.hour);
    const t = Math.max(0, Math.min(1, (h - k0.hour) / span));
    const s = t * t * (3 - 2 * t);

    const lerpColor = (c0: string, c1: string, out: THREE.Color) => {
      this.tmpA.set(c0);
      this.tmpB.set(c1);
      out.copy(this.tmpA).lerp(this.tmpB, s);
    };

    lerpColor(k0.zenith, k1.zenith, this.mood.zenith);
    lerpColor(k0.horizon, k1.horizon, this.mood.horizon);
    lerpColor(k0.sunColor, k1.sunColor, this.mood.sunColor);
    lerpColor(k0.hemiSky, k1.hemiSky, this.mood.hemiSky);
    lerpColor(k0.hemiGround, k1.hemiGround, this.mood.hemiGround);

    this.mood.sunIntensity = k0.sunIntensity + (k1.sunIntensity - k0.sunIntensity) * s;
    this.mood.hemiIntensity = k0.hemiIntensity + (k1.hemiIntensity - k0.hemiIntensity) * s;
    this.mood.exposure = k0.exposure + (k1.exposure - k0.exposure) * s;
    this.mood.emissiveStrength = k0.emissive + (k1.emissive - k0.emissive) * s;
    this.mood.isNight = this.mood.emissiveStrength > 0.55;

    const az = ((k0.sunAzimuthDeg + (k1.sunAzimuthDeg - k0.sunAzimuthDeg) * s) * Math.PI) / 180;
    const el = ((k0.sunElevationDeg + (k1.sunElevationDeg - k0.sunElevationDeg) * s) * Math.PI) / 180;
    this.mood.sunDir
      .set(Math.cos(el) * Math.sin(az), Math.max(0.2, Math.sin(el)), Math.cos(el) * Math.cos(az))
      .normalize();

    this.mood.sunPos.copy(this.shadowCenter).addScaledVector(this.mood.sunDir, 620);

    this.sunLight.position.copy(this.mood.sunPos);
    this.sunLight.color.copy(this.mood.sunColor);
    this.sunLight.intensity = this.mood.sunIntensity;

    this.fillLight.intensity = this.mood.isNight ? 0.14 : 0.38;
    this.fillLight.color.set(this.mood.isNight ? '#345288' : '#B4D4F2');

    this.hemiLight.color.copy(this.mood.hemiSky);
    this.hemiLight.groundColor.copy(this.mood.hemiGround);
    this.hemiLight.intensity = this.mood.hemiIntensity;

    if (this.scene.environment) {
      this.scene.environmentIntensity = 0.48 * (1.0 - this.mood.emissiveStrength * 0.78);
    }

    this.scene.background = this.mood.horizon;
    this.fog.color.copy(this.mood.horizon);
    this.fog.near = this.mood.isNight ? 500 : 720;
    this.fog.far = this.mood.isNight ? 1820 : 2350;

    this.renderer.toneMappingExposure = this.mood.exposure;

    // Update atmospheric sky dome uniforms
    this.sky.uniforms.uZenith.value.copy(this.mood.zenith);
    this.sky.uniforms.uHorizon.value.copy(this.mood.horizon);
    this.sky.uniforms.uSunDir.value.copy(this.mood.sunDir);
    this.sky.uniforms.uSunColor.value.copy(this.mood.sunColor);
    this.sky.uniforms.uNightFactor.value = this.mood.emissiveStrength;

    // Crisp daytime (minimal bloom) + luminous night bloom on windows, streetlamps & traffic
    const em = this.mood.emissiveStrength;
    this.postParams.exposure = this.mood.exposure;
    this.postParams.bloomIntensity = this.quality.bloomEnabled ? 0.02 + em * 0.8 : 0.0;
    this.postParams.bloomThreshold = 1.12 - em * 0.34;
    this.postParams.saturation = 1.08 - em * 0.02;
    this.postParams.vignetteStrength = 0.14 + em * 0.09;

    return this.mood;
  }

  resize(camera: THREE.PerspectiveCamera): void {
    const w = this.container.clientWidth || window.innerWidth;
    const h = this.container.clientHeight || window.innerHeight;
    const dpr = Math.min(window.devicePixelRatio || 1, this.quality.pixelRatioCap);
    camera.aspect = w / Math.max(1, h);
    camera.updateProjectionMatrix();
    this.renderer.setPixelRatio(dpr);
    this.renderer.setSize(w, h);
    this.postProcess?.resize(Math.round(w * dpr), Math.round(h * dpr));
  }

  startLoop(onFrame: (dt: number) => void, camera: THREE.PerspectiveCamera): void {
    this.lastTime = performance.now();
    const tick = (now: number) => {
      this.rafId = requestAnimationFrame(tick);
      const dt = Math.min(0.1, Math.max(0.001, (now - this.lastTime) / 1000));
      this.lastTime = now;
      this.elapsed += dt;
      this.sky.uniforms.uTime.value = this.elapsed;

      onFrame(dt);
      this.sky.mesh.position.copy(camera.position);

      const usedPost = this.postProcess?.render(this.renderer, this.scene, camera, this.postParams) ?? false;
      if (!usedPost) {
        this.renderer.render(this.scene, camera);
      }
    };
    this.rafId = requestAnimationFrame(tick);
  }

  dispose(): void {
    if (this.rafId !== null) {
      cancelAnimationFrame(this.rafId);
      this.rafId = null;
    }
    this.envRT?.dispose();
    this.postProcess?.dispose();
    this.renderer.dispose();
  }
}
