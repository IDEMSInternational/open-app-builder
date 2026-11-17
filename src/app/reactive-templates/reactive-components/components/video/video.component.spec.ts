import { REACTIVE_COMPONENT_MAP } from "..";
import { VideoComponent } from "./video.component";

describe("VideoComponent", () => {
  it("is registered for video rows", () => {
    expect(REACTIVE_COMPONENT_MAP.video).toBe(VideoComponent);
  });
});
