describe("nav component", () => {
  beforeEach(() => {
    cy.visit("/template/test_nav");
  });

  it("click triggers navigation with a parameter", () => {
    // plain text args
    cy.getDataTest("navButton").click();

    cy.url().should("include", "/template/test_nav_target");
    cy.getDataTest("targetTitle").contains("New Title");
  });
});
