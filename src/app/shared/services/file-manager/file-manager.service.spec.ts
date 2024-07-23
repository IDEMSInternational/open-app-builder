import { TestBed } from "@angular/core/testing";
import { FileManagerService } from "./file-manager.service";
import { HttpClientTestingModule } from "@angular/common/http/testing";

/**
 * Call standalone tests via:
 * yarn ng test --include src/app/shared/services/file-manager/file-manager.service.spec.ts
 */
describe("FileManagerService", () => {
  let service: FileManagerService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(FileManagerService);
  });

  it("should be created", () => {
    expect(service).toBeTruthy();
  });
});
