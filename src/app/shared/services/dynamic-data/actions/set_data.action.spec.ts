import { TestBed } from "@angular/core/testing";

import { MockAppDataService } from "../../data/app-data.service.mock.spec";
import { AppDataService } from "../../data/app-data.service";

import setDataAction, {
  IActionSetDataParams,
  mergeUpdatesById,
  hackProcessUpdatesInBatches,
} from "./set_data.action";
import { DynamicDataService } from "../dynamic-data.service";
import { firstValueFrom } from "rxjs";
import { FlowTypes } from "packages/data-models";
import { DeploymentService } from "../../deployment/deployment.service";
import { MockDeploymentService } from "../../deployment/deployment.service.mock.spec";
import { TemplateActionRegistry } from "../../../components/template/services/instance/template-action.registry";
import { DynamicDataActionFactory } from "./index";
import { provideHttpClient, withInterceptorsFromDi } from "@angular/common/http";
import { provideHttpClientTesting } from "@angular/common/http/testing";

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
async function triggerTestSetDataAction(service: DynamicDataService, params: IActionSetDataParams) {
  params._list_id = "test_flow";
  await setDataAction(service, params);
  const obs = await service.query$<any>("data_list", "test_flow");
  const data = await firstValueFrom(obs);
  return data;
}

/********************************************************************************
 * Tests
 * yarn ng test --include src/app/shared/services/dynamic-data/actions/set_data.action.spec.ts
 *******************************************************************************/
describe("set_data Action", () => {
  let service: DynamicDataService;
  let serviceUpdateSpy: jasmine.Spy;

  beforeEach(async () => {
    TestBed.configureTestingModule({
      imports: [],
      providers: [
        provideHttpClient(withInterceptorsFromDi()),
        provideHttpClientTesting(),
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

    serviceUpdateSpy = spyOn(service, "update").and.callThrough();

    await service.ready();
    // Ensure any data previously persisted is cleared
    await service.resetFlow("data_list", "test_flow");
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

  it("set_data ignores updates for unchanged data", async () => {
    const params: IActionSetDataParams = { _list_id: "test_flow", number: 1 };
    await triggerTestSetDataAction(service, params);
    // expect only 1 row to be updated (skip id_1 which has same number)
    console.log("spy", serviceUpdateSpy.calls.all());
    expect(serviceUpdateSpy).toHaveBeenCalledOnceWith("data_list", "test_flow", "id_0", {
      number: 1,
    });
  });

  it("set_data prevents update to metadata fields", async () => {
    const params: IActionSetDataParams = { _meta_field: "updated", string: "updated" };
    const data = await triggerTestSetDataAction(service, params);
    expect(data[0].string).toEqual("updated");
    expect(data[0]._meta_field).toEqual("original");
  });

  it("set_data ignores evaluation when _updates provided", async () => {
    const params: IActionSetDataParams = { _updates: [{ id: "id_0", number: "@item.number" }] };
    const data = await triggerTestSetDataAction(service, params);
    // test case illustrative only of not parsing data (would have been parsed independently)
    expect(data[0].number).toEqual("@item.number");
    expect(data[1].number).toEqual(1);
  });

  it("reset_data action restores data to initial", async () => {
    const updatedData = await triggerTestSetDataAction(service, { string: "updated string" });
    expect(updatedData[0].string).toEqual("updated string");
    const { reset_data } = new DynamicDataActionFactory(service);
    await reset_data({
      action_id: "reset_data",
      args: [],
      trigger: "click",
      params: { _list_id: "test_flow" },
    });
    const obs = await service.query$<any>("data_list", "test_flow");
    const resetData = await firstValueFrom(obs);
    expect(resetData[0].string).toEqual("hello");
  });

  /*************************************************************
   *  Misc
   ************************************************************/

  it("Coerces string params to correct data type", async () => {
    // NOTE - there is no specific code that casts variables, but RXDB will infer from schema
    const params: IActionSetDataParams = { number: "300" };
    const data = await triggerTestSetDataAction(service, params);
    expect(data[0].number).toEqual(300);
  });

  /*************************************************************
   *  Quality Control
   ************************************************************/

  it("throws error if provided _id does not exist", async () => {
    const params = {
      _id: "missing_id",
      string: "sets an item correctly a given id",
    };
    await expectAsync(triggerTestSetDataAction(service, params)).toBeRejectedWithError(
      `[Update Fail] no doc exists\ndata_list: test_flow\n_id: missing_id`
    );
  });

  it("throws error if provided _index does not exist", async () => {
    const params = {
      _index: 10,
      string: "sets an item correctly a given id",
    };
    await expectAsync(triggerTestSetDataAction(service, params)).toBeRejectedWithError(
      `[Update Fail] no doc exists\ndata_list: test_flow\n_index: 10`
    );
  });

  /*************************************************************
   *  mergeUpdatesById Tests
   ************************************************************/
  describe("mergeUpdatesById", () => {
    it("merges updates for the same ID correctly", () => {
      const updates = [
        { id: "123", user: { name: "Jasper" } },
        { id: "123", user: { age: 9 } },
        { id: "123", status: "active" },
        { id: "123", status: "inactive" },
      ];
      const result = mergeUpdatesById(updates);
      expect(result).toEqual({
        "123": {
          user: { name: "Jasper", age: 9 },
          status: "inactive",
        },
      });
    });

    it("handles multiple IDs correctly", () => {
      const updates = [
        { id: "123", name: "Alice" },
        { id: "456", name: "Bob" },
        { id: "123", age: 25 },
        { id: "456", age: 30 },
      ];
      const result = mergeUpdatesById(updates);
      expect(result).toEqual({
        "123": { name: "Alice", age: 25 },
        "456": { name: "Bob", age: 30 },
      });
    });

    it("handles deep nested objects correctly", () => {
      const updates = [
        { id: "123", user: { profile: { name: "Alice" } } },
        { id: "123", user: { profile: { age: 25 } } },
        { id: "123", user: { settings: { theme: "dark" } } },
      ];
      const result = mergeUpdatesById(updates);
      expect(result).toEqual({
        "123": {
          user: {
            profile: { name: "Alice", age: 25 },
            settings: { theme: "dark" },
          },
        },
      });
    });

    it("handles empty updates array", () => {
      const updates: FlowTypes.Data_listRow[] = [];
      const result = mergeUpdatesById(updates);
      expect(result).toEqual({});
    });
  });

  /*************************************************************
   *  hackProcessUpdatesInBatches Tests
   ************************************************************/
  describe("hackProcessUpdatesInBatches", () => {
    it("updates are all processed", async () => {
      const updatesByID = {
        id_0: { number: 1 },
        id_1: { number: 2 },
      };

      // Reset spy calls before test
      serviceUpdateSpy.calls.reset();

      await hackProcessUpdatesInBatches(service, "test_flow", updatesByID, 2);

      // Verify all updates were called
      expect(serviceUpdateSpy).toHaveBeenCalledTimes(2);

      // Verify the actual update calls
      const calls = serviceUpdateSpy.calls.all();
      expect(calls[0].args).toEqual(["data_list", "test_flow", "id_0", { number: 1 }]);
      expect(calls[1].args).toEqual(["data_list", "test_flow", "id_1", { number: 2 }]);
    });

    it("handles empty updates object", async () => {
      const updatesByID = {};
      await hackProcessUpdatesInBatches(service, "test_flow", updatesByID, 2);
      expect(serviceUpdateSpy).not.toHaveBeenCalled();
    });
  });
});
