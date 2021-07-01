// CREATE / UPDATE / DELETE constants:
const TYPE = {
  CREATE: 1,
  UPDATE: 2,
  DELETE: 3,
}

function reduceChanges(changes) {
  // Converts an Array of change objects to a set of change objects based on its unique combination of (table ":" key).
  // If several changes were applied to the same object, the resulting set will only contain one change for that object.
  return changes.reduce(function (set, nextChange) {
    let id = nextChange.table + ":" + nextChange.key;
    let prevChange = set[id];
    if (!prevChange) {
      // This is the first change on this key. Add it unless it comes from the source that we are working against
      set[id] = nextChange;
    } else {
      // Merge the oldchange with the new change
      set[id] = (function () {
        switch (prevChange.type) {
          case TYPE.CREATE:
            switch (nextChange.type) {
              case TYPE.CREATE: return nextChange; // Another CREATE replaces previous CREATE.
              case TYPE.UPDATE: return combineCreateAndUpdate(prevChange, nextChange); // Apply nextChange.mods into prevChange.obj
              case TYPE.DELETE: return nextChange;  // Object created and then deleted. If it wasnt for that we MUST handle resent changes, we would skip entire change here. But what if the CREATE was sent earlier, and then CREATE/DELETE at later stage? It would become a ghost object in DB. Therefore, we MUST keep the delete change! If object doesnt exist, it wont harm!
            }
            break;
          case TYPE.UPDATE:
            switch (nextChange.type) {
              case TYPE.CREATE: return nextChange; // Another CREATE replaces previous update.
              case TYPE.UPDATE: return combineUpdateAndUpdate(prevChange, nextChange); // Add the additional modifications to existing modification set.
              case TYPE.DELETE: return nextChange;  // Only send the delete change. What was updated earlier is no longer of interest.
            }
            break;
          case TYPE.DELETE:
            switch (nextChange.type) {
              case TYPE.CREATE: return nextChange; // A resurection occurred. Only create change is of interest.
              case TYPE.UPDATE: return prevChange; // Nothing to do. We cannot update an object that doesnt exist. Leave the delete change there.
              case TYPE.DELETE: return prevChange; // Still a delete change. Leave as is.
            }
            break;  
        }
      })();
    }
    return set;
  }, {});
}

function resolveConflicts(clientChanges, serverChangeSet) {
  let resolved = [];
  clientChanges.forEach(function (clientChange) {
    let id = clientChange.table + ":" + clientChange.key;
    let serverChange = serverChangeSet[id];
    if (!serverChange) {
      // No server change on same object. Totally conflict free!
      resolved.push(clientChange);
    } else if (serverChange.type == TYPE.UPDATE) {
      // Server change overlaps. Only if server change is not CREATE or DELETE, we should consider merging in the client change.
      switch (clientChange.type) {
        case TYPE.CREATE:
          // Server has updated an object with same key as client has recreated. Let the client recreation go through, but also apply server modifications.
          applyModifications(clientChange.obj, serverChange.mods); // No need to clone clientChange.obj beofre applying modifications since noone else refers to clientChanges (it was retrieved from the socket connection in current request)
          resolved.push(clientChange);
          break;
        case TYPE.UPDATE:
          // Server and client has updated the same obejct. Just remove any overlapping keyPaths and only apply non-conflicting parts.
          Object.keys(serverChange.mods).forEach(function (keyPath) {
            // Remote this property from the client change
            delete clientChange.mods[keyPath];
            // Also, remote all changes to nestled objects under this keyPath from the client change:
            Object.keys(clientChange.mods).forEach(function (clientKeyPath) {
              if (clientKeyPath.indexOf(keyPath + '.') == 0) {
                delete clientChange.mods[clientKeyPath];
              }
            });
          });
          // Did we delete all keyPaths in the modification set of the clientChange?
          if (Object.keys(clientChange.mods).length > 0) {
            // No, there were some still there. Let this wing-clipped change be applied:
            resolved.push(clientChange);
          }
          break;
        case TYPE.DELETE:
          // Delete always win over update. Even client over a server
          resolved.push(clientChange);
          break;
      }
    } // else if serverChange.type is CREATE or DELETE, dont push anything to resolved, because the client change is not of any interest (CREATE or DELETE would eliminate any client change with same key!)
  });
  return resolved;
}

function deepClone(obj) {
  return JSON.parse(JSON.stringify(obj));
}

function applyModifications(obj, modifications) {
  Object.keys(modifications).forEach(function (keyPath) {
    setByKeyPath(obj, keyPath, modifications[keyPath]);
  });
  return obj;
}

function combineCreateAndUpdate(prevChange, nextChange) {
  let clonedChange = deepClone(prevChange);// Clone object before modifying since the earlier change in db.changes[] would otherwise be altered.
  applyModifications(clonedChange.obj, nextChange.mods); // Apply modifications to existing object.
  return clonedChange;
}

function combineUpdateAndUpdate(prevChange, nextChange) {
  let clonedChange = deepClone(prevChange); // Clone object before modifying since the earlier change in db.changes[] would otherwise be altered.
  Object.keys(nextChange.mods).forEach(function (keyPath) {
    // If prev-change was changing a parent path of this keyPath, we must update the parent path rather than adding this keyPath
    let hadParentPath = false;
    Object.keys(prevChange.mods).filter(function (parentPath) { return keyPath.indexOf(parentPath + '.') === 0 }).forEach(function (parentPath) {
      setByKeyPath(clonedChange.mods[parentPath], keyPath.substr(parentPath.length + 1), nextChange.mods[keyPath]);
      hadParentPath = true;
    });
    if (!hadParentPath) {
      // Add or replace this keyPath and its new value
      clonedChange.mods[keyPath] = nextChange.mods[keyPath];
    }
    // In case prevChange contained sub-paths to the new keyPath, we must make sure that those sub-paths are removed since
    // we must mimic what would happen if applying the two changes after each other:
    Object.keys(prevChange.mods).filter(function (subPath) { return subPath.indexOf(keyPath + '.') === 0 }).forEach(function (subPath) {
      delete clonedChange.mods[subPath];
    });
  });
  return clonedChange;
}

function setByKeyPath(obj, keyPath, value) {
  if (!obj || typeof keyPath !== 'string') return;
  let period = keyPath.indexOf('.');
  if (period !== -1) {
    let currentKeyPath = keyPath.substr(0, period);
    let remainingKeyPath = keyPath.substr(period + 1);
    if (remainingKeyPath === "")
      obj[currentKeyPath] = value;
    else {
      let innerObj = obj[currentKeyPath];
      if (!innerObj) innerObj = (obj[currentKeyPath] = {});
      setByKeyPath(innerObj, remainingKeyPath, value);
    }
  } else {
    obj[keyPath] = value;
  }
}

module.exports = {
  TYPE,
  reduceChanges,
  resolveConflicts,
  applyModifications,
}