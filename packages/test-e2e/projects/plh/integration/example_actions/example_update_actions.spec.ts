describe("[Example_update tests]", () => {
  it("[Navigates to example_update_actions]", () => {
    cy.visit("/template/example_update_actions");
  });
  it("[Should check heading text]", () => {
    cy.contains("I will update after the popup has closed").should("be.visible");
  });

  it("[Clicks on popup button]", () => {
    cy.contains("Show Popup").should("be.visible").click();
  });

  it("[Checks for popup visibility]", () => {
    cy.get(".popup-content").should("be.visible");
  });

  it("[Checks for popup text]", () => {
    cy.get("plh-tmpl-text").contains("This is the example text template.").should("be.visible");
  });

  it("[Checks for popup close button]", () => {
    cy.get(".close-button").should("be.visible");
  });

  it("[Closes the popup]", () => {
    cy.get(".close-button").click();
  });

  it("[Checks for successful closure of popup]", () => {
    cy.get(".popup-content").should("not.be.visible");
  });

  it("[Should check for a welcome message]", () => {
    cy.contains("Welcome Back!").should("be.visible");
  });
});
