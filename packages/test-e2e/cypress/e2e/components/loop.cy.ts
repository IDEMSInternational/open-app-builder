describe("Loop Component", () => {
  beforeEach(() => {
    cy.visit("/template/test_loop");
  });

  it("Loops over a list", () => {
    cy.getDataTest("listLoop.key_1")
      .should("exist")
      .within(() => {
        cy.getDataTest("listLoop.key_1.loopTitle")
          .should("exist")
          .should("contain", "List item key_1");

        cy.getDataTest("listLoop.key_1.loopText")
          .should("exist")
          .should("contain", "This is value 1");

        cy.getDataTest("listLoop.key_1.plainText").should("exist").should("contain", "Plain text");
      });

    cy.getDataTest("listLoop.key_2")
      .should("exist")
      .within(() => {
        cy.getDataTest("listLoop.key_2.loopTitle")
          .should("exist")
          .should("contain", "List item key_2");

        cy.getDataTest("listLoop.key_2.loopText")
          .should("exist")
          .should("contain", "This is value 2");

        cy.getDataTest("listLoop.key_2.plainText").should("exist").should("contain", "Plain text");
      });

    cy.getDataTest("listLoop.key_3")
      .should("exist")
      .within(() => {
        cy.getDataTest("listLoop.key_3.loopTitle")
          .should("exist")
          .should("contain", "List item key_3");

        cy.getDataTest("listLoop.key_3.loopText")
          .should("exist")
          .should("contain", "This is value 3");

        cy.getDataTest("listLoop.key_3.plainText").should("exist").should("contain", "Plain text");
      });
  });

  it("Loops over a query result", () => {
    cy.getDataTest("queryLoop.id5")
      .should("exist")
      .within(() => {
        cy.getDataTest("queryLoop.id5.loopTitle")
          .should("exist")
          .should("contain", "Query item id5");

        cy.getDataTest("queryLoop.id5.loopText")
          .should("exist")
          .should("contain", "Test 5 Value (B)");

        cy.getDataTest("queryLoop.id5.plainText").should("exist").should("contain", "Plain text");
      });

    cy.getDataTest("queryLoop.id4")
      .should("exist")
      .within(() => {
        cy.getDataTest("queryLoop.id4.loopTitle")
          .should("exist")
          .should("contain", "Query item id4");

        cy.getDataTest("queryLoop.id4.loopText")
          .should("exist")
          .should("contain", "Test 4 Value (B)");

        cy.getDataTest("queryLoop.id4.plainText").should("exist").should("contain", "Plain text");
      });

    cy.getDataTest("queryLoop.id3")
      .should("exist")
      .within(() => {
        cy.getDataTest("queryLoop.id3.loopTitle")
          .should("exist")
          .should("contain", "Query item id3");

        cy.getDataTest("queryLoop.id3.loopText")
          .should("exist")
          .should("contain", "Test 3 Value (A)");

        cy.getDataTest("queryLoop.id3.plainText").should("exist").should("contain", "Plain text");
      });
  });

  it("Loop includes a nested template", () => {
    cy.getDataTest("nestedLoop.0")
      .should("exist")
      .within(() => {
        cy.getDataTest("nestedLoop.0.loopKey").should("exist").should("contain", "key: key_1");

        cy.getDataTest("nestedLoop.0.loopTemplate.templateText")
          .should("exist")
          .should("contain", "value: This is value 1");

        cy.getDataTest("nestedLoop.0.countText").should("exist").should("contain", "0 of 3");
      });

    cy.getDataTest("nestedLoop.1")
      .should("exist")
      .within(() => {
        cy.getDataTest("nestedLoop.1.loopKey").should("exist").should("contain", "key: key_2");

        cy.getDataTest("nestedLoop.1.loopTemplate.templateText")
          .should("exist")
          .should("contain", "value: This is value 2");

        cy.getDataTest("nestedLoop.1.countText").should("exist").should("contain", "1 of 3");
      });

    cy.getDataTest("nestedLoop.2")
      .should("exist")
      .within(() => {
        cy.getDataTest("nestedLoop.2.loopKey").should("exist").should("contain", "key: key_3");

        cy.getDataTest("nestedLoop.2.loopTemplate.templateText")
          .should("exist")
          .should("contain", "value: This is value 3");

        cy.getDataTest("nestedLoop.2.countText").should("exist").should("contain", "2 of 3");
      });
  });

  it("Loop includes @first, @last, @item, @count, @is_first, @is_last", () => {
    cy.getDataTest("firstLastLoop.key_1")
      .should("exist")
      .within(() => {
        cy.getDataTest("firstLastLoop.key_1.firstText")
          .should("exist")
          .should("contain", "This is value 1");

        cy.getDataTest("firstLastLoop.key_1.thisText")
          .should("exist")
          .should("contain", "This is value 1");

        cy.getDataTest("firstLastLoop.key_1.lastText")
          .should("exist")
          .should("contain", "This is value 3");

        cy.getDataTest("firstLastLoop.key_1.countText")
          .should("exist")
          .should("contain", "key_1 of 3");

        cy.getDataTest("firstLastLoop.key_1.isFirstText")
          .should("exist")
          .should("contain", "Is first: true");

        cy.getDataTest("firstLastLoop.key_1.isLastText")
          .should("exist")
          .should("contain", "Is last: false");
      });

    cy.getDataTest("firstLastLoop.key_2")
      .should("exist")
      .within(() => {
        cy.getDataTest("firstLastLoop.key_2.firstText")
          .should("exist")
          .should("contain", "This is value 1");

        cy.getDataTest("firstLastLoop.key_2.thisText")
          .should("exist")
          .should("contain", "This is value 2");

        cy.getDataTest("firstLastLoop.key_2.lastText")
          .should("exist")
          .should("contain", "This is value 3");

        cy.getDataTest("firstLastLoop.key_2.countText")
          .should("exist")
          .should("contain", "key_2 of 3");

        cy.getDataTest("firstLastLoop.key_2.isFirstText")
          .should("exist")
          .should("contain", "Is first: false");

        cy.getDataTest("firstLastLoop.key_2.isLastText")
          .should("exist")
          .should("contain", "Is last: false");
      });

    cy.getDataTest("firstLastLoop.key_3")
      .should("exist")
      .within(() => {
        cy.getDataTest("firstLastLoop.key_3.firstText")
          .should("exist")
          .should("contain", "This is value 1");

        cy.getDataTest("firstLastLoop.key_3.thisText")
          .should("exist")
          .should("contain", "This is value 3");

        cy.getDataTest("firstLastLoop.key_3.lastText")
          .should("exist")
          .should("contain", "This is value 3");

        cy.getDataTest("firstLastLoop.key_3.countText")
          .should("exist")
          .should("contain", "key_3 of 3");

        cy.getDataTest("firstLastLoop.key_3.isFirstText")
          .should("exist")
          .should("contain", "Is first: false");

        cy.getDataTest("firstLastLoop.key_3.isLastText")
          .should("exist")
          .should("contain", "Is last: true");
      });
  });

  it("Loop includes a nested loop", () => {
    cy.getDataTest("outerLoop.key_1")
      .should("exist")
      .within(() => {
        cy.getDataTest("outerLoop.key_1.outerKeyText")
          .should("exist")
          .should("contain", "key: key_1");

        cy.getDataTest("outerLoop.key_1.innerLoop.inner_key_1.innerKeyText")
          .should("exist")
          .should("contain", "key: inner_key_1");

        cy.getDataTest("outerLoop.key_1.innerLoop.inner_key_2.innerKeyText")
          .should("exist")
          .should("contain", "key: inner_key_2");
      });

    cy.getDataTest("outerLoop.key_2")
      .should("exist")
      .within(() => {
        cy.getDataTest("outerLoop.key_2.outerKeyText")
          .should("exist")
          .should("contain", "key: key_2");

        cy.getDataTest("outerLoop.key_2.innerLoop.inner_key_1.innerKeyText")
          .should("exist")
          .should("contain", "key: inner_key_1");

        cy.getDataTest("outerLoop.key_2.innerLoop.inner_key_2.innerKeyText")
          .should("exist")
          .should("contain", "key: inner_key_2");
      });

    cy.getDataTest("outerLoop.key_3")
      .should("exist")
      .within(() => {
        cy.getDataTest("outerLoop.key_3.outerKeyText")
          .should("exist")
          .should("contain", "key: key_3");

        cy.getDataTest("outerLoop.key_3.innerLoop.inner_key_1.innerKeyText")
          .should("exist")
          .should("contain", "key: inner_key_1");

        cy.getDataTest("outerLoop.key_3.innerLoop.inner_key_2.innerKeyText")
          .should("exist")
          .should("contain", "key: inner_key_2");
      });
  });
});
