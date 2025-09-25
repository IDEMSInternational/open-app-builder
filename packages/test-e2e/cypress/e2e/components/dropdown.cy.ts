describe("dropdown component", () => {
  beforeEach(() => {
    cy.visit("/template/test_dropdown");
  });

  it("selects a value", () => {
    cy.getDataTest("defaultDropdown")
      .should("contain", "This is value 1") // check initial value is selected
      .click();

    cy.get("ion-popover").should("be.visible").find("ion-item").contains("This is value 2").click();

    cy.getDataTest("defaultDropdownValueText").contains("key_2");
  });

  it("reacts to dynamic value change", () => {
    cy.getDataTest("defaultDropdown")
      .should("contain", "This is value 1") // check initial value is selected
      .click();

    cy.get("ion-popover").should("be.visible").find("ion-item").contains("This is value 2").click();

    cy.getDataTest("disabledDropdown").contains("This is value 2"); // This reacts to the defaultDropdowns value change and correctly ses it's own value
  });

  it("is disabled", () => {
    cy.getDataTest("disabledDropdown").should("have.attr", "disabled");
  });

  it("has a placeholder", () => {
    cy.getDataTest("placeholderDropdown").should("contain", "Placeholder Text");
  });

  it("displays a search modal that acn be filtered", () => {
    cy.getDataTest("searchDropdown")
      .should("contain", "This is value 2") // check initial value is selected
      .click();

    cy.get(".dropdown-search").should("be.visible");
    cy.get("oab-dropdown-modal").find("ion-item").should("have.length", 3);

    cy.get("oab-dropdown-modal").find(".searchbar-input").type("3");

    cy.get("oab-dropdown-modal").find("ion-item").should("have.length", 1).click();

    cy.getDataTest("searchDropdown").should("contain", "This is value 3"); // check initial value is selected

    cy.get(".dropdown-search").should("not.exist"); // Check that the search modal closes on select
  });

  it("cancel dropdown modal", () => {
    cy.getDataTest("searchDropdown")
      .should("contain", "This is value 2") // check initial value is selected
      .click();

    cy.getDataTest("closeDropdownModal").click();

    cy.getDataTest("searchDropdown").should("contain", "This is value 2"); // check initial value is still selected

    cy.get(".dropdown-search").should("not.exist"); // Check that the search modal closes on select
  });
});
