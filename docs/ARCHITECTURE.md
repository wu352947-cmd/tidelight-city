# Tidelight (汐光市) — Technical Architecture

> Version: v0.1 Foundations (Batch 1)  
> Target runtime: Modern desktop & mobile browsers (WebGL2 mandatory baseline, WebGPU progressive path) + headless Chromium (SwiftShader) verification.

---

## 1. Guiding Principles

1. **Strict Main-Thread / Worker Split**: The main thread owns only Three.js rendering, camera/input handling, and lightweight HUD updates. All game rules, topology, pathfinding, scalar fields, economy, and traffic run inside a dedicated Web Worker (`src/sim/worker.ts`).
2. **Deterministic, Pure Simulation Core**: Everything under `src/sim/` (except `worker.ts`) is pure TypeScript with zero DOM, Canvas, WebGL, or `Math.random()` dependencies. Every random draw flows through a seeded PRNG (`Mulberry32` in `src/sim/rng.ts`). This lets `vitest` execute headless multi-day city simulations reproducibly in Node and preserves a clean boundary for a future Rust/WASM drop-in.
3. **Zero-Copy / Compact Transfer Protocol**: High-frequency entity arrays (vehicles, buildings, road splines, zone cells, scalar fields) are packed into flat `TypedArray` buffers and transferred via `postMessage(msg, transferables)` with monotonic revision counters so static layers (terrain, roads, zone cells) are uploaded only when dirtied.
4. **Command-Driven State Mutation**: Every player action, demo script action, or test harness action enters `SimEngine.applyCommand(cmd)` via a single typed command union (`SimCommand`). No backdoor scene fabrication is allowed — `?demo=1` drives the exact same commands a player uses.

---

## 2. Module Map

```text
/workspace/city-builder
├── index.html                  # App entry shell (zh-CN + viewport-fit=cover)
├── vite.config.ts              # base: '/tidelight-city/' in build, '/' in dev
├── vitest.config.ts            # Node test runner for src/sim/
├── docs/
│   ├── ARCHITECTURE.md         # This document
│   └── ART_BIBLE.md            # Visual palette, lighting, asset & UI spec
├── tools/
│   └── shot.mjs                # Headless Chromium (SwiftShader) screenshot & error audit CLI
└── src/
    ├── main.ts                 # Bootstrap, URL params (?demo, ?time, ?overlay, ?cam, ?renderer), worker bridge
    ├── sim/                    # Pure simulation core (WASM-swappable boundary)
    │   ├── types.ts            # Shared enums, constants, road/zone/building/service specs
    │   ├── rng.ts              # Deterministic seeded Mulberry32 PRNG + spatial hash
    │   ├── bezier.ts           # Cubic Bezier evaluation, De Casteljau split, arc-length LUT, curve-curve intersection
    │   ├── terrain.ts          # Coastal valley heightmap (193x193, 1920m×1920m), river + flow vectors, slope, trees
    │   ├── roads.ts            # Node–Segment–Lane graph, T-junction snapping/splitting, crossing intersections, signals
    │   ├── zones.ts            # 8m×8m×4-deep curved zone blocks, clipping vs road/water/slope/overlap, painting
    │   ├── fields.ts           # 128×128 2D scalar fields (landValue, pollution, noise, waterPollution, coverages)
    │   ├── utilities.ts        # Power plants/lines + BFS building conduction; water pumps/towers/sewage/pipes + flow check
    │   ├── services.ts         # Police, fire, clinic/hospital, schools, parks, landfill coverage & effects
    │   ├── demand.ts           # RCI+O demand (-50..+100) from jobs/vacancy/unemployment/goods/taxes
    │   ├── buildings.ts        # Growable 1×1..4×4 spawning, construction, L1–L5/L3 leveling, abandonment, ploppables
    │   ├── citizens.ts         # Aggregate households/workers, education tiers, home↔job matching, goods balance
    │   ├── economy.ts          # Treasury, per-zone taxes, nonlinear budget curves (50–150%), upkeep, 5 milestones
    │   ├── traffic.ts          # Trip generator, lane-graph congestion-aware A*, IDM car-following, junctions, despawn
    │   ├── protocol.ts         # Main ↔ Worker command/snapshot message schemas + binary packers
    │   ├── engine.ts           # SimEngine orchestrator, fixed tick scheduler, save/load serialization
    │   ├── demo.ts             # Scripted coastal town builder using ONLY SimCommand API + fast-forward
    │   ├── worker.ts           # Web Worker host running SimEngine at 0x/1x/2x/4x
    │   └── __tests__/          # Vitest deterministic verification suite
    └── render/                 # Main-thread Three.js presentation layer
        ├── renderer.ts         # WebGL2 renderer setup, lighting per time-of-day, fog, resize, frame loop
        ├── camera.ts           # RTS orbit camera (WASD/QE/wheel/drag + presets overview|street)
        ├── terrainMesh.ts      # Heightmap geometry with biome vertex colors + animated water + overlay tinting
        ├── roadMesh.ts         # Bezier ribbon meshes, lane stripes/medians, junction caps, tree props
        ├── zoneMesh.ts         # Instanced 8m×8m tinted zone cell quads lifted above terrain
        ├── buildingMesh.ts     # Solid closed meshes with terrain foundation skirts (upgradable per batch)
        ├── vehicleMesh.ts      # Instanced vehicles interpolated along lanes with yaw & brake lights
        └── hud.ts              # Minimal original glassmorphic HUD bar (Batch 1; expanded in later batches)
```

