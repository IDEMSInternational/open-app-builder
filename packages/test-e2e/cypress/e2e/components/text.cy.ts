describe("text component", () => {
  beforeEach(() => {
    cy.visit("/template/test_text");
  });

  it("displays plain text values correctly", () => {
    cy.getDataTest("plainText").contains("p", "Plain text value");
  });

  it("interprets markdown correctly", () => {
    cy.getDataTest("titleText").contains("h1", "h1");
    cy.getDataTest("titleText").contains("h2", "h2");
    cy.getDataTest("titleText").contains("h3", "h3");
  });
});
