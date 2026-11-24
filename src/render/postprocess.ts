import * as THREE from 'three';
import type { QualityProfile } from './quality.ts';

export interface PostProcessParams {
  exposure: number;
  tiltShiftStrength: number; // 0..1 (stronger when zoomed out, milder at street cam)
  focusY: number; // 0..1 screen V focus center (~0.48)
  focusBand: number; // half-width of sharp band (~0.14 overview, ~0.24 street)
  bloomIntensity: number; // subtle by day, stronger on night emissives
  bloomThreshold: number;
  saturation: number;
  vignetteStrength: number;
}

const FULLSCREEN_VERT = /* glsl */ `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = vec4(position.xy, 0.0, 1.0);
  }
`;

// Separable 9-tap Gaussian blur (smooth bokeh for tilt-shift DOF)
const BLUR_FRAG = /* glsl */ `
  uniform sampler2D tInput;
  uniform vec2 uTexelDir;
  varying vec2 vUv;

  void main() {
    vec3 sum = texture2D(tInput, vUv).rgb * 0.204164;
    sum += texture2D(tInput, clamp(vUv + uTexelDir * 1.407333, 0.001, 0.999)).rgb * 0.304005;
    sum += texture2D(tInput, clamp(vUv - uTexelDir * 1.407333, 0.001, 0.999)).rgb * 0.304005;
    sum += texture2D(tInput, clamp(vUv + uTexelDir * 3.294215, 0.001, 0.999)).rgb * 0.093913;
    sum += texture2D(tInput, clamp(vUv - uTexelDir * 3.294215, 0.001, 0.999)).rgb * 0.093913;
    gl_FragColor = vec4(sum, 1.0);
  }
`;

// Soft-knee bright-pass extraction + horizontal blur for tasteful night/dusk bloom
const BRIGHT_BLUR_FRAG = /* glsl */ `
  uniform sampler2D tInput;
  uniform vec2 uTexelDir;
  uniform float uThreshold;
  varying vec2 vUv;

  vec3 sampleBright(vec2 uv) {
    vec3 c = texture2D(tInput, clamp(uv, 0.001, 0.999)).rgb;
    float lum = max(c.r, max(c.g, c.b));
    float knee = 0.25;
    float soft = clamp(lum - uThreshold + knee, 0.0, 2.0 * knee);
    soft = (soft * soft) / (4.0 * knee + 0.0001);
    float contrib = max(soft, lum - uThreshold) / max(lum, 0.0001);
    return c * max(0.0, contrib);
  }

  void main() {
    vec3 sum = sampleBright(vUv) * 0.227027;
    sum += sampleBright(vUv + uTexelDir * 1.384615) * 0.316216;
    sum += sampleBright(vUv - uTexelDir * 1.384615) * 0.316216;
    sum += sampleBright(vUv + uTexelDir * 3.230769) * 0.070270;
    sum += sampleBright(vUv - uTexelDir * 3.230769) * 0.070270;
    gl_FragColor = vec4(sum, 1.0);
  }
`;

const ACES_AND_GRADE_GLSL = /* glsl */ `
  vec3 acesFilm(vec3 x) {
    const float a = 2.51;
    const float b = 0.03;
    const float c = 2.43;
    const float d = 0.59;
    const float e = 0.14;
    return clamp((x * (a * x + b)) / (x * (c * x + d) + e), 0.0, 1.0);
  }

  vec3 linearToSrgb(vec3 c) {
    vec3 lo = c * 12.92;
    vec3 hi = pow(max(c, vec3(0.0)), vec3(1.0 / 2.4)) * 1.055 - 0.055;
    return mix(lo, hi, step(vec3(0.0031308), c));
  }
`;

