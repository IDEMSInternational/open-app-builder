import { authorizeGDriveFiles } from "@idemsInternational/gdrive-tools";
import { FlowTypes } from "data-models";
import fs from "fs-extra";
import open from "open";
import path from "path";
import { Readable } from "stream";
import * as xlsx from "xlsx";
import { CREDENTIALS_PATH } from "../../../../paths";
import { logOutput, logWarning, recursiveFindByExtension } from "../../../../utils";
import { loadExternalConfig, readExternalSourcePath } from "../deploymentConfig";
import { isFixedFlow, isValidFlowName } from "../utils";
import { getAuthTokenPath } from "./auth";
import { SheetConvertor } from "./sheetConvertor";
import {
  addTransientSheet,
  findTransientSheet,
  readAppDataFlow,
  tagAppDataFlow,
  TRANSIENT_FLOW_TYPES,
} from "./transientSheets";

const XLSX_MIMETYPE = "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet";
const GOOGLE_SHEET_MIMETYPE = "application/vnd.google-apps.spreadsheet";

export interface ISheetOptions {
  /** Only match flows of this type, in case the same name is used by multiple types */
  flowType?: string;
  /** Drive folder to create new sheets in. Defaults to My Drive */
  folderId?: string;
  /** Open the sheet in the browser (default true) */
  openBrowser?: boolean;
  /** Name of a new sheet in drive. Defaults to the (first) flow name */
  sheetName?: string;
}

export interface ISheetResult {
  /** First flow in the sheet */
  flow_name: string;
  /** All flows in the sheet, when created with several flows */
  flow_names?: string[];
  url: string;
  created: boolean;
}

/**
 * Open the google sheet for a flow, using the `_source.url` of its json in the external
 * deployment, or of its transient sheet. If neither exists, a new sheet is created first
 */
export async function openFlowSheet(flowName: string, options: ISheetOptions = {}) {
  const { openBrowser = true } = options;
  const { flow } = findSourceFlow(flowName, options.flowType);
  const url = flow._source?.url || findTransientSheet(flow.flow_type, flowName)?.url || undefined;
  if (!url) {
    return createFlowSheet(flowName, options);
  }
  const result: ISheetResult = { flow_name: flowName, url, created: false };
  if (openBrowser) await open(url);
  logOutput({ msg1: `Sheet: ${flowName}`, msg2: url });
  return result;
}

/**
 * Create a transient google sheet from one or more flow jsons, found by the `_source.path` of
 * their app_data copies (see `findFlowBySourcePath`),
 * containing a `==content_list==` tab listing the flows and a tab of rows per flow, so they can
 * be edited and synced.
 *
 * The sheet is created in My Drive unless a folder is given. The external deployment json is not
 * changed: the app copy of each flow in the assets folder gets the new `_source` and
 * `"transient": "true"`, and each flow is added to the transient sheets list used by
 * `syncTransientSheets`. Both are replaced when sheets are next processed from the external
 * deployment (e.g. `sync_fixed_sheets`)
 */
