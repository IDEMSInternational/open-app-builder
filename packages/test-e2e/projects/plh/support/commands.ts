import Dexie from "dexie";
import { DB_TABLES, DB_VERSION } from "data-models/db.model";
import { addMatchImageSnapshotCommand } from "cypress-image-snapshot/command";

addMatchImageSnapshotCommand();

// as importing additional modules need to declare as global (https://github.com/cypress-io/cypress/issues/1065)
declare global {
  namespace Cypress {
    interface Chainable {
      /** Load a custom user profile from fixture data, assigning profile data to contact fields */
      setProfile(profile: IProfileName): Chainable<Element>;
    }
  }
}

Cypress.Commands.add("skipIntro", () => {
  console.log("skipping intro");
});

/** Load a custom user profile from fixture data, assigning profile data to contact fields */
Cypress.Commands.add("setProfile", (profile: IProfileName = "new-user") => {
  let profileData: IProfileData = { fields: {}, tables: {} };
  let appWindow: Cypress.AUTWindow;
  cy.window().then((w) => (appWindow = w));

  cy.fixture(`profiles/${profile}`).then((data: IProfileData) => {
    profileData = data;
  });
  cy.wrap("setting profile fields").then(() => {
    // set localstorage fields
    Object.keys(profileData.fields).forEach((field) => {
      appWindow.localStorage.setItem(`rp-contact-field.${field}`, profileData.fields[field]);
    });
  });
  cy.wrap("setting indexeddb tables").then(() => {
    // use dexie with the existing app window
    const db = new Dexie("plh-app-db", { indexedDB: appWindow.indexedDB });
    db.version(DB_VERSION).stores(DB_TABLES);
    console.log("db init", DB_VERSION, DB_TABLES);
    return setDbTables(db, profileData.tables);
  });
});

function setDbTables(db: Dexie, tables: IProfileData["tables"]) {
  return new Cypress.Promise(async (resolve, reject) => {
    await db.open().catch((err) => {
      console.error("could not open db", err);
      reject(err);
    });

    for (const table_id of Object.keys(tables)) {
      const rows = tables[table_id];
      console.log("setting", table_id, rows);

      await db.table(table_id).bulkPut(rows);
    }
    db.close();
    resolve();
  });
}

type IProfileName = "new-user" | "default";
interface IProfileData {
  fields: { [field: string]: string };
  tables: { [table_id: string]: any[] };
}