// Full composite: sharp + silky 2-pass tilt-shift DOF + selective bloom + ACES + grade + vignette
const COMPOSITE_FULL_FRAG = /* glsl */ `
  uniform sampler2D tScene;
  uniform sampler2D tDofBlur;
  uniform sampler2D tBloom;
  uniform float uExposure;
  uniform float uTiltShiftStrength;
  uniform float uFocusY;
  uniform float uFocusBand;
  uniform float uBloomIntensity;
  uniform float uSaturation;
  uniform float uVignette;
  varying vec2 vUv;

  ${ACES_AND_GRADE_GLSL}

  void main() {
    vec3 sharp = texture2D(tScene, vUv).rgb;
    vec3 blurred = texture2D(tDofBlur, vUv).rgb;
    vec3 bloom = texture2D(tBloom, vUv).rgb;

    // Asymmetric tilt-shift miniature focus band: crisp center, soft top & bottom bands
    float dist = abs(vUv.y - uFocusY);
    float edgeEnd = min(0.56, uFocusBand + 0.30);
    float dofMix = smoothstep(uFocusBand, edgeEnd, dist) * uTiltShiftStrength;
    // Slight extra falloff on the very top/bottom corners for miniature lens feel
    vec3 col = mix(sharp, blurred, dofMix);

    // Tasteful selective bloom on emissive windows, streetlights & car lights
    col += bloom * uBloomIntensity;

    // ACES Filmic tone mapping
    col = acesFilm(col * uExposure);

    // Subtle warm-pastel miniature color polish
    float luma = dot(col, vec3(0.2126, 0.7152, 0.0722));
    col = mix(vec3(luma), col, uSaturation);

    // Gentle miniature optical vignette
    vec2 centered = (vUv - 0.5) * vec2(1.0, 0.92);
    float vig = 1.0 - smoothstep(0.38, 0.88, length(centered)) * uVignette;
    col *= vig;

    gl_FragColor = vec4(linearToSrgb(col), 1.0);
  }
`;

// Lite single-pass tilt-shift + inline bright glow + ACES + vignette (for ?quality=low)
const COMPOSITE_LITE_FRAG = /* glsl */ `
  uniform sampler2D tScene;
  uniform vec2 uTexelSize;
  uniform float uExposure;
  uniform float uTiltShiftStrength;
  uniform float uFocusY;
  uniform float uFocusBand;
  uniform float uBloomIntensity;
  uniform float uBloomThreshold;
  uniform float uSaturation;
  uniform float uVignette;
  varying vec2 vUv;

  ${ACES_AND_GRADE_GLSL}

  void main() {
    vec3 sharp = texture2D(tScene, vUv).rgb;
    float dist = abs(vUv.y - uFocusY);
    float edgeEnd = min(0.56, uFocusBand + 0.30);
    float dofMix = smoothstep(uFocusBand, edgeEnd, dist) * uTiltShiftStrength;

    vec3 col = sharp;
    if (dofMix > 0.01) {
      float rad = 2.6 * dofMix;
      vec2 stepX = vec2(uTexelSize.x * rad, 0.0);
      vec2 stepY = vec2(0.0, uTexelSize.y * rad);
      vec3 acc = sharp * 0.22;
      acc += texture2D(tScene, clamp(vUv + stepX, 0.001, 0.999)).rgb * 0.13;
      acc += texture2D(tScene, clamp(vUv - stepX, 0.001, 0.999)).rgb * 0.13;
      acc += texture2D(tScene, clamp(vUv + stepY, 0.001, 0.999)).rgb * 0.13;
      acc += texture2D(tScene, clamp(vUv - stepY, 0.001, 0.999)).rgb * 0.13;
      acc += texture2D(tScene, clamp(vUv + stepX + stepY, 0.001, 0.999)).rgb * 0.065;
      acc += texture2D(tScene, clamp(vUv - stepX + stepY, 0.001, 0.999)).rgb * 0.065;
      acc += texture2D(tScene, clamp(vUv + stepX - stepY, 0.001, 0.999)).rgb * 0.065;
      acc += texture2D(tScene, clamp(vUv - stepX - stepY, 0.001, 0.999)).rgb * 0.065;
      col = mix(sharp, acc, dofMix);
    }

    // Cheap inline bloom tap for night lights
    if (uBloomIntensity > 0.02) {
      vec2 bStep = uTexelSize * 3.5;
      vec3 bAcc = vec3(0.0);
      vec3 s1 = texture2D(tScene, clamp(vUv + vec2(bStep.x, 0.0), 0.001, 0.999)).rgb;
      vec3 s2 = texture2D(tScene, clamp(vUv - vec2(bStep.x, 0.0), 0.001, 0.999)).rgb;
      vec3 s3 = texture2D(tScene, clamp(vUv + vec2(0.0, bStep.y), 0.001, 0.999)).rgb;
      vec3 s4 = texture2D(tScene, clamp(vUv - vec2(0.0, bStep.y), 0.001, 0.999)).rgb;
      bAcc += max(s1 - uBloomThreshold, 0.0);
      bAcc += max(s2 - uBloomThreshold, 0.0);
      bAcc += max(s3 - uBloomThreshold, 0.0);
      bAcc += max(s4 - uBloomThreshold, 0.0);
      col += bAcc * 0.25 * uBloomIntensity;
    }

    col = acesFilm(col * uExposure);
    float luma = dot(col, vec3(0.2126, 0.7152, 0.0722));
    col = mix(vec3(luma), col, uSaturation);
    vec2 centered = (vUv - 0.5) * vec2(1.0, 0.92);
    float vig = 1.0 - smoothstep(0.38, 0.88, length(centered)) * uVignette;
    col *= vig;

    gl_FragColor = vec4(linearToSrgb(col), 1.0);
  }
`;

