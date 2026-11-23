describe("on_leave component", () => {
  beforeEach(() => {
    cy.visit("/template/test_on_leave");
  });

  it("waits for confirmation before leaving and allows cancellation", () => {
    cy.getDataTest("navButton").click();
    cy.get("ion-modal").should("be.visible").contains("Are you sure that you want to leave");
    cy.location("pathname").should("eq", "/template/test_on_leave");

    cy.get("ion-modal").find("[data-test='cancel']").click();
    cy.get("ion-modal").should("not.be.visible");
    cy.location("pathname").should("eq", "/template/test_on_leave");

    cy.getDataTest("navButton").click();
    cy.get("ion-modal").should("be.visible");
    cy.location("pathname").should("eq", "/template/test_on_leave");
    cy.get("ion-modal").find("[data-test='okButton1']").click();

    cy.location("pathname").should("eq", "/template/test_nav_target");
    cy.getDataTest("targetTitle").contains("New Title");
  });

  it("stays on the page when the dialog is dismissed", () => {
    cy.getDataTest("navButton").click();
    cy.get("ion-modal").should("be.visible").find(".close-button").click();
    cy.get("ion-modal").should("not.be.visible");
    cy.location("pathname").should("eq", "/template/test_on_leave");
  });

  it("waits for the popup on browser Back and preserves history when cancelled", () => {
    cy.visit("/template");
    cy.contains("ion-item", /^test_on_leave$/).click();
    cy.location("pathname").should("eq", "/template/test_on_leave");
    cy.getDataTest("navButton").should("be.visible");

    cy.go("back");
    cy.get("ion-modal").should("be.visible").contains("Are you sure that you want to leave");
    cy.getDataTest("navButton")
      .closest("plh-template-page")
      .should("not.have.class", "ion-page-hidden");
    cy.get("ion-modal").find("[data-test='cancel']").click();
    cy.get("ion-modal").should("not.be.visible");
    cy.location("pathname").should("eq", "/template/test_on_leave");

    cy.go("back");
    cy.get("ion-modal").should("be.visible");
    cy.getDataTest("navButton")
      .closest("plh-template-page")
      .should("not.have.class", "ion-page-hidden");
    cy.get("ion-modal").find("[data-test='okButton1']").click();
    cy.location("pathname").should("eq", "/template");
    cy.get("plh-template-page:not(.ion-page-hidden)").should("contain.text", "Select a Template");

    cy.go("forward");
    cy.location("pathname").should("eq", "/template/test_on_leave");
    cy.getDataTest("navButton").should("be.visible");
    cy.get("ion-modal").should("not.be.visible");
  });
});