---

## 3. World Coordinate System & Data Layout

### 3.1 Spatial Conventions
* **Units**: `1 unit = 1 meter`. Y is up.
* **Playable Map**: `1920m × 1920m`, centered at `(0, 0)` so `x, z ∈ [-960, +960]`.
* **Sea Level**: `WATER_LEVEL = 0.0m`. Coastal valley sits gently between `+2m` and `+22m`; perimeter ridges rise to `+65m`; river bed carves smoothly down to `-3.5m` flowing north-to-south into the southern bay.
* **Terrain Heightmap**: `193 × 193` `Float32Array` (`10m` vertex spacing), bilinear height & central-difference slope sampling `sampleHeight(x, z)` / `sampleSlope(x, z)`.
* **River Flow Field**: `128 × 128` paired `Float32Array` (`flowX`, `flowZ`) storing normalized river advection vectors for water cells so sewage pollution propagates downstream.

### 3.2 Core Data Structures (SoA-Ready)

| Subsystem | Primary Representation | Packing in Snapshots |
| :--- | :--- | :--- |
| **Road Graph** | `Map<id, RoadNode>`, `Map<id, RoadSegment>`, `Map<id, RoadLane>` + adjacency lists & per-node `LaneConnection[]` | Compact segment spline tuples (`id, type, p0, c0, c1, p1, width, congestion`) + node circles (`id, x, z, radius, control`), sent only on `roadRevision` change (plus lightweight `Float32Array` congestion array per snapshot). |
| **Zone Cells** | `ZoneCell[]` keyed by `id`, spatial hash grid (`16m` buckets) for fast overlap clipping & area brush painting | Packed `Float32Array` (`x, y, z, yaw, zoneType, occupied`, 6 floats/cell) sent only on `zoneRevision` change. |
| **Buildings** | `Building[]` (both growables and ploppables) with footprint `(w, d)`, world center, yaw, level, construction progress `0..1`, problem bitmask, residents/jobs | Packed `Float32Array` (`id, kind, zoneOrService, level, x, y, z, yaw, width, depth, height, progress, flags`, 13 floats/building) sent on `buildingRevision` change or periodic refresh. |
| **Vehicles** | Dense array `Vehicle[]` (capped by tier, default `1,500` in v0.1) storing lane route `number[]`, arc position `s`, velocity `v`, heading `yaw`, `stuckTicks` | Packed `Float32Array` (`x, y, z, yaw, type, colorIdx, braking`, 7 floats/vehicle) transferred every snapshot tick. |
| **Scalar Fields** | `128 × 128` (`16,384` cells, `15m`/cell) `Float32Array` buffers: `landValue`, `pollution`, `noise`, `waterPollution`, `powerCoverage`, `waterCoverage`, `serviceCoverage`, `happiness` | Active overlay `Float32Array(16384)` copied & transferred on demand when an overlay is active or revision increments. |
| **Utilities** | `UtilityLine[]` (power lines & water pipes), connected-component IDs computed via BFS | Packed line segments `(kind, x0, z0, x1, z1, poweredOrWatered)` sent on `utilityRevision` change. |

