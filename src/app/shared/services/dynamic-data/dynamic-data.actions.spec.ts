import { TestBed } from "@angular/core/testing";

import { HttpClientTestingModule } from "@angular/common/http/testing";
import { MockAppDataService } from "../data/app-data.service.spec";
import { AppDataService } from "../data/app-data.service";

import { IActionSetDataParams } from "./dynamic-data.actions";
import { DynamicDataService } from "./dynamic-data.service";
import ActionFactory from "./dynamic-data.actions";
import { firstValueFrom } from "rxjs";
import { FlowTypes } from "packages/data-models";
import { DeploymentService } from "../deployment/deployment.service";
import { MockDeploymentService } from "../deployment/deployment.service.spec";
import { TemplateActionRegistry } from "../../components/template/services/instance/template-action.registry";

const TEST_DATA_ROWS = [
  { id: "id_0", number: 0, string: "hello" },
  { id: "id_1", number: 1, string: "hello", boolean: true, _meta_field: { test: "hello" } },
  // TODO include out-of-order data for use in test cases
];

/********************************************************************************
 * Test Utilities
 *******************************************************************************/

/** Generate a rows to trigger set_data action with included params */
function getTestActionRow(params: IActionSetDataParams) {
  params._list_id = "test_flow";
  const actionRow: FlowTypes.TemplateRowAction = {
    action_id: "set_data",
    trigger: "click",
    args: [],
    params,
  };
  return actionRow;
}

/**
 * Trigger the set_data action with included params and return first update
 * to corresponding data_list
 * * */
async function triggerTestSetDataAction(service: DynamicDataService, params: IActionSetDataParams) {
  const actionRow = getTestActionRow(params);
  const actions = new ActionFactory(service);
  await actions.set_data(actionRow);
  const obs = await service.query$<any>("data_list", "test_flow");
  const data = await firstValueFrom(obs);
  return data;
}

/********************************************************************************
 * Tests
 * yarn ng test --include src/app/shared/services/dynamic-data/dynamic-data.actions.spec.ts
 *******************************************************************************/
describe("DynamicDataService Actions", () => {
  let service: DynamicDataService;
  let actions: ActionFactory;

  beforeEach(async () => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        DynamicDataService,
        {
          provide: AppDataService,
          useValue: new MockAppDataService({
            data_list: {
              test_flow: {
                flow_name: "test_flow",
                flow_type: "data_list",
                // Make deep clone of data to avoid data overwrite issues
                rows: JSON.parse(JSON.stringify(TEST_DATA_ROWS)),
              },
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
    TestBed.inject(AppDataService);
    await service.ready();
    // Ensure any data previously persisted is cleared
    await service.resetFlow("data_list", "test_flow");
    actions = new ActionFactory(service);
  });

  /*************************************************************
   *  Main Tests
   ************************************************************/
  it("set_data by _id", async () => {
    const params: IActionSetDataParams = { _id: "id_1", string: "updated string" };
    const data = await triggerTestSetDataAction(service, params);
    expect(data[0].string).toEqual("hello");
    expect(data[1].string).toEqual("updated string");
  });

  it("set_data by _index", async () => {
    const params: IActionSetDataParams = { _index: 1, string: "updated string" };
    const data = await triggerTestSetDataAction(service, params);
    expect(data[0].string).toEqual("hello");
    expect(data[1].string).toEqual("updated string");
  });

  it("set_data bulk", async () => {
    const params: IActionSetDataParams = { string: "updated string" };
    const data = await triggerTestSetDataAction(service, params);
    expect(data[0].string).toEqual("updated string");
    expect(data[1].string).toEqual("updated string");
  });

  it("set_data with item ref (single)", async () => {
    const params: IActionSetDataParams = { _id: "id_1", number: "@item.number + 100" };
    const data = await triggerTestSetDataAction(service, params);
    expect(data[0].number).toEqual(0);
    expect(data[1].number).toEqual(101);
  });

  it("set_data with item ref (bulk)", async () => {
    const params: IActionSetDataParams = { number: "@item.number + 100" };
    const data = await triggerTestSetDataAction(service, params);
    expect(data[0].number).toEqual(100);
    expect(data[1].number).toEqual(101);
  });

  fit("set_data ignores updates for unchanged data", async () => {
    const { _updates } = await actions["parseParams"]({ _list_id: "test_flow", number: 1 });
    expect(_updates.length).toEqual(1);
  });

  // TODO - continue with tests below
  // TODO - update component demo sheet
  // TODO - confirm if any breaking changes

  it("set_data without evaluation (_updates passed directly)", async () => {});

  it("ignores writes to readonly '_' fields", async () => {
    const params = getTestActionRow({
      _id: "id1",
      _meta_field: "updated string",
      string: "updated string",
    });
    await actions.set_data(params);
    const obs = await service.query$<any>("data_list", "test_flow");
    const data = await firstValueFrom(obs);
    expect(data[0].string).toEqual("updated string");
    expect(data[0]._meta_field).toEqual({ test: "hello" });
  });

  /*************************************************************
   *  Quality Control
   ************************************************************/

  it("throws error if provided _id does not exist", async () => {
    const params = getTestActionRow({
      _id: "missing_id",
      string: "sets an item correctly a given id",
    });
    await expectAsync(actions.set_data(params)).toBeRejectedWithError(
      "[Update Fail] no doc exists for data_list:test_flow with row_id: missing_id"
    );
    // also ensure new item not created
    const obs = await service.query$<any>("data_list", "test_flow");
    const data = await firstValueFrom(obs);
    expect(data.length).toEqual(3);
  });

  it("throws error if provided _index does not exist", async () => {
    const params = getTestActionRow({
      _id: "missing_id",
      string: "sets an item correctly a given id",
    });
    await expectAsync(actions.set_data(params)).toBeRejectedWithError(
      "[Update Fail] no doc exists for data_list:test_flow with row_id: missing_id"
    );
    // also ensure new item not created
    const obs = await service.query$<any>("data_list", "test_flow");
    const data = await firstValueFrom(obs);
    expect(data.length).toEqual(3);
  });
});

/**
 *
 * Future TODOs
 * - Apply update that deletes fields
 * - Action to create new data row
 * - Action to delete data row
 * - Bulk update with data query
 */
