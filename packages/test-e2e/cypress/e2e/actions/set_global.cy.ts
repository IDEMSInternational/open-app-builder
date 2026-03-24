describe("set_global action", () => {
  beforeEach(() => {
    cy.visit("/template/test_set_global_action");
  });

  it("can set a static value", () => {
    cy.getDataTest("resultsText").contains("Default Value");

    cy.getDataTest("setStaticValuebutton").click();

    cy.getDataTest("resultsText").contains("Static Value");
  });

  it("can set a dynamic value", () => {
    cy.getDataTest("resultsText").contains("Default Value");

    cy.getDataTest("setDynamicValue").click();

    cy.getDataTest("dynamicResultText").contains("2");

    cy.getDataTest("updateDynamicValue").click();

    cy.getDataTest("dynamicResultText").contains("3");
  });
});
