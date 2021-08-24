describe("[Example_go_to_2 tests]", () => {
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

  it("[Searchs for example_go_to_2]", () => {
    cy.get(".searchbar-input").type("example_go_to_2");
    cy.wait(1000);
  });

  it("[Should go to example_go_to_2 template]", () => {
    cy.contains("example_go_to_2").click();
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
    cy.contains("Emit completed").should("be.visible").click();
    cy.get("ion-button").contains("Button 2").should("be.visible").click();
    cy.contains("Emit uncompleted").should("be.visible").click();
  });
});
