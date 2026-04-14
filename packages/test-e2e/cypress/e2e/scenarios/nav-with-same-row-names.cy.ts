describe("nav component", () => {
  beforeEach(() => {
    cy.visit("/template/test_row_names");
  });

  it("click triggers navigation with a parameter", () => {
    cy.getDataTest("mainTitle").contains("First Title");
    cy.getDataTest("navButton").click();

    cy.url().should("include", "/template/test_row_names_target");
    cy.getDataTest("mainTitle").contains("Target Title");

    cy.go("back");
    cy.getDataTest("mainTitle").contains("First Title");
  });
});
