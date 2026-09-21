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

  // The tests below check ion-accordion's state classes rather than content visibility,
  // as content can be scrolled out of view regardless of whether its section is open

  it("opens sections with state: open", () => {
    cy.getDataTest("open_first_section").should("have.class", "accordion-expanded");
    cy.getDataTest("open_second_section").should("have.class", "accordion-collapsed");
  });

  it("keeps only one section open when multiple is false", () => {
    cy.getDataTest("single_first_section").click().should("have.class", "accordion-expanded");
    cy.getDataTest("single_second_section").click().should("have.class", "accordion-expanded");
    cy.getDataTest("single_first_section").should("have.class", "accordion-collapsed");
  });

  it("does not open disabled sections", () => {
    cy.getDataTest("disabled_section").should("have.class", "accordion-disabled"); // disabled on the section
    cy.getDataTest("disabled_accordion_section").should("have.class", "accordion-disabled"); // disabled on the accordion

    // Cypress won't click disabled elements, so force clicks on the headers to check that ion-accordion ignores them
    cy.getDataTest("disabled_section").find('[slot="header"]').click({ force: true });
    cy.getDataTest("disabled_accordion_section").find('[slot="header"]').click({ force: true });

    // Once an enabled section has opened, the disabled sections should still be closed
    cy.getDataTest("enabled_section").click().should("have.class", "accordion-expanded");
    cy.getDataTest("disabled_section").should("have.class", "accordion-collapsed");
    cy.getDataTest("disabled_accordion_section").should("have.class", "accordion-collapsed");
  });
});
