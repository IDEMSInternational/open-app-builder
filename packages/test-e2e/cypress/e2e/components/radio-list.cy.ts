describe("radio list component", () => {
  beforeEach(() => {
    cy.visit("/template/test_radio_list");
  });

  it("selects a value", () => {
    cy.getDataTest("radioList1SelectedValue").contains("key_1");

    cy.get("ion-radio-group")
      .should("be.visible")
      .find("ion-radio")
      .contains("This is value 2")
      .click();

    cy.getDataTest("radioList1SelectedValue").contains("key_2");
  });

  it("reacts to option value changes", () => {
    cy.getDataTest("newDynamicValue")
      .find("input")
      .should("have.value", "This is a dynamic value")
      .clear()
      .type("New Dynamic Value")
      .blur();

    cy.get("ion-radio-group")
      .should("be.visible")
      .find("ion-radio")
      .contains("New Dynamic Value")
      .click();

    cy.getDataTest("radioList2SelectedValue").contains("key_3");
  });
});