export class TiltShiftBloomPipeline {
  readonly active: boolean;
  readonly isHDR: boolean;
  private mode: 'lite' | 'full';

  private readonly quadScene: THREE.Scene;
  private readonly quadCam: THREE.OrthographicCamera;
  private readonly quadMesh: THREE.Mesh;

  private sceneRT: THREE.WebGLRenderTarget | null = null;
  private dofA: THREE.WebGLRenderTarget | null = null;
  private dofB: THREE.WebGLRenderTarget | null = null;
  private bloomA: THREE.WebGLRenderTarget | null = null;
  private bloomB: THREE.WebGLRenderTarget | null = null;

  private readonly blurMat: THREE.ShaderMaterial;
  private readonly brightBlurMat: THREE.ShaderMaterial;
  private readonly compositeFullMat: THREE.ShaderMaterial;
  private readonly compositeLiteMat: THREE.ShaderMaterial;

  private width = 1;
  private height = 1;
  private rtType: THREE.TextureDataType = THREE.UnsignedByteType;

  constructor(renderer: THREE.WebGLRenderer, width: number, height: number, quality: QualityProfile) {
    this.mode = quality.postProcessMode;
    this.quadScene = new THREE.Scene();
    this.quadCam = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);

    const quadGeo = new THREE.PlaneGeometry(2, 2);
    this.blurMat = new THREE.ShaderMaterial({
      vertexShader: FULLSCREEN_VERT,
      fragmentShader: BLUR_FRAG,
      depthTest: false,
      depthWrite: false,
      uniforms: {
        tInput: { value: null },
        uTexelDir: { value: new THREE.Vector2(1 / 512, 0) },
      },
    });

    this.brightBlurMat = new THREE.ShaderMaterial({
      vertexShader: FULLSCREEN_VERT,
      fragmentShader: BRIGHT_BLUR_FRAG,
      depthTest: false,
      depthWrite: false,
      uniforms: {
        tInput: { value: null },
        uTexelDir: { value: new THREE.Vector2(1 / 256, 0) },
        uThreshold: { value: 0.92 },
      },
    });

    this.compositeFullMat = new THREE.ShaderMaterial({
      vertexShader: FULLSCREEN_VERT,
      fragmentShader: COMPOSITE_FULL_FRAG,
      depthTest: false,
      depthWrite: false,
      uniforms: {
        tScene: { value: null },
        tDofBlur: { value: null },
        tBloom: { value: null },
        uExposure: { value: 1.04 },
        uTiltShiftStrength: { value: 0.85 },
        uFocusY: { value: 0.48 },
        uFocusBand: { value: 0.14 },
        uBloomIntensity: { value: 0.3 },
        uSaturation: { value: 1.05 },
        uVignette: { value: 0.16 },
      },
    });

    this.compositeLiteMat = new THREE.ShaderMaterial({
      vertexShader: FULLSCREEN_VERT,
      fragmentShader: COMPOSITE_LITE_FRAG,
      depthTest: false,
      depthWrite: false,
      uniforms: {
        tScene: { value: null },
        uTexelSize: { value: new THREE.Vector2(1 / 1280, 1 / 720) },
        uExposure: { value: 1.04 },
        uTiltShiftStrength: { value: 0.85 },
        uFocusY: { value: 0.48 },
        uFocusBand: { value: 0.14 },
        uBloomIntensity: { value: 0.3 },
        uBloomThreshold: { value: 0.85 },
        uSaturation: { value: 1.05 },
        uVignette: { value: 0.16 },
      },
    });

    this.quadMesh = new THREE.Mesh(quadGeo, this.compositeFullMat);
    this.quadMesh.frustumCulled = false;
    this.quadScene.add(this.quadMesh);

    // Probe HalfFloat linear FBO support cleanly on WebGL2 / SwiftShader
    this.rtType = this.detectRenderTargetType(renderer);
    this.isHDR = this.rtType === THREE.HalfFloatType;

