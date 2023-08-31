import { Command } from "commander";
import open from "open";

// re-export shared utils for ease of import
export * from "shared/src/utils";

import { logProgramHelp } from "shared";

/**
 * Invoke the commander CLI with current process args,
 * displaying help if no args defined.
 * This is typically only used in the context of direct execution,
 * e.g. ts-node environments
 * @example
 * ```ts
 * if(isTsNode){
 *  callProgramWithHelp(program)
 * }
 * ```
 */
export function callProgramWithHelp(program: Command) {
  if (!process.argv.slice(2).length) {
    return logProgramHelp(program);
  }
  return program.parseAsync(process.argv);
}

/**
 * Detect if running in ts-node environment
 * Used when working in development
 * https://github.com/TypeStrong/ts-node/issues/846#issuecomment-631828160
 * https://github.com/wclr/ts-node-dev#usage
 *
 * NOTE - this tends to be more reliable than checking if `require.main === module`
 * which can often lead to execution from esbuild
 * https://github.com/evanw/esbuild/issues/2121
 * https://github.com/folke/esbuild-runner/issues/53
 */
export const isTsNode =
  process[Symbol.for("ts-node.register.instance")] || process.env.TS_NODE_DEV ? true : false;

/** Open an external URL using system default program */
export async function openUrl(url: string) {
  return open(url);
}

/**
 * Legacy implementation of openUrl to work under specific ts-node conditions
 * Not required since downgrade of package, but may be required again in future
 * https://github.com/TypeStrong/ts-node/discussions/1290
 *
 * NOTE - requires addition and import
 * ```ts
 * import { dynamicImport } from "tsimportlib"
 * ```
 */
export async function openUrlDynamic(url: string) {
  // const open = (await dynamicImport("open", module)) as typeof import("open");
  // return open.default(url);
}
