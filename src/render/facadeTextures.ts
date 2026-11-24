import * as THREE from 'three';

export interface FacadeTextureSet {
  map: THREE.CanvasTexture;
  emissiveMap: THREE.CanvasTexture;
}

export interface AllFacadeTextures {
  res_low: FacadeTextureSet;
  res_high: FacadeTextureSet;
  com_low: FacadeTextureSet;
  com_high: FacadeTextureSet;
  ind: FacadeTextureSet;
  office: FacadeTextureSet;
  civic: FacadeTextureSet;
  groundAO: THREE.CanvasTexture;
  lampGlow: THREE.CanvasTexture;
  asphalt: THREE.CanvasTexture;
  dispose: () => void;
}

function makeRng(seed: number): () => number {
  let h = seed >>> 0;
  return () => {
    h = (h * 1664525 + 1013904223) >>> 0;
    return h / 4294967296;
  };
}

function finalizeTexture(canvas: HTMLCanvasElement, repeat = true): THREE.CanvasTexture {
  const tex = new THREE.CanvasTexture(canvas);
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.wrapS = repeat ? THREE.RepeatWrapping : THREE.ClampToEdgeWrapping;
  tex.wrapT = repeat ? THREE.RepeatWrapping : THREE.ClampToEdgeWrapping;
  tex.anisotropy = 4;
  tex.needsUpdate = true;
  return tex;
}

function addSubtlePlasterGrain(
  ctx: CanvasRenderingContext2D,
  size: number,
  seed: number,
  strength = 8
): void {
  const rand = makeRng(seed);
  for (let i = 0; i < 900; i++) {
    const x = rand() * size;
    const y = rand() * size;
    const w = 4 + rand() * 24;
    const h = 3 + rand() * 14;
    const dark = rand() > 0.5;
    ctx.fillStyle = dark
      ? `rgba(42, 48, 56, ${(rand() * strength) / 255})`
      : `rgba(255, 252, 245, ${(rand() * strength) / 255})`;
    ctx.fillRect(x, y, w, h);
  }
}

function drawFramedWindow(
  dctx: CanvasRenderingContext2D,
  ectx: CanvasRenderingContext2D,
  x: number,
  y: number,
  w: number,
  h: number,
  opts: {
    lit: boolean;
    litColor: string;
    frameColor?: string;
    glassColor?: string;
    hasSill?: boolean;
    hasMullion?: boolean;
    hasShutters?: boolean;
    shutterColor?: string;
  }
): void {
  const frame = opts.frameColor ?? '#D6CFC4';
  const glass = opts.glassColor ?? '#445C6E';

  // Subtle recessed drop shadow under lintel
  dctx.fillStyle = 'rgba(26, 34, 44, 0.28)';
  dctx.fillRect(x - 2, y - 2, w + 4, h + 4);

  if (opts.hasShutters) {
    dctx.fillStyle = opts.shutterColor ?? '#6D7A7E';
    const sw = Math.max(5, Math.round(w * 0.24));
    dctx.fillRect(x - sw - 2, y, sw, h);
    dctx.fillRect(x + w + 2, y, sw, h);
  }

  // Outer window casing
  dctx.fillStyle = frame;
  dctx.fillRect(x - 1, y - 1, w + 2, h + 2);

  // Recessed dark glass pane
  dctx.fillStyle = glass;
  dctx.fillRect(x + 2, y + 2, w - 4, h - 4);

  // Subtle upper sky reflection gradient inside glass
  const grad = dctx.createLinearGradient(x, y + 2, x, y + h - 2);
  grad.addColorStop(0, 'rgba(186, 214, 232, 0.42)');
  grad.addColorStop(0.45, 'rgba(120, 152, 178, 0.14)');
  grad.addColorStop(1, 'rgba(20, 32, 46, 0.35)');
  dctx.fillStyle = grad;
  dctx.fillRect(x + 2, y + 2, w - 4, h - 4);

  if (opts.hasMullion) {
    dctx.fillStyle = frame;
    dctx.fillRect(x + w * 0.5 - 1, y + 2, 2, h - 4);
    dctx.fillRect(x + 2, y + h * 0.48, w - 4, 2);
  }

  if (opts.hasSill) {
    dctx.fillStyle = '#E5DFD5';
    dctx.fillRect(x - 3, y + h, w + 6, 4);
    dctx.fillStyle = 'rgba(25, 32, 40, 0.22)';
    dctx.fillRect(x - 2, y + h + 4, w + 4, 3);
  }

  if (opts.lit) {
    // Soft warm interior curtain/gradient glow (never a flat neon rectangle)
    const egrad = ectx.createLinearGradient(x, y + 2, x, y + h - 2);
    egrad.addColorStop(0, opts.litColor);
    egrad.addColorStop(1, '#D99B4E');
    ectx.fillStyle = egrad;
    ectx.fillRect(x + 3, y + 3, w - 6, h - 6);
    if (opts.hasMullion) {
      ectx.fillStyle = '#181410';
      ectx.fillRect(x + w * 0.5 - 1, y + 2, 2, h - 4);
      ectx.fillRect(x + 2, y + h * 0.48, w - 4, 2);
    }
  }
}

