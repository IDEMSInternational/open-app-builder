describe("set global component", () => {
  beforeEach(() => {
    cy.visit("/template/test_set_global");
  });

  it("can set and get value", () => {
    cy.getDataTest("globalVariableValue").contains("Test Value");
  });

  it("can set via an action", () => {
    cy.getDataTest("executeButton").click();

    cy.getDataTest("globalVariableValue").contains("Action Test Value");
  });
});
