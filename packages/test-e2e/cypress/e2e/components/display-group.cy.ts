describe("display-group component", () => {
  beforeEach(() => {
    cy.visit("/template/test_display_group");
  });

  it("lays out children in a row", () => {
    cy.getDataTest("group1")
      .should("have.css", "flex-direction", "row")
      .should("have.css", "gap", "0px")
      .should("have.css", "align-items", "flex-start")
      .should("have.css", "justify-content", "flex-start")
      .within(() => {
        cy.get("oab-text")
          .eq(0)
          .should("have.css", "border", "1px solid rgb(0, 0, 0)")
          .should("have.css", "padding", "0px 12px")
          .should("have.css", "border-radius", "4px");

        cy.get("oab-text")
          .eq(1)
          .should("have.css", "border", "1px solid rgb(0, 0, 0)")
          .should("have.css", "padding", "0px 12px")
          .should("have.css", "border-radius", "4px");
      });
  });

  it("lays out children in a row with equal sizing", () => {
    cy.getDataTest("group2")
      .should("have.css", "flex-direction", "row")
      .should("have.attr", "data-child-sizing", "equal")
      .within(() => {
        cy.get("oab-text")
          .eq(0)
          .should("have.css", "flex-grow", "1")
          .should("have.css", "flex-shrink", "1")
          .should("have.css", "flex-basis", "0px");

        cy.get("oab-text")
          .eq(1)
          .should("have.css", "flex-grow", "1")
          .should("have.css", "flex-shrink", "1")
          .should("have.css", "flex-basis", "0px");
      });
  });

  it("lays out children in a column", () => {
    cy.getDataTest("group3")
      .should("have.css", "flex-direction", "column")
      .should("have.attr", "data-child-sizing", "auto")
      .within(() => {
        cy.get("oab-text")
          .eq(0)
          .should("have.css", "border", "1px solid rgb(0, 0, 0)")
          .should("have.css", "padding", "0px 12px")
          .should("have.css", "border-radius", "4px");

        cy.get("oab-text")
          .eq(1)
          .should("have.css", "border", "1px solid rgb(0, 0, 0)")
          .should("have.css", "padding", "0px 12px")
          .should("have.css", "border-radius", "4px");
      });
  });

  it("lays out children with in rows with a nested column", () => {
    cy.getDataTest("group4")
      .should("have.css", "flex-direction", "row")
      .should("have.attr", "data-child-sizing", "auto")
      .within(() => {
        cy.get("oab-text")
          .eq(0)
          .should("have.css", "border", "1px solid rgb(0, 0, 0)")
          .should("have.css", "padding", "0px 12px")
          .should("have.css", "border-radius", "4px");

        cy.getDataTest("group4Inner")
          .should("have.css", "flex-direction", "column")
          .should("have.attr", "data-child-sizing", "auto")
          .within(() => {
            cy.get("oab-text")
              .eq(0)
              .should("have.css", "border", "1px solid rgb(0, 0, 0)")
              .should("have.css", "padding", "0px 12px")
              .should("have.css", "border-radius", "4px");

            cy.get("oab-text")
              .eq(1)
              .should("have.css", "border", "1px solid rgb(0, 0, 0)")
              .should("have.css", "padding", "0px 12px")
              .should("have.css", "border-radius", "4px");
          });
      });
  });

  it("lays out children with in column with a nested row", () => {
    cy.getDataTest("group5")
      .should("have.css", "flex-direction", "column")
      .should("have.css", "gap", "16px")
      .should("have.css", "align-items", "center")
      .should("have.css", "justify-content", "space-around")
      .should("have.attr", "data-child-sizing", "auto")
      .within(() => {
        cy.get("oab-text")
          .eq(0)
          .should("have.css", "border", "1px solid rgb(0, 0, 0)")
          .should("have.css", "padding", "0px 12px")
          .should("have.css", "border-radius", "4px");

        cy.getDataTest("group5Inner")
          .should("have.css", "flex-direction", "row")
          .should("have.css", "gap", "16px")
          .should("have.css", "align-items", "center")
          .should("have.css", "justify-content", "space-between")
          .should("have.attr", "data-child-sizing", "auto")
          .within(() => {
            cy.get("oab-text")
              .eq(0)
              .should("have.css", "border", "1px solid rgb(0, 0, 0)")
              .should("have.css", "padding", "0px 12px")
              .should("have.css", "border-radius", "4px");

            cy.get("oab-text")
              .eq(1)
              .should("have.css", "border", "1px solid rgb(0, 0, 0)")
              .should("have.css", "padding", "0px 12px")
              .should("have.css", "border-radius", "4px");
          });

        cy.get("oab-text")
          .eq(1)
          .should("have.css", "border", "1px solid rgb(0, 0, 0)")
          .should("have.css", "padding", "0px 12px")
          .should("have.css", "border-radius", "4px");
      });
  });
});
