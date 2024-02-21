import { generateTimestamp } from "../../utils";
import { DataEvaluationService } from "./data-evaluation.service";

/** Minimal mock server service provides metadata values. Use mock */
export class MockDataEvaluationService implements Partial<DataEvaluationService> {
  public async ready() {
    return true;
  }
  data = {
    app_day: 5,
    first_app_launch: generateTimestamp(),
    dbCache: {},
  };
}

//   TODO - testing methods for main service public methods
