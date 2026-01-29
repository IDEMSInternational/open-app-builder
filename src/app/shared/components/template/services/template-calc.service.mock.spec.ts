import { MockLocalStorageService } from "src/app/shared/services/local-storage/local-storage.service.mock.spec";
import { ICalcContext, TemplateCalcService } from "./template-calc.service";
import { MockDataEvaluationService } from "src/app/shared/services/data/data-evaluation.service.mock.spec";

export class MockTemplateCalcService extends TemplateCalcService {
  constructor(mockCalcContext: Partial<ICalcContext> = {}) {
    super(new MockDataEvaluationService(), new MockLocalStorageService());
    // merge any mock calc context with defaults
    super["calcContext"] = {
      thisCtxt: {
        // ensure default calc included as allows `@calc(...)` to be triggered via `this.calc(...)`
        calc: (v: any) => v,
        ...mockCalcContext.thisCtxt,
      },
      globalConstants: {
        ...mockCalcContext.globalConstants,
      },
      globalFunctions: {
        ...mockCalcContext.globalFunctions,
      },
    };
  }

  protected async initialise() {
    await this.setUserMetaData();
    this.getCalcContext();
  }

  protected async setUserMetaData() {
    this["device_info"] = {
      model: "test",
      platform: "web",
      operatingSystem: "windows",
      osVersion: "10",
      manufacturer: "test",
      isVirtual: true,
      webViewVersion: "1.0",
    } as any;
    this["app_user_id"] = "test_user";
  }
}
