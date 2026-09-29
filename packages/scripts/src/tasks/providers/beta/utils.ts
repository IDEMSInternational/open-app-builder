import path from "path";

/**
 * Whether a flow_name is safe to use as a filename. Flows are written as `{flow_name}.json`,
 * so names containing path separators, relative segments or absolute paths are rejected to
 * prevent writing outside the target folder
 */
export function isValidFlowName(flow_name: unknown): flow_name is string {
  return (
    typeof flow_name === "string" &&
    flow_name !== "." &&
    flow_name !== ".." &&
    !/[\\/]/.test(flow_name) &&
    !path.isAbsolute(flow_name) &&
    !path.win32.isAbsolute(flow_name)
  );
}