---

## 4. Worker Protocol

Messages flow strictly asynchronously between the Main Thread (`src/main.ts`) and Worker (`src/sim/worker.ts`).

### 4.1 Main → Worker (`MainToWorkerMessage`)
```ts
type MainToWorkerMessage =
  | { type: 'init'; seed: number; demo?: boolean; timeOfDay?: number }
  | { type: 'command'; cmd: SimCommand; requestId?: number }
  | { type: 'setSpeed'; speed: 0 | 1 | 2 | 4 }
  | { type: 'setOverlay'; overlay: OverlayType }
  | { type: 'requestFullSync' };
```

### 4.2 `SimCommand` Union (Single Source of Truth)
* `buildRoad`: `{ p0, c0?, c1?, p1, roadType }` — snaps endpoints to existing nodes/segments (splitting on T-junction), computes all curve-curve crossings (splitting both segments & creating intersection nodes), rebuilds lanes & zone blocks, deducts treasury cost.
* `upgradeRoad`: `{ segmentId, roadType }` — widens or changes type in-place, rebuilds lanes & zone cells.
* `bulldozeRoad`: `{ segmentId }` — removes segment, orphan nodes, attached zone cells (and marks unfronted buildings), refunds partial cost.
* `zoneArea`: `{ zone, shape: 'circle' | 'rect' | 'segment', ... }` — paints or dezones matching `ZoneCell`s.
* `placeBuilding`: `{ kind, x, z, yaw? }` — places utility or civic service building on valid terrain, deducts cost.
* `buildUtilityLine`: `{ kind: 'power_line' | 'water_pipe', x0, z0, x1, z1 }` — connects utilities & extends pipe/grid coverage.
* `bulldozeBuilding`: `{ buildingId }`
* `setTaxRate`: `{ zone, rate }` (`1..29`)
* `setBudget`: `{ category, percent }` (`50..150`)
* `setTimeOfDay`: `{ hours }` (`0..24`)
* `stepTicks`: `{ count }` — synchronous deterministic fast-forward inside worker (used by `?demo=1` and automated tests).

### 4.3 Worker → Main (`WorkerToMainMessage`)
* `{ type: 'ready'; terrain: TerrainInitPayload }` — sent once after `init`, transferring the `193×193` heightmap, water mask, and procedural tree positions (`Float32Array`).
* `{ type: 'snapshot'; snapshot: SimSnapshot }` — sent at up to 20 Hz while running (and immediately after any user command). Contains:
  * `tick`, `simDay`, `timeOfDay`, `speed`
  * `stats` (population, households, jobs, unemployment, demand R/C/I/O, money, weeklyNet, power MW, water m³, sewage m³, milestone tier, vehicle count, active problems)
  * `vehicles` (`Float32Array`, always included, transferred)
  * `roadCongestion` (`Float32Array`, per segment)
  * Optional dirty-checked payloads when revision changed: `roads`, `zones`, `buildings`, `utilities`, `overlayField`.
* `{ type: 'commandResult'; requestId?: number; ok: boolean; reason?: string; data?: unknown }`

---

## 5. Fixed Tick Order

