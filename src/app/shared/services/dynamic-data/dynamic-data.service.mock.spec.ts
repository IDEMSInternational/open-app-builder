import { FlowTypes } from "packages/data-models";
import { DynamicDataService } from "./dynamic-data.service";
import { of } from "rxjs";

/** Mock implementation used in other tests */
export class MockDynamicDataService implements Partial<DynamicDataService> {
  constructor(private mockQueryData: Partial<Record<FlowTypes.FlowType, any>> = {}) {}
  // mock query just returns data provided as observable
  public async query$(flow_type: FlowTypes.FlowType, flow_name: string) {
    return of(this.mockQueryData[flow_type]?.[flow_name]);
  }

  public async ready() {
    return true;
  }
}
