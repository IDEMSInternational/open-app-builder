describe("nav component", () => {
  beforeEach(() => {
    cy.visit("/template/test_nav");
  });

  it("click triggers navigation with a parameter", () => {
    cy.getDataTest("navButton").click();

    cy.url().should("include", "/template/test_nav_target");
    cy.getDataTest("targetTitle").contains("New Title");
  });

  it("click triggers navigation with dynamic template name", () => {
    cy.getDataTest("dynamicNavButton").click();

    cy.url().should("include", "/template/test_nav_target");
    cy.getDataTest("targetTitle").contains("Dynamic Title");
  });
});
