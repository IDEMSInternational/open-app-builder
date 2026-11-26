describe("text bubble component", () => {
  beforeEach(() => {
    cy.visit("/template/test_text_bubble");
  });

  it("renders markdown text", () => {
    cy.getDataTest("bubble_basic").find(".text-bubble-content strong").contains("text bubble");
  });

  it("shows the speaker name and image", () => {
    cy.getDataTest("bubble_speaker").find(".speaker-name").should("have.text", "Jasper");
    cy.getDataTest("bubble_speaker")
      .find("img.speaker-image")
      .should("have.attr", "src")
      .and("include", "images/jasper_1.jpg");
  });

  it("applies speaker position and variants", () => {
    cy.getDataTest("bubble_right")
      .should("have.attr", "data-position", "right")
      .and("have.attr", "data-variant", "gray");
    cy.getDataTest("bubble_no_border").should("have.attr", "data-variant", "secondary no_border");
  });

  it("falls back to the left for an invalid speaker position", () => {
    cy.getDataTest("bubble_invalid_position").should("have.attr", "data-position", "left");
  });

  it("renders child rows inside the bubble", () => {
    cy.getDataTest("bubble_children").find(".text-bubble").contains("Text row inside the bubble");
  });

  it("hides text and a speaker name whose variable is unset", () => {
    cy.getDataTest("bubble_unset").should("exist");
    cy.getDataTest("bubble_unset").find(".text-bubble-content").should("not.exist");
    cy.getDataTest("bubble_unset").find(".speaker-name").should("not.exist");
  });
});
