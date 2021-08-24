describe("[Example_text tests]", () => {
  it("[Loads home page]", () => {
    cy.visit("/");
    cy.location("pathname").should("eq", "/home");
    cy.wait(1000);
  });

  it("[Clicks Menu Button]", () => {
    cy.get(".buttons-first-slot").click();
    cy.wait(1000);
  });

  it("[Should go to templates]", () => {
    cy.contains("Template").click({ multiple: true });
  });

  it("[Searchs for example_text]", () => {
    cy.get(".searchbar-input").type("example_text");
    cy.wait(1000);
  });

  it("[Should go to example_text template]", () => {
    cy.contains("example_text").click();
  });

  it("[Should display text]", () => {
    cy.contains("This is the example text template.").should("be.visible");
  });
});
