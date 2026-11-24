# Tidelight (汐光市) — Style Gap Analysis & Visual Polish Plan

> **Purpose**: Concrete visual comparison between Batch 1/2 screenshots (`shots/b2-overview.png`, `shots/b2-empty.png`, `shots/b2-portrait.png`, `shots/b2-tools.png`, `shots/b1-street.png`, `shots/b1-night.png`, `shots/b1-overlay.png`) and commercial city-builder style references (`ref/cs1_1..4.jpg`, `ref/cs2_1..4.jpg`).  
> **Originality Rule**: References are used strictly for lighting mood, color harmony, architectural proportion, terrain texture, and atmospheric craft. All geometry, shaders, textures, UI, icons, and branding remain 100% original to **汐光市 · Tidelight**.

---

## 1. Baseline Gaps vs. Style References (Pre-Batch 3)

### 1.1 Color Palette & Material Harmony
- **Observed in our shots (`b2-overview.png`, `b1-street.png`, `b2-portrait.png`)**:
  - Over-saturated toy-like primary colors on commercial roofs (bright cyan-blue, candy mustard, saturated emerald) and vivid orange-red residential roofs.
  - Terrain is a flat uniform pastel lime-green (`#93C47D`), making the city look like colored blocks on a billiard table.
  - Vacant zone tiles (`opacity 0.50`) add large neon-mint patches that visually overpower roads and yards.
- **Observed in references (`cs1_1`, `cs1_2`, `cs2_2`)**:
  - Cohesive, slightly muted natural palette: olive/sage/forest meadow tones, warm ivory/limestone/concrete facades, harmonized slate-grey, weathered terracotta, warm charcoal, and zinc roofs.
  - Warm sunlight and soft shadows provide vibrancy instead of garish base albedo colors.
- **Planned Fix**:
  - Re-balance building wall, roof, awning, and terrain palettes toward a grounded, harmonized warm-coastal miniature palette (muted terracotta, slate blue-grey, weathered cedar, warm ivory/sandstone, architectural zinc, muted awnings).
  - Lower vacant zone paint opacity during normal camera mode (boosting when zoning tool is active) so city yards and green space read naturally.

### 1.2 Terrain Surface, Biomes & Empty-Map Framing
- **Observed in our shots (`b2-empty.png`, `b2-overview.png`)**:
  - `b2-empty.png` shows a featureless lime-green void with almost no tonal texture, minimal sense of elevation change across the valley, and sparse tiny green dots for trees.
  - Distant hills blend smoothly into uniform grey-green with little rocky ridge or forest floor contrast.
- **Observed in references (`cs2_2`, `cs1_1`, `cs1_2`)**:
  - Visible grass mottling, meadow-to-forest-floor transitions, dark lush tree soil, sandy shorelines, and rocky limestone outcrops on steep slopes and hills.
- **Planned Fix**:
  - Keep the simulation heightmap intact, and enrich `TerrainMeshLayer` with high-resolution procedural multi-octave grass/soil/rock detail textures + biome vertex color variation (warm coastal sand, mottled sunlit meadow, darker forest soil under woodlands, upland pine moss, craggy limestone slopes/ridges, subtle ambient occlusion in riverbanks and valleys).

### 1.3 Water & Shoreline Quality
- **Observed in our shots (`b2-empty.png`, `b2-overview.png`)**:
  - Coarse 128×128 vertex-colored water plane causes a wide, jagged triangular sawtooth halo of chalky white foam along the river and bay banks.
  - Water looks like a flat opaque teal sheet with no sky reflection or wave surface.
- **Observed in references (`cs2_2`, `cs1_1`, `cs2_1`)**:
  - Smooth organic coastline with a tight, believable shore foam/sand edge, clear turquoise shallows fading smoothly into deep marine blue-teal, Fresnel sky reflection, and subtle water surface ripples.
