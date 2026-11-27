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

  it("opens sections within a loop with state: open", () => {
    cy.getDataTest("state_loop.1.loop_state_section").should("have.class", "accordion-expanded");
    cy.getDataTest("state_loop.0.loop_state_section").should("have.class", "accordion-collapsed");
    cy.getDataTest("state_loop.2.loop_state_section").should("have.class", "accordion-collapsed");
  });

  it("keeps one section open by default", () => {
    cy.getDataTest("first_section").click().should("have.class", "accordion-expanded");
    cy.getDataTest("second_section").click().should("have.class", "accordion-expanded");
    cy.getDataTest("first_section").should("have.class", "accordion-collapsed");
  });

  it("keeps multiple sections open when multiple is true", () => {
    cy.getDataTest("multiple_first_section").click().should("have.class", "accordion-expanded");
    cy.getDataTest("multiple_second_section").click().should("have.class", "accordion-expanded");
    cy.getDataTest("multiple_first_section").should("have.class", "accordion-expanded");
  });

  it("reads the legacy open_multiple parameter", () => {
    cy.getDataTest("legacy_first_section").click().should("have.class", "accordion-expanded");
    cy.getDataTest("legacy_titled_section").click().should("have.class", "accordion-expanded");
    cy.getDataTest("legacy_first_section").should("have.class", "accordion-expanded");
  });

  it("shows the arrow-down-circle icon by default", () => {
    cy.getDataTest("first_section")
      .find("ion-icon.ion-accordion-toggle-icon")
      .should("have.prop", "name", "arrow-down-circle");
  });

  it("swaps the open and close icons without rotating them", () => {
    const icon = () => cy.getDataTest("legacy_first_section").find('[slot="header"] ion-icon');
    icon().should("have.prop", "name", "add").and("not.have.class", "ion-accordion-toggle-icon");
    cy.getDataTest("legacy_first_section").click();
    icon().should("have.prop", "name", "remove");
  });

  it("shows the title parameter in place of the value", () => {
    cy.getDataTest("legacy_titled_section")
      .find(".accordion-section-title")
      .should("contain.text", "Titled section")
      .and("not.contain.text", "This value is replaced by the title");
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
