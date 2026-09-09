describe("update component", () => {
  beforeEach(() => {
    cy.visit("/template/test_update");
  });

  after(() => {
    cy.clearIndexedDB();
  });

  it("inserts a record", () => {
    const guid = crypto.randomUUID();

    cy.getDataTest("recordId").find("input").clear().type(`id_${guid}`).blur();
    cy.getDataTest("recordName").find("input").clear().type(`name ${guid}`).blur();
    cy.getDataTest("recordValue").find("input").clear().type(`value ${guid}`).blur();
    cy.getDataTest("recordQuantity").find("input").clear().type("5").blur();

    cy.getDataTest("insertButton").click();
    cy.getDataTest("refreshButton").click();

    cy.getDataTest(`itemLoop.id_${guid}.checkInsertedValue`)
      .should("exist")
      .should("contain", `ID: id_${guid}`)
      .and("contain", `Name: name ${guid}`)
      .and("contain", `Value: value ${guid}`)
      .and("contain", `Quantity: 5`);
  });

  it("updates a record", () => {
    const guid = crypto.randomUUID();

    cy.getDataTest("recordId").find("input").clear().type(`id_${guid}`).blur();
    cy.getDataTest("recordName").find("input").clear().type(`name ${guid}`).blur();
    cy.getDataTest("recordValue").find("input").clear().type(`value ${guid}`).blur();
    cy.getDataTest("recordQuantity").find("input").clear().type("5").blur();

    cy.getDataTest("insertButton").click();
    cy.getDataTest("refreshButton").click();

    cy.getDataTest(`itemLoop.id_${guid}.checkInsertedValue`)
      .should("exist")
      .should("contain", `ID: id_${guid}`)
      .and("contain", `Name: name ${guid}`)
      .and("contain", `Value: value ${guid}`)
      .and("contain", `Quantity: 5`);

    cy.getDataTest("recordName").find("input").clear().type(`name ${guid} updated`).blur();

    cy.getDataTest("insertButton").click();
    cy.getDataTest("refreshButton").click();

    cy.getDataTest(`itemLoop.id_${guid}.checkInsertedValue`)
      .should("exist")
      .should("contain", `ID: id_${guid}`)
      .and("contain", `Name: name ${guid} updated`)
      .and("contain", `Value: value ${guid}`)
      .and("contain", `Quantity: 5`);
  });
});