    let ok = false;
    try {
      this.allocateTargets(Math.max(2, width), Math.max(2, height));
      ok = this.sceneRT !== null;
    } catch {
      ok = false;
    }
    this.active = ok;
  }

  private detectRenderTargetType(renderer: THREE.WebGLRenderer): THREE.TextureDataType {
    try {
      if (!renderer.capabilities.isWebGL2) return THREE.UnsignedByteType;
      const gl = renderer.getContext();
      const hasFloat =
        gl.getExtension('EXT_color_buffer_float') !== null ||
        gl.getExtension('EXT_color_buffer_half_float') !== null;
      if (!hasFloat) return THREE.UnsignedByteType;

      // Verify a tiny HalfFloat framebuffer is actually complete on this driver/SwiftShader
      const testRT = new THREE.WebGLRenderTarget(4, 4, {
        type: THREE.HalfFloatType,
        minFilter: THREE.LinearFilter,
        magFilter: THREE.LinearFilter,
      });
      const prev = renderer.getRenderTarget();
      renderer.setRenderTarget(testRT);
      const status = gl.checkFramebufferStatus(gl.FRAMEBUFFER);
      renderer.setRenderTarget(prev);
      testRT.dispose();
      return status === gl.FRAMEBUFFER_COMPLETE ? THREE.HalfFloatType : THREE.UnsignedByteType;
    } catch {
      return THREE.UnsignedByteType;
    }
  }

  setMode(mode: 'lite' | 'full'): void {
    if (this.mode === mode) return;
    this.mode = mode;
    this.allocateTargets(this.width, this.height);
  }

  resize(width: number, height: number): void {
    const w = Math.max(2, Math.floor(width));
    const h = Math.max(2, Math.floor(height));
    if (w === this.width && h === this.height && this.sceneRT) return;
    this.allocateTargets(w, h);
  }

  private allocateTargets(w: number, h: number): void {
    this.disposeTargets();
    this.width = w;
    this.height = h;

    const commonOpts: THREE.RenderTargetOptions = {
      type: this.rtType,
      minFilter: THREE.LinearFilter,
      magFilter: THREE.LinearFilter,
      format: THREE.RGBAFormat,
      colorSpace: THREE.LinearSRGBColorSpace,
    };

    this.sceneRT = new THREE.WebGLRenderTarget(w, h, {
      ...commonOpts,
      depthBuffer: true,
      stencilBuffer: false,
    });

    if (this.mode === 'full') {
      const halfW = Math.max(2, Math.floor(w * 0.5));
      const halfH = Math.max(2, Math.floor(h * 0.5));
      const quarterW = Math.max(2, Math.floor(w * 0.25));
      const quarterH = Math.max(2, Math.floor(h * 0.25));

      this.dofA = new THREE.WebGLRenderTarget(halfW, halfH, { ...commonOpts, depthBuffer: false });
      this.dofB = new THREE.WebGLRenderTarget(halfW, halfH, { ...commonOpts, depthBuffer: false });
      this.bloomA = new THREE.WebGLRenderTarget(quarterW, quarterH, { ...commonOpts, depthBuffer: false });
      this.bloomB = new THREE.WebGLRenderTarget(quarterW, quarterH, { ...commonOpts, depthBuffer: false });
    }
  }

  render(
    renderer: THREE.WebGLRenderer,
    scene: THREE.Scene,
    camera: THREE.Camera,
    params: PostProcessParams
  ): boolean {
    if (!this.active || !this.sceneRT) return false;

    const prevToneMapping = renderer.toneMapping;
    try {
      // 1. Render main 3D scene in linear color into sceneRT
      renderer.toneMapping = THREE.NoToneMapping;
      renderer.setRenderTarget(this.sceneRT);
      renderer.clear(true, true, false);
      renderer.render(scene, camera);

      const effectiveThresh = this.isHDR
        ? params.bloomThreshold
        : Math.min(0.76, params.bloomThreshold * 0.72);

      if (this.mode === 'full' && this.dofA && this.dofB && this.bloomA && this.bloomB) {
        const hw = this.dofA.width;
        const hh = this.dofA.height;

        // 2. Separable 2-pass blur (2 iterations for silky miniature tilt-shift bokeh!)
        this.quadMesh.material = this.blurMat;
        this.blurMat.uniforms.tInput.value = this.sceneRT.texture;
        this.blurMat.uniforms.uTexelDir.value.set(1.65 / hw, 0);
        renderer.setRenderTarget(this.dofA);
        renderer.render(this.quadScene, this.quadCam);

        this.blurMat.uniforms.tInput.value = this.dofA.texture;
        this.blurMat.uniforms.uTexelDir.value.set(0, 1.65 / hh);
        renderer.setRenderTarget(this.dofB);
        renderer.render(this.quadScene, this.quadCam);

        // Second wider pass for lush optical diorama blur
        this.blurMat.uniforms.tInput.value = this.dofB.texture;
        this.blurMat.uniforms.uTexelDir.value.set(2.35 / hw, 0);
        renderer.setRenderTarget(this.dofA);
        renderer.render(this.quadScene, this.quadCam);

        this.blurMat.uniforms.tInput.value = this.dofA.texture;
        this.blurMat.uniforms.uTexelDir.value.set(0, 2.35 / hh);
        renderer.setRenderTarget(this.dofB);
        renderer.render(this.quadScene, this.quadCam);

        // 3. Quarter-res bright-pass + 2-pass separable bloom
        const qw = this.bloomA.width;
        const qh = this.bloomA.height;
        this.quadMesh.material = this.brightBlurMat;
        this.brightBlurMat.uniforms.tInput.value = this.sceneRT.texture;
        this.brightBlurMat.uniforms.uThreshold.value = effectiveThresh;
        this.brightBlurMat.uniforms.uTexelDir.value.set(1.4 / qw, 0);
        renderer.setRenderTarget(this.bloomA);
        renderer.render(this.quadScene, this.quadCam);

        this.quadMesh.material = this.blurMat;
        this.blurMat.uniforms.tInput.value = this.bloomA.texture;
        this.blurMat.uniforms.uTexelDir.value.set(0, 1.4 / qh);
        renderer.setRenderTarget(this.bloomB);
        renderer.render(this.quadScene, this.quadCam);

        // Second soft bloom spread pass
        this.blurMat.uniforms.tInput.value = this.bloomB.texture;
        this.blurMat.uniforms.uTexelDir.value.set(2.1 / qw, 0);
        renderer.setRenderTarget(this.bloomA);
        renderer.render(this.quadScene, this.quadCam);

        this.blurMat.uniforms.tInput.value = this.bloomA.texture;
        this.blurMat.uniforms.uTexelDir.value.set(0, 2.1 / qh);
        renderer.setRenderTarget(this.bloomB);
        renderer.render(this.quadScene, this.quadCam);

        // 4. Final composite -> screen
        const u = this.compositeFullMat.uniforms;
        u.tScene.value = this.sceneRT.texture;
        u.tDofBlur.value = this.dofB.texture;
        u.tBloom.value = this.bloomB.texture;
        u.uExposure.value = params.exposure;
        u.uTiltShiftStrength.value = params.tiltShiftStrength;
        u.uFocusY.value = params.focusY;
        u.uFocusBand.value = params.focusBand;
        u.uBloomIntensity.value = params.bloomIntensity;
        u.uSaturation.value = params.saturation;
        u.uVignette.value = params.vignetteStrength;

        this.quadMesh.material = this.compositeFullMat;
        renderer.setRenderTarget(null);
        renderer.render(this.quadScene, this.quadCam);
      } else {
        // Lite single-pass tilt-shift + inline bloom composite
        const u = this.compositeLiteMat.uniforms;
        u.tScene.value = this.sceneRT.texture;
        u.uTexelSize.value.set(1 / this.width, 1 / this.height);
        u.uExposure.value = params.exposure;
        u.uTiltShiftStrength.value = params.tiltShiftStrength;
        u.uFocusY.value = params.focusY;
        u.uFocusBand.value = params.focusBand;
        u.uBloomIntensity.value = params.bloomIntensity;
        u.uBloomThreshold.value = effectiveThresh;
        u.uSaturation.value = params.saturation;
        u.uVignette.value = params.vignetteStrength;

        this.quadMesh.material = this.compositeLiteMat;
        renderer.setRenderTarget(null);
        renderer.render(this.quadScene, this.quadCam);
      }

      renderer.toneMapping = prevToneMapping;
      return true;
    } catch {
      renderer.setRenderTarget(null);
      renderer.toneMapping = prevToneMapping;
      return false;
    }
  }

  private disposeTargets(): void {
    this.sceneRT?.dispose();
    this.dofA?.dispose();
    this.dofB?.dispose();
    this.bloomA?.dispose();
    this.bloomB?.dispose();
    this.sceneRT = null;
    this.dofA = null;
    this.dofB = null;
    this.bloomA = null;
    this.bloomB = null;
  }

  dispose(): void {
    this.disposeTargets();
    this.quadMesh.geometry.dispose();
    this.blurMat.dispose();
    this.brightBlurMat.dispose();
    this.compositeFullMat.dispose();
    this.compositeLiteMat.dispose();
  }
}
