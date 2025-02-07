import { MockLocalStorageService } from "src/app/shared/services/local-storage/local-storage.service.mock.spec";
import { ICalcContext, TemplateCalcService } from "./template-calc.service";
import { MockDataEvaluationService } from "src/app/shared/services/data/data-evaluation.service.mock.spec";

export class MockTemplateCalcService extends TemplateCalcService {
  constructor() {
    super(new MockDataEvaluationService(), new MockLocalStorageService());
  }

  public getCalcContext(): ICalcContext {
    return {
      thisCtxt: {},
      globalConstants: {},
      globalFunctions: {},
    };
  }
}
