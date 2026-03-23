// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

Cypress.Commands.add("getDataTest", (name) => {
  return cy.get(`[data-test='${name}']`);
});

Cypress.Commands.add("clearIndexedDB", () => {
  return cy.window().then(async (win) => {
    const deleteDatabase = (name: string) => {
      return new Cypress.Promise<void>((resolve, reject) => {
        const request = win.indexedDB.deleteDatabase(name);

        request.onsuccess = () => resolve();
        request.onblocked = () => resolve();
        request.onerror = () => reject(request.error);
      });
    };

    const databaseNames = new Set<string>(["plh-app-db"]);
    const indexedDBWithDatabases = win.indexedDB as IDBFactory & {
      databases?: () => Promise<Array<{ name?: string }>>;
    };

    if (indexedDBWithDatabases.databases) {
      const databases = await indexedDBWithDatabases.databases();
      for (const database of databases) {
        if (database.name?.startsWith("rxdb-dexie-")) {
          databaseNames.add(database.name);
        }
      }
    }

    await Cypress.Promise.all(Array.from(databaseNames).map((name) => deleteDatabase(name)));
  });
});
