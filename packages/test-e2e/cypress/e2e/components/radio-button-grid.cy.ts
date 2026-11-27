describe("radio button grid component", () => {
  beforeEach(() => {
    cy.visit("/template/test_radio_button_grid");
  });

  const option = (grid: string, text: string) => cy.getDataTest(grid).contains(".item", text);

  it("selects an option on click", () => {
    option("grid_default", "Option 2").click().should("have.attr", "data-selected", "true");
    cy.getDataTest("grid_default_selected").contains("Selected: option_2");
  });

  it("selects the initial option", () => {
    option("grid_initial", "Option 2").should("have.attr", "data-selected", "true");
  });

  it("stores the option as an object with value_as_object", () => {
    option("grid_object", "Option 3").click();
    cy.getDataTest("grid_object_selected").contains("Selected: Option 3");
  });

  it("renders the card variant as radio buttons", () => {
    cy.getDataTest("grid_card").find("ion-radio").should("have.length", 3);
  });

  it("keeps card styles out of the default variant", () => {
    option("grid_default", "Option 1").should("have.css", "text-align", "center");
  });

  it("uses the default variant for an unknown variant", () => {
    cy.getDataTest("grid_invalid_variant").should("have.attr", "data-variant", "default");
  });

  it("selects an option whose key is digits", () => {
    option("grid_numbers", "Two").click().should("have.attr", "data-selected", "true");
  });

  it("reads options written as text", () => {
    option("grid_text_options", "A").should("exist");
    option("grid_text_options", "B").should("exist");
  });

  it("shows option images", () => {
    cy.getDataTest("grid_circle")
      .find("img.item-image")
      .should("have.attr", "src")
      .and("include", "images/jasper_1.jpg");
  });
});
