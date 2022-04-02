import { TestBed } from "@angular/core/testing";

import { PerformanceMonitorService } from "./performance-monitor.service";

describe("PerformanceMonitorService", () => {
  let service: PerformanceMonitorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PerformanceMonitorService);
  });

  it("should be created", () => {
    expect(service).toBeTruthy();
  });
});
