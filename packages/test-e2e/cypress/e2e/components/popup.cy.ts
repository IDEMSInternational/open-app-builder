describe("popup component", () => {
  beforeEach(() => {
    cy.visit("/template/test_popup");
  });

  it("displays a dialog style popup", () => {
    cy.getDataTest("inlinePopupButton").click();

    cy.get("ion-modal")
      .should("be.visible")
      .find(".popup-container")
      .contains("This is a dialog style popup");

    cy.get("ion-modal").find(".close-button").click();

    cy.get("ion-modal").should("not.be.visible");
  });

  it("displays a full screen popup", () => {
    cy.getDataTest("fullscreenPopupButton").click();

    cy.get("ion-modal")
      .should("be.visible")
      .find(".popup-container")
      .contains("This is a full screen popup");

    cy.get("ion-modal").find(".close-button").click();

    cy.get("ion-modal").should("not.be.visible");
  });

  it("reopens a dialog popup after closing it with the backdrop", () => {
    cy.getDataTest("inlinePopupButton").click();
    cy.get("ion-modal").find(".popup-container").should("be.visible");

    // The backdrop is in the modal's shadow DOM, which Cypress reports as covered by the dialog
    cy.get("ion-modal:not(.overlay-hidden)").find("ion-backdrop").click({ force: true });
    cy.get("ion-modal").should("not.be.visible");

    cy.getDataTest("inlinePopupButton").click();
    cy.get("ion-modal")
      .should("be.visible")
      .find(".popup-container")
      .contains("This is a dialog style popup");
  });

  it("reopens a full screen popup after closing it with the Escape key", () => {
    cy.getDataTest("fullscreenPopupButton").click();
    cy.get("ion-modal").find(".popup-container").should("be.visible");

    cy.get("body").type("{esc}");
    cy.get("ion-modal").should("not.be.visible");

    cy.getDataTest("fullscreenPopupButton").click();
    cy.get("ion-modal")
      .should("be.visible")
      .find(".popup-container")
      .contains("This is a full screen popup");
  });

  it("displays a template popup with override parameter", () => {
    cy.getDataTest("templatePopupButton").click();

    cy.get("ion-modal").should("be.visible").find(".popup-container").contains("Override Value");

    cy.get("ion-modal").find(`[data-test='templatePopup.okButton']`).click();

    cy.get("ion-modal").should("not.be.visible");
  });

  it("displays a template popup with dynamic override parameter", () => {
    cy.getDataTest("dynamicTemplatePopupValue").find("input").clear().type("Dynamic Text").blur();

    cy.getDataTest("dynamicTemplatePopupButton").click();

    cy.get("ion-modal").should("be.visible").find(".popup-container").contains("Dynamic Text");

    cy.get("ion-modal").find(".close-button").click();

    cy.get("ion-modal").should("not.be.visible");
  });
});