Each logical tick represents **`dt = 0.25s` of real-time simulation motion** (vehicles move smoothly at 4 ticks/sec logical rate, or `10 Hz` with `dt = 0.1s` — we use **`TICK_DT = 0.1s`** at **10 ticks/sec** nominal 1x speed, where **1 simulated day = 240 ticks = 24 seconds at 1x**, or 6 seconds at 4x; day/night visual clock can follow `simDay` or be pinned via `?time=`).

Within `SimEngine.tick()`, systems run in strict deterministic order:

1. **Clock & Time-of-Day Advance**: Increment `tick`, advance `timeOfDay` (unless locked by URL/photo override), track `simDay` and `simWeek` rollovers.
2. **Traffic Step (every tick, `dt = 0.1s`)**:
   * Advance intersection traffic signal phases (cycle ~16s).
   * Spawn new trips from homes/commercial/industrial/highway up to target concurrency based on population & building count; run congestion-aware A* on the lane graph.
   * Update every active vehicle: lookahead IDM car-following along current + next lane, junction yield/signal checks, advance `s`, transition across `LaneConnection`s, increment `stuckTicks`, despawn timed-out vehicles, accumulate lane flow samples.
3. **Congestion & Flow Decay (every 10 ticks = 1s)**:
   * Blend raw lane occupancy/slowdowns into per-segment EMA `congestion ∈ [0, 1]`.
4. **Utility Networks (when dirty or every 20 ticks)**:
   * Run BFS over power plants + power lines + buildings (64m conduction radius) to assign connected grids, balance MW supply/demand, and paint `powerCoverage`.
   * Run BFS over water pumps/towers + sewage outlets + water pipes (90m radius) to balance water/sewage capacity, sample river `waterPollution` at pump intakes, and paint `waterCoverage`.
5. **Scalar Fields Update (every 40 ticks, diffused cleanly)**:
   * Inject and diffuse `pollution` (industry, coal, landfill), `noise` (roads by traffic/type, commercial, wind), `waterPollution` (advected downstream along river flow vectors from sewage outlets), `serviceCoverage` (police/fire/health/education/parks/garbage), `landValue` (waterfront + parks + services - pollution - noise - abandonment), and `happiness`.
6. **Citizens, Households & Goods Balance (every 20 ticks)**:
   * Reconcile aggregate households/workers across residential buildings and job openings across commercial/industrial/office/civic buildings.
   * Compute education mix from school coverage, unemployment rate, housing vacancy, and local industrial goods supply vs commercial demand.
7. **RCI+O Demand Update (every 20 ticks)**:
   * Evaluate DESIGN formulas from jobs, vacancy, unemployment, goods ratio, education mix, and per-zone tax rates (`-50..+100`).
8. **Building Lifecycle (every 20 ticks)**:
   * Advance construction progress (`0 → 1`) on newly spawned buildings.
   * Check problem flags (`NO_POWER`, `NO_WATER`, `NO_WORKERS`, `HIGH_POLLUTION`, `HIGH_TAX`, `GARBAGE`) and increment/recover abandonment timers; transition severely neglected buildings to `abandoned`.
   * Attempt to spawn new growable buildings (`1×1..4×4`) on road-fronted zoned cells with power + water when zone demand > 0.
   * Evaluate level-up readiness (Res L1–L5, others L1–L3) from land value, service coverage, and education proxy.
9. **Economy & Milestones (every 60 ticks = 1/4 day; full weekly summary every 240 ticks)**:
   * Accrue per-zone tax revenue (weighted by level, occupancy, and tax rate) minus road/utility/service upkeep (scaled by budget slider).
   * Check population thresholds for Milestone unlocks and award milestone cash bonuses.

---

## 6. Future WASM Migration Path

Because `SimEngine` exposes only:
* `applyCommand(cmd: SimCommand)`
* `tick()`
* `getSnapshot(dirtyFlags)`

a future Rust/WASM module compiled with `wasm-bindgen` can replace `src/sim/` behind `src/sim/worker.ts` without touching `src/render/`, `src/main.ts`, or the snapshot buffer layout.