/** 1. Low-Density Residential: plaster stucco, framed windows with sills/mullions, subtle trim */
function createResLowFacade(): FacadeTextureSet {
  const size = 512;
  const dc = document.createElement('canvas');
  dc.width = dc.height = size;
  const dctx = dc.getContext('2d')!;

  const ec = document.createElement('canvas');
  ec.width = ec.height = size;
  const ectx = ec.getContext('2d')!;

  dctx.fillStyle = '#FFFFFF';
  dctx.fillRect(0, 0, size, size);
  addSubtlePlasterGrain(dctx, size, 101, 10);

  ectx.fillStyle = '#000000';
  ectx.fillRect(0, 0, size, size);

  const cols = 4;
  const rows = 4;
  const cw = size / cols;
  const ch = size / rows;
  const rand = makeRng(2101);

  for (let r = 0; r < rows; r++) {
    // Subtle story cornice line
    dctx.fillStyle = 'rgba(65, 62, 56, 0.08)';
    dctx.fillRect(0, r * ch, size, 3);

    for (let c = 0; c < cols; c++) {
      const cx = c * cw;
      const cy = r * ch;
      const ww = 50;
      const wh = 62;
      const wx = cx + (cw - ww) * 0.5;
      const wy = cy + (ch - wh) * 0.52;

      const litRoll = rand();
      const lit = litRoll < 0.44;
      const litColor = litRoll < 0.28 ? '#FFE0A3' : litRoll < 0.39 ? '#FFCC7A' : '#FFF1D2';

      drawFramedWindow(dctx, ectx, wx, wy, ww, wh, {
        lit,
        litColor,
        frameColor: '#EAE4DA',
        glassColor: '#3C5364',
        hasSill: true,
        hasMullion: true,
        hasShutters: (r + c) % 3 === 0,
        shutterColor: '#69797F',
      });
    }
  }

  return { map: finalizeTexture(dc), emissiveMap: finalizeTexture(ec) };
}

/** 2. High-Density Residential: concrete floor slabs, regular apartment windows & balcony doors */
function createResHighFacade(): FacadeTextureSet {
  const size = 512;
  const dc = document.createElement('canvas');
  dc.width = dc.height = size;
  const dctx = dc.getContext('2d')!;

  const ec = document.createElement('canvas');
  ec.width = ec.height = size;
  const ectx = ec.getContext('2d')!;

  dctx.fillStyle = '#FFFFFF';
  dctx.fillRect(0, 0, size, size);
  addSubtlePlasterGrain(dctx, size, 202, 8);

  ectx.fillStyle = '#000000';
  ectx.fillRect(0, 0, size, size);

  const cols = 4;
  const rows = 4;
  const cw = size / cols;
  const ch = size / rows;
  const rand = makeRng(3202);

  for (let r = 0; r < rows; r++) {
    const ry = r * ch;
    // Crisp architectural concrete floor slab cornice & shadow
    dctx.fillStyle = '#D8D4CC';
    dctx.fillRect(0, ry, size, 10);
    dctx.fillStyle = 'rgba(30, 38, 48, 0.20)';
    dctx.fillRect(0, ry + 10, size, 5);

    for (let c = 0; c < cols; c++) {
      const cx = c * cw;
      // Vertical structural pilaster subtle shading
      dctx.fillStyle = 'rgba(40, 48, 58, 0.07)';
      dctx.fillRect(cx, ry + 10, 6, ch - 10);

      const ww = 76;
      const wh = 68;
      const wx = cx + (cw - ww) * 0.5;
      const wy = ry + 28;

      const litRoll = rand();
      const lit = litRoll < 0.42;
      const litColor = litRoll < 0.24 ? '#FFD891' : litRoll < 0.35 ? '#FFF0CE' : '#CBE4F5';

      drawFramedWindow(dctx, ectx, wx, wy, ww, wh, {
        lit,
        litColor,
        frameColor: '#C5C9CE',
        glassColor: '#364F63',
        hasSill: true,
        hasMullion: true,
      });

      // Subtle dark rail line across lower quarter of balcony window
      dctx.fillStyle = 'rgba(46, 56, 66, 0.45)';
      dctx.fillRect(wx - 4, wy + wh - 18, ww + 8, 3);
    }
  }

  return { map: finalizeTexture(dc), emissiveMap: finalizeTexture(ec) };
}

