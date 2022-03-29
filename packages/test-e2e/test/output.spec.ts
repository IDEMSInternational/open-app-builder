/** This file has been automatically generated. Do not modify directly */
describe("[First Load]", () => {
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
    cy.get("[data-cy=skip-intro]").should("be.visible");
  });
  it("[Dismisses intro popup]", () => {
    cy.get("[data-cy=skip-intro]").click();
    cy.get("[data-cy=skip-intro]").should("not.exist");
  });
  it("[Shows consent form]", () => {
    cy.get("[data-templatename=accept_terms]").should("be.visible");
  });
  it("[Dismisses consent form]", () => {
    cy.get("[data-rowname=button_completed]").contains("Continue").click();
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
    cy.get('[data-templatename="home_screen"]').should("be.visible");
    cy.wait(1000);
    cy.screenshot();
  });
});
