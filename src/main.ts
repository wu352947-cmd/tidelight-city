import {
  MILESTONES,
  PLOPPABLE_SPECS,
  ROAD_SPECS,
  ZONE_SPECS,
  type ActiveZoneType,
  type BudgetCategory,
  type OverlayType,
  type RoadType,
} from './sim/types.ts';
import type {
  MainToWorkerMessage,
  SimCommand,
  SimSnapshot,
  SimSpeed,
  WorkerToMainMessage,
} from './sim/protocol.ts';
import { RtsCameraController, type CameraPreset } from './render/camera.ts';
import { BuildingMeshLayer } from './render/buildingMesh.ts';
import { HudOverlay, type ProblemMarkerInput } from './render/hud.ts';
import { ToolPreviewLayer } from './render/previewMesh.ts';
import { detectQualityProfile, getQualityProfile, type QualityLevel } from './render/quality.ts';
import { SceneRenderer } from './render/renderer.ts';
import { RoadMeshLayer } from './render/roadMesh.ts';
import { TerrainMeshLayer } from './render/terrainMesh.ts';
import { VehicleMeshLayer } from './render/vehicleMesh.ts';
import { ZoneMeshLayer } from './render/zoneMesh.ts';
import {
  deleteSaveSlot,
  listSaveSlots,
  readSaveSlot,
  writeSaveSlot,
} from './tools/saveStorage.ts';
import { ToolController } from './tools/toolController.ts';
import type { ActiveTool, RoadDrawMode, ToolCategory } from './tools/toolTypes.ts';

const VALID_OVERLAYS = new Set<OverlayType>([
  'none',
  'traffic',
  'landvalue',
  'pollution',
  'noise',
  'power',
  'water',
  'services',
  'happiness',
]);

const VALID_TOOL_CATS = new Set<ToolCategory>([
  'road',
  'zone',
  'utility',
  'service',
  'park',
  'bulldoze',
  'info',
]);

interface BootParams {
  demo: boolean;
  seed: number;
  timeOfDay: number;
  lockTime: boolean;
  overlay: OverlayType;
  cam: CameraPreset;
  rendererMode: 'webgl';
  qualityLevel: QualityLevel;
  initialTool: ToolCategory | 'budget' | null;
  previewRoad: boolean;
}

function parseUrlParams(): BootParams {
  const qs = new URLSearchParams(window.location.search);

  const demoRaw = qs.get('demo');
  const demo = demoRaw === '1' || demoRaw === 'true';

  const seedParam = Number(qs.get('seed'));
  const seed = Number.isFinite(seedParam) && seedParam > 0 ? Math.floor(seedParam) : 202604;

  const timeRaw = (qs.get('time') ?? '').toLowerCase();
  let timeOfDay = 10.5;
  let lockTime = false;
  if (timeRaw === 'day') {
    timeOfDay = 10.5;
    lockTime = true;
  } else if (timeRaw === 'dusk') {
    timeOfDay = 18.2;
    lockTime = true;
  } else if (timeRaw === 'night') {
    timeOfDay = 22.5;
    lockTime = true;
  } else if (timeRaw === 'dawn') {
    timeOfDay = 6.5;
    lockTime = true;
  } else if (timeRaw !== '' && Number.isFinite(Number(timeRaw))) {
    timeOfDay = ((Number(timeRaw) % 24) + 24) % 24;
    lockTime = true;
  }

  const ovRaw = (qs.get('overlay') ?? 'none').toLowerCase() as OverlayType;
  const overlay: OverlayType = VALID_OVERLAYS.has(ovRaw) ? ovRaw : 'none';

  const camRaw = (qs.get('cam') ?? '').toLowerCase();
  let cam: CameraPreset;
  if (camRaw === 'street') cam = 'street';
  else if (camRaw === 'overview') cam = 'overview';
  else if (camRaw === 'newcity') cam = 'newcity';
  else cam = demo ? 'overview' : 'newcity';

  const rendererParam = (qs.get('renderer') ?? 'webgl').toLowerCase();
  const rendererMode: 'webgl' = rendererParam === 'webgl' ? 'webgl' : 'webgl';

  const qualityProfile = detectQualityProfile(qs);

  const toolRaw = (qs.get('tool') ?? '').toLowerCase();
  let initialTool: ToolCategory | 'budget' | null = null;
  if (toolRaw === 'budget') {
    initialTool = 'budget';
  } else if (VALID_TOOL_CATS.has(toolRaw as ToolCategory)) {
    initialTool = toolRaw as ToolCategory;
  }
  const previewRoad = qs.get('preview') === '1' || qs.get('preview') === 'true';

  return {
    demo,
    seed,
    timeOfDay,
    lockTime,
    overlay,
    cam,
    rendererMode,
    qualityLevel: qualityProfile.level,
    initialTool,
    previewRoad,
  };
}