/** 3. Low-Density Commercial: glazed storefronts on lower tier + neat upper shop windows */
function createComLowFacade(): FacadeTextureSet {
  const size = 512;
  const dc = document.createElement('canvas');
  dc.width = dc.height = size;
  const dctx = dc.getContext('2d')!;

  const ec = document.createElement('canvas');
  ec.width = ec.height = size;
  const ectx = ec.getContext('2d')!;

  dctx.fillStyle = '#FFFFFF';
  dctx.fillRect(0, 0, size, size);
  addSubtlePlasterGrain(dctx, size, 303, 9);

  ectx.fillStyle = '#000000';
  ectx.fillRect(0, 0, size, size);

  const cols = 4;
  const rows = 4;
  const cw = size / cols;
  const ch = size / rows;
  const rand = makeRng(4303);

  for (let r = 0; r < rows; r++) {
    const ry = r * ch;
    const isStorefront = r === rows - 1;

    // Cornice trim band between stories
    dctx.fillStyle = '#D5CFC5';
    dctx.fillRect(0, ry, size, 9);
    dctx.fillStyle = 'rgba(34, 42, 52, 0.16)';
    dctx.fillRect(0, ry + 9, size, 4);

    for (let c = 0; c < cols; c++) {
      const cx = c * cw;
      if (isStorefront) {
        // Wide glazed retail display window + warm lit interior at night
        const wx = cx + 10;
        const wy = ry + 20;
        const ww = cw - 20;
        const wh = ch - 28;
        dctx.fillStyle = '#384652';
        dctx.fillRect(wx - 3, wy - 3, ww + 6, wh + 6);
        dctx.fillStyle = '#2A4052';
        dctx.fillRect(wx, wy, ww, wh);
        // Diagonal glass reflection glint
        dctx.fillStyle = 'rgba(205, 232, 248, 0.22)';
        dctx.beginPath();
        dctx.moveTo(wx + 6, wy + wh);
        dctx.lineTo(wx + 34, wy);
        dctx.lineTo(wx + 52, wy);
        dctx.lineTo(wx + 24, wy + wh);
        dctx.closePath();
        dctx.fill();

        // Warm welcoming shopfront night glow
        if (rand() < 0.78) {
          ectx.fillStyle = rand() < 0.65 ? '#FFE2A8' : '#FFEFC8';
          ectx.fillRect(wx + 4, wy + 5, ww - 8, wh - 10);
        }
      } else {
        const ww = 66;
        const wh = 66;
        const wx = cx + (cw - ww) * 0.5;
        const wy = ry + 28;
        const litRoll = rand();
        drawFramedWindow(dctx, ectx, wx, wy, ww, wh, {
          lit: litRoll < 0.38,
          litColor: litRoll < 0.25 ? '#FFDF9E' : '#D9EEFF',
          frameColor: '#E2DDD5',
          glassColor: '#3C5468',
          hasSill: true,
          hasMullion: true,
        });
      }
    }
  }

  return { map: finalizeTexture(dc), emissiveMap: finalizeTexture(ec) };
}

