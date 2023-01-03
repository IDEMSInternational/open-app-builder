import { TestBed } from "@angular/core/testing";

import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { HttpClientTestingModule, HttpTestingController } from "@angular/common/http/testing";

import { DynamicDataService } from "./dynamic-data.service";
import { Data } from "@angular/router";
import { lastValueFrom } from "rxjs";

describe("DynamicDataService", () => {
  let service: DynamicDataService;
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;

  beforeEach(async () => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    // HACK
    window.global = window;

    // Inject the http service and test controller for each test
    httpClient = TestBed.inject(HttpClient);
    httpTestingController = TestBed.inject(HttpTestingController);

    service = TestBed.inject(DynamicDataService);
    await service.ready();
  });

  it("should be created", () => {
    expect(service).toBeTruthy();
  });
});
