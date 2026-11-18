describe("course accordion component", () => {
  beforeEach(() => {
    cy.visit("/template/plh_course_accordion");
  });

  it("counts its sub-items and shows progress", () => {
    cy.getDataTest("basic_course").should("have.attr", "data-state", "default");
    cy.getDataTest("basic_course").find(".progress-bar-text").should("contain", "1/3 lessons");
    cy.getDataTest("basic_course")
      .find(".progress-bar")
      .should("have.attr", "style")
      .and("contain", "width: 33%");
  });

  it("is closed by default and toggles when the header is clicked", () => {
    cy.getDataTest("lesson_1").should("not.be.visible");
    cy.getDataTest("basic_course").find(".course-button").click();
    cy.getDataTest("lesson_1").should("be.visible");
    cy.getDataTest("basic_course").find(".course-button").click();
    cy.getDataTest("lesson_1").should("not.be.visible");
  });

  it("starts open with open: true", () => {
    cy.getDataTest("open_lesson_1").should("be.visible");
  });

  it("follows its open parameter when it changes", () => {
    cy.getDataTest("dynamic_lesson_1").should("not.be.visible");
    cy.getDataTest("open_button").click();
    cy.getDataTest("dynamic_lesson_1").should("be.visible");
    cy.getDataTest("open_button").click();
    cy.getDataTest("dynamic_lesson_1").should("not.be.visible");
  });

  it("cannot be opened when locked", () => {
    cy.getDataTest("locked_course").should("have.attr", "data-state", "locked");
    cy.getDataTest("locked_course").find("ion-icon[name='lock-closed-outline']").should("exist");
    cy.getDataTest("locked_course").find(".course-button").click({ force: true });
    cy.getDataTest("locked_lesson_1").should("not.be.visible");
  });

  it("shows the completed state", () => {
    cy.getDataTest("completed_course").should("have.attr", "data-state", "completed");
  });

  it("shows sub-item states and badge text", () => {
    cy.getDataTest("basic_course").find(".course-button").click();
    cy.getDataTest("lesson_1").should("have.attr", "data-state", "completed").contains("COMPLETED");
    cy.getDataTest("lesson_2").should("have.attr", "data-state", "highlighted");
    cy.getDataTest("lesson_3").should("have.attr", "data-state", "locked").contains("LOCKED");
    // custom completed_text
    cy.getDataTest("completed_lesson_1").contains("DONE");
  });

  it("runs click actions on sub-items unless locked", () => {
    cy.getDataTest("clicked_lesson").should("contain", "No lesson clicked");
    cy.getDataTest("basic_course").find(".course-button").click();
    cy.getDataTest("lesson_1").click();
    cy.getDataTest("clicked_lesson").should("contain", "Lesson 1");
    cy.getDataTest("lesson_3").click();
    cy.getDataTest("clicked_lesson").should("contain", "Lesson 1");
  });

  it("counts sub-items rendered by a loop", () => {
    cy.getDataTest("loop_course").find(".progress-bar-text").should("contain", "2/4 lessons");
    cy.getDataTest("lesson_loop.lesson_1.lesson").should("have.attr", "data-state", "completed");
    cy.getDataTest("lesson_loop.lesson_3.lesson").should("have.attr", "data-state", "highlighted");
    cy.getDataTest("lesson_loop.lesson_4.lesson").should("have.attr", "data-state", "locked");
  });
});
