#!/usr/bin/env node

const path = require("path");
const fs = require("fs");
const { spawnSync } = require("child_process");

const rootDir = path.resolve(__dirname, "../");
const lockfilePath = path.resolve(rootDir, "yarn.lock");
const autoInstallPath = path.resolve(rootDir, "yarn.auto-install");

/**
 * Script to track yarn.lock changes and auto-install updates as required
 * Creates a `yarn.auto-install` file that tracks time/date of last install
 * and runs a new install when outdated. NOTE - this will run additional install
 * in cases where yarn lock updated locally (as opposed to incoming git changes)
 */
function yarnAutoInstall() {
  if (fs.existsSync(lockfilePath) && fs.existsSync(autoInstallPath)) {
    const lockModifiedTime = fs.statSync(lockfilePath).mtime.getTime();
    const autoInstallTime = fs.statSync(autoInstallPath).mtime.getTime();
    if (lockModifiedTime !== autoInstallTime) {
      installPackages();
    }
  } else {
    installPackages();
  }
}

function installPackages() {
  const command = `yarn install --immutable`;
  console.log(`Changes to lockfile found, running \`${command}\``);
  spawnSync(command, { cwd: rootDir, shell: true, stdio: "inherit" });
  const lockModifiedTime = fs.statSync(lockfilePath).mtime;
  const autoInstallContents = `Installed for yarn.lock modified:\n${lockModifiedTime.toISOString()}`;
  fs.writeFileSync(autoInstallPath, autoInstallContents);
  fs.utimesSync(autoInstallPath, lockModifiedTime, lockModifiedTime);
}

/**
 * Legacy/Alt method to check for changes via git
 * NOTE - hard to determine exact diff required to track any changes (wip)
 * Adapted from https://github.com/frontsideair/yarnhook/blob/main/packages/yarnhook/index.js
 * and https://dev.to/zirkelc/automatically-install-npm-dependencies-on-git-pull-bg0
 */
function yarnAutoInstallGit() {
  // https://git-scm.com/docs/git-diff#_examples
  const output = spawnSync("git", ["diff", "HEAD@{1}..HEAD@{0}", "--", lockfilePath], {
    cwd: rootDir,
    stdio: "pipe",
  });
  if (output.stdout) {
    console.log("stdout", output.stdout.toString("utf-8"));
    return true;
  }
}

// Run when executed directyly
if (require.main === module) {
  yarnAutoInstall();
}
