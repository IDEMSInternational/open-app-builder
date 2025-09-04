describe("text component", () => {
  beforeEach(() => {
    cy.visit("/template/test_toggle_bar");
  });

  it("can toggle", () => {
    cy.getDataTest("toggleOnText").should("be.visible");
    cy.getDataTest("toggleOffText").should("not.be.visible");

    cy.getDataTest("defaultToggle").click();

    cy.getDataTest("toggleOnText").should("not.be.visible");
    cy.getDataTest("toggleOffText").should("be.visible");
  });
});
