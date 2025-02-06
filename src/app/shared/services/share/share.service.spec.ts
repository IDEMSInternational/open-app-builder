import { TestBed } from "@angular/core/testing";

import { ShareService } from "./share.service";
import { ErrorHandlerService } from "../error-handler/error-handler.service";
import { MockErrorHandlerService } from "../error-handler/error-handler.service.mock.spec";
import { FileManagerService } from "../file-manager/file-manager.service";
import { TemplateAssetService } from "../../components/template/services/template-asset.service";

describe("ShareService", () => {
  let service: ShareService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        { provide: ErrorHandlerService, useValue: new MockErrorHandlerService() },
        { provide: FileManagerService, useValue: {} },
        { provide: TemplateAssetService, useValue: {} },
      ],
    });
    service = TestBed.inject(ShareService);
  });

  it("should be created", () => {
    expect(service).toBeTruthy();
  });
});
