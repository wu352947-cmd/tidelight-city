#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';
import puppeteer from 'puppeteer-core';

function parseArgs(argv) {
  const opts = {
    url: 'http://127.0.0.1:5173/?demo=1&renderer=webgl&cam=overview&time=day',
    out: 'shots/screenshot.png',
    w: null,
    h: null,
    wait: 10000,
    mobile: false,
  };

  for (let i = 0; i < argv.length; i++) {
    const a = argv[i];
    if (a === '--url' && i + 1 < argv.length) {
      opts.url = argv[++i];
    } else if (a === '--out' && i + 1 < argv.length) {
      opts.out = argv[++i];
    } else if (a === '--w' && i + 1 < argv.length) {
      opts.w = Number(argv[++i]);
    } else if (a === '--h' && i + 1 < argv.length) {
      opts.h = Number(argv[++i]);
    } else if (a === '--wait' && i + 1 < argv.length) {
      opts.wait = Number(argv[++i]);
    } else if (a === '--mobile') {
      opts.mobile = true;
    }
  }

  const width = Number.isFinite(opts.w) && opts.w > 0 ? opts.w : opts.mobile ? 390 : 1280;
  const height = Number.isFinite(opts.h) && opts.h > 0 ? opts.h : opts.mobile ? 844 : 720;
  const waitMs = Number.isFinite(opts.wait) && opts.wait >= 0 ? opts.wait : 10000;

  return {
    url: opts.url,
    out: opts.out,
    width,
    height,
    waitMs,
    mobile: opts.mobile,
  };
}

async function main() {
  const opts = parseArgs(process.argv.slice(2));
  const outPath = path.resolve(opts.out);
  fs.mkdirSync(path.dirname(outPath), { recursive: true });

  const consoleErrors = [];

  const browser = await puppeteer.launch({
    executablePath: '/usr/bin/google-chrome',
    headless: 'new',
    args: [
      '--use-angle=swiftshader',
      '--enable-unsafe-swiftshader',
      '--ignore-gpu-blocklist',
      '--no-sandbox',
      '--disable-dev-shm-usage',
    ],
  });

  try {
    const page = await browser.newPage();
    await page.setViewport({
      width: opts.width,
      height: opts.height,
      deviceScaleFactor: opts.mobile ? 2 : 1,
      isMobile: opts.mobile,
      hasTouch: opts.mobile,
    });

    page.on('console', (msg) => {
      if (msg.type() === 'error') {
        const text = msg.text();
        consoleErrors.push(text);
        console.log(`[console.error] ${text}`);
      }
    });

    page.on('pageerror', (err) => {
      const text = err instanceof Error ? err.stack || err.message : String(err);
      consoleErrors.push(text);
      console.log(`[pageerror] ${text}`);
    });

    page.on('requestfailed', (req) => {
      const failure = req.failure()?.errorText ?? 'unknown';
      const text = `${req.url()} (${failure})`;
      consoleErrors.push(text);
      console.log(`[requestfailed] ${text}`);
    });

    await page.goto(opts.url, { waitUntil: 'domcontentloaded', timeout: 30000 });

    // Wait for simulation ready flag if available, then let frames + traffic settle
    const readyDeadline = Date.now() + Math.max(opts.waitMs, 15000);
    while (Date.now() < readyDeadline) {
      const state = await page.evaluate(() => window.__TIDELIGHT__ ?? null);
      if (state && state.ready) break;
      await new Promise((r) => setTimeout(r, 250));
    }

    if (opts.waitMs > 0) {
      await new Promise((r) => setTimeout(r, opts.waitMs));
    }

    // Ensure at least two rAF renders flush cleanly before capture
    await page.evaluate(
      () =>
        new Promise((resolve) => {
          requestAnimationFrame(() => requestAnimationFrame(() => resolve()));
        })
    );

    const state = await page.evaluate(() => window.__TIDELIGHT__ ?? null);
    await page.screenshot({ path: outPath, type: 'png' });

    console.log(
      `Captured ${outPath} (${opts.width}x${opts.height}, mobile=${opts.mobile}) ` +
        `errors=${consoleErrors.length} state=${JSON.stringify(state)}`
    );

    if (consoleErrors.length > 0) {
      process.exitCode = 1;
    }
  } finally {
    await browser.close();
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