- **Planned Fix**:
  - Replace the vertex-colored water material with a custom WebGL2 `ShaderMaterial` backed by a smooth bilinearly filtered height/depth `DataTexture` sampled from the terrain heightmap.
  - Render a razor-smooth, tight animated shoreline foam line (`0–0.45m` depth), shallow turquoise-to-deep bay color absorption gradient, Fresnel sky/horizon reflection, animated dual-layer wave ripples, and soft sun/moon specular glints — all cheap on SwiftShader.

### 1.4 Building Silhouettes, Massing & Facade Detail
- **Observed in our shots (`b1-street.png`, `b2-overview.png`, `b2-portrait.png`)**:
  - Every `res_low` house is a plain box with a 4-sided pyramid cone; huge 3×3 lots turn into giant blocky barns with pyramid caps.
  - Every building shares one single 4×4 window canvas stretched to fit the entire box regardless of width or floor count — causing stretched, distorted windows on tall/wide walls and identical facades everywhere.
  - `res_high`, `com_low`, `com_high`, `ind`, and `office` are single boxes with a flat colored box cap — lacking balconies, porches, chimneys, awnings, storefront glazing, sawtooth roofs, tanks, curtain-wall mullions, or roof mechanical equipment.
  - Ploppables (police, fire, clinic, hospital, schools, water pump, sewage, solar plant) are mostly indistinguishable generic colored boxes.
- **Observed in references (`cs1_1`, `cs1_2`, `cs2_1`, `cs2_2`)**:
  - Crisp, varied solid closed architectural silhouettes with eaves, gables, porches, yard fences/gardens, balcony grids, parapets, rooftop HVAC/penthouses, ground-floor glazed storefronts with awnings/canopies, industrial sawtooth roofs & silos, and glazed office towers.
- **Planned Fix**:
  - Build distinct procedural **closed, watertight** geometry assemblies & archetypes in `BuildingMeshLayer` (all retaining solid `-4m` foundation skirts, zero hollow faces, zero z-fighting):
    - **Archetype-specific 512×512 procedural facade textures** (residential stucco + framed recessed windows + ground doors; apartment concrete + floor ledges + balcony/window rhythm; commercial glazed ground storefront + upper windows + clean original signage strips; industrial brick/corrugated cladding + clerestory windows + loading bays; office reflective glass curtain-wall + crisp mullions) with world/story-proportional tiling & vertical AO shading.
    - **`res_low`**: Solid closed gable roofs with eaves, hipped roofs with ridge, and modern split-level shed roofs; entrance porches/stoops; chimneys; fenced garden/hedge lot borders and yard trees/plots.
    - **`res_high`**: Multi-story stepped apartment slabs/towers scaling clearly with level, horizontal floor slabs, protruding balcony rows with railings, roof parapet border, elevator/HVAC penthouse.
    - **`com_low`**: Glazed ground-floor storefront plinth, sloped fabric awning, parapet rim, original geometric/typographic shopfront signboards (no ripped logos), rooftop AC units.
    - **`com_high`**: Wider commercial podium with glazed canopy, stepped upper retail tower, illuminated facade bands, rooftop skylight/frame.
    - **`ind`**: Solid closed sawtooth/monitor roof bays, cylindrical storage tanks/silos, loading bay docks, smokestacks with lightweight animated rising smoke puffs.
    - **`office`**: Reflective seafoam/slate glass curtain walls, vertical setback tiers scaling sharply with level, rooftop mechanical screen and architectural crown.
    - **Recognizable Ploppables**: Dedicated multi-part closed silhouettes for all 15 ploppables (coal plant boiler/hopper/twin striped chimneys with smoke, tapered-blade wind turbine, tilted photovoltaic solar arrays, riverside pump house + surge tank + intake pier, 4-legged braced water tower, concrete sewage outfall headwall + twin pipes, police portico + comms tower, fire station with 3 red bays + hose tower, medical wings + red cross + hospital helipad, brick schools with gable/clock tower + courtyard, detailed parks with pathways/gazebo/fountain/trees, fenced terraced landfill + shed).

