describe("[Example_go_to_3 tests]", () => {
  it("[Navigates to example_go_to_3]", () => {
    cy.visit("/template/example_go_to_3");
  });

  it("[Should show p tags text]", () => {
    cy.contains("Button 1: Go to example_emit and emit completed").should("be.visible");
  });

  it("[Tests button 1]", () => {
    cy.get("ion-button").contains("Button 1").should("be.visible").click();
    cy.contains("Emit completed").should("be.visible").click();
    cy.get("ion-button").contains("Button 1").should("be.visible").click();
    cy.contains("Emit uncompleted").should("be.visible").click();
  });
});