export async function createFlowSheet(flowNames: string | string[], options: ISheetOptions = {}) {
  const { openBrowser = true, folderId } = options;
  const names = [...new Set(Array.isArray(flowNames) ? flowNames : [flowNames])];
  if (names.length === 0) throw new Error("At least one flow name is required");
  const sheetName = options.sheetName || names[0];
  const deploymentConfig = await loadExternalConfig(readExternalSourcePath());
  const flows = names.map((flowName) => findFlowBySourcePath(flowName, options.flowType).flow);
  for (const flow of flows) {
    if (!TRANSIENT_FLOW_TYPES.includes(flow.flow_type)) {
      throw new Error(
        `Sheets can only be created for: ${TRANSIENT_FLOW_TYPES.join(", ")} (${flow.flow_name} is ${flow.flow_type})`
      );
    }
    if (flow._source?.url) {
      logWarning({ msg1: `Flow already has a sheet: ${flow.flow_name}`, msg2: flow._source.url });
    }
  }

  const workbook = SheetConvertor.flowToSheet(flows);
  const xlsxData: Buffer = xlsx.write(workbook, { type: "buffer", bookType: "xlsx" });
  const { drive } = await authorizeGDriveFiles({
    credentialsPath: CREDENTIALS_PATH,
    authTokenPath: getAuthTokenPath(deploymentConfig),
  });

  const createFile = (parents?: string[]) =>
    drive.files.create({
      requestBody: { name: sheetName, mimeType: GOOGLE_SHEET_MIMETYPE, parents },
      media: { mimeType: XLSX_MIMETYPE, body: Readable.from(xlsxData) },
      fields: "id",
      supportsAllDrives: true,
    });

  let file: Awaited<ReturnType<typeof createFile>>;
  try {
    file = await createFile(folderId ? [folderId] : undefined);
  } catch (error) {
    if (!folderId) throw error;
    // The drive.file scope can only add to folders the user has given the app access to
    logWarning({
      msg1: `Could not create sheet in folder ${folderId}, creating in My Drive instead`,
      msg2: (error as Error).message,
    });
    file = await createFile();
  }
  const url = `https://docs.google.com/spreadsheets/d/${file.data.id}`;

  // Each flow is listed separately, syncTransientSheets downloads a shared sheet once
  for (const flow of flows) {
    tagAppDataFlow(flow.flow_type, flow.flow_name, url);
    addTransientSheet({ flow_type: flow.flow_type, flow_name: flow.flow_name, url });
  }

  logOutput({ msg1: `Created sheet: ${sheetName} (${names.join(", ")})`, msg2: url });
  if (openBrowser) await open(url);
  const result: ISheetResult = { flow_name: names[0], url, created: true };
  if (names.length > 1) result.flow_names = names;
  return result;
}

/**
 * Find the json a flow was imported from, using the `_source.path` of its copy in app_data.
 * If that is missing or does not contain the flow (e.g. the external deployment has moved),
 * search the external deployment sheets folder instead (see `findSourceFlow`)
 */
export function findFlowBySourcePath(flowName: string, flowType?: string) {
  if (!isValidFlowName(flowName)) {
    throw new Error(`Invalid flow name: ${flowName}`);
  }
  const sheetsFolder = path.resolve(readExternalSourcePath(), "app_data", "sheets");
  for (const type of flowType ? [flowType] : TRANSIENT_FLOW_TYPES) {
    const filePath = readAppDataFlow(type, flowName)?._source?.path;
    if (!filePath || path.extname(filePath) !== ".json" || !fs.existsSync(filePath)) continue;
    let flow: FlowTypes.FlowTypeWithData;
    try {
      flow = fs.readJsonSync(filePath);
    } catch {
      continue;
    }
    if (flow?.flow_name !== flowName || flow.flow_type !== type) continue;
    // Same rule as findSourceFlow: only synced files link to a sheet, others may be copies
    if (!isFixedFlow(filePath, sheetsFolder)) delete flow._source;
    return { filePath, flow };
  }
  return findSourceFlow(flowName, flowType);
}

/** Find a flow json by name anywhere within the external deployment sheets folder */
export function findSourceFlow(flowName: string, flowType?: string) {
  if (!isValidFlowName(flowName)) {
    throw new Error(`Invalid flow name: ${flowName}`);
  }
  const sheetsFolder = path.resolve(readExternalSourcePath(), "app_data", "sheets");
  const matches: { filePath: string; flow: FlowTypes.FlowTypeWithData }[] = [];
  for (const filePath of recursiveFindByExtension(sheetsFolder, "json")) {
    if (path.basename(filePath) !== `${flowName}.json`) continue;
    let flow: FlowTypes.FlowTypeWithData;
    try {
      flow = fs.readJsonSync(filePath);
    } catch {
      continue;
    }
    if (flow?.flow_name !== flowName) continue;
    if (flowType && flow.flow_type !== flowType) continue;
    // Same rule as processFlows: only synced files link to a sheet, others may be copies
    if (!isFixedFlow(filePath, sheetsFolder)) delete flow._source;
    matches.push({ filePath, flow });
  }
  if (matches.length === 0) {
    throw new Error(`Flow not found: ${flowName}${flowType ? ` (${flowType})` : ""}`);
  }
  // Prefer a copy linked to a sheet, e.g. the google_drive copy over a leftover local one
  const match = matches.find(({ flow }) => flow._source?.url) || matches[0];
  if (matches.length > 1) {
    logWarning({
      msg1: `Multiple files for flow: ${flowName}`,
      msg2: `Using ${match.filePath}`,
    });
  }
  return match;
}