### 1.5 Trees & Forest Density
- **Observed in our shots (`b2-overview.png`, `b2-empty.png`)**:
  - Sparse small single-icosahedron lollipops on thin sticks; empty hillsides look bald.
- **Observed in references (`cs1_1`, `cs1_2`, `cs2_2`)**:
  - Dense clustered woodland mixing tall conifers/pines and fuller multi-lobed deciduous canopies in varied olive/pine/forest greens, interspersed nicely around neighborhoods and ridges.
- **Planned Fix**:
  - Upgrade instanced trees to **two distinct closed multi-part silhouettes** (3-tier conical conifer/pine + multi-lobed broadleaf canopy + tapered trunk) with baked canopy vertical AO vertex colors, richer natural green variation (+ occasional subtle coastal blossom accent), subtle GPU vertex-shader wind sway, and denser instanced cluster sub-trees around natural forest anchors (preserving low draw calls and respecting road/building exclusions).

### 1.6 Roads, Intersections & Road-Draw Ghost Preview
- **Observed in our shots (`b1-street.png`, `b2-tools.png`)**:
  - Road asphalt is flat and lacks crosswalks/curb contrast; in `b2-tools.png`, the mid-draw curved road preview ribbon (`#26C4B4`) is faint and hard to distinguish against grass and coast.
- **Observed in references (`cs1_1`, `cs2_1`)**:
  - Crisp raised sidewalks with curb definition, crosswalk stripes and stop lines at intersections, clean dashed lane markings, and a bold high-contrast road preview with thick crisp edges and bright guide markers.
- **Planned Fix**:
  - Refine road palette (weathered warm-slate asphalt `#585F6B`, crisp light-stone curb edge, crosswalk zebra bars near junctions, one-way chevron markings, cantilevered streetlamp arms, clean `polygonOffset` layering with zero z-fighting).
  - Upgrade `ToolPreviewLayer` road preview to an elevated high-contrast bright slate-cyan core ribbon flanked by thick solid bright-white mesh border ribbons (guaranteed visible thickness on WebGL2/SwiftShader where `GL_LINE` is 1px), crisp white dashed centerline mesh quads, and vivid endpoint/snap/tangent markers.

### 1.7 Tilt-Shift DOF, Lighting, AO, Night Mood & Bloom
- **Observed in our shots (`b2-overview.png`, `b1-street.png`, `b1-night.png`)**:
  - No tilt-shift depth-of-field blur, no vignette, no bloom at night, no contact AO around building footprints.
  - `b1-night.png` lights up every building with the same uniform yellow 4×4 grid — lacking dark silhouette contrast, warm streetlamp ground pools, bright headlight beams, starry/twilight sky gradient, and soft bloom.
- **Observed in references (`cs1_3`, `cs2_4`, `cs1_1`)**:
  - Grounded contact shadows + soft AO, atmospheric haze into the horizon, crisp miniature tilt-shift focus band, and dramatic night skylines with varied lit/unlit window clusters, warm pools under streetlamps, flowing vehicle light trails, and tasteful bloom.
- **Planned Fix**:
  - Build a lightweight WebGL2 post-processing pipeline (`src/render/postprocess.ts`) with automatic quality presets (`?quality=low|medium|high`, auto-lowering on mobile):
    - Two-pass separable half-res blur for **tilt-shift miniature DOF** (focus band near screen center, smoothly blurring top/bottom bands; stronger at overview altitude, milder at street cam).
    - Selective **bright-pass bloom** on night/dusk emissives (windows, streetlamps, headlights/taillights) kept tasteful and clean.
    - Subtle warm miniature color polish + soft vignette, with automatic fallback if render targets fail.
  - Add subtle grounded **building base AO skirts** + vertex AO shading on buildings/trees.
  - Rework night emissive textures & per-building brightness variation so ~35–50% of windows glow in varied warm amber/ivory/cool office tones, add instanced soft warm streetlamp pools on streets at dusk/night, boost vehicle headlight/taillight glow, and add a subtle twilight horizon glow + faint stars on the night sky dome.

