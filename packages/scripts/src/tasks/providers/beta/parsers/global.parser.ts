import { FlowTypes } from "data-models";

/**
 * Combine all imported global flows into a single file within the target folder
 * TODO - placeholder, currently no globals are written
 */
export function combineGlobals(
  flows: FlowTypes.FlowTypeWithData[],
  targetFolder: string,
  verbose = false
): void {
  if (verbose) {
    console.log(
      `[Not implemented] Combining ${flows.length} global flows into single file in ${targetFolder}`
    );
  }
}
