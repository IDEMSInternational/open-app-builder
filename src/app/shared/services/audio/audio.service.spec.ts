import { TestBed } from "@angular/core/testing";

import { AudioService } from "./audio.service";

describe("AudioService", () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it("should be created", () => {
    const service: AudioService = TestBed.inject(AudioService);
    expect(service).toBeTruthy();
  });
});