### 1.8 Overlays
- **Observed in our shots (`b1-overlay.png`)**:
  - Vibrant terrain and buildings visually compete with traffic congestion ribbons.
- **Observed in references (`cs1_4`, `cs2_3`)**:
  - Muted/desaturated terrain base lets overlay data pop effortlessly.
- **Planned Fix**:
  - Desaturate terrain cleanly when any info overlay (including `traffic`) is active, keeping road congestion and heatmaps immediately legible.

---

## 2. Before / After Review & Visual Polish Iterations

All 6 final screenshots (`shots/final-overview.png`, `shots/final-street.png`, `shots/final-overlay.png`, `shots/final-night.png`, `shots/final-portrait.png`, `shots/final-empty.png`) plus diagnostic road-preview & `?quality=low` shots were captured on headless Chrome SwiftShader (WebGL2) with `0` console errors and reviewed side-by-side against `ref/cs1_1..4.jpg` and `ref/cs2_1..4.jpg`.

### Round 1 (Initial Batch 3 Implementation) — Findings
- **Big Wins**:
  - Replaced uniform pyramid boxes with closed solid gable/hip/shed houses, porches, chimneys, hedges, yard trees, sawtooth factories with animated smoke, and distinct silhouettes for all 15 ploppables.
  - Eliminated jagged sawtooth shoreline foam via a bilinearly sampled height/depth `DataTexture` water shader.
  - Road-draw ghost preview (`check-preview.tmp.png`) became unmistakably crisp with elevated blueprint core, thick solid white mesh borders, dashed white centerline, and high-contrast endpoint/tangent beacons.
  - WebGL2 separable tilt-shift DOF + selective bloom post-process verified active (`postProcess: true`) on high, medium (auto-mobile), and low (`?quality=low`) presets.
- **Gaps Found in Round 1 Review**:
  1. **Water too bright / milky blue** (`final-overview.png`, `final-empty.png`, `final-night.png`): hardcoded water depth colors were written in sRGB-like numbers instead of linear RGB, making the bay look bright pastel-cyan under ACES + linear-to-sRGB output.
  2. **Office curtain walls rendered near-black** (`final-street.png`): moderate `metalness` with no environment map reflected black instead of coastal sky.
  3. **Vacant zone tiles still glowed brightly at night and looked too saturated by day** (`final-night.png`, `final-overview.png`) due to unlit `MeshBasicMaterial`.
  4. **Low-density commercial (`com_low`) looked overly uniform pale grey/white** compared to the varied residential quarter.
  5. **Atmospheric fog started too close** (`near: 440`) and dusk fog turned overly orange-brown in `final-empty.png` when simulation clock reached 18:30.

### Iteration 1 — Targeted Fixes & Results
- **Changes**:
  - Converted water depth & foam shader colors to true linear RGB values with deeper marine navy -> clear turquoise shallow gradient and multi-frequency wave ripples.
  - Added a lightweight procedural coastal sky `PMREMGenerator` environment map (`scene.environment`) so office glass curtain walls, commercial glazing, and vehicle windows reflect bright coastal sky naturally.
  - Switched `ZoneMeshLayer` vacant tiles to lit `MeshStandardMaterial` at whisper-soft scenic opacity (`0.11` day, hidden at night) while keeping crisp `0.56` visibility whenever the Zoning tool is active.
  - Expanded `com_low` into 3 distinct architectural silhouettes (parapet shop, pitched-roof café, stepped boutique with timber lounge) with wrap-around colored awnings, warm brick/sandstone/sage walls, and darker gravel roof decks.
  - Pushed fog farther out (`680..2250` day), tuned dusk lighting to luminous golden-violet coastal twilight, and added richer meadow/soil detail texture plus scenic riverbank tree copses.
