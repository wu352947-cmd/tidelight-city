# Tidelight (汐光市) — Art Bible & Visual Direction

> **Visual Identity**: *Warm Pastel Tilt-Shift Miniature* — a sunlit coastal architectural diorama by day, glowing with amber windows and flowing light ribbons by dusk and night.  
> **IP Rule**: 100% original visual identity, palette, architectural silhouettes, procedural geometry, and inline SVG iconography. Zero borrowed assets or references to third-party city-builder brands or mascots.

---

## 1. Aesthetic Pillars

1. **Architectural Model Clarity**: Surfaces use clean, slightly elevated pastel saturation with crisp silhouette readability and soft ambient occlusion at structural seams — avoiding noisy gritty textures that turn into moiré at aerial zoom.
2. **Coastal Warmth ("Tidelight" / 汐光)**: Named after sunlight glistening across a tidal bay. Warm cream highlights, sunlit terracotta roofs, soft eucalyptus greens, and clear turquoise coastal water anchor the daytime mood.
3. **Instant Gameplay Readability**: Every zone, density tier, road hierarchy, and active overlay communicates its function within 200ms without opening a tooltip.
4. **Tilt-Shift Miniature Scale**: Subtle aerial perspective fog, crisp contact shadows, slightly toy-like proportions on vehicles and trees, and (in later batches) depth-of-field blur along top/bottom viewport bands when zoomed out.

---

## 2. Master Color Palette (Hex)

### 2.1 Terrain & Nature
| Swatch | Hex | Usage |
| :--- | :--- | :--- |
| Deep Bay Water | `#2B7A9B` | Open ocean / deep bay |
| Shallow Coastal Teal | `#5CC4C8` | River channel & coastal shallows |
| Shoreline Foam | `#EBF7F6` | Animated shoreline edge & sand-water blend |
| Warm Beach Sand | `#E9D9B8` | Coastal sandbar & riverbanks (`0m – 2.2m`) |
| Valley Meadow Light | `#93C47D` | Flat buildable coastal plain |
| Valley Meadow Lush | `#74AD66` | Gentle slopes & parkland |
| Upland Pine Moss | `#5B8C5A` | Rolling hills (`22m – 44m`) |
| Coastal Limestone Rock | `#A3A096` | Steep slopes & ridge crests (`> 44m`) |
| Tree Canopy Warm | `#5D9E5C` / `#78B468` / `#4A8252` | Clustered foliage variants |
| Tree Trunk | `#7C604C` | Warm cedar bark |

### 2.2 Roads & Infrastructure
| Swatch | Hex | Usage |
| :--- | :--- | :--- |
| Asphalt Fresh | `#525864` | Small & 4-lane roads (warm charcoal, never pure black) |
| Highway Asphalt | `#454B56` | Outside-connection highway surface |
| Concrete Sidewalk | `#D5CFC4` | Warm light-stone curbs & pedestrian paths |
| Median Planter | `#7BB36E` | 4-lane avenue central green strip |
| Lane Marking Cream | `#F4EFE2` | Dashed dividers & crosswalks |
| Center Yellow Line | `#E8B84B` | Double-center divider on avenues |
| Power Pylon Steel | `#8B98A6` | High-voltage towers & lines |
| Underground Pipe Water | `#3B9ED8` | Clean water pipe overlay |
| Underground Pipe Sewage | `#8E6B47` | Sewage pipe overlay |

### 2.3 Zoning Tints (Translucent Ground Paint & UI Badges)
| Zone | Base Hex | Fill Opacity | Role |
| :--- | :--- | :---: | :--- |
| Low-Density Residential (`res_low`) | `#7ED389` | `0.48` | Mint meadow green |
| High-Density Residential (`res_high`) | `#2F9E66` | `0.56` | Deep emerald green |
| Low-Density Commercial (`com_low`) | `#69B8F5` | `0.48` | Clear sky blue |
| High-Density Commercial (`com_high`) | `#2D74C4` | `0.56` | Coastal cobalt blue |
| Generic Industry (`ind`) | `#F0B94D` | `0.52` | Warm amber ochre |
| Office (`office`) | `#49C6C1` | `0.52` | Crisp seafoam teal |

