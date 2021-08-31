describe("[Example_popup tests]", () => {
  it("[Navigates to example_pop_ups]", () => {
    cy.visit("/template/example_pop_ups");
  });

  it("[Checks for text visibility]", () => {
    cy.contains("This is the main template demonstrating three types of pop-ups.").should(
      "be.visible"
    );
    cy.contains("Button 1 is a simple text pop-up:").should("be.visible");
    cy.contains("Button 2 (example_go_to_2) dismisses on all:").should("be.visible");
    cy.contains("Button 3 (example_go_to_3) dismisses on completed:").should("be.visible");
  });

  it("[Checks button 1 working]", () => {
    cy.get("ion-button").contains("Button 1").should("be.visible").click();
  });

  it("[Checks for the popup visbility]", () => {
    cy.get(".popup-content").should("be.visible");
  });

  it("[Checks for the text visbility in popup]", () => {
    cy.get(".popup-content").contains("This is the example text template.").should("be.visible");
  });

  it("[Closes the popup]", () => {
    cy.get(".close-button").click();
  });

  it("[Checks for the button 2 working]", () => {
    cy.wait(500);
    cy.get("ion-button").contains("Button 2").should("be.visible").click();
    cy.wait(500);
  });

  it("[Checks for the popup visbility]", () => {
    cy.get(".popup-content").should("be.visible");
  });

  it("[Checks for text on popup]", () => {
    cy.contains("Button 1: Go to example emit").should("be.visible");
    cy.contains("Button 2: Go to example_emit and mark as completed").should("be.visible");
  });

  it("[Checks for popup button 1 working]", () => {
    cy.wait(500);
    cy.get(".popup-content ion-button").contains("Button 1").should("be.visible").click();
    cy.wait(500);
  });

  it("[Checks for the non-visibility of popup]", () => {
    cy.get(".popup-content").should("not.be.visible");
  });

  //To check why below tests are skipped
  //Refer to this issue: https://github.com/IDEMSInternational/parenting-app-ui/issues/994

  it.skip("[Checks for emit completed/uncompleted button", () => {
    cy.contains("Emit completed")
      .should("be.visible")
      .click()
      .get(".popup-content span.left")
      .contains("Button 1")
      .should("be.visible")
      .click({ force: true });

    cy.contains("Emit uncompleted").click();
  });

  it.skip("[Checks for the popup button 2 working]", () => {
    cy.get(".popup-content ion-button").contains("Button 2").click({ multiple: true, force: true });

    cy.contains("Emit completed")
      .should("be.visible")
      .click({ force: true })
      .get(".popup-content span.left")
      .contains("Button 2")
      .should("be.visible")
      .click({ multiple: true, force: true });

    cy.contains("Emit uncompleted").click();
  });

  it.skip("[Closes the popup]", () => {
    cy.get(".close-button").should("be.visible").click({ multiple: true, force: true });
  });

  it.skip("[Checks for button 3 working]", () => {
    cy.wait(500);
    cy.get("ion-button").contains("Button 3").should("be.visible").click();
    cy.wait(500);
  });

  it.skip("[Checks for the text visbility]", () => {
    cy.get(".popup-content")
      .contains("Button 1: Go to example_emit and emit completed")
      .should("be.visible");
  });

  it.skip("[Checks popup button 1 working]", () => {
    cy.wait(500);
    cy.get(".popup-content ion-button").contains("Button 1").click({ force: true });
    cy.wait(500);
  });

  it.skip("[Checks for emit completed/uncompleted buttons", () => {
    cy.contains("Emit completed").should("be.visible").click();
    cy.get(".popup-content span.left")
      .contains("Button 1")
      .should("be.visible")
      .click({ multiple: true, force: true });

    cy.contains("Emit uncompleted").click();
  });

  it.skip("[Closes the popup]", () => {
    cy.get(".close-button").should("be.visible").click({ multiple: true, force: true });
  });
});
