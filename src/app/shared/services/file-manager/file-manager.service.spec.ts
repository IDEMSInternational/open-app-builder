import { TestBed } from "@angular/core/testing";
import { FileManagerService } from "./file-manager.service";
import { provideHttpClientTesting } from "@angular/common/http/testing";
import { provideHttpClient, withInterceptorsFromDi } from "@angular/common/http";

/**
 * Call standalone tests via:
 * yarn ng test --include src/app/shared/services/file-manager/file-manager.service.spec.ts
 */
describe("FileManagerService", () => {
  let service: FileManagerService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [],
      providers: [provideHttpClient(withInterceptorsFromDi()), provideHttpClientTesting()],
    });
    service = TestBed.inject(FileManagerService);
  });

  it("should be created", () => {
    expect(service).toBeTruthy();
  });
});
