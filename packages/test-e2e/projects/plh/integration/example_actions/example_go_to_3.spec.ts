describe("[Example_go_to_3 tests]", () => {
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

  it("[Searchs for example_go_to_3]", () => {
    cy.get(".searchbar-input").type("example_go_to_3");
    cy.wait(1000);
  });

  it("[Should go to example_go_to_3 template]", () => {
    cy.contains("example_go_to_3").click();
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
