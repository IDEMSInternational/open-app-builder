describe("[Example_go_to_2 tests]", () => {
  it("[Navigates to example_go_to_2]", () => {
    cy.visit("/template/example_go_to_2");
  });

  it("[Should display a description text]", () => {
    cy.contains("Button 1: Go to example emit").should("be.visible");
    cy.contains("Button 2: Go to example_emit and mark as completed").should("be.visible");
  });

  it("[Checks for button 1]", () => {
    cy.get("ion-button").contains("Button 1").should("be.visible").click();
    cy.contains("Emit completed").should("be.visible").click();
    cy.get("ion-button").contains("Button 1").should("be.visible").click();
    cy.contains("Emit uncompleted").should("be.visible").click();
  });

  it("[Checks for button 2]", () => {
    cy.get("ion-button").contains("Button 2").should("be.visible").click();
    cy.contains("Emit completed").should("be.visible").click({ force: true, multiple: true });
    cy.get("ion-button").contains("Button 2").should("be.visible").click();
    cy.contains("Emit uncompleted").should("be.visible").click();
  });
});
