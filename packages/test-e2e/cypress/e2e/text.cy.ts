describe("text component", () => {
  beforeEach(() => {
    cy.visit("/template/test_text");
  });

  it("displays values correctly", () => {
    cy.getDataTest("plainText").contains("p", "Plain text value");
  });

  it("interprets markdown", () => {
    cy.getDataTest("titleText").contains("h1", "h1");
    cy.getDataTest("titleText").contains("h2", "h2");
    cy.getDataTest("titleText").contains("h3", "h3");
  });
});
