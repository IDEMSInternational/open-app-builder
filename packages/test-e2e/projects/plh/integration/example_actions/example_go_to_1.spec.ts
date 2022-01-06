describe("[Example_go_to_1 template tests]", () => {
  it("[Navigates to example_go_to_1]", () => {
    cy.visit("/template/example_go_to_1");
  });

  it("[Should show p tags text]", () => {
    cy.contains("This template demonstates 4 types of go-to buttons.").should("be.visible");
    cy.contains("Write x for the template example_emit.").should("be.visible");
  });

  it("[Tests button 1]", () => {
    cy.contains("Go to x").should("be.visible").click();
    cy.contains("Emit completed").should("be.visible").click();
    cy.contains("Go to x").should("be.visible").click();
    cy.contains("Emit uncompleted").should("be.visible").click();
  });

  it("[Tests button 2]", () => {
    cy.contains("Go to x and don't come back").should("be.visible").click();
    cy.contains("Emit completed").should("be.visible").click({ force: true });
    cy.contains("Go to x and don't come back").should("be.visible").click();
    cy.contains("Emit uncompleted").should("be.visible").click({ force: true });
  });

  it("[Tests button 3]", () => {
    cy.contains("Go to x and come back if x uncompleted").should("be.visible").click();
    cy.contains("Emit completed").should("be.visible").click({ force: true });
    cy.contains("Go to x and come back if x uncompleted").should("be.visible").click();
    cy.contains("Emit uncompleted").should("be.visible").click({ force: true });
  });

  it("[Tests button 4]", () => {
    cy.contains("Go to x and come back if x completed").should("be.visible").click();
    cy.contains("Emit completed").should("be.visible").click({ force: true });
    cy.contains("Go to x and come back if x completed").should("be.visible").click();
    cy.contains("Emit uncompleted").should("be.visible").click({ force: true });
  });
});
