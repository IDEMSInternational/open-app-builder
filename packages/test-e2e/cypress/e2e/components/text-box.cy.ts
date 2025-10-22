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

  it("can have a maximum length", () => {
    cy.getDataTest("maxLengthTextBox").find("input").should("have.attr", "maxlength", "30");
  });

  it("can align text", () => {
    cy.getDataTest("alignLeftTextBox").should("have.attr", "style", "text-align: left;");
    cy.getDataTest("alignCenterTextBox").should("have.attr", "style", "text-align: center;");
    cy.getDataTest("alignRightTextBox").should("have.attr", "style", "text-align: right;");
  });

  // Todo: review this functionality
  it("can be a number input", () => {
    cy.getDataTest("numberTextBox").find("input").should("have.attr", "inputmode", "tel");
  });
});
