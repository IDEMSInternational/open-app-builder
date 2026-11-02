describe("Dynamic variable references", () => {
  beforeEach(() => {
    cy.visit("/template/test_dynamic_variable_refs");
  });

  it("resolves a sibling loop's row via a dynamic bracket index (e.g. question_loop[item.key])", () => {
    cy.getDataTest("answer_loop.key_1.the_question").contains("Question 1");
    cy.getDataTest("answer_loop.key_2.the_question").contains("Question 2");
    cy.getDataTest("answer_loop.key_3.the_question").contains("Question 3");
  });

  it("dynamically updates when the referenced sibling loop's row value changes", () => {
    cy.getDataTest("answer_loop.key_1.the_answer").should("not.exist");

    cy.getDataTest("question_loop.key_1.answer").find("input").clear().type("My Answer").blur();

    cy.getDataTest("answer_loop.key_1.the_answer").contains("My Answer");

    // other loop instances remain unaffected
    cy.getDataTest("answer_loop.key_2.the_answer").should("not.exist");
    cy.getDataTest("answer_loop.key_3.the_answer").should("not.exist");
  });
});
