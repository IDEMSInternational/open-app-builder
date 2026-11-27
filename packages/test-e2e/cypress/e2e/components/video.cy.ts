describe("video component", () => {
  beforeEach(() => {
    cy.visit("/template/test_video");
  });

  it("plays the video asset", () => {
    cy.getDataTest("video_basic")
      .find("video")
      .should("have.attr", "src")
      .and("include", "video/test_video.mp4");
  });

  it("fills the width up to the video maximum width", () => {
    cy.getDataTest("video_basic").find("video").invoke("outerWidth").should("eq", 600);
  });

  it("adds subtitles from subtitles_src", () => {
    cy.getDataTest("video_subtitles")
      .find("track")
      .should("have.attr", "src")
      .and("include", "video/test_video.vtt");
    cy.getDataTest("video_basic").find("track").should("not.exist");
  });

  it("aligns the video with the style parameter", () => {
    cy.getDataTest("video_left").should("have.css", "justify-content", "start");
  });

  it("removes a video whose condition is false", () => {
    cy.getDataTest("video_basic").should("exist");
    cy.getDataTest("video_hidden").should("not.exist");
  });
});
