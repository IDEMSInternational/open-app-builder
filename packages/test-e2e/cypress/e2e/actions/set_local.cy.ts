describe("set_local action", () => {
  beforeEach(() => {
    cy.visit("/template/test_actions");
  });

  it("can set a static value", () => {
    cy.getDataTest("resultsText").contains("Default Value");

    cy.getDataTest("setStaticValuebutton").click();

    cy.getDataTest("resultsText").contains("Static Value");
  });

  it("can set a dynamic value", () => {
    cy.getDataTest("resultsText").contains("Default Value");

    cy.getDataTest("setDynamicValue").click();

    cy.getDataTest("resultsText").contains("1");

    cy.getDataTest("updateDynamicValue").click();

    cy.getDataTest("resultsText").contains("2");
  });
});
