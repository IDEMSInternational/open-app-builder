import { Command } from "commander";
import { existsSync, readJSONSync } from "fs-extra";
import { prompt } from "inquirer";
import path from "path";
import { NullableMappedPosition, SourceMapConsumer } from "source-map";
import StackTracey from "stacktracey";
import { ROOT_DIR } from "../../paths";

/***************************************************************************************
 * CLI
 * @example yarn
 *************************************************************************************/
const program = new Command("extract");
export default program.description("Extract stacktrace").action(async () => {
  extract();
});

/***************************************************************************************
 * Main Methods
 *************************************************************************************/

/**
 * Rough methods to process a stack trace message and apply sourcemaps
 * Used to retroactively examine
 *
 * NOTE - requires local production build in the www folder containing the source code
 * from the device where the error originated from (i.e. built from exact same version),
 * so of limited use
 *
 * Reading references:
 * https://github.com/invertase/react-native-firebase/issues/2327
 * https://github.com/stacktracejs/stacktrace.js/issues/174
 * https://reactnative.dev/docs/next/symbolication
 * https://github.com/xpl/get-source
 * https://github.com/invertase/react-native-firebase/issues/2327
 * https://sportsbet.tech/demystifying-react-native-stack-traces-in-production-8f862da6f33
 *
 * Known Issues
 * 1. stacktracey should also be able to parse sourcemaps via `withSources`, although can't get
 * working with filepath structures (see extended class test), so using manual methods instead
 *
 * 2. Should also be possible to use facebook metro-symbolicate package however seems to not load
 * consumer synchronously like expected (unclear why)
 *
 * 3. Stacktraces coming from files like zone.js not mapped. These don't have explicit sourcemaps
 * but
 *
 * 4. The same sourcemap is processed on each line iteration which is inefficient. We could use
 * get-source which has caching, however had some difficulty configuring and of no real significance when
 * only processing a single stack trace with a handful of lines
 */

async function extract() {
  // allow input of strackgrace text using text editor
  const stackMsg = await prompt({ type: "editor", name: "msg" });
  const { msg } = stackMsg;
  // Parse stacktrace text to extract filenames, line and column numbers
  let stack = new StackTracey(msg);
  const mappedItems = await Promise.all(
    stack.items.map<Promise<NullableMappedPosition>>(async (element) => {
      const { line, column, fileRelative } = element;
      const sourcemapPath = path.resolve(ROOT_DIR, "www", fileRelative.replace(".js", ".js.map"));
      if (existsSync(sourcemapPath)) {
        const data2 = readJSONSync(sourcemapPath);
        data2.sourceRoot = path.resolve(ROOT_DIR);
        const consumer = await new SourceMapConsumer(data2);
        return consumer.originalPositionFor({ line, column });
      } else {
        return { column, line, name: null, source: fileRelative };
      }
    })
  );
  const stackStr = mappedItems.map(formatMappedPosition).join("\n").trim();
  console.log("Original\n\n", msg, "\n");
  console.log("Traced\n\n", stackStr, "\n");
}

function formatMappedPosition(pos: NullableMappedPosition) {
  if (!pos.source) {
    return "  at <unknown>";
  } else {
    const source = pos.source;
    if (pos.name) {
      return `  at ${pos.name} (${source}:${pos.line}:${pos.column})`;
    } else {
      return `  at ${source}:${pos.line}:${pos.column}`;
    }
  }
}

/** WIP - Stacktracey extend test, requires import getSource from 'get-source'
class MyStackTracey extends StackTracey {
  withSourceAsync(loc) {
    console.log("get source", loc);
    if ((this as any).shouldSkipResolving(loc)) {
      return Promise.resolve(loc);
    } else {
      return getSource
        .async(loc.file || "")
        .then((x) => x.resolve(loc))
        .then((resolved) => (this as any).withSourceResolved(loc, resolved))
        .catch((e) => (this as any).withSourceResolved(loc, { error: e, sourceLine: "" }));
    }
  }
}
 */
