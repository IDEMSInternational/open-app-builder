#!/usr/bin/env node

const path = require("path");
const fs = require("fs");
const { spawnSync } = require("child_process");

/**
 * Check if yarn.lock has been updated and install if required
 *
 * Adapted from https://github.com/frontsideair/yarnhook/blob/main/packages/yarnhook/index.js
 * and https://dev.to/zirkelc/automatically-install-npm-dependencies-on-git-pull-bg0
 */
function yarnLockCheck() {
  const rootDir = path.resolve(__dirname, "../");
  const lockfilePath = path.resolve(rootDir, "yarn.lock");

  if (fs.existsSync(lockfilePath)) {
    const output = spawnSync("git", ["diff", "HEAD@{1} HEAD", "--", lockfilePath], {
      cwd: rootDir,
    });
    if (output) {
      const command = `yarn install --immutable`;
      console.log(`Changes to lockfile found, running \`${command}\``);
      spawnSync(command, { cwd: rootDir, shell: true, stdio: "inherit" });
    }
  }
}
if (require.main === module) {
  yarnLockCheck();
}

