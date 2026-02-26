describe("action component", () => {
  beforeEach(() => {
    cy.visit("/template/test_action");
  });

  it("click triggers action with plain text arguments", () => {
    cy.getDataTest("executeButton").click();

    cy.getDataTest("actionExecuted").contains("Action 1 Executed");
  });

  it("click triggers action with dynamic arguments", () => {
    cy.getDataTest("executeButton2").click();

    cy.getDataTest("actionExecuted").contains("Action 2 Executed");
  });

  it("click triggers action which calls another action", () => {
    cy.getDataTest("executeButton3").click();

    cy.getDataTest("actionExecuted").contains("Action 1 Executed");
  });

  it("click triggers an action which increments a variable", () => {
    cy.getDataTest("clickButton").click();
    cy.getDataTest("clickCountText").contains("Times clicked: 1");

    cy.getDataTest("clickButton").click();
    cy.getDataTest("clickCountText").contains("Times clicked: 2");
  });

  it("click triggers an external action which navigates", () => {
    cy.getDataTest("callExternalAction").click();

    cy.url().should("include", "/template/test_action_nav_target");
    cy.getDataTest("theTitle").contains("Navigated from external action");
  });

  it("click triggers an external action with params which navigates", () => {
    cy.getDataTest("callExternalActionWithParams").click();

    cy.url().should("include", "/template/test_action_nav_target");
    cy.getDataTest("theTitle").contains("Navigated by external action with param");
  });

  it("click triggers an external action via a sub action with params which navigates", () => {
    cy.getDataTest("callExternalActionWithParams2").click();

    cy.url().should("include", "/template/test_action_nav_target");
    cy.getDataTest("theTitle").contains("Navigated by external action with param via a sub action");
  });
});
