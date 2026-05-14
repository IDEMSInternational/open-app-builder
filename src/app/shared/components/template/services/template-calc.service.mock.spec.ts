import { ICalcContext, TemplateCalcService } from "./template-calc.service";
import { MockDataEvaluationService } from "src/app/shared/services/data/data-evaluation.service.mock.spec";
import { SystemVariableService } from "src/app/shared/services/system-variable/system-variable.service";

const MOCK_SYSTEM_VARIABLE_SERVICE = {
  get: () => "test_user",
  set: () => {},
  remove: () => {},
} as unknown as SystemVariableService;

export class MockTemplateCalcService extends TemplateCalcService {
  constructor(mockCalcContext: Partial<ICalcContext> = {}) {
    super(new MockDataEvaluationService(), MOCK_SYSTEM_VARIABLE_SERVICE);
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
