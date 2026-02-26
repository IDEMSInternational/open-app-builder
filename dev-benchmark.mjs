import { spawn } from "child_process";
import { existsSync, rmSync, appendFileSync, writeFileSync } from "fs";
import { resolve } from "path";

const logFile = `benchmark-${new Date().toISOString().replace(/[:.]/g, "-")}.log`;
const cachePath = resolve(".angular/cache");

// Clear cache
if (existsSync(cachePath)) {
  console.log("🗑  Clearing .angular/cache...");
  rmSync(cachePath, { recursive: true, force: true });
} else {
  console.log("ℹ  No .angular/cache found, starting clean");
}

writeFileSync(logFile, "");

const start = performance.now();
let lineCount = 0;

const isWindows = process.platform === "win32";
const ngBin = isWindows ? "ng.cmd" : "ng";
const ngPath = resolve("node_modules", ".bin", ngBin);

const child = spawn(ngPath, ["serve", "--no-hmr"], {
  stdio: ["ignore", "pipe", "pipe"],
  shell: isWindows,
});

const milestonePatterns =
  /generating (browser|application)|sass|chunk|warning|error|bundle generation complete/i;

function handleLine(line) {
  lineCount++;
  const elapsed = ((performance.now() - start) / 1000).toFixed(1);
  const stamped = `${elapsed}s | ${line}`;

  appendFileSync(logFile, stamped + "\n");

  process.stdout.write(`\r⏱  ${elapsed}s | ${lineCount} lines processed   `);

  if (milestonePatterns.test(line)) {
    process.stdout.write(`\n  → ${line}\n`);
  }

  if (/bundle generation complete/i.test(line)) {
    const total = ((performance.now() - start) / 1000).toFixed(2);
    console.log(`\n✅ Done in ${total}s`);
    console.log(`📄 Full log: ${logFile}`);
    child.kill();
    process.exit(0);
  }
}

function processStream(stream) {
  let buffer = "";
  stream.on("data", (chunk) => {
    buffer += chunk.toString();
    const lines = buffer.split(/\r?\n/);
    buffer = lines.pop(); // keep incomplete line in buffer
    lines.filter(Boolean).forEach(handleLine);
  });
}

processStream(child.stdout);
processStream(child.stderr);

child.on("error", (err) => {
  console.error(`\n❌ Failed to start: ${err.message}`);
  process.exit(1);
});

child.on("exit", (code) => {
  if (code !== null && code !== 0) {
    console.error(`\n❌ ng serve exited with code ${code}`);
    console.log(`📄 Full log: ${logFile}`);
    process.exit(code);
  }
});