function describeMilestoneUnlocks(tier: number): string {
  const unlocked: string[] = [];
  for (const r of Object.values(ROAD_SPECS)) {
    if (r.milestoneTier === tier) unlocked.push(r.labelZh);
  }
  for (const z of Object.values(ZONE_SPECS)) {
    if (z.milestoneTier === tier) unlocked.push(z.labelZh);
  }
  for (const p of Object.values(PLOPPABLE_SPECS)) {
    if (p.milestoneTier === tier) unlocked.push(p.labelZh);
  }
  return unlocked.length > 0 ? `已解锁：${unlocked.join('、')}` : '';
}

function bootstrap(): void {
  const container = document.getElementById('app');
  if (!container) {
    throw new Error('Missing #app container');
  }

  const params = parseUrlParams();
  let qualityProfile = getQualityProfile(params.qualityLevel);

  // Initialize Three.js WebGL2 scene & subsystems
  const sceneRenderer = new SceneRenderer(container, qualityProfile);
  const canvas = sceneRenderer.renderer.domElement;
  const aspect =
    (container.clientWidth || window.innerWidth) /
    Math.max(1, container.clientHeight || window.innerHeight);
  const cameraCtrl = new RtsCameraController(canvas, aspect);
  cameraCtrl.applyPreset(params.cam);

  const terrainLayer = new TerrainMeshLayer();
  const zoneLayer = new ZoneMeshLayer();
  const roadLayer = new RoadMeshLayer();
  const buildingLayer = new BuildingMeshLayer();
  const vehicleLayer = new VehicleMeshLayer();
  const previewLayer = new ToolPreviewLayer();

  terrainLayer.setQuality(qualityProfile);
  buildingLayer.setQuality(qualityProfile);
  roadLayer.setSharedTextures(buildingLayer.getSharedTextures());

  sceneRenderer.scene.add(
    terrainLayer.group,
    zoneLayer.group,
    roadLayer.group,
    buildingLayer.group,
    vehicleLayer.group,
    previewLayer.group
  );

  let currentMood = sceneRenderer.applyTimeOfDay(params.timeOfDay);

  const syncWaterEnvironment = () => {
    terrainLayer.syncEnvironment({
      horizonColor: currentMood.horizon,
      zenithColor: currentMood.zenith,
      sunDir: currentMood.sunDir,
      sunColor: currentMood.sunColor,
      fogColor: sceneRenderer.fog.color,
      fogNear: sceneRenderer.fog.near,
      fogFar: sceneRenderer.fog.far,
      emissiveStrength: currentMood.emissiveStrength,
    });
  };

  // Spawn simulation Web Worker
  const worker = new Worker(new URL('./sim/worker.ts', import.meta.url), { type: 'module' });
  const postToWorker = (msg: MainToWorkerMessage) => worker.postMessage(msg);

  let nextReqId = 1;
  const pendingSerialize = new Map<number, (json: string) => void>();
  const pendingCommandCb = new Map<number, (ok: boolean, reason?: string) => void>();

  let terrainReady = false;
  let lastOverlayType: OverlayType = 'none';
  let latestSnapshot: SimSnapshot | null = null;
  let inspectedBuildingId: number | null = null;
  let milestoneBaselineSet = false;
  let seenMilestoneTier = 0;
  let hasPlayerEdits = false;
  let initialToolApplied = false;

  const sendCommand = (cmd: SimCommand, onDone?: (ok: boolean, reason?: string) => void) => {
    const requestId = nextReqId++;
    if (
      cmd.type === 'buildRoad' ||
      cmd.type === 'upgradeRoad' ||
      cmd.type === 'bulldozeRoad' ||
      cmd.type === 'zoneArea' ||
      cmd.type === 'placeBuilding' ||
      cmd.type === 'buildUtilityLine' ||
      cmd.type === 'bulldozeUtilityLine' ||
      cmd.type === 'bulldozeBuilding'
    ) {
      hasPlayerEdits = true;
    }
    pendingCommandCb.set(requestId, (ok, reason) => {
      if (!ok && reason) {
        hud.showToast(reason, 'warn');
      }
      onDone?.(ok, reason);
    });
    postToWorker({ type: 'command', cmd, requestId });
  };

  const requestInspect = (buildingId: number) => {
    inspectedBuildingId = buildingId;
    const requestId = nextReqId++;
    postToWorker({ type: 'inspectBuilding', buildingId, requestId });
  };

  const requestSerialize = (): Promise<string> =>
    new Promise((resolve) => {
      const requestId = nextReqId++;
      pendingSerialize.set(requestId, resolve);
      postToWorker({ type: 'serialize', requestId });
    });

  const saveToSlot = async (slotId: string, silent = false) => {
    if (!latestSnapshot) return;
    const json = await requestSerialize();
    const res = writeSaveSlot(
      slotId,
      {
        population: latestSnapshot.stats.population,
        money: latestSnapshot.stats.money,
        simDay: latestSnapshot.simDay,
        milestoneNameZh: latestSnapshot.stats.milestoneNameZh,
      },
      json
    );
    hud.setSaveSlots(listSaveSlots());
    if (!silent) {
      if (res.ok) {
        hud.showToast(slotId === 'autosave' ? '自动存档完成' : '城市存档已保存', 'success');
      } else {
        hud.showToast(`保存失败：${res.reason ?? '未知错误'}`, 'warn');
      }
    }
  };

  const loadFromSlot = (slotId: string) => {
    const rec = readSaveSlot(slotId);
    if (!rec) {
      hud.showToast('该存档槽为空或已损坏', 'warn');
      return;
    }
    const requestId = nextReqId++;
    pendingCommandCb.set(requestId, (ok, reason) => {
      if (ok) {
        milestoneBaselineSet = false;
        inspectedBuildingId = null;
        previewLayer.clearSelection();
        hud.setInspectedBuilding(null);
        hud.setSaveOpen(false);
        hud.showToast(`已读取 ${rec.label}`, 'success', `第 ${rec.simDay} 天 · ${rec.population} 人`);
      } else {
        hud.showToast(`读取失败：${reason ?? '存档格式不兼容'}`, 'warn');
      }
    });
    postToWorker({ type: 'deserialize', json: rec.stateJson, requestId });
  };

  const startNewCity = (demo: boolean) => {
    milestoneBaselineSet = false;
    hasPlayerEdits = false;
    inspectedBuildingId = null;
    previewLayer.clearSelection();
    hud.setInspectedBuilding(null);
    hud.clearTool();
    cameraCtrl.applyPreset(demo ? 'overview' : 'newcity');
    postToWorker({
      type: 'init',
      seed: params.seed,
      demo,
      timeOfDay: 10.5,
      lockTime: params.lockTime,
      overlay: 'none',
    });
    hud.showToast(demo ? '已载入汐光市示例小镇' : '已创建空白海湾新城，从北方高速开始建造吧！', 'info');
  };

  const applyQualityLevel = (level: QualityLevel) => {
    qualityProfile = getQualityProfile(level);
    sceneRenderer.setQuality(qualityProfile);
    terrainLayer.setQuality(qualityProfile);
    buildingLayer.setQuality(qualityProfile);
    if (terrainReady) {
      const exclusions = [
        ...roadLayer.getExclusionPoints(),
        ...buildingLayer.getExclusionPoints(),
      ];
      terrainLayer.buildTrees(exclusions);
    }
    debugHandle.quality = qualityProfile.level;
    hud.setQualityLevel(qualityProfile.level);
  };

  const hud = new HudOverlay(container, {
    onSpeedChange: (speed: SimSpeed) => {
      postToWorker({ type: 'setSpeed', speed });
    },
    onOverlayChange: (overlay: OverlayType) => {
      postToWorker({ type: 'setOverlay', overlay });
    },
    onCameraPreset: (preset: CameraPreset) => {
      cameraCtrl.applyPreset(preset);
    },
    onToolChange: (tool: ActiveTool, _cat: ToolCategory) => {
      toolCtrl.setTool(tool);
      zoneLayer.setShowAvailableGrid(tool.kind === 'zone');
      const showPipes =
        (tool.kind === 'utility_line' && tool.lineKind === 'water_pipe') ||
        (tool.kind === 'ploppable' &&
          (tool.ploppable === 'water_pump' ||
            tool.ploppable === 'water_tower' ||
            tool.ploppable === 'sewage_outlet'));
      roadLayer.setForceShowPipes(showPipes);
      canvas.style.cursor = tool.kind === 'none' || tool.kind === 'info' ? 'grab' : 'crosshair';
    },
    onRotatePloppable: () => {
      toolCtrl.rotatePloppable(Math.PI / 4);
      const t = toolCtrl.getTool();
      if (t.kind === 'ploppable') {
        hud.setPloppableYaw(t.yaw);
      }
    },
    onSetTaxRate: (zone: ActiveZoneType, rate: number) => {
      sendCommand({ type: 'setTaxRate', zone, rate });
    },
    onSetBudget: (category: BudgetCategory, percent: number) => {
      sendCommand({ type: 'setBudget', category, percent });
    },
    onSaveSlot: (slotId: string) => {
      void saveToSlot(slotId, false);
    },
    onLoadSlot: (slotId: string) => {
      loadFromSlot(slotId);
    },
    onDeleteSlot: (slotId: string) => {
      deleteSaveSlot(slotId);
      hud.setSaveSlots(listSaveSlots());
      hud.showToast('已删除存档', 'info');
    },
    onNewCity: (demo: boolean) => {
      startNewCity(demo);
    },
    onBulldozeBuilding: (buildingId: number) => {
      sendCommand({ type: 'bulldozeBuilding', buildingId }, (ok) => {
        if (ok) {
          inspectedBuildingId = null;
          previewLayer.clearSelection();
          hud.setInspectedBuilding(null);
        }
      });
    },
    onCloseInspect: () => {
      inspectedBuildingId = null;
      previewLayer.clearSelection();
      hud.setInspectedBuilding(null);
    },
    onPickBuilding: (buildingId: number) => {
      const b = toolCtrl.buildings.find((item) => item.id === buildingId);
      if (b) {
        previewLayer.showSelectedBuilding(b.x, b.y, b.z, b.yaw, b.width, b.depth, b.height);
        requestInspect(buildingId);
      }
    },
    onQualityChange: (level: QualityLevel) => {
      applyQualityLevel(level);
      hud.showToast(`已切换至${level === 'high' ? '精致(高)' : level === 'medium' ? '均衡(中)' : '流畅(低)'}画质`, 'info');
    },
  });

  hud.setSaveSlots(listSaveSlots());
  hud.setQualityLevel(qualityProfile.level);

  const toolCtrl = new ToolController(canvas, cameraCtrl.camera, terrainLayer, previewLayer, {
    sendCommand: (cmd) => sendCommand(cmd),
    onReadout: (ro) => hud.updateReadout(ro),
    onToolCleared: () => {
      hud.clearTool();
      zoneLayer.setShowAvailableGrid(false);
      roadLayer.setForceShowPipes(false);
      canvas.style.cursor = 'grab';
    },
    onInspectBuilding: (b) => {
      if (!b) {
        inspectedBuildingId = null;
        hud.setInspectedBuilding(null);
      } else {
        requestInspect(b.id);
      }
    },
    onToast: (msg, tone) => hud.showToast(msg, tone),
  });

  canvas.style.cursor = 'grab';

  cameraCtrl.setHooks({
    isToolActive: () => toolCtrl.isToolActive(),
    onHover: (x, y) => toolCtrl.handleHover(x, y),
    onToolDown: (x, y, pt) => toolCtrl.handleToolDown(x, y, pt),
    onToolMove: (x, y, pt) => toolCtrl.handleToolMove(x, y, pt),
    onToolUp: (x, y, pt, dragged) => toolCtrl.handleToolUp(x, y, pt, dragged),
    onToolCancel: () => toolCtrl.resetStroke(),
    onTapSelect: (x, y) => toolCtrl.handleTapSelect(x, y),
    onLongPress: (x, y) => toolCtrl.handleTapSelect(x, y),
    onRightClick: () => toolCtrl.cancelOrExit(),
    onKeyDown: (e) => {
      if (e.code === 'Escape') {
        hud.setBudgetOpen(false);
        hud.setSaveOpen(false);
        hud.setAboutOpen(false);
        toolCtrl.cancelOrExit();
      } else if (e.code === 'KeyR') {
        toolCtrl.rotatePloppable(e.shiftKey ? Math.PI / 12 : Math.PI / 4);
        const t = toolCtrl.getTool();
        if (t.kind === 'ploppable') {
          hud.setPloppableYaw(t.yaw);
        }
      }
    },
  });

  const debugHandle = {
    ready: false,
    renderer: params.rendererMode,
    quality: qualityProfile.level,
    postProcess: sceneRenderer.isPostProcessActive(),
    tick: 0,
    population: 0,
    buildingCount: 0,
    vehicleCount: 0,
    selectCategory: (cat: ToolCategory) => hud.selectCategory(cat),
    setRoadOptions: (rt?: RoadType, mode?: RoadDrawMode, snap?: boolean) =>
      hud.setRoadOptions(rt, mode, snap),
    showDemoRoadPreview: (
      p0: { x: number; z: number },
      p1: { x: number; z: number },
      ctrl?: { x: number; z: number }
    ) => toolCtrl.showDemoRoadPreview(p0, p1, ctrl),
    openBudget: (open = true) => hud.setBudgetOpen(open),
    openSave: (open = true) => hud.setSaveOpen(open),
    openAbout: (open = true) => hud.setAboutOpen(open),
    sendCommand: (cmd: SimCommand) => sendCommand(cmd),
    getStats: () => latestSnapshot?.stats ?? null,
  };
  (window as unknown as Record<string, unknown>).__TIDELIGHT__ = debugHandle;

  worker.onmessage = (ev: MessageEvent<WorkerToMainMessage>) => {
    const msg = ev.data;
    if (msg.type === 'ready') {
      terrainLayer.init(msg.terrain);
      syncWaterEnvironment();
      terrainReady = true;
      return;
    }

    if (msg.type === 'commandResult') {
      if (msg.requestId !== undefined) {
        const cb = pendingCommandCb.get(msg.requestId);
        if (cb) {
          pendingCommandCb.delete(msg.requestId);
          cb(msg.result.ok, msg.result.reason);
        }
      }
      return;
    }

    if (msg.type === 'buildingDetail') {
      if (msg.detail && msg.detail.id === inspectedBuildingId) {
        hud.setInspectedBuilding(msg.detail);
      } else if (!msg.detail && inspectedBuildingId !== null) {
        inspectedBuildingId = null;
        previewLayer.clearSelection();
        hud.setInspectedBuilding(null);
      }
      return;
    }

    if (msg.type === 'serialized') {
      const cb = pendingSerialize.get(msg.requestId);
      if (cb) {
        pendingSerialize.delete(msg.requestId);
        cb(msg.json);
      }
      return;
    }

    if (msg.type === 'snapshot') {
      const snap = msg.snapshot;
      latestSnapshot = snap;

      currentMood = sceneRenderer.applyTimeOfDay(snap.timeOfDay);
      syncWaterEnvironment();
      roadLayer.updateLighting(currentMood.emissiveStrength, 0);
      zoneLayer.updateLighting(currentMood.emissiveStrength);

      const sampleH = (x: number, z: number) => terrainLayer.sampleHeight(x, z);

      let geometryLayoutChanged = false;
      if (snap.roads) {
        if (roadLayer.updateRoads(snap.roads, sampleH)) {
          geometryLayoutChanged = true;
        }
      }
      if (snap.utilities) {
        roadLayer.updateUtilities(snap.utilities, sampleH);
      }
      if (snap.zones) {
        zoneLayer.updateFromSnapshot(snap.zones, sampleH);
      }
      if (snap.buildings) {
        if (buildingLayer.updateFromSnapshot(snap.buildings)) {
          geometryLayoutChanged = true;
        }
      }

      if (terrainReady && geometryLayoutChanged) {
        const exclusions = [
          ...roadLayer.getExclusionPoints(),
          ...buildingLayer.getExclusionPoints(),
        ];
        terrainLayer.buildTrees(exclusions);
      }

      if (snap.overlayField) {
        terrainLayer.applyOverlay(snap.overlayType, snap.overlayField);
        lastOverlayType = snap.overlayType;
      } else if (snap.overlayType !== lastOverlayType) {
        if (snap.overlayType === 'none' || snap.overlayType === 'traffic') {
          terrainLayer.applyOverlay(snap.overlayType, undefined);
        }
        lastOverlayType = snap.overlayType;
      }
      roadLayer.updateTrafficOverlay(snap.overlayType, snap.roadCongestion);

      vehicleLayer.updateFromSnapshot(snap.vehicles, currentMood.emissiveStrength);
      toolCtrl.syncSnapshot(snap);

      if (!milestoneBaselineSet) {
        milestoneBaselineSet = true;
        seenMilestoneTier = snap.stats.milestoneTier;
      } else if (snap.stats.milestoneTier > seenMilestoneTier) {
        seenMilestoneTier = snap.stats.milestoneTier;
        const mDef = MILESTONES.find((m) => m.tier === seenMilestoneTier);
        if (mDef) {
          const unlocks = describeMilestoneUnlocks(mDef.tier);
          hud.showToast(
            `里程碑达成：${mDef.nameZh}！奖励 ¥${mDef.bonusMoney.toLocaleString('zh-CN')}`,
            'milestone',
            unlocks
          );
        }
      }

      hud.update(snap, currentMood.isNight);

      debugHandle.ready = terrainReady;
      debugHandle.tick = snap.tick;
      debugHandle.population = snap.stats.population;
      debugHandle.buildingCount = snap.stats.buildingCount;
      debugHandle.vehicleCount = snap.stats.vehicleCount;

      if (terrainReady && !initialToolApplied && params.initialTool) {
        initialToolApplied = true;
        if (params.initialTool === 'budget') {
          hud.setBudgetOpen(true);
        } else {
          hud.selectCategory(params.initialTool);
          if (params.initialTool === 'road' && params.previewRoad) {
            hud.setRoadOptions(params.demo ? 'tree_2lane' : 'small_2lane', 'curve', true);
            if (params.demo) {
              toolCtrl.showDemoRoadPreview(
                { x: 25, z: 20 },
                { x: -52, z: -78 },
                { x: -56, z: 14 }
              );
            } else {
              toolCtrl.showDemoRoadPreview(
                { x: 240, z: -240 },
                { x: 130, z: -40 },
                { x: 240, z: -90 }
              );
            }
          }
        }
      }
    }
  };

  worker.onerror = (err) => {
    console.error('Simulation worker error:', err.message);
  };

  postToWorker({
    type: 'init',
    seed: params.seed,
    demo: params.demo,
    timeOfDay: params.timeOfDay,
    lockTime: params.lockTime,
    overlay: params.overlay,
  });

  window.addEventListener('resize', () => {
    sceneRenderer.resize(cameraCtrl.camera);
  });

  setInterval(() => {
    if (inspectedBuildingId !== null) {
      requestInspect(inspectedBuildingId);
    }
  }, 1100);

  setInterval(() => {
    if (terrainReady && latestSnapshot && hasPlayerEdits) {
      void saveToSlot('autosave', true);
    }
  }, 60000);

  let problemRefreshAccum = 0;
  sceneRenderer.startLoop((dt) => {
    cameraCtrl.update(dt);
    sceneRenderer.updateCameraVisuals(cameraCtrl.target, cameraCtrl.distance, cameraCtrl.pitch);
    terrainLayer.update(dt, currentMood.emissiveStrength);
    buildingLayer.update(dt, currentMood.emissiveStrength);
    roadLayer.updateLighting(currentMood.emissiveStrength, dt);

    problemRefreshAccum += dt;
    if (problemRefreshAccum >= 0.08) {
      problemRefreshAccum = 0;
      const markers: ProblemMarkerInput[] = [];
      const camPos = cameraCtrl.camera.position;
      const isToolDrawerOpen = toolCtrl.isToolActive();
      const bottomSafe = isToolDrawerOpen ? 210 : 96;
      const candidates: Array<{
        id: number;
        sx: number;
        sy: number;
        flags: number;
        priority: number;
        d2: number;
      }> = [];
      for (let i = 0; i < toolCtrl.buildings.length; i++) {
        const b = toolCtrl.buildings[i];
        if (b.problems === 0) continue;
        const proj = toolCtrl.projectWorldToScreen(b.x, b.y + b.height + 3.5, b.z);
        if (!proj.visible) continue;
        if (proj.y < 72 || proj.y > window.innerHeight - bottomSafe) continue;
        if (proj.x < 18 || proj.x > window.innerWidth - 18) continue;
        const dx = b.x - camPos.x;
        const dz = b.z - camPos.z;
        const urgent = (b.problems & ((1 << 0) | (1 << 1) | (1 << 2) | (1 << 10))) !== 0 ? 0 : 1;
        candidates.push({
          id: b.id,
          sx: proj.x,
          sy: proj.y,
          flags: b.problems,
          priority: urgent,
          d2: dx * dx + dz * dz,
        });
      }
      candidates.sort((a, b) => (a.priority !== b.priority ? a.priority - b.priority : a.d2 - b.d2));

      const maxBadges = window.innerWidth <= 640 ? 6 : 8;
      const minSpacingSq = 46 * 46;
      for (let i = 0; i < candidates.length && markers.length < maxBadges; i++) {
        const c = candidates[i];
        let tooClose = false;
        for (let j = 0; j < markers.length; j++) {
          const m = markers[j];
          const ddx = c.sx - m.screenX;
          const ddy = c.sy - m.screenY;
          if (ddx * ddx + ddy * ddy < minSpacingSq) {
            tooClose = true;
            break;
          }
        }
        if (!tooClose) {
          markers.push({ buildingId: c.id, screenX: c.sx, screenY: c.sy, flags: c.flags });
        }
      }
      hud.updateProblemMarkers(markers);
    }
  }, cameraCtrl.camera);
}

bootstrap();
