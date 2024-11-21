import { TestBed } from "@angular/core/testing";

import { ErrorHandlerService } from "./error-handler.service";
import { FirebaseService } from "../firebase/firebase.service";

describe("ErrorHandlerService", () => {
  let service: ErrorHandlerService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        {
          provide: FirebaseService,
          useValue: {},
        },
      ],
    });
    service = TestBed.inject(ErrorHandlerService);
  });

  it("should be created", () => {
    expect(service).toBeTruthy();
  });
});