/** 4. High-Density Commercial: modern retail glass bands + brushed aluminum spandrels */
function createComHighFacade(): FacadeTextureSet {
  const size = 512;
  const dc = document.createElement('canvas');
  dc.width = dc.height = size;
  const dctx = dc.getContext('2d')!;

  const ec = document.createElement('canvas');
  ec.width = ec.height = size;
  const ectx = ec.getContext('2d')!;

  dctx.fillStyle = '#F6F7F9';
  dctx.fillRect(0, 0, size, size);
  ectx.fillStyle = '#000000';
  ectx.fillRect(0, 0, size, size);

  const cols = 4;
  const rows = 4;
  const cw = size / cols;
  const ch = size / rows;
  const rand = makeRng(5404);

  for (let r = 0; r < rows; r++) {
    const ry = r * ch;
    // Sleek metallic spandrel band
    dctx.fillStyle = '#CBD3DC';
    dctx.fillRect(0, ry, size, 28);
    dctx.fillStyle = 'rgba(28, 40, 56, 0.22)';
    dctx.fillRect(0, ry + 28, size, 4);

    // Continuous strip glazing divided by mullions
    for (let c = 0; c < cols; c++) {
      const cx = c * cw;
      const wx = cx + 6;
      const wy = ry + 34;
      const ww = cw - 12;
      const wh = ch - 42;

      dctx.fillStyle = '#335870';
      dctx.fillRect(wx, wy, ww, wh);
      const grad = dctx.createLinearGradient(wx, wy, wx + ww, wy + wh);
      grad.addColorStop(0, 'rgba(182, 224, 242, 0.42)');
      grad.addColorStop(0.5, 'rgba(92, 145, 178, 0.14)');
      grad.addColorStop(1, 'rgba(22, 42, 60, 0.34)');
      dctx.fillStyle = grad;
      dctx.fillRect(wx, wy, ww, wh);

      // Thin interior mullion
      dctx.fillStyle = '#DCE3EA';
      dctx.fillRect(wx + ww * 0.5 - 1, wy, 2, wh);

      const litRoll = rand();
      if (litRoll < 0.52) {
        ectx.fillStyle = litRoll < 0.3 ? '#FFF1C9' : litRoll < 0.44 ? '#FFD892' : '#C8ECFF';
        ectx.fillRect(wx + 3, wy + 4, ww - 6, wh - 8);
        ectx.fillStyle = '#0F1620';
        ectx.fillRect(wx + ww * 0.5 - 1, wy, 2, wh);
      }
    }
  }

  return { map: finalizeTexture(dc), emissiveMap: finalizeTexture(ec) };
}

/** 5. Industrial: corrugated cladding / brick ribbing, clerestory ribbon windows & loading bays */
function createIndFacade(): FacadeTextureSet {
  const size = 512;
  const dc = document.createElement('canvas');
  dc.width = dc.height = size;
  const dctx = dc.getContext('2d')!;

  const ec = document.createElement('canvas');
  ec.width = ec.height = size;
  const ectx = ec.getContext('2d')!;

  dctx.fillStyle = '#F2EFEA';
  dctx.fillRect(0, 0, size, size);

  // Subtle vertical corrugated metal / industrial panel ribs
  for (let x = 0; x < size; x += 16) {
    dctx.fillStyle = 'rgba(38, 42, 48, 0.08)';
    dctx.fillRect(x, 0, 4, size);
    dctx.fillStyle = 'rgba(255, 255, 255, 0.08)';
    dctx.fillRect(x + 4, 0, 3, size);
  }
  addSubtlePlasterGrain(dctx, size, 6505, 14);

  ectx.fillStyle = '#000000';
  ectx.fillRect(0, 0, size, size);

  const cols = 4;
  const rows = 4;
  const cw = size / cols;
  const ch = size / rows;
  const rand = makeRng(6505);

  for (let r = 0; r < rows; r++) {
    const ry = r * ch;
    const isGround = r === rows - 1;
    // Steel horizontal I-beam seam
    dctx.fillStyle = 'rgba(42, 46, 52, 0.24)';
    dctx.fillRect(0, ry, size, 6);

    for (let c = 0; c < cols; c++) {
      const cx = c * cw;
      if (isGround && c % 2 === 0) {
        // Recessed roll-up loading bay door
        const bx = cx + 16;
        const by = ry + 26;
        const bw = cw - 32;
        const bh = ch - 26;
        dctx.fillStyle = '#4B5056';
        dctx.fillRect(bx - 4, by - 4, bw + 8, bh + 4);
        dctx.fillStyle = '#6C727A';
        dctx.fillRect(bx, by, bw, bh);
        for (let sy = by + 12; sy < by + bh; sy += 14) {
          dctx.fillStyle = 'rgba(28, 32, 38, 0.35)';
          dctx.fillRect(bx, sy, bw, 2);
        }
      } else {
        // High horizontal factory clerestory window strip
        const wx = cx + 14;
        const wy = ry + 34;
        const ww = cw - 28;
        const wh = 42;
        const lit = rand() < 0.36;
        drawFramedWindow(dctx, ectx, wx, wy, ww, wh, {
          lit,
          litColor: '#FFD68A',
          frameColor: '#666E76',
          glassColor: '#374650',
          hasMullion: true,
        });
      }
    }
  }

  return { map: finalizeTexture(dc), emissiveMap: finalizeTexture(ec) };
}

