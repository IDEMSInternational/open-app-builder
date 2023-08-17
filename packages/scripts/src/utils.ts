import { Command } from "commander";

// re-export shared utils for ease of import
export * from "shared/";

import { logProgramHelp } from "shared/src/utils";

/**
 * Allow command to be invoked by directly calling file, e.g.
 * ts-node commands/my-command.ts
 *
 * NOTE - direct-call commands will break compilation, so should only
 * be enabled during testing/debugging
 * https://github.com/evanw/esbuild/issues/2121
 * https://github.com/folke/esbuild-runner/issues/53
 */
export function allowCmdDirectCall(program: Command) {
  if (require.main === module) {
    if (!process.argv.slice(2).length) {
      logProgramHelp(program);
    }

    program.parseAsync(process.argv);
  }
}
