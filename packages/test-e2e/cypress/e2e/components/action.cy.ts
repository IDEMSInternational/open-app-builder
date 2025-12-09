describe("button component", () => {
  beforeEach(() => {
    cy.visit("/template/test_action");
  });

  it("click triggers action with plain text arguments", () => {
    // plain text args
    cy.getDataTest("executeButton").click();

    cy.getDataTest("actionExecuted").contains("Action 1 Executed");
  });

  it("click triggers action with dynamic arguments", () => {
    // plain text args
    cy.getDataTest("executeButton2").click();

    cy.getDataTest("actionExecuted").contains("Action 2 Executed");
  });
});
