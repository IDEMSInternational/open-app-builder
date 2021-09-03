describe("[First Load]", () => {
  // before the run starts delete indexeddb database as not cleared automatically
  // issue: https://github.com/cypress-io/cypress/issues/1208
  // (it loads user info that influences splash screen)
  before(() => {
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
  });

  it("[Loads home page]", () => {
    cy.visit("/");
    cy.location("pathname").should("eq", "/home");
  });
  it("[Shows intro popup]", () => {
    // some app elements have a specific attribute on them to make it easier to search in cypress
    // e.g.  <ion-button data-cy="skip-intro">Skip Intro</ion-button>
    cy.get("[data-cy=skip-intro]").should("be.visible");
  });
  it("[Dismisses intro popup]", () => {
    cy.get("[data-cy=skip-intro]").click();
    cy.get("[data-cy=skip-intro]").should("not.exist");
  });
  it("[Shows consent form]", () => {
    cy.get("analytics-survey").should("be.visible");
  });
  it("[Dismisses consent form]", () => {
    // we don't currently have a good identifier for the continue button (should add)
    // so just search for anything containing the word Continue
    cy.get("analytics-survey").contains("Continue").click();
  });
  it("[Shows language select template]", () => {
    cy.get("[data-templatename=language_select]").contains("English").click();
  });
  it("[Shows intro.js tooltip]", () => {
    cy.get(".introjs-tooltip").should("be.visible");
  });
  it("[Dismisses intro.js tooltip]", () => {
    cy.get(".introjs-skipbutton").click();
    cy.get(".introjs-tooltip").should("not.exist");
  });
});

describe("[Not First Load]", () => {
  before(() => {
    cy.visit("/");
  });
  it("[Should load homescreen template]", () => {
    // check template component loaded
    cy.get('[data-templatename="home_screen"]').should("be.visible");
    // example if screenshots required.
    // Include extra wait time because likely content will not be visible immediately when template loaded
    // (alternatively could wait for specific element from the content to be visible if known)
    cy.wait(1000);
    cy.screenshot();
  });
});
