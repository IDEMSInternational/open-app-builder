describe("Local variables on pages with matching row names", () => {
  it("keeps menu and paging values separate across navigation", () => {
    cy.visit("/template/clash_menu");

    cy.getDataTest("pagesLoop.0.button_1").filter(":visible").should("contain", "Item 1");
    cy.getDataTest("pagesLoop.1.button_1").filter(":visible").should("contain", "Item 2").click();

    cy.url().should("include", "/template/clash_paging");
    cy.getDataTest("text_5")
      .filter(":visible")
      .should("contain", "id :id_2")
      .and("contain", "name: Item 2");
    cy.getDataTest("pagesLoop.0.nested_page_template.nestedTitle")
      .filter(":visible")
      .should("contain", "Title: This is value 1");
    cy.get("plh-template-page.ion-page-hidden")
      .find("[data-test='pagesLoop.0.button_1']")
      .should("contain", "Item 1");
    cy.get("plh-template-page.ion-page-hidden")
      .find("[data-test='pagesLoop.1.button_1']")
      .should("contain", "Item 2");

    cy.getDataTest("nextButton").filter(":visible").click();
    cy.getDataTest("pagesLoop.0.nested_page_template.nestedTitle")
      .filter(":visible")
      .should("not.exist");
    cy.getDataTest("pagesLoop.1.nested_page_template.nestedTitle")
      .filter(":visible")
      .should("contain", "Title: This is value 2");

    cy.getDataTest("previousButton").filter(":visible").click();
    cy.getDataTest("pagesLoop.0.nested_page_template.nestedTitle")
      .filter(":visible")
      .should("contain", "Title: This is value 1");

    cy.go("back");
    cy.url().should("include", "/template/clash_menu");
    cy.getDataTest("pagesLoop.0.button_1").filter(":visible").should("contain", "Item 1");
    cy.getDataTest("pagesLoop.1.button_1").filter(":visible").should("contain", "Item 2");
    cy.getDataTest("pagesLoop.2.button_1").filter(":visible").should("contain", "Item 3");
  });
});
