import http from "http";
import { logOutput, logWarning } from "../../../utils";
import { createFlowSheet, openFlowSheet } from "./flowSheets";
import { findSourceFlow } from "./flows";
import { canCreateFlowSheets, canDownloadSheets, removeTransientSheet } from "./sheets";
import { syncFiles, syncFixedSheets, syncTransientSheets, syncTranslations } from "./sync";

/** Default port, also used by the app (see `DevToolsService`) */
export const DEV_SERVER_DEFAULT_PORT = 3010;

/** Only pages served from this machine may call the server */
const ALLOWED_ORIGIN = /^https?:\/\/(localhost|127\.0\.0\.1|\[::1\])(:\d+)?$/;
const MAX_BODY_BYTES = 10_000;

/**
 * Start a local http server so the app, when running locally, can run beta workflow commands.
 * Listens on 127.0.0.1 only and accepts requests from localhost origins.
 *
 * - `GET  /health`      → `{ ok: true }`
 * - `POST /sheets/open` → body `{ flow_name, flow_type? }`, opens (or creates) the flow's sheet
 * - `POST /sheets/create` → body `{ flows: [{ flow_name, flow_type? }], sheet_name?, folder? }`,
 *   creates one sheet with several flows (`folder` records it as that folder's sheet)
 * - `POST /sheets/sync_fixed` → sync sheets from the deployment `sheets_folders` (`beta sync_fixed_sheets`)
 * - `POST /sheets/sync_transient` → sync sheets created from flows (`beta sync_transient_sheets`)
 * - `POST /sheets/remove_transient` → body `{ flow_name, flow_type? }` (`flow_name` may be `ALL`)
 *   or `{ folder }`, delete transient sheets and unlink their flows (`beta remove_transient_sheet`)
 * - `POST /flows/sync` → process changed flow jsons from the local external deployment (`beta sync_flow_files`)
 * - `POST /translations/sync` → re-process all flows with the latest translations (`beta sync_translations`)
 */
