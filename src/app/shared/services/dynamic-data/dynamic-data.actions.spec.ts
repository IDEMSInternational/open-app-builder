import { TestBed } from "@angular/core/testing";

import { HttpClientTestingModule } from "@angular/common/http/testing";
import { MockAppDataService } from "../data/app-data.service.spec";
import { AppDataService } from "../data/app-data.service";

import { IActionSetItemParams, IActionSetItemsParams } from "./dynamic-data.actions";
import { DynamicDataService } from "./dynamic-data.service";
import ActionFactory from "./dynamic-data.actions";
import { firstValueFrom } from "rxjs";
import { FlowTypes } from "packages/data-models";

const TEST_DATA_ROWS = [
  { id: "id1", number: 1, string: "hello", boolean: true, _meta_field: { test: "hello" } },
  { id: "id2", number: 2, string: "goodbye", boolean: false },
  { id: "id0", number: 3, string: "goodbye", boolean: false },
];

function getSetItemParams(params: Partial<IActionSetItemParams & Record<string, any>>) {
  params._list_id = "test_flow";
  const mockAction: FlowTypes.TemplateRowAction = {
    action_id: "set_item",
    trigger: "click",
    args: [],
    params,
  };
  return mockAction;
}

function getSetItemsParams(
  params: Partial<IActionSetItemsParams & Record<string, any>>,
  ids?: string[]
) {
  if (ids) {
    params._items = {
      flow_name: "test_flow",
      flow_type: "data_list",
      rows: ids.map((id) => ({ id })),
    };
  }
  const mockAction: FlowTypes.TemplateRowAction = {
    action_id: "set_item",
    trigger: "click",
    args: [],
    params,
  };
  return mockAction;
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
  it("set_item action sets by _id", async () => {
    const params = getSetItemParams({ _id: "id1", string: "updated string" });
    await actions.set_item(params);
    const obs = await service.query$<any>("data_list", "test_flow");
    const data = await firstValueFrom(obs);
    expect(data[0].string).toEqual("updated string");
    expect(data[1].string).toEqual("goodbye");
  });

  it("set_items action by _items ref", async () => {
    const params = getSetItemsParams({ string: "batch updated" }, ["id1", "id2"]);
    await actions.set_items(params);
    const obs = await service.query$<any>("data_list", "test_flow");
    const data = await firstValueFrom(obs);
    expect(data[0].string).toEqual("batch updated");
    expect(data[1].string).toEqual("batch updated");
  });

  it("set_items action by _list_id", async () => {
    const params = getSetItemsParams({ _list_id: "test_flow", string: "batch updated" });
    await actions.set_items(params);
    const obs = await service.query$<any>("data_list", "test_flow");
    const data = await firstValueFrom(obs);
    expect(data[0].string).toEqual("batch updated");
    expect(data[1].string).toEqual("batch updated");
  });

  it("ignores writes to readonly '_' fields", async () => {
    const params = getSetItemParams({
      _id: "id1",
      _meta_field: "updated string",
      string: "updated string",
    });
    await actions.set_item(params);
    const obs = await service.query$<any>("data_list", "test_flow");
    const data = await firstValueFrom(obs);
    expect(data[0].string).toEqual("updated string");
    expect(data[0]._meta_field).toEqual({ test: "hello" });
  });

  /*************************************************************
   *  Quality Control
   ************************************************************/
  it("throws error if no _id provided", async () => {
    const params = getSetItemParams({ string: "sets an item correctly a given id" });
    await expectAsync(actions.set_item(params)).toBeRejectedWithError("[set_item] invalid params");
  });

  it("throws error if provided _id does not exist", async () => {
    const params = getSetItemParams({
      _id: "missing_id",
      string: "sets an item correctly a given id",
    });
    await expectAsync(actions.set_item(params)).toBeRejectedWithError(
      "[Update Fail] no doc exists for data_list:test_flow with row_id: missing_id"
    );
    // also ensure new item not created
    const obs = await service.query$<any>("data_list", "test_flow");
    const data = await firstValueFrom(obs);
    expect(data.length).toEqual(3);
  });

  it("throws error if no _ids provided", async () => {
    const params = getSetItemsParams({ string: "sets an item correctly a given id" });
    await expectAsync(actions.set_items(params)).toBeRejectedWithError(
      "[set_items] invalid params"
    );
  });
});