### 2.4 Semantic & Overlay Gradients
* **Traffic Congestion**: `#4CC38A` (Free) → `#F2C94C` (Moderate) → `#EB7B3C` (Heavy) → `#D63E4F` (Gridlock)
* **Land Value**: `#D4DCE3` (Low) → `#7BC8A4` (Medium) → `#38A3A5` (High) → `#F2C94C` (Prime Waterfront)
* **Ground Pollution**: Transparent → `#A68A5B` (Light) → `#8A567C` (Heavy)
* **Power Coverage**: `#FFF3B0` / `#F6C84C` (Powered) vs `#9BA4B0` (Unpowered)
* **Water Coverage**: `#58B8EE` (Clean Water) vs `#9C7A54` (Polluted Intake)
* **Alert / Pause Frame**: Soft coral `#E55B5B`

---

## 3. Lighting & Sky Schedule (Time-of-Day)

All lights operate in linear sRGB with `ACESFilmicToneMapping` (exposure `1.05` daytime, `0.95` night).

| Phase | Sim Hours | Sky Zenith | Sky Horizon / Fog | Sun/Moon Color & Intensity | Hemisphere (Sky / Ground) | Emissives |
| :--- | :---: | :---: | :---: | :---: | :---: | :---: |
| **Dawn (晨曦)** | `05:30 – 07:30` | `#6E8EC2` | `#F6C9A8` | `#FFB982`, `1.8` (low east) | `#A5BEE0` / `#8A7C70` (`0.75`) | Fading out |
| **Day (晴昼)** | `08:00 – 16:30` | `#5DA7E8` | `#D7ECFA` | `#FFF6E3`, `2.4` (high SW) | `#B6DCFF` / `#9E9985` (`0.95`) | Off |
| **Dusk (暮光)** | `17:00 – 19:30` | `#4E5A99` | `#F49C6E` | `#FF8852`, `2.0` (low west) | `#998EC2` / `#6E5854` (`0.65`) | Warming up (50%→100%) |
| **Night (星夜)** | `20:00 – 05:00` | `#121C36` | `#233459` | `#8FB5E8`, `0.55` (moon) | `#3A548A` / `#1D2330` (`0.42`) | Full windows, streetlights, headlights |

---

## 4. Building Style Rules (Zone × Level)

All building meshes MUST be **solid, watertight closed manifolds** with a downward **Foundation Skirt (`-4m` below `y = 0`)** so structures on coastal slopes never float or expose hollow undersides.

### 4.1 Growable Buildings
* **Low-Density Residential (`res_low`, L1–L5)**:
  * Palette: Cream plaster `#F7F1E5`, blush stucco `#F2DDD0`, pale sage `#DCE7DC`, warm timber `#C79A6B`; roofs in terracotta `#C96A50`, slate blue `#5E748A`, and cedar `#9B6A4A`.
  * Silhouette: L1–L2 compact cottages & pitched-roof houses (`6m–9m`); L3–L5 two-story modern villas with overhangs, porches, chimneys, and garden plots (`9m–14m`).
* **High-Density Residential (`res_high`, L1–L5)**:
  * Palette: Ivory concrete `#EFECE6`, warm stone `#DFD8CE`, pastel coral/mint accents, glazed balconies `#6E95B2`.
  * Silhouette: Mid-rise slabs at L1–L2 (`18m–28m`), terraced modern apartment towers with recessed balcony grids and rooftop penthouses at L3–L5 (`32m–64m`).
* **Low-Density Commercial (`com_low`, L1–L3)**:
  * Palette: Crisp white `#F5F6F8`, coral `#E87A64`, sunny mustard `#F0BE55`, sea blue `#5299D3` awnings and signage strips.
  * Silhouette: Corner shops, cafés, bakeries, small groceries (`6m–13m`) with flat parapets and striped street awnings.
* **High-Density Commercial (`com_high`, L1–L3)**:
  * Palette: Glass atrium teal `#5A9EC2`, brushed warm aluminum `#CFD6DE`, glowing storefront plinths.
  * Silhouette: Multi-story department stores & boutique malls (`20m–46m`) with stepped podiums and rooftop billboards/skylights.
