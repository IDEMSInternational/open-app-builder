import ws from "nodejs-websocket";

import baseRepo from "../repositories/base";
import changesRepo from "../repositories/changes";
import sessionActionsRepo from "../repositories/session-actions";
import { TYPE, reduceChanges, resolveConflicts, applyModifications } from "./sync-server.utils";

function SyncServer(socketPort) {
  let db = {
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

  let nextClientIdentity = 1; // issue

  ws.createServer(function (conn) {
    let syncedRevision = 0; // Used when sending changes to client. Only send changes above syncedRevision since client is already in sync with syncedRevision.

    async function sendAnyChanges() {
      // Get all changes after syncedRevision that was not performed by the client we're talkin' to.
      const changes = await changesRepo.getChanges(syncedRevision, conn.clientIdentity);
      // let changes = db.changes.filter(function (change) { return change.rev > syncedRevision && change.source !== conn.clientIdentity; });
      // Compact changes so that multiple changes on same object is merged into a single change.
      let reducedSet = reduceChanges(changes);
      // Convert the reduced set into an array again.
      let reducedArray = Object.keys(reducedSet).map(function (key) {
        return reducedSet[key];
      });
      // Notice the current revision of the database. We want to send it to client so it knows what to ask for next time.
      let currentRevision = db.revision; // maybe need to set a user revision which are a last one at database

      conn.sendText(
        JSON.stringify({
          type: "changes",
          changes: reducedArray,
          currentRevision,
          partial: false, // Tell client that these are the only changes we are aware of. Since our mem DB is syncronous, we got all changes in one chunk.
        })
      );

      syncedRevision = currentRevision; // Make sure we only send revisions coming after this revision next time and not resend the above changes over and over.
    }

    conn.on("text", async function (message) {
      console.log("Revision:", db.revision);
      let request = JSON.parse(message);
      let type = request.type;
      if (type === "clientIdentity") {
        // Client Hello: Client says "Hello, My name is <clientIdentity>!" or "Hello, I'm newborn. Please give me a name!"
        // Client identity is used for the following purpose:
        //  * When client sends its changes, register the changes into server database and mark each change with the clientIdentity.
        //  * When sending back changes to client, leave out those marked with the client id so that changes aren't echoed back.
        // The client should initiate the connection by submitting or requesting a client identity.
        // This should be done before sending any changes to us.

        // Client submits his identity or requests one
        if (request.clientIdentity) {
          // Client has an identity that we have given earlier
          conn.clientIdentity = request.clientIdentity;
        } else {
          // Client requests an identity. Provide one.
          conn.clientIdentity = nextClientIdentity++;
          conn.sendText(
            JSON.stringify({
              type: "clientIdentity",
              clientIdentity: conn.clientIdentity,
            })
          );
        }
      } else if (type === "subscribe") {
        // Client wants to subscribe to server changes happened or happening after given syncedRevision
        syncedRevision = request.syncedRevision || 0;
        // Send any changes we have currently:
        await sendAnyChanges();
        // Start subscribing for additional changes:
        db.subscribe(sendAnyChanges);
      } else if (type === "changes") {
        // Client sends its changes to us.
        let requestId = request.requestId;
        try {
          if (!(request.changes instanceof Array)) {
            throw new Error("Property 'changes' must be provided and must be an array");
          }
          if (!("baseRevision" in request)) {
            throw new Error("Property 'baseRevision' missing");
          }
          // First, if sent change set is partial.
          if (request.partial) {
            // Don't commit changes just yet. Store it in the partialChanges table so far. (In real db, uncommittedChanges would be its own table with columns: {clientID, type, table, key, obj, mods}).
            // Get or create db.uncommittedChanges array for current client
            if (db.uncommittedChanges[conn.clientIdentity]) {
              // Concat the changes to existing change set:
              db.uncommittedChanges[conn.clientIdentity] = db.uncommittedChanges[
                conn.clientIdentity
              ].concat(request.changes);
            } else {
              // Create the change set:
              db.uncommittedChanges[conn.clientIdentity] = request.changes;
            }
          } else {
            // This request is not partial. Time to commit.
            // But first, check if we have previous changes from that client in uncommittedChanges because now is the time to commit them too.
            if (db.uncommittedChanges[conn.clientIdentity]) {
              request.changes = db.uncommittedChanges[conn.clientIdentity].concat(request.changes);
              delete db.uncommittedChanges[conn.clientIdentity];
            }

            // ----------------------------------------------
            //
            //
            //
            // HERE COMES THE QUITE IMPORTANT SYNC ALGORITHM!
            //
            // 1. Reduce all server changes (not client changes) that have occurred after given
            //    baseRevision (our changes) to a set (key/value object where key is the combination of table/primaryKey)
            // 2. Check all client changes against reduced server
            //    changes to detect conflict. Resolve conflicts:
            //      If server created an object with same key as client creates, updates or deletes: Always discard client change.
            //      If server deleted an object with same key as client creates, updates or deletes: Always discard client change.
            //      If server updated an object with same key as client updates: Apply all properties the client updates unless they conflict with server updates
            //      If server updated an object with same key as client creates: Apply the client create but apply the server update on top
            //      If server updated an object with same key as client deletes: Let client win. Deletes always wins over Updates.
            //
            // 3. After resolving conflicts, apply client changes into server database.
            // 4. Send an ack to the client that we have persisted its changes
            //
            //
            // ----------------------------------------------
            let baseRevision = request.baseRevision || 0;
            const serverChanges = await changesRepo.getServerChanges(baseRevision);
            let reducedServerChangeSet = reduceChanges(serverChanges);
            let resolved = resolveConflicts(request.changes, reducedServerChangeSet);
            console.log("Resolved:", resolved);
            // Now apply the resolved changes:
            resolved.forEach(function (change) {
              switch (change.type) {
                case TYPE.CREATE:
                  db.create(change.table, change.key, change.obj, conn.clientIdentity);
                  break;
                case TYPE.UPDATE:
                  db.update(change.table, change.key, change.mods, conn.clientIdentity);
                  break;
                case TYPE.DELETE:
                  db.delete(change.table, change.key, conn.clientIdentity);
                  break;
              }
            });
          }

          // Now ack client that we have recieved his changes. This should be done no matter if the're buffered into uncommittedChanges
          // or if the're actually committed to db.
          conn.sendText(
            JSON.stringify({
              type: "ack",
              requestId,
            })
          );
        } catch (e) {
          conn.sendText(
            JSON.stringify({
              type: "error",
              requestId,
              message: e.toString(),
            })
          );
          conn.close();
        }
      }
    });

    conn.on("close", function () {
      // When client disconnects, stop subscribing from db.
      db.unsubscribe();
    });
    conn.on("error", function () {
      db.unsubscribe();
    });
  }).listen(socketPort);
}

export default SyncServer;
