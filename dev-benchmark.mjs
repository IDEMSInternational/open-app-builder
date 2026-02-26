/**
 * Angular Dev Server Benchmark Script
 * ====================================
 *
 * Measures three key performance metrics for `ng serve`:
 *
 *   1. 🧊 Cold Start    - No cache. Simulates first build after a fresh
 *                          install or CI run. Deletes `.angular/cache`
 *                          before starting.
 *
 *   2. 🔥 Warm Start    - Cache available. Simulates a developer starting
 *                          their dev server with a pre-existing build cache
 *                          (e.g. beginning of day).
 *
 *   3. ♻️  Incremental   - File change while serving. Simulates the normal
 *      Rebuild            development loop by modifying a source file and
 *                          measuring time to recompile. The modification is
 *                          a harmless comment toggle that is cleaned up
 *                          automatically.
 *
 * Output:
 *   - Minimal console progress (elapsed time + milestone events)
 *   - Timestamped full log written to `benchmark-<timestamp>.log`
 *   - Summary table printed to console and prepended to the log file
 *
 * Usage:
 *   node benchmark.mjs                            # touches src/app/app.component.ts
 *   node benchmark.mjs src/app/some.component.ts  # touches a specific file
 *
 * Requirements:
 *   - Node.js >= 18 (uses top-level await, performance.now)
 *   - Angular CLI installed locally (node_modules/.bin/ng)
 *
 * Notes:
 *   - Each phase has a 5-minute timeout (configurable via TIMEOUT_MS)
 *   - On Windows, uses taskkill to clean up child processes
 *   - The touch file is restored to its original state after benchmarking
 *   - For accurate cold-start numbers, close other heavy processes and
 *     ensure Windows Defender exclusions are set for the project directory
 */

import { spawn } from "child_process";
import { existsSync, rmSync, appendFileSync, writeFileSync, readFileSync } from "fs";
import { resolve } from "path";

// --- Configuration ---
const TOUCH_FILE = process.argv[2] || "src/app/app.component.ts";
const SERVE_ARGS = ["serve", "--no-hmr"];
const BUNDLE_DONE = /bundle generation complete/i;
const COMPILE_DONE = /compiled successfully|bundle generation complete/i;
const MILESTONE = /generating|sass|chunk|warning|error|bundle generation complete|compiled/i;
const TIMEOUT_MS = 5 * 60 * 1000; // 5 min timeout per phase

// --- State ---
const isWindows = process.platform === "win32";
const ngBin = isWindows ? "ng.cmd" : "ng";
const ngPath = resolve("node_modules", ".bin", ngBin);
const cachePath = resolve(".angular/cache");
const logFile = `benchmark-${new Date().toISOString().replace(/[:.]/g, "-")}.log`;
const results = {};
let globalLineCount = 0;

writeFileSync(logFile, "");
log(`📋 Benchmark started at ${new Date().toISOString()}`);
log(`📂 Project: ${resolve(".")}`);
log(`📝 Touch file: ${TOUCH_FILE}`);
log("─".repeat(60));

if (!existsSync(TOUCH_FILE)) {
  console.error(`\n❌ Touch file not found: ${TOUCH_FILE}`);
  console.error("Usage: node benchmark.mjs [path/to/file.ts]");
  process.exit(1);
}

await runBenchmark();

// --- Main Flow ---
async function runBenchmark() {
  // Phase 1: Cold start (no cache)
  clearCache();
  log("\n🧊 PHASE 1: Cold start (no cache)");
  results.cold = await measureServeStartup("cold");
  log(`   → Cold start: ${results.cold.toFixed(2)}s`);

  // Phase 2: Warm start (cache available)
  log("\n🔥 PHASE 2: Warm start (cache available)");
  results.warm = await measureServeStartup("warm");
  log(`   → Warm start: ${results.warm.toFixed(2)}s`);

  // Phase 3: Incremental rebuild (file change while serving)
  log("\n♻️  PHASE 3: Incremental rebuild");
  results.rebuild = await measureRebuild();
  log(`   → Rebuild: ${results.rebuild.toFixed(2)}s`);

  writeSummary();
}

// --- Phases ---
function measureServeStartup(label) {
  return new Promise((resolvePromise, reject) => {
    const start = performance.now();
    const child = spawnNg();
    const timeout = createTimeout(label, child, reject);

    onLine(child, (line) => {
      logLine(start, line);

      if (BUNDLE_DONE.test(line)) {
        clearTimeout(timeout);
        const elapsed = (performance.now() - start) / 1000;
        kill(child);
        resolvePromise(elapsed);
      }
    });

    onError(child, label, reject);
  });
}

