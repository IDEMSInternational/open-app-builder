import WebSocket from "ws";
import { logger } from "../helpers/logger";

import baseRepo from "../repositories/base";
import changesRepo from "../repositories/changes";
import sessionActionsRepo from "../repositories/session-actions";
import { TYPE, applyModifications } from "./sync-server.utils";

const db = {
  uncommittedChanges: {}, // Map<clientID,Array<change>> Changes where partial=true buffered for being committed later on.
  revision: 0, // Current revision of the database. // issue
  subscribers: [], // Subscribers to when database got changes. Used by server connections to be able to push out changes to their clients as they occur.

  async create(table, key, obj, clientIdentity) {
    await changesRepo.insert({
      rev: ++db.revision,
      source: clientIdentity,
      type: TYPE.CREATE,
      table_name: table,
      key,
      obj,
    });

    if (table === "session_actions") {
      await sessionActionsRepo.insert(obj);
    }
    db.trigger();
  },
  async update(table, key, modifications, clientIdentity) {
    const obj = await baseRepo.getByKey(table, key);
    if (obj) {
      applyModifications(obj, modifications);
      await changesRepo.insert({
        rev: ++db.revision,
        source: clientIdentity,
        type: TYPE.UPDATE,
        table_name: table,
        key,
        mods: modifications,
      });

      if (table === "session_actions") {
        await sessionActionsRepo.update(obj);
      }
      db.trigger();
    }
  },
  async delete(table, key, clientIdentity) {
    const obj = await baseRepo.getByKey(table, key);

    if (obj) {
      await changesRepo.insert({
        rev: ++db.revision,
        source: clientIdentity,
        type: TYPE.DELETE,
        table,
        key,
      });

      if (table === "session_actions") {
        await sessionActionsRepo.remove(obj.id);
      }
      db.trigger();
    }
  },
  trigger() {
    // research
    // TODO CC 2021-07-01 - Figure out what this code was trying to achieve and re-implement/remove
    // if (!db.trigger.delayedHandle) {
    //   // Delay the trigger so that it's only called once per bunch of changes instead of being called for each single change.
    //   db.trigger.delayedHandle = setTimeout(function () {
    //     delete db.trigger.delayedHandle;
    //     db.subscribers.forEach(function (subscriber) {
    //       try {
    //         subscriber();
    //       } catch (e) {}
    //     });
    //   }, 0);
    // }
  },
  subscribe(fn) {
    // research
    db.subscribers.push(fn);
  },
  unsubscribe(fn?) {
    // research
    db.subscribers.splice(db.subscribers.indexOf(fn), 1);
  },
};

export function StartSyncServer(port = 3000) {
  let nextClientIdentity = 1; // issue
  const wss = new WebSocket.Server({ port });
  const CLIENTS = [];

  let syncedRevision = 0; // Used when sending changes to client. Only send changes above syncedRevision since client is already in sync with syncedRevision.
  wss.on("connection", function connection(ws: WebSocket, request, client) {
    ws.on("message", async function (msg) {
      console.log(`Received message ${msg} from user ${client}`);
    });
  });

  wss.on("close", () => {
    // When client disconnects, stop subscribing from db.
    db.unsubscribe();
  });
  wss.on("error", (err: Error) => {
    logger.error(err.message);
    db.unsubscribe();
  });
}