- **Result**: Massive visual jump across all 6 shots — office towers gleamed with coastal sky reflections, water became deep marine blue-teal, night empty lots vanished completely, and `final-empty.png` transformed from a flat green void into a textured coastal river valley.

### Iteration 2 — Second Visual Polish Pass & Final Review
- **Gaps Identified After Iteration 1**:
  1. Daytime sun/environment balance still leaned slightly cool-white, with subtle daytime bloom softening highlights.
  2. Riverbank sand & organic shoreline foam could read a bit crisper on `final-empty.png`, and valley filler trees looked slightly peppered rather than clustered in natural woodland groves.
  3. Downtown office towers shared nearly identical heights, and close foreground `res_low` gable roofs could benefit from ridge cap trim.
  4. Night vehicle headlight/taillight visibility at overview altitude was faint compared to `cs1_3`.
- **Changes**:
  - Warmed daytime sun (`#FFEBC8`, `intensity: 2.68`) and lowered elevation (`36°`) for richer sculptural miniature shadows; balanced PMREM intensity (`0.48`) and minimized daytime bloom (`0.02`) while keeping lush night bloom (`0.80`).
  - Widened warm sunlit sandy riverbanks (`2.45m`), sharpened organic shoreline foam kiss, and grouped scenic valley trees into tighter 3–4 tree natural groves.
  - Added roof ridge cap beams on `res_low` gables and sculpted per-variant setback crowns + spires on `office` towers for organic skyline rhythm.
  - Deepened night ground ambient and boosted night headlight/taillight brightness & scale for clearer evening traffic light trails.
- **Before vs. After Summary**:
  - **Overview (`b2-overview.png` -> `final-overview.png`)**: Shifted from candy-colored boxes on flat lime green with jagged chalky water into a cohesive warm coastal tilt-shift miniature diorama with deep marine water, varied solid architecture, grounded AO, and dense mixed conifer/broadleaf forests.
  - **Street (`b1-street.png` -> `final-street.png`)**: Replaced giant pyramid-capped barns and plain boxes with proportioned pitched/hipped/shed homes (porches, chimneys, ridge beams, framed windows, fenced yards), multi-style commercial storefronts with wrap awnings, gleaming glass office towers, sawtooth factories with rising smoke, and crosswalks.
  - **Empty Map (`b2-empty.png` -> `final-empty.png`)**: Replaced the flat green void and sawtooth river edge with mottled pasture/meadow terrain, sandy riverbanks, smooth deep river water with tight organic foam, rocky hillsides, and natural woodland groves.
  - **Night (`b1-night.png` -> `final-night.png`)**: Replaced uniform bright-yellow checkerboard facades and glowing vacant zone tiles with dramatic dark-coastal silhouettes, per-window randomized warm/ivory/cool interior glow, warm streetlamp light pools, glowing traffic lights, and tasteful bloom.
  - **Overlay (`b1-overlay.png` -> `final-overlay.png`)**: Desaturated base terrain so traffic congestion ribbons and legends pop cleanly.
  - **Mobile Portrait (`b2-portrait.png` -> `final-portrait.png`)**: Auto-selects `medium` quality preset with smooth tilt-shift DOF, legible touch HUD, and crisp dusk/day miniature detail.
- **Honest Remaining Limitations**:
  - Procedural buildings use instanced solid box/roof/cylinder assemblies rather than high-poly hand-modeled curved facades or interiors; close-up inspection still reads as clean stylized architectural miniature rather than photorealistic AAA assets.
  - Water reflections are analytical Fresnel sky reflections rather than planar/screen-space reflections of city buildings (kept intentionally cheap for WebGL2 SwiftShader & mobile).
  - Under headless SwiftShader software rendering, multi-pass post-processing runs reliably at full visual parity, though real-time frame rate depends on hardware GPU on user devices (mitigated via auto-mobile `medium` and `?quality=low` presets).

