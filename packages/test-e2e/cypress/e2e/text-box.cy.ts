describe("text box component", () => {
  beforeEach(() => {
    cy.visit("/template/test_text_box");
  });

  it("can be typed in", () => {
    cy.getDataTest("defaultTextBox").find("input").clear().type("Test Value").blur();

    cy.getDataTest("defaultTextBoxValue").contains("defaultTextBox: Test Value");
  });

  it("can be disabled", () => {
    cy.getDataTest("disabledTextBox").find("input").should("have.attr", "disabled");

    cy.getDataTest("dynamicallyDisabledTextBox").find("input").should("not.have.attr", "disabled");

    cy.getDataTest("toggle_enabled").click();

    cy.getDataTest("dynamicallyDisabledTextBox").find("input").should("have.attr", "disabled");
  });
});