/** 6. Office Curtain-Wall: reflective coastal glass grid, slim aluminum mullions & varied lit offices */
function createOfficeFacade(): FacadeTextureSet {
  const size = 512;
  const dc = document.createElement('canvas');
  dc.width = dc.height = size;
  const dctx = dc.getContext('2d')!;

  const ec = document.createElement('canvas');
  ec.width = ec.height = size;
  const ectx = ec.getContext('2d')!;

  // Cool architectural glass base (tinted softly by instanceColor)
  dctx.fillStyle = '#B8CFD8';
  dctx.fillRect(0, 0, size, size);
  ectx.fillStyle = '#000000';
  ectx.fillRect(0, 0, size, size);

  const cols = 4;
  const rows = 4;
  const cw = size / cols;
  const ch = size / rows;
  const rand = makeRng(7606);

  for (let r = 0; r < rows; r++) {
    const ry = r * ch;
    // Spandrel glass band at floor slab level
    dctx.fillStyle = '#7E98A6';
    dctx.fillRect(0, ry, size, 24);
    dctx.fillStyle = '#DCE4EA';
    dctx.fillRect(0, ry + 24, size, 4);

    for (let c = 0; c < cols; c++) {
      const cx = c * cw;
      // Vertical aluminum curtain-wall mullion
      dctx.fillStyle = '#E2E9EE';
      dctx.fillRect(cx, ry, 5, ch);
      dctx.fillStyle = 'rgba(30, 46, 58, 0.25)';
      dctx.fillRect(cx + 5, ry, 2, ch);

      const wx = cx + 8;
      const wy = ry + 30;
      const ww = cw - 12;
      const wh = ch - 34;

      // Reflective curtain glass pane with subtle sky gradient
      const grad = dctx.createLinearGradient(wx, wy, wx + ww * 0.4, wy + wh);
      grad.addColorStop(0, '#E0F2F8');
      grad.addColorStop(0.45, '#9BC1CF');
      grad.addColorStop(1, '#587F92');
      dctx.fillStyle = grad;
      dctx.fillRect(wx, wy, ww, wh);

      // Subtle interior sub-mullion
      dctx.fillStyle = 'rgba(226, 236, 242, 0.72)';
      dctx.fillRect(wx + ww * 0.5 - 1, wy, 2, wh);

      // Realistic office lighting clusters (mix of cool-white, warm-ivory, dark floors)
      const litRoll = rand();
      if (litRoll < 0.48) {
        ectx.fillStyle = litRoll < 0.22 ? '#E2F3FF' : litRoll < 0.38 ? '#FFF3D4' : '#FFE0A6';
        ectx.fillRect(wx + 2, wy + 3, ww - 4, wh - 6);
        ectx.fillStyle = '#0A121A';
        ectx.fillRect(wx + ww * 0.5 - 1, wy, 2, wh);
      }
    }
  }

  return { map: finalizeTexture(dc), emissiveMap: finalizeTexture(ec) };
}

/** 7. Civic / Service buildings: dignified stone pilasters and institutional windows */
function createCivicFacade(): FacadeTextureSet {
  const size = 512;
  const dc = document.createElement('canvas');
  dc.width = dc.height = size;
  const dctx = dc.getContext('2d')!;

  const ec = document.createElement('canvas');
  ec.width = ec.height = size;
  const ectx = ec.getContext('2d')!;

  dctx.fillStyle = '#FFFFFF';
  dctx.fillRect(0, 0, size, size);
  addSubtlePlasterGrain(dctx, size, 8707, 7);

  ectx.fillStyle = '#000000';
  ectx.fillRect(0, 0, size, size);

  const cols = 4;
  const rows = 4;
  const cw = size / cols;
  const ch = size / rows;
  const rand = makeRng(8707);

  for (let r = 0; r < rows; r++) {
    const ry = r * ch;
    dctx.fillStyle = '#DEDAD2';
    dctx.fillRect(0, ry, size, 12);
    dctx.fillStyle = 'rgba(30, 38, 48, 0.14)';
    dctx.fillRect(0, ry + 12, size, 4);

    for (let c = 0; c < cols; c++) {
      const cx = c * cw;
      const ww = 62;
      const wh = 70;
      const wx = cx + (cw - ww) * 0.5;
      const wy = ry + 28;
      const litRoll = rand();
      drawFramedWindow(dctx, ectx, wx, wy, ww, wh, {
        lit: litRoll < 0.55,
        litColor: litRoll < 0.3 ? '#FFF0C6' : '#DCEEFF',
        frameColor: '#E5E1D8',
        glassColor: '#3B566C',
        hasSill: true,
        hasMullion: true,
      });
    }
  }

  return { map: finalizeTexture(dc), emissiveMap: finalizeTexture(ec) };
}

