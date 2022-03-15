// NB: Might a Map be better in this case?
export default {
  clearDatabase: `
    cy.window().then((window) => {
      return new Cypress.Promise((resolve, reject) => {
        const req = window.indexedDB.deleteDatabase("plh-app-db");
        req.onsuccess = () => {
          console.log("indexeddb deleted");
          resolve();
        };
        req.onerror = () => {
          reject("failed to clear indexeddb");
        };
      });
    });
  `,
  goHome: `cy.visit("/");`,
};
