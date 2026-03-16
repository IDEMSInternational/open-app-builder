describe("title component", () => {
  beforeEach(() => {
    cy.visit("/template/test_title");
  });

  it("displays value", () => {
    cy.getDataTest("plainTitle").contains("h1", "Plain title value");
  });

  it("displays tooltip", () => {
    cy.getDataTest("tooltipTitleTooltip").click();

    cy.get(".p-tooltip").contains("Hi, I'm a tooltip!");
  });

  it("aligns text", () => {
    cy.getDataTest("centerTitle").should("have.attr", "style", "text-align: center;");
    cy.getDataTest("rightTitle").should("have.attr", "style", "text-align: right;");
  });
});
