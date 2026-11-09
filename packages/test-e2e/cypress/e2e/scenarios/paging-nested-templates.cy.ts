describe("Nested page template parameters", () => {
  it("renders display_text from the page_details object", () => {
    cy.visit("/template/paging_nested_templates");

    cy.getDataTest("pagesLoop.0.nested_page_template.nestedTitle")
      .should("be.visible")
      .and("contain", "Title: This is value 1");

    cy.getDataTest("pagesLoop.1.nested_page_template.nestedTitle").should("not.be.visible");

    cy.getDataTest("nextButton").click();

    cy.getDataTest("pagesLoop.0.nested_page_template.nestedTitle").should("not.be.visible");

    cy.getDataTest("pagesLoop.1.nested_page_template.nestedTitle")
      .should("be.visible")
      .and("contain", "Title: This is value 2");

    cy.getDataTest("previousButton").click();

    cy.getDataTest("pagesLoop.0.nested_page_template.nestedTitle")
      .should("be.visible")
      .and("contain", "Title: This is value 1");

    cy.getDataTest("pagesLoop.1.nested_page_template.nestedTitle").should("not.be.visible");
  });
});
