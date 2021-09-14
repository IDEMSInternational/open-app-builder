describe("[Visual testing example]", () => {
  it("[Visits site]", () => {
    cy.visit("/template/debug_actions_middle");
    cy.wait(2000);
    cy.matchImageSnapshot();
  });
});
