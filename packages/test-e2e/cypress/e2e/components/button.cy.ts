describe("button component", () => {
  beforeEach(() => {
    cy.visit("/template/test_button");
  });

  it("triggers click action", () => {
    // plain text args
    cy.getDataTest("testClickButton").click();
    cy.getDataTest("buttonClickValue").contains("Clicked!");

    // dynamic args
    cy.getDataTest("dynamicActionButton").click();
    cy.getDataTest("dynamicActionValue").contains("Clicked Dynamically!");
  });
});