export function startDevServer(options: { port?: number } = {}) {
  const port = options.port || DEV_SERVER_DEFAULT_PORT;
  const server = http.createServer(async (req, res) => {
    const origin = req.headers.origin;
    if (origin && !ALLOWED_ORIGIN.test(origin)) {
      return sendJson(res, 403, { error: "Origin not allowed" });
    }
    // Browsers always send an origin with POST, so only allow commands from the local app
    if (req.method === "POST" && !origin) {
      return sendJson(res, 403, { error: "Origin required" });
    }
    if (origin) {
      res.setHeader("Access-Control-Allow-Origin", origin);
      res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
      res.setHeader("Access-Control-Allow-Headers", "Content-Type");
      res.setHeader("Vary", "Origin");
    }
    if (req.method === "OPTIONS") {
      res.writeHead(204);
      return res.end();
    }
    try {
      if (req.method === "GET" && req.url === "/health") {
        return sendJson(res, 200, { ok: true });
      }
      if (req.method === "POST" && req.url === "/sheets/open") {
        const { flow_name, flow_type } = await readJsonBody(req);
        if (typeof flow_name !== "string") {
          return sendJson(res, 400, { error: "flow_name is required" });
        }
        const flowType = typeof flow_type === "string" ? flow_type : undefined;
        // Signing in to google needs a browser prompt and ends the process, so do it from the CLI
        const { flow } = findSourceFlow(flow_name, flowType);
        if (!flow._source?.url && !(await canCreateFlowSheets())) {
          return sendJson(res, 401, {
            error: `Google Drive is not authorized to create sheets. Run once in a terminal: yarn workflow beta open_sheet ${flow_name}`,
          });
        }
        const result = await openFlowSheet(flow_name, { flowType });
        return sendJson(res, 200, result);
      }
      if (req.method === "POST" && req.url === "/sheets/create") {
        const { flows, sheet_name, folder } = await readJsonBody(req);
        const refs = Array.isArray(flows)
          ? flows
              .filter((f) => f && typeof f.flow_name === "string")
              .map((f) => ({
                flow_name: f.flow_name as string,
                flow_type: typeof f.flow_type === "string" ? f.flow_type : undefined,
              }))
          : [];
        if (refs.length === 0) {
          return sendJson(res, 400, { error: "flows are required" });
        }
        return runSync(
          res,
          `create_sheet ${refs.map((r) => r.flow_name).join(" ")}`,
          async () => ({
            ...(await createFlowSheet(refs, {
              sheetName: typeof sheet_name === "string" ? sheet_name : undefined,
              folder: typeof folder === "string" ? folder : undefined,
            })),
          }),
          { auth: "file" }
        );
      }
      if (req.method === "POST" && req.url === "/sheets/sync_fixed") {
        return runSync(res, "sync_fixed_sheets", async () => {
          await syncFixedSheets();
          return {};
        });
      }
      if (req.method === "POST" && req.url === "/sheets/sync_transient") {
        return runSync(res, "sync_transient_sheets", () => syncTransientSheets());
      }
      if (req.method === "POST" && req.url === "/sheets/remove_transient") {
        const { flow_name, flow_type, folder } = await readJsonBody(req);
        if (typeof folder === "string") {
          return runSync(
            res,
            `remove_transient_sheet --folder ${folder}`,
            async () => ({ ...(await removeTransientSheet(undefined, { folder })) }),
            { auth: "file" }
          );
        }
        if (typeof flow_name !== "string") {
          return sendJson(res, 400, { error: "flow_name is required" });
        }
        const flowType = typeof flow_type === "string" ? flow_type : undefined;
        return runSync(
          res,
          `remove_transient_sheet ${flow_name}`,
          async () => ({ ...(await removeTransientSheet(flow_name, { flowType })) }),
          { auth: "file" }
        );
      }
      if (req.method === "POST" && req.url === "/flows/sync") {
        // Only reads local files, so google drive does not need to be authorized
        return runSync(res, "sync_flow_files", async () => syncFiles({}), { auth: "none" });
      }
      if (req.method === "POST" && req.url === "/translations/sync") {
        // Only reads local files, so google drive does not need to be authorized
        return runSync(res, "sync_translations", async () => syncTranslations({}), {
          auth: "none",
        });
      }
      return sendJson(res, 404, { error: "Not found" });
    } catch (error) {
      const message = (error as Error).message || String(error);
      logWarning({ msg1: "Dev server request failed", msg2: message });
      return sendJson(res, 500, { error: message });
    }
  });
  server.listen(port, "127.0.0.1", () => {
    logOutput({ msg1: "Dev server running", msg2: `http://127.0.0.1:${port}` });
  });
  return server;
}

/** Name of the sync currently running, as syncs write the same folders and must not overlap */
let runningSync: string | undefined;

async function runSync(
  res: http.ServerResponse,
  command: string,
  sync: () => Promise<Record<string, unknown>>,
  /** Google drive access needed: `read` to download (default), `file` to change sheets created by the app */
  options: { auth?: "read" | "file" | "none" } = {}
) {
  const { auth = "read" } = options;
  if (runningSync) {
    return sendJson(res, 409, { error: `Already running: ${runningSync}` });
  }
  // Signing in to google needs a browser prompt and ends the process, so do it from the CLI
  const authorized =
    auth === "none" || (auth === "file" ? await canCreateFlowSheets() : await canDownloadSheets());
  if (!authorized) {
    return sendJson(res, 401, {
      error: `Google Drive is not authorized. Run once in a terminal: yarn workflow beta ${command}`,
    });
  }
  runningSync = command;
  try {
    const result = await sync();
    return sendJson(res, 200, { ok: true, ...result });
  } finally {
    runningSync = undefined;
  }
}

function sendJson(res: http.ServerResponse, status: number, body: unknown) {
  res.writeHead(status, { "Content-Type": "application/json" });
  res.end(JSON.stringify(body));
}

function readJsonBody(req: http.IncomingMessage): Promise<Record<string, unknown>> {
  return new Promise((resolve, reject) => {
    let data = "";
    req.on("data", (chunk) => {
      data += chunk;
      if (data.length > MAX_BODY_BYTES) {
        reject(new Error("Request body too large"));
        req.destroy();
      }
    });
    req.on("end", () => {
      try {
        resolve(data ? JSON.parse(data) : {});
      } catch {
        reject(new Error("Invalid json body"));
      }
    });
    req.on("error", reject);
  });
}
