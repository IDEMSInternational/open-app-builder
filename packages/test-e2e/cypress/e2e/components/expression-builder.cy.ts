describe("expression builder component", () => {
  beforeEach(() => {
    cy.visit("/template/test_expression_builder");
  });

  it("builds an expression for each item in a list", () => {
    cy.getDataTest("builderText")
      .should("contain", "index: 0 value:This is value 1")
      .should("contain", "index: 1 value:This is value 2")
      .should("contain", "index: 2 value:This is value 3");
  });

  it("adds the expression value for each item in a list", () => {
    cy.getDataTest("builder2Text").should("contain", "3");
  });

  it("subtracts the expression value for each item in a list", () => {
    cy.getDataTest("builder3Text").should("contain", "7");
  });

  it("multiplies by the expression value for each item in a list", () => {
    cy.getDataTest("builder4Text").should("contain", "6");
  });

  it("divides by the expression value for each item in a list", () => {
    cy.getDataTest("builder5Text").should("contain", "10");
  });
});
