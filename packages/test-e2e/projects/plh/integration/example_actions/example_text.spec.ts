describe("[Example_text tests]", () => {
  it("[Navigates to example_text]", () => {
    cy.visit("/template/example_text");
  });

  it("[Should display text]", () => {
    cy.contains("This is the example text template.").should("be.visible");
  });
});
