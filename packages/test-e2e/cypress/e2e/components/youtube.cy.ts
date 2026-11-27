describe("youtube component", () => {
  beforeEach(() => {
    cy.visit("/template/test_youtube");
  });

  it("embeds the video in the no-cookie player", () => {
    cy.getDataTest("youtube_basic")
      .find("iframe")
      .should("have.attr", "title", "YouTube video player")
      .and("have.attr", "src")
      .and("include", "youtube-nocookie.com/embed/YE7VzlLtp-4");
  });

  it("applies orientation, falling back to landscape", () => {
    cy.getDataTest("youtube_portrait").should("have.attr", "data-orientation", "portrait");
    cy.getDataTest("youtube_invalid_orientation").should(
      "have.attr",
      "data-orientation",
      "landscape"
    );
  });

  it("turns fullscreen off with allow_fullscreen", () => {
    cy.getDataTest("youtube_no_fullscreen")
      .find("iframe")
      .should("not.have.attr", "allowfullscreen");
    cy.getDataTest("youtube_no_fullscreen")
      .find("iframe")
      .should("have.attr", "src")
      .and("include", "fs=0");
    cy.getDataTest("youtube_fullscreen_uppercase")
      .find("iframe")
      .should("have.attr", "allowfullscreen");
  });

  it("shows nothing for a value that is not a YouTube link", () => {
    cy.getDataTest("youtube_basic").should("exist");
    cy.getDataTest("youtube_invalid").should("not.exist");
  });
});
