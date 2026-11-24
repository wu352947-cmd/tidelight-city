/// <reference lib="webworker" />

import type { OverlayType } from './types.ts';
import { buildDemoTown } from './demo.ts';
import { SimEngine } from './engine.ts';
import {
  collectSnapshotTransferables,
  type ClientRevisions,
  type MainToWorkerMessage,
  type SimSpeed,
  type WorkerToMainMessage,
} from './protocol.ts';

declare const self: DedicatedWorkerGlobalScope;

let engine: SimEngine | null = null;
let speed: SimSpeed = 1;
let activeOverlay: OverlayType = 'none';
let timerId: ReturnType<typeof setInterval> | null = null;
let lastTickTime = 0;
let tickAccumulator = 0;
let lastSnapshotTime = 0;

const clientRevs: ClientRevisions = {
  road: -1,
  zone: -1,
  building: -1,
  utility: -1,
  overlay: -1,
  overlayType: 'none',
};

function resetRevisions(): void {
  clientRevs.road = -1;
  clientRevs.zone = -1;
  clientRevs.building = -1;
  clientRevs.utility = -1;
  clientRevs.overlay = -1;
  clientRevs.overlayType = 'none';
}

function send(msg: WorkerToMainMessage, transfer?: Transferable[]): void {
  if (transfer && transfer.length > 0) {
    self.postMessage(msg, transfer);
  } else {
    self.postMessage(msg);
  }
}

function pushSnapshot(force = false): void {
  if (!engine) return;
  const now = performance.now();
  if (!force && now - lastSnapshotTime < 48) return; // <= ~20 Hz
  lastSnapshotTime = now;
  engine.speed = speed;
  const snapshot = engine.getSnapshot(clientRevs, activeOverlay);
  const transferables = collectSnapshotTransferables(snapshot);
  send({ type: 'snapshot', snapshot }, transferables);
}

function startLoop(): void {
  if (timerId !== null) clearInterval(timerId);
  lastTickTime = performance.now();
  tickAccumulator = 0;

  timerId = setInterval(() => {
    if (!engine) return;
    const now = performance.now();
    const elapsedMs = Math.min(250, now - lastTickTime);
    lastTickTime = now;

    if (speed > 0) {
      // Nominal 1x = 10 ticks/sec (100ms per tick)
      const ticksPerMs = (10 * speed) / 1000;
      tickAccumulator += elapsedMs * ticksPerMs;
      const steps = Math.min(12, Math.floor(tickAccumulator));
      if (steps > 0) {
        tickAccumulator -= steps;
        engine.step(steps);
        pushSnapshot(false);
      }
    }
  }, 33);
}

self.onmessage = (ev: MessageEvent<MainToWorkerMessage>) => {
  const msg = ev.data;
  switch (msg.type) {
    case 'init': {
      engine = new SimEngine(msg.seed);
      activeOverlay = msg.overlay ?? 'none';
      if (msg.timeOfDay !== undefined) {
        engine.applyCommand({
          type: 'setTimeOfDay',
          hours: msg.timeOfDay,
          lock: msg.lockTime ?? true,
        });
      }
      if (msg.demo) {
        buildDemoTown(engine);
      }
      resetRevisions();
      const terrain = engine.getTerrainInitPayload();
      send({ type: 'ready', terrain }, [
        terrain.heights.buffer,
        terrain.waterMask.buffer,
        terrain.trees.buffer,
      ]);
      pushSnapshot(true);
      startLoop();
      break;
    }

    case 'command': {
      if (!engine) return;
      const result = engine.applyCommand(msg.cmd);
      send({ type: 'commandResult', requestId: msg.requestId, result });
      pushSnapshot(true);
      break;
    }

    case 'setSpeed': {
      speed = msg.speed;
      if (engine) engine.speed = speed;
      pushSnapshot(true);
      break;
    }

    case 'setOverlay': {
      activeOverlay = msg.overlay;
      pushSnapshot(true);
      break;
    }

    case 'requestFullSync': {
      resetRevisions();
      pushSnapshot(true);
      break;
    }

    case 'inspectBuilding': {
      const detail = engine ? engine.getBuildingDetail(msg.buildingId) : null;
      send({ type: 'buildingDetail', requestId: msg.requestId, detail });
      break;
    }

    case 'serialize': {
      if (!engine) return;
      const json = engine.serialize();
      send({ type: 'serialized', requestId: msg.requestId, json });
      break;
    }

    case 'deserialize': {
      if (!engine) return;
      let ok = false;
      let reason: string | undefined;
      let seedChanged = false;
      try {
        const parsed = JSON.parse(msg.json) as { version?: number; seed?: number };
        if (!parsed || parsed.version !== 1) {
          reason = 'Invalid save version';
        } else if (typeof parsed.seed === 'number' && parsed.seed !== engine.seed) {
          engine = SimEngine.deserialize(msg.json);
          seedChanged = true;
          ok = true;
        } else {
          ok = engine.loadSerialized(msg.json);
          if (!ok) reason = 'Invalid save version';
        }
      } catch (err) {
        reason = err instanceof Error ? err.message : String(err);
      }
      if (ok && engine) {
        if (seedChanged) {
          const terrain = engine.getTerrainInitPayload();
          send({ type: 'ready', terrain }, [
            terrain.heights.buffer,
            terrain.waterMask.buffer,
            terrain.trees.buffer,
          ]);
        }
        resetRevisions();
        pushSnapshot(true);
      }
      send({ type: 'commandResult', requestId: msg.requestId, result: { ok, reason } });
      break;
    }
  }
};
