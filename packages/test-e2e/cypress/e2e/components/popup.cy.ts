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

  it("displays a template popup with override parameter", () => {
    cy.getDataTest("templatePopupButton").click();

    cy.get("ion-modal").should("be.visible").find(".popup-container").contains("Override Value");

    cy.get("ion-modal").find(".close-button").click();

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