* **Generic Industry (`ind`, L1–L3)**:
  * Palette: Weathered ochre `#D4A96A`, industrial slate `#747F8A`, rust accent `#B8684C`, corrugated roof `#8E969E`.
  * Silhouette: Warehouses, sawtooth-roof workshops, silos, and smokestacks (`8m–18m`).
* **Office (`office`, L1–L3)**:
  * Palette: Reflective seafoam glass `#66AAB8`, silver-white mullions `#E5ECEF`, warm lobby stone.
  * Silhouette: Clean modernist blocks at L1 (`20m–30m`) rising to chamfered curtain-wall towers with crowns at L3 (`45m–78m`).

### 4.2 Utilities & Civic Services
* **Power**: Coal plant (brick hall + twin striped chimneys `#C45D4B`), Wind turbine (tall crisp white mast `#F4F6F8` + 3 rotating blades), Solar farm (tilted navy photovoltaic arrays `#2A4A72`).
* **Water & Sewage**: Water pump (coastal blue-roofed pump house `#3B9ED8`), Water tower (elevated cylindrical tank on stilts), Sewage outlet (concrete river outfall with warning stripes).
* **Civic Services**: Distinct roof iconography & accent colors — Clinic/Hospital (`#E85D68` cross accent on white), Fire Station (`#D94F3D` bay doors), Police Station (`#3D6EB8` blue trim), Elementary/High School (`#E5A93C` warm brick + courtyard), Parks (`#62B36B` landscaped trees, paths, pond/fountain), Landfill (`#8E7F65` fenced earthworks).

---

## 5. Road, Vehicle, Tree & Water Specs

* **Roads**: Cubic Bezier ribbons sampled adaptively (every `4m–6m` along arc length, lifting `+0.16m` above local terrain height with `polygonOffset` to prevent z-fighting).
  * `small_2lane`: `10m` total (`6.8m` asphalt + `1.6m` sidewalks each side).
  * `tree_2lane`: `14m` total (`6.8m` asphalt + `3.6m` tree-lined verges each side).
  * `oneway_2lane`: `10m` total (2 unidirectional lanes + chevron markings).
  * `avenue_4lane`: `20m` total (`13.6m` divided asphalt + `2.4m` planted median + `2.0m` sidewalks).
  * `highway`: `16m` total (divided barrier, no sidewalks, no zone frontage).
* **Vehicles**: Compact stylized miniature proportions (`~4.4m × 2.0m × 1.6m` sedans; `~6.8m × 2.4m × 2.8m` delivery trucks; white/red/blue civic service vans). Pastel body palette: `#F2EFE9`, `#E56B5B`, `#4B9CD3`, `#F2C14E`, `#5AB38A`, `#8D7BC4`, `#E8925A`. Headlights (`#FFF3C4`) and red brake/tail lights (`#FF3B4B`) illuminate at dusk/night and under braking.
* **Trees**: Clustered rounded pine & broadleaf silhouettes in 3 warm greens, instanced across hills and tree-lined streets; gentle vertex-shader wind sway in Batches 2+.
* **Water**: Translucent coastal surface plane at `Y = 0.0m`, blending deep `#2B7A9B` over submerged depths with `#5CC4C8` shallows and soft specular sunlight ripples.

---

## 6. UI Style System (Original Glassmorphic Blueprint)

* **Language**: Simplified Chinese (`简体中文`) primary labels paired with concise English sublabels where helpful (e.g., `汐光市 · Tidelight`).
* **Surface**: Warm frosted translucent glass (`rgba(252, 250, 246, 0.84)` in light mode, subtle `backdrop-filter: blur(12px)`), `1px solid rgba(40, 62, 82, 0.14)` hairline borders, crisp `12px–16px` rounded corners, gentle elevation shadow `0 8px 24px rgba(24, 42, 62, 0.12)`.
* **Typography**: Clean geometric sans (`"PingFang SC", "Noto Sans SC", "Inter", system-ui, sans-serif`) with `font-variant-numeric: tabular-nums` for live treasury, population, and date readouts.
* **Icons**: Custom inline SVGs with `1.75px` rounded stroke weight — zero raster sprite sheets or external icon fonts.
* **Responsive Rules**: Desktop top HUD bar + bottom builder dock; mobile portrait collapses secondary controls into touch-friendly (`>= 44px`) drawers respecting `env(safe-area-inset-*)`.
