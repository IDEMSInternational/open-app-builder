export async function readIndexedDBDocs<T = unknown>(
  dbName: string,
  objectStore: string
): Promise<T[] | null> {
  return new Promise((resolve) => {
    const request = indexedDB.open(dbName);

    request.onerror = () => resolve(null);

    request.onupgradeneeded = () => {
      // Database doesn't exist, abort
      request.transaction?.abort();
    };

    request.onsuccess = () => {
      const db = request.result;

      if (!db.objectStoreNames.contains(objectStore)) {
        db.close();
        resolve(null);
        return;
      }

      const transaction = db.transaction(objectStore, "readonly");
      const store = transaction.objectStore(objectStore);
      const getAll = store.getAll();

      getAll.onsuccess = () => {
        db.close();
        resolve(getAll.result ?? []);
      };

      getAll.onerror = () => {
        db.close();
        resolve(null);
      };
    };
  });
}
