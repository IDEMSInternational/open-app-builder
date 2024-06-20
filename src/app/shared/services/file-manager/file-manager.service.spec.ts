import { TestBed } from "@angular/core/testing";

import { FileManagerService } from "./file-manager.service";
import { HttpClientTestingModule } from "@angular/common/http/testing";
import { Filesystem } from "@capacitor/filesystem";

/**
 * Call standalone tests via:
 * yarn ng test --include src/app/shared/services/file-manager/file-manager.service.spec.ts
 */
describe("FileManagerService", () => {
  let service: FileManagerService;
  let filesystemDeleteFileSpy: jasmine.Spy<jasmine.Func>;

  beforeEach(() => {
    filesystemDeleteFileSpy = jasmine.createSpy();
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        {
          provide: Filesystem,
          useValue: {
            deleteFile: filesystemDeleteFileSpy,
          },
        },
      ],
    });
    service = TestBed.inject(FileManagerService);
  });

  it("should be created", () => {
    expect(service).toBeTruthy();
  });

  // TODO: Mock Filesystem not working
  it("can delete a file", async () => {
    const MOCK_LOCAL_FILEPATH =
      "file:///data/user/0/international.idems.debug_app/cache/debug/images/example/jasper_1.jpg";
    await service.deleteFile(MOCK_LOCAL_FILEPATH);
    expect(filesystemDeleteFileSpy).toHaveBeenCalledWith({ path: MOCK_LOCAL_FILEPATH });
  });
});
