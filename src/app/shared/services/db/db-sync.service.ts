/* eslint-disable @typescript-eslint/no-shadow */

import Dexie from "dexie";
// import "dexie-syncable";

/**
 * Open a websocket connection with Dexie sync server for syncing tables
 * NOTE CC 2021-07-09 - Currently deprecated but may want again in future
 */
function init() {
  return;
  // Constants:
  const RECONNECT_DELAY = 5000; // Reconnect delay in case of errors such as network down.

  Dexie.Syncable.registerSyncProtocol("websocket", {
    sync(
      context,
      url,
      options,
      baseRevision,
      syncedRevision,
      changes,
      partial,
      applyRemoteChanges,
      onChangesAccepted,
      onSuccess,
      onError
    ) {
      // The following vars are needed because we must know which callback to ack when server sends it's ack to us.
      let requestId = 0;
      let acceptCallbacks = {};

      // Connect the WebSocket to given url:
      let ws = new WebSocket(url);

      // sendChanges() method:
      function sendChanges(changes, baseRevision, partial, onChangesAccepted) {
        ++requestId;
        acceptCallbacks[requestId.toString()] = onChangesAccepted;

        // In this example, the server expects the following JSON format of the request:
        //  {
        //      type: "changes"
        //      baseRevision: baseRevision,
        //      changes: changes,
        //      partial: partial,
        //      requestId: id
        //  }
        //  To make the sample simplified, we assume the server has the exact same specification of how changes are structured.
        //  In real world, you would have to pre-process the changes array to fit the server specification.
        //  However, this example shows how to deal with the WebSocket to fullfill the API.

        ws.send(
          JSON.stringify({
            type: "changes",
            changes,
            partial,
            baseRevision,
            requestId,
          })
        );
      }

      // When WebSocket opens, send our changes to the server.
      ws.onopen = function (event) {
        // Initiate this socket connection by sending our clientIdentity. If we dont have a clientIdentity yet,
        // server will call back with a new client identity that we should use in future WebSocket connections.
        ws.send(
          JSON.stringify({
            type: "clientIdentity",
            clientIdentity: context.clientIdentity || null,
          })
        );

        // Send our changes:
        sendChanges(changes, baseRevision, partial, onChangesAccepted);

        // Subscribe to server changes:
        ws.send(
          JSON.stringify({
            type: "subscribe",
            syncedRevision,
          })
        );
      };

      // If network down or other error, tell the framework to reconnect again in some time:
      ws.onerror = function (event: any) {
        ws.close();
        onError(event.message, RECONNECT_DELAY);
      };

      // If socket is closed (network disconnected), inform framework and make it reconnect
      ws.onclose = function (event) {
        onError("Socket closed: " + event.reason, RECONNECT_DELAY);
      };

      // isFirstRound: Will need to call onSuccess() only when we are in sync the first time.
      // onSuccess() will unblock Dexie to be used by application code.
      // If for example app code writes: db.friends.where('shoeSize').above(40).toArray(callback), the execution of that query
      // will not run until we have called onSuccess(). This is because we want application code to get results that are as
      // accurate as possible. Specifically when connected the first time and the entire DB is being synced down to the browser,
      // it is important that queries starts running first when db is in sync.
      let isFirstRound = true;
      // When message arrive from the server, deal with the message accordingly:
      ws.onmessage = function (event) {
        try {
          // Assume we have a server that should send JSON messages of the following format:
          // {
          //     type: "clientIdentity", "changes", "ack" or "error"
          //     clientIdentity: unique value for our database client node to persist in the context. (Only applicable if type="clientIdentity")
          //     message: Error message (Only applicable if type="error")
          //     requestId: ID of change request that is acked by the server (Only applicable if type="ack" or "error")
          //     changes: changes from server (Only applicable if type="changes")
          //     lastRevision: last revision of changes sent (applicable if type="changes")
          //     partial: true if server has additionalChanges to send. False if these changes were the last known. (applicable if type="changes")
          // }
          let requestFromServer = JSON.parse(event.data);
          if (requestFromServer.type === "changes") {
            applyRemoteChanges(
              requestFromServer.changes,
              requestFromServer.currentRevision,
              requestFromServer.partial
            );
            if (isFirstRound && !requestFromServer.partial) {
              // Since this is the first sync round and server sais we've got all changes - now is the time to call onsuccess()
              onSuccess({
                // Specify a react function that will react on additional client changes
                react(changes, baseRevision, partial, onChangesAccepted) {
                  sendChanges(changes, baseRevision, partial, onChangesAccepted);
                },
                // Specify a disconnect function that will close our socket so that we dont continue to monitor changes.
                disconnect() {
                  ws.close();
                },
              });
              isFirstRound = false;
            }
          } else if (requestFromServer.type === "ack") {
            requestId = requestFromServer.requestId;
            let acceptCallback = acceptCallbacks[requestId.toString()];
            acceptCallback(); // Tell framework that server has acknowledged the changes sent.
            delete acceptCallbacks[requestId.toString()];
          } else if (requestFromServer.type === "clientIdentity") {
            context.clientIdentity = requestFromServer.clientIdentity;
            context.save();
          } else if (requestFromServer.type === "error") {
            requestId = requestFromServer.requestId;
            ws.close();
            onError(requestFromServer.message, Infinity); // Don't reconnect - an error in application level means we have done something wrong.
          }
        } catch (e) {
          ws.close();
          onError(e, Infinity); // Something went crazy. Server sends invalid format or our code is buggy. Dont reconnect - it would continue failing.
        }
      };
    },
  });
}