/** Soft rounded rectangular contact-AO ground texture to ground building bases */
function createGroundAOTexture(): THREE.CanvasTexture {
  const size = 128;
  const c = document.createElement('canvas');
  c.width = c.height = size;
  const ctx = c.getContext('2d')!;

  ctx.clearRect(0, 0, size, size);
  // Soft radial + box-feathered ambient shadow under buildings
  const cx = size * 0.5;
  const grad = ctx.createRadialGradient(cx, cx, size * 0.24, cx, cx, size * 0.5);
  grad.addColorStop(0.0, 'rgba(18, 26, 30, 0.44)');
  grad.addColorStop(0.62, 'rgba(18, 26, 30, 0.28)');
  grad.addColorStop(0.86, 'rgba(18, 26, 30, 0.08)');
  grad.addColorStop(1.0, 'rgba(18, 26, 30, 0.0)');
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, size, size);

  return finalizeTexture(c, false);
}

/** Warm streetlamp ground pool radial glow texture */
function createLampGlowTexture(): THREE.CanvasTexture {
  const size = 128;
  const c = document.createElement('canvas');
  c.width = c.height = size;
  const ctx = c.getContext('2d')!;

  const cx = size * 0.5;
  const grad = ctx.createRadialGradient(cx, cx, 2, cx, cx, cx);
  grad.addColorStop(0.0, 'rgba(255, 224, 152, 0.85)');
  grad.addColorStop(0.32, 'rgba(255, 198, 108, 0.42)');
  grad.addColorStop(0.7, 'rgba(245, 168, 76, 0.12)');
  grad.addColorStop(1.0, 'rgba(245, 168, 76, 0.0)');
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, size, size);

  return finalizeTexture(c, false);
}

/** Subtle weathered coastal asphalt micro-grain texture */
function createAsphaltTexture(): THREE.CanvasTexture {
  const size = 256;
  const c = document.createElement('canvas');
  c.width = c.height = size;
  const ctx = c.getContext('2d')!;

  ctx.fillStyle = '#E6E8EC';
  ctx.fillRect(0, 0, size, size);

  const rand = makeRng(9909);
  for (let i = 0; i < 4200; i++) {
    const x = rand() * size;
    const y = rand() * size;
    const s = 1 + rand() * 2.5;
    const v = 195 + Math.floor(rand() * 48);
    ctx.fillStyle = `rgb(${v},${v},${v + 2})`;
    ctx.fillRect(x, y, s, s);
  }
  // Faint longitudinal tire-wear tracks
  ctx.fillStyle = 'rgba(140, 148, 160, 0.12)';
  ctx.fillRect(0, size * 0.22, size, size * 0.12);
  ctx.fillRect(0, size * 0.66, size, size * 0.12);

  return finalizeTexture(c, true);
}

export function createAllFacadeTextures(): AllFacadeTextures {
  const res_low = createResLowFacade();
  const res_high = createResHighFacade();
  const com_low = createComLowFacade();
  const com_high = createComHighFacade();
  const ind = createIndFacade();
  const office = createOfficeFacade();
  const civic = createCivicFacade();
  const groundAO = createGroundAOTexture();
  const lampGlow = createLampGlowTexture();
  const asphalt = createAsphaltTexture();

  const allTex: THREE.CanvasTexture[] = [
    res_low.map,
    res_low.emissiveMap,
    res_high.map,
    res_high.emissiveMap,
    com_low.map,
    com_low.emissiveMap,
    com_high.map,
    com_high.emissiveMap,
    ind.map,
    ind.emissiveMap,
    office.map,
    office.emissiveMap,
    civic.map,
    civic.emissiveMap,
    groundAO,
    lampGlow,
    asphalt,
  ];

  return {
    res_low,
    res_high,
    com_low,
    com_high,
    ind,
    office,
    civic,
    groundAO,
    lampGlow,
    asphalt,
    dispose: () => {
      for (const t of allTex) t.dispose();
    },
  };
}
