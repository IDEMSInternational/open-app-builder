describe("Nested page template parameters", () => {
  it("renders display_text from the page_details object", () => {
    cy.visit("/template/paging_nested_templates");

    cy.getDataTest("pagesLoop.key_1.nested_page_template.text_4")
      .should("be.visible")
      .and("contain", "Title: This is value 1");
  });
});
