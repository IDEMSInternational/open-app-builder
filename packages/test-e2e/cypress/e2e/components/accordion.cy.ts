describe("accordion component", () => {
  beforeEach(() => {
    cy.visit("/template/test_accordion");
  });

  it("basic accordion functionality", () => {
    cy.getDataTest("first_section").should("exist").click();

    cy.getDataTest("first_section_text")
      .should("be.visible")
      .contains("This text appears in the first accordion section");
  });

  it("can contain a loop", () => {
    // loop 1
    cy.getDataTest("loop_1.0.loop_section").should("exist").contains("key_1").click();

    cy.getDataTest("loop_1.0.text_1").should("be.visible").contains("This is value 1");

    // loop 2
    cy.getDataTest("loop_1.1.loop_section").should("exist").contains("key_2").click();

    cy.getDataTest("loop_1.1.text_1").should("be.visible").contains("This is value 2");

    // loop 3
    cy.getDataTest("loop_1.2.loop_section").should("exist").contains("key_3").click();

    cy.getDataTest("loop_1.2.text_1").should("be.visible").contains("This is value 3");
  });
});
