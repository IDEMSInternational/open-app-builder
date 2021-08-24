describe("[Example_emit tests]", () => {
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

  it("[Searchs for example_emit]", () => {
    cy.get(".searchbar-input").type("example_emit");
    cy.wait(1000);
  });

  it("[Should go to example_go_to_1 template]", () => {
    cy.contains("example_emit").click();
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
