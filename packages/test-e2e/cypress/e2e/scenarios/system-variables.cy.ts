describe("set global component", () => {
  beforeEach(() => {
    cy.visit("/template/test_system_variables");
  });

  it("can get system variables", () => {
    cy.getDataTest("deploymentName").contains("test");
    cy.getDataTest("platform").contains("web");
    cy.getDataTest("appEnvironment").contains("development");
    cy.getDataTest("appTheme").contains("default");
  });
});
