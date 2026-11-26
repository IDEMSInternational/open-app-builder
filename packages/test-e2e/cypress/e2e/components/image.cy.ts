describe("image component", () => {
  beforeEach(() => {
    cy.visit("/template/test_image");
  });

  it("shows the image asset", () => {
    cy.getDataTest("image_basic")
      .find("img")
      .should("have.attr", "src")
      .and("include", "images/jasper_1.jpg");
  });

  it("applies the row's style_list", () => {
    cy.getDataTest("image_max_width").parent().invoke("outerWidth").should("eq", 120);
  });

  it("shows nothing when its value is unset", () => {
    cy.getDataTest("image_basic").should("exist");
    cy.getDataTest("image_unset").should("not.exist");
  });

  it("hides a row whose condition is false", () => {
    cy.getDataTest("image_hidden").should("not.be.visible");
  });
});
