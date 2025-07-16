import { FlowTypes } from "packages/data-models";
import { DynamicDataService } from "./dynamic-data.service";
import { of } from "rxjs";

/** Mock implementation used in other tests */
export class MockDynamicDataService implements Partial<DynamicDataService> {
  constructor(private mockQueryData: Partial<Record<FlowTypes.FlowType, any>> = {}) {}
  // mock query just returns data provided as observable
  public query$(flow_type: FlowTypes.FlowType, flow_name: string) {
    return of(this.mockQueryData[flow_type]?.[flow_name]);
  }

  public async ready() {
    return true;
  }

  public async resetAll() {
    return Promise.resolve();
  }

  public async snapshot<T extends FlowTypes.Data_listRow>(
    flow_type: FlowTypes.FlowType,
    flow_name: string
  ): Promise<T[]> {
    return Promise.resolve(this.mockQueryData[flow_type]?.[flow_name] || []);
  }

  public async bulkUpsert<T extends { id: string }>(
    flow_type: FlowTypes.FlowType,
    flow_name: string,
    data: T[]
  ) {
    return Promise.resolve();
  }

  public async getState() {
    return Promise.resolve({});
  }
}
