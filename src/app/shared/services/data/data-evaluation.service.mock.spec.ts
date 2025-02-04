import { MockAppEventService } from "../app-events/app-events.service.mock.spec";
import { MockDbService } from "../db/db.service.mock.spec";
import { DataEvaluationService, IDataEvaluationCache } from "./data-evaluation.service";

export class MockDataEvaluationService extends DataEvaluationService {
  constructor(private mockData: Partial<IDataEvaluationCache> = {}) {
    super(new MockDbService(), new MockAppEventService(), null as any);
  }
  public override async refreshDBCache(): Promise<IDataEvaluationCache> {
    this.data = {
      app_day: 5,
      dbCache: {},
      first_app_launch: "2024-12-22T18:15:20",
      ...this.mockData,
    };
    return this.data;
  }
}
