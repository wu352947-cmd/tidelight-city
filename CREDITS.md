# Credits & Open-Source Attributions · 致谢与版权声明

## Original IP · 原创声明

**汐光市 · Tidelight** is a 100% original web city-builder project.  
All architectural silhouettes, procedural 3D meshes, procedural canvas facade/terrain textures, custom GLSL water/sky/tilt-shift shaders, inline SVG icons, UI layouts, and Chinese/English copy are created originally for this project.

No external commercial textures, models, UI sprites, icons, audio, or brand assets are used.

---

## Open-Source Libraries & Tooling · 开源依赖

| Library | License | Usage |
| :--- | :---: | :--- |
| [Three.js](https://threejs.org/) (`^0.170.0`) | MIT | WebGL2 3D scene graph, instanced rendering, shadows, and custom shaders |
| [Vite](https://vitejs.dev/) (`^6.0.3`) | MIT | Dev server and ES module / Web Worker production bundling |
| [TypeScript](https://www.typescriptlang.org/) (`^5.7.2`) | Apache-2.0 | Static typing across simulation worker and renderer |
| [Vitest](https://vitest.dev/) (`^2.1.8`) | MIT | Simulation core unit test runner |
| [Puppeteer Core](https://pptr.dev/) (`^23.10.0`) | Apache-2.0 | Automated headless Chromium visual verification (`tools/shot.mjs`, dev-only) |

## Procedural Assets · 程序化资产

- **3D Buildings, Ploppables, Roads, Vehicles & Trees**: Procedurally constructed solid closed BufferGeometries (`src/render/geometryUtils.ts`, `src/render/buildingMesh.ts`, `src/render/roadMesh.ts`, `src/render/terrainMesh.ts`).
- **Textures**: Procedurally painted HTML5 Canvas 2D architectural facade, night-window emissive, terrain grass/soil grain, asphalt, contact-AO, and streetlamp glow textures (`src/render/facadeTextures.ts`, `src/render/terrainMesh.ts`).
- **UI Iconography**: Hand-authored original inline SVG stroke icons (`src/render/icons.ts`).
- **Typography**: System sans-serif stack (`PingFang SC`, `Noto Sans SC`, `Inter`, `system-ui`).
