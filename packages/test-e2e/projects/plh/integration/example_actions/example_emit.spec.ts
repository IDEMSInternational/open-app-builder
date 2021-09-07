describe("[Example_emit tests]", () => {
  it("[Navigates to example_emit]", () => {
    cy.visit("/template/example_emit");
  });

  it("[Check p tag text]", () => {
    cy.contains("This is the example emit template.").should("be.visible");
  });

  it("[Should check for button 1 click]", () => {
    cy.contains("Emit completed").should("be.visible").click();
  });

  it("[Should check for button 2 click]", () => {
    cy.contains("Emit uncompleted").should("be.visible").click();
  });
});
