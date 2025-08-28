describe("nested template component", () => {
  beforeEach(() => {
    cy.visit("/template/test_nested_template");
  });

  it("renders a child template", () => {
    cy.getDataTest("childTemplate").should("exist");
  });

  it("renders a grandchild template", () => {
    cy.getDataTest("childTemplate.grandchildTemplate").should("exist");
  });

  it("passes static values to the child template", () => {
    cy.getDataTest("childTemplate.childTextStatic").contains("Parent Static Value");
  });

  it("passes dynamic values to the child template", () => {
    cy.getDataTest("childTemplate.childTextStatic").contains("Parent Static Value");

    cy.getDataTest("parentTextBox").find("input").clear().type("Parent Test Value").blur();

    cy.getDataTest("childTemplate.childText").contains("Parent Test Value");
  });

  it("can reference child template values", () => {
    cy.getDataTest("childTemplate.childTextBox")
      .find("input")
      .clear()
      .type("New child Value")
      .blur();

    cy.getDataTest("parentChildText").contains("New child Value");
  });

  it("passes values to the grandchild template", () => {
    cy.getDataTest("parentTextBox").find("input").clear().type("Parent Test Value").blur();

    cy.getDataTest("childTemplate.grandchildTemplate.grandchildText").contains("Parent Test Value");
  });

  it("can reference grandchild template values", () => {
    cy.getDataTest("childTemplate.grandchildTemplate.grandchildTextBox")
      .find("input")
      .clear()
      .type("Parent Test Value")
      .blur();

    // Grandchild referenced in parent
    cy.getDataTest("parentGrandchildText").contains("Parent Test Value");

    // Grandchild referenced in child
    cy.getDataTest("childTemplate.childGrandchildText").contains("Parent Test Value");
  });
});
