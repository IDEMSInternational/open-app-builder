describe("Variable scope", () => {
  beforeEach(() => {
    cy.visit("/template/test_variable_scope");
  });

  it("loop is reactive to variable in a higher scope", () => {
    cy.getDataTest("rootButton").contains("Root Text");

    cy.getDataTest("outerLoop.key_1.loopButton").contains("Root Text");
    cy.getDataTest("outerLoop.key_2.loopButton").contains("Root Text");
    cy.getDataTest("outerLoop.key_3.loopButton").contains("Root Text");

    cy.getDataTest("buttonText").find("input").clear().type("Something Different").blur();

    cy.getDataTest("outerLoop.key_1.loopButton").contains("Something Different");
    cy.getDataTest("outerLoop.key_2.loopButton").contains("Something Different");
    cy.getDataTest("outerLoop.key_3.loopButton").contains("Something Different");
  });

  it("loop is reactive to variable in a 2nd level scope", () => {
    cy.getDataTest("rootButton").contains("Root Text");

    cy.getDataTest("outerLoop2.key_1.innnerLoop.0.loopButton").contains("Root Text");
    cy.getDataTest("outerLoop2.key_1.innnerLoop.1.loopButton").contains("Root Text");
    cy.getDataTest("outerLoop2.key_1.innnerLoop.2.loopButton").contains("Root Text");

    cy.getDataTest("outerLoop2.key_2.innnerLoop.0.loopButton").contains("Root Text");
    cy.getDataTest("outerLoop2.key_2.innnerLoop.1.loopButton").contains("Root Text");
    cy.getDataTest("outerLoop2.key_2.innnerLoop.2.loopButton").contains("Root Text");

    cy.getDataTest("outerLoop2.key_2.innnerLoop.0.loopButton").contains("Root Text");
    cy.getDataTest("outerLoop2.key_2.innnerLoop.1.loopButton").contains("Root Text");
    cy.getDataTest("outerLoop2.key_2.innnerLoop.2.loopButton").contains("Root Text");

    cy.getDataTest("buttonText").find("input").clear().type("Something Different").blur();

    cy.getDataTest("outerLoop2.key_1.innnerLoop.0.loopButton").contains("Something Different");
    cy.getDataTest("outerLoop2.key_1.innnerLoop.1.loopButton").contains("Something Different");
    cy.getDataTest("outerLoop2.key_1.innnerLoop.2.loopButton").contains("Something Different");

    cy.getDataTest("outerLoop2.key_2.innnerLoop.0.loopButton").contains("Something Different");
    cy.getDataTest("outerLoop2.key_2.innnerLoop.1.loopButton").contains("Something Different");
    cy.getDataTest("outerLoop2.key_2.innnerLoop.2.loopButton").contains("Something Different");

    cy.getDataTest("outerLoop2.key_3.innnerLoop.0.loopButton").contains("Something Different");
    cy.getDataTest("outerLoop2.key_3.innnerLoop.1.loopButton").contains("Something Different");
    cy.getDataTest("outerLoop2.key_3.innnerLoop.2.loopButton").contains("Something Different");
  });

  it("locally scoped variables have priority over higher scopes", () => {
    cy.getDataTest("rootButton").contains("Root Text");

    cy.getDataTest("outerLoop3.key_1.loopButton").contains("Root Text");
    cy.getDataTest("outerLoop3.key_1.innnerLoop.0.loopButton").contains("Inner Text");
    cy.getDataTest("outerLoop3.key_1.innnerLoop.1.loopButton").contains("Inner Text");
    cy.getDataTest("outerLoop3.key_1.innnerLoop.2.loopButton").contains("Inner Text");

    cy.getDataTest("outerLoop3.key_2.loopButton").contains("Root Text");
    cy.getDataTest("outerLoop3.key_2.innnerLoop.0.loopButton").contains("Inner Text");
    cy.getDataTest("outerLoop3.key_2.innnerLoop.1.loopButton").contains("Inner Text");
    cy.getDataTest("outerLoop3.key_2.innnerLoop.2.loopButton").contains("Inner Text");

    cy.getDataTest("outerLoop3.key_3.loopButton").contains("Root Text");
    cy.getDataTest("outerLoop3.key_3.innnerLoop.0.loopButton").contains("Inner Text");
    cy.getDataTest("outerLoop3.key_3.innnerLoop.1.loopButton").contains("Inner Text");
    cy.getDataTest("outerLoop3.key_3.innnerLoop.2.loopButton").contains("Inner Text");

    cy.getDataTest("buttonText").find("input").clear().type("Something Different").blur();

    cy.getDataTest("outerLoop3.key_1.loopButton").contains("Something Different");
    cy.getDataTest("outerLoop3.key_1.innnerLoop.0.loopButton").contains("Inner Text");
    cy.getDataTest("outerLoop3.key_1.innnerLoop.1.loopButton").contains("Inner Text");
    cy.getDataTest("outerLoop3.key_1.innnerLoop.2.loopButton").contains("Inner Text");

    cy.getDataTest("outerLoop3.key_2.loopButton").contains("Something Different");
    cy.getDataTest("outerLoop3.key_2.innnerLoop.0.loopButton").contains("Inner Text");
    cy.getDataTest("outerLoop3.key_2.innnerLoop.1.loopButton").contains("Inner Text");
    cy.getDataTest("outerLoop3.key_2.innnerLoop.2.loopButton").contains("Inner Text");

    cy.getDataTest("outerLoop3.key_3.loopButton").contains("Something Different");
    cy.getDataTest("outerLoop3.key_3.innnerLoop.0.loopButton").contains("Inner Text");
    cy.getDataTest("outerLoop3.key_3.innnerLoop.1.loopButton").contains("Inner Text");
    cy.getDataTest("outerLoop3.key_3.innnerLoop.2.loopButton").contains("Inner Text");
  });
});
