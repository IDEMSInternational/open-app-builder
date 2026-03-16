describe("set variable component", () => {
  it("can set and get value", () => {
    cy.visit("/template/test_set_variable");

    cy.getDataTest("localVariableText").contains("Test Value");
  });
});
