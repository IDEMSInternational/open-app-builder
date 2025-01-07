import { TestBed } from "@angular/core/testing";

import { HttpClientTestingModule } from "@angular/common/http/testing";
import { MockAppDataService } from "../../data/app-data.service.mock.spec";
import { AppDataService } from "../../data/app-data.service";

import addDataAction, { IActionAddDataParams } from "./add_data.action";
import { DynamicDataService } from "../dynamic-data.service";
import { firstValueFrom } from "rxjs";
import { FlowTypes } from "packages/data-models";
import { DeploymentService } from "../../deployment/deployment.service";
import { MockDeploymentService } from "../../deployment/deployment.service.spec";
import { TemplateActionRegistry } from "../../../components/template/services/instance/template-action.registry";
import { DynamicDataActionFactory, IActionRemoveDataParams } from "./index";

type ITestRow = { id: string; number: number; string: string; _meta_field?: any };

const TEST_DATA_ROWS = (): FlowTypes.Data_listRow<ITestRow>[] => [
  { id: "id_0", number: 0, string: "hello", _meta_field: "original" },
  { id: "id_1", number: 1, string: "hello", _meta_field: "original" },
];

const TEST_DATA_LIST = (): FlowTypes.Data_list => ({
  flow_name: "test_flow",
  flow_type: "data_list",
  // Make deep clone of data to avoid data overwrite issues
  rows: TEST_DATA_ROWS(),
  // Metadata would be extracted from parser based on data or defined schema
  _metadata: {
    boolean: { type: "boolean" },
    number: { type: "number" },
    _meta_field: { type: "object" },
  },
});

/********************************************************************************
 * Test Utilities
 *******************************************************************************/

/**
 * Trigger the set_data action with included params and return first update
 * to corresponding data_list
 * * */
async function triggerTestAddDataAction(
  service: DynamicDataService,
  params: Partial<IActionAddDataParams>
) {
  await addDataAction(service, { ...params, _list_id: "test_flow" });
  const obs = await service.query$<any>("data_list", "test_flow");
  const data = await firstValueFrom(obs);
  return data;
}

async function triggerRemoveDataAction(
  service: DynamicDataService,
  params: Partial<IActionRemoveDataParams>
) {
  const { remove_data } = new DynamicDataActionFactory(service);
  await remove_data({
    action_id: "remove_data",
    args: [],
    trigger: "click",
    params: { ...params, _list_id: "test_flow" },
  });
  const obs = await service.query$<any>("data_list", "test_flow");
  const data = await firstValueFrom(obs);
  return data;
}

/********************************************************************************
 * Tests
 * yarn ng test --include src/app/shared/services/dynamic-data/actions/add_data.action.spec.ts
 *******************************************************************************/
describe("set_data Action", () => {
  let service: DynamicDataService;

  beforeEach(async () => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        DynamicDataService,
        {
          provide: AppDataService,
          useValue: new MockAppDataService({
            data_list: {
              test_flow: TEST_DATA_LIST(),
            },
          }),
        },
        {
          provide: DeploymentService,
          useValue: new MockDeploymentService({ name: "test" }),
        },
        {
          provide: TemplateActionRegistry,
          useValue: { register: () => null },
        },
      ],
    });

    // HACK - polyfill not loaded for rxdb dev plugin so manually fill global before running tests
    window.global = window;
    service = TestBed.inject(DynamicDataService);
    await service.ready();
    // ensure data cleared between flows
    await service.resetFlow("data_list", "test_flow");
  });

  /*************************************************************
   *  Main Tests
   ************************************************************/
  it("add_data", async () => {
    const data = await triggerTestAddDataAction(service, { number: 2 });
    expect(data.length).toEqual(3);
    const addedData = data[2];
    expect(addedData.number).toEqual(2);
    // populated metadata
    expect(addedData._user_created).toEqual(true);
    expect(addedData.row_index).toEqual(2);
    expect(addedData.id).toBeTruthy();
  });

  it("add_data type coercion", async () => {
    const data = await triggerTestAddDataAction(service, { number: "2" });
    const addedData = data[2];
    expect(addedData.number).toEqual(2);
  });

  it("remove_data", async () => {
    const data = await triggerTestAddDataAction(service, { number: 2 });
    const addedData = data[2];
    expect(addedData.number).toEqual(2);
    const updatedData = await triggerRemoveDataAction(service, { _id: addedData.id });
    expect(updatedData.length).toEqual(2);
  });

  // TODO - @list evaluation (when supported)
});