function measureRebuild() {
  return new Promise((resolvePromise, reject) => {
    const child = spawnNg();
    let initialBuildDone = false;
    let rebuildStart = 0;
    const startupStart = performance.now();
    const timeout = createTimeout("rebuild", child, reject);

    onLine(child, (line) => {
      logLine(startupStart, line);

      if (!initialBuildDone && BUNDLE_DONE.test(line)) {
        initialBuildDone = true;
        log("   ⏸  Initial build done, touching file in 2s...");

        setTimeout(() => {
          touchFile();
          rebuildStart = performance.now();
          log("   ✏️  File modified, waiting for recompile...");
        }, 2000);
        return;
      }

      if (initialBuildDone && rebuildStart > 0 && COMPILE_DONE.test(line)) {
        clearTimeout(timeout);
        const elapsed = (performance.now() - rebuildStart) / 1000;
        kill(child);
        resolvePromise(elapsed);
      }
    });

    onError(child, "rebuild", reject);
  });
}

// --- Helpers ---
function spawnNg() {
  return spawn(ngPath, SERVE_ARGS, {
    stdio: ["ignore", "pipe", "pipe"],
    shell: isWindows,
  });
}

function onLine(child, callback) {
  function processStream(stream) {
    let buffer = "";
    stream.on("data", (chunk) => {
      buffer += chunk.toString();
      const lines = buffer.split(/\r?\n/);
      buffer = lines.pop();
      lines.filter(Boolean).forEach(callback);
    });
  }
  processStream(child.stdout);
  processStream(child.stderr);
}

function onError(child, label, reject) {
  child.on("error", (err) => {
    console.error(`\n❌ [${label}] Failed to start: ${err.message}`);
    reject(err);
  });
  child.on("exit", (code) => {
    if (code && code !== 0) {
      reject(new Error(`ng serve exited with code ${code} during ${label}`));
    }
  });
}

function kill(child) {
  if (isWindows) {
    spawn("taskkill", ["/pid", String(child.pid), "/f", "/t"], {
      stdio: "ignore",
    });
  } else {
    child.kill("SIGTERM");
  }
}

function createTimeout(label, child, reject) {
  return setTimeout(() => {
    console.error(`\n❌ [${label}] Timed out after ${TIMEOUT_MS / 1000}s`);
    kill(child);
    reject(new Error(`${label} timed out`));
  }, TIMEOUT_MS);
}

function clearCache() {
  if (existsSync(cachePath)) {
    log("🗑  Clearing .angular/cache...");
    rmSync(cachePath, { recursive: true, force: true });
  } else {
    log("ℹ  No .angular/cache found, already clean");
  }
}

function touchFile() {
  const content = readFileSync(TOUCH_FILE, "utf-8");
  const marker = "// __benchmark_touch__";

  if (content.includes(marker)) {
    writeFileSync(TOUCH_FILE, content.replace(marker + "\n", ""));
  } else {
    writeFileSync(TOUCH_FILE, marker + "\n" + content);
  }
}

function logLine(phaseStart, line) {
  globalLineCount++;
  const elapsed = ((performance.now() - phaseStart) / 1000).toFixed(1);
  const stamped = `${elapsed}s | ${line}`;
  appendFileSync(logFile, stamped + "\n");

  process.stdout.write(`\r⏱  ${elapsed}s | ${globalLineCount} lines processed   `);

  if (MILESTONE.test(line)) {
    process.stdout.write(`\n  → ${line}\n`);
  }
}

function log(msg) {
  console.log(msg);
  appendFileSync(logFile, msg + "\n");
}

function writeSummary() {
  const cacheSpeedup = results.cold / results.warm;
  const lines = [
    "",
    "═".repeat(60),
    "  BENCHMARK SUMMARY",
    "═".repeat(60),
    "",
    `  Date:        ${new Date().toISOString()}`,
    `  Project:     ${resolve(".")}`,
    `  Touch file:  ${TOUCH_FILE}`,
    `  Node:        ${process.version}`,
    `  Platform:    ${process.platform} ${process.arch}`,
    "",
    "  ┌──────────────────────┬────────────┐",
    "  │ Phase                │ Time       │",
    "  ├──────────────────────┼────────────┤",
    `  │ 🧊 Cold start        │ ${pad(results.cold)}s │`,
    `  │ 🔥 Warm start        │ ${pad(results.warm)}s │`,
    `  │ ♻️  Incremental rebuild│ ${pad(results.rebuild)}s │`,
    "  └──────────────────────┴────────────┘",
    "",
    `  Cache speedup: ${cacheSpeedup.toFixed(1)}x faster`,
    "",
    "═".repeat(60),
  ];

  const summary = lines.join("\n");
  log(summary);

  // Prepend summary to log file
  const existing = readFileSync(logFile, "utf-8");
  writeFileSync(logFile, summary + "\n\n" + existing);

  console.log(`\n📄 Full log: ${logFile}`);
}

function pad(num) {
  return num.toFixed(2).padStart(8);
}
