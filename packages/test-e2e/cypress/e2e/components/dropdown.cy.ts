describe("dropdown component", () => {
  beforeEach(() => {
    cy.visit("/template/test_dropdown");
  });

  it("can select a value", () => {
    cy.getDataTest("defaultSelect").should((e) => {
      const [dom] = e.get();

      dom.shadowRoot.querySelector("label").click();
    });

    cy.getDataTest("defaultSelectValueText").contains("key_2");
  });

  it("can be disabled", () => {
    cy.getDataTest("disabledSelect").should("have.attr", "disabled");
  });
});
