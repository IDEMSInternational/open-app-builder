describe("dropdown component", () => {
  beforeEach(() => {
    cy.visit("/template/test_query");
  });

  it("Queries with filter, sort & limit", () => {
    cy.getDataTest("queriedDataDropdown").click();

    cy.get("ion-popover")
      .should("be.visible")
      .last()
      .find("ion-item")
      .should(($items) => {
        const texts = $items.map((i, el) => Cypress.$(el).text().trim()).get();
        expect(texts).to.deep.equal(["Test 5 Name (B)", "Test 4 Name (B)", "Test 3 Name (A)"]);
      });

    cy.get("ion-popover").find("ion-item").contains("Test 5 Name (B)").click();

    cy.getDataTest("queriedOption").contains("id5");
  });

  it("Queries with dynamic filter", () => {
    cy.getDataTest("dynamicQueriedDataDropdown").click();

    cy.get("ion-popover")
      .should("be.visible")
      .last()
      .find("ion-item")
      .should("have.length", 2)
      .then(($items) => {
        const texts = $items.map((i, el) => Cypress.$(el).text().trim()).get();
        expect(texts).to.deep.equal(["Test 3 Name (A)", "Test 1 Name (A)"]);
      });
    cy.get("ion-popover").find("ion-item").contains("Test 3 Name (A)").click();

    cy.getDataTest("categoryDropdown").click();

    cy.get("ion-popover").last().find("ion-item").contains("B").click();

    cy.getDataTest("dynamicQueriedDataDropdown").click();
    cy.get("ion-popover:visible")
      .last()
      .find("ion-item")
      .should("have.length", 3)
      .then(($items) => {
        const texts = $items.map((i, el) => Cypress.$(el).text().trim()).get();
        expect(texts).to.deep.equal(["Test 5 Name (B)", "Test 4 Name (B)", "Test 2 Name (B)"]);
      });

    cy.get("ion-popover").last().find("ion-item").contains("Test 2 Name (B)").click();

    cy.getDataTest("dynamicQueriedOption").contains("id2");
  });
});
