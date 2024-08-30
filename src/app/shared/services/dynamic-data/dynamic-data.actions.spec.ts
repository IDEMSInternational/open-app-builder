import { TestBed } from "@angular/core/testing";

import { HttpClientTestingModule } from "@angular/common/http/testing";
import { MockAppDataService } from "../data/app-data.service.spec";
import { AppDataService } from "../data/app-data.service";

import { IActionSetItemParams, IActionSetItemsParams } from "./dynamic-data.actions";
import { DynamicDataService } from "./dynamic-data.service";
import ActionFactory from "./dynamic-data.actions";
import { firstValueFrom } from "rxjs";

const TEST_DATA_ROWS = [
  { id: "id1", number: 1, string: "hello", boolean: true, _meta_field: { test: "hello" } },
  { id: "id2", number: 2, string: "goodbye", boolean: false },
  { id: "id0", number: 3, string: "goodbye", boolean: false },
];
type ITestRow = (typeof TEST_DATA_ROWS)[number];

const SET_ITEM_PARAMS: IActionSetItemParams = {
  _list: "test_flow",
  _id: "id1",
};

const SET_ITEMS_PARAMS: IActionSetItemsParams = {
  _list: "test_flow",
  _ids: ["id1", "id2"],
};

describe("DynamicDataService Actions", () => {
  let service: DynamicDataService;
  let actions: ReturnType<typeof ActionFactory>;

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

    const actions = ActionFactory(service);
  });

  it("sets an item correctly for current item", async () => {
    await actions.set_item({
      context: SET_ITEM_CONTEXT,
      writeableProps: { string: "sets an item correctly for current item" },
    });
    const obs = await service.query$<any>("data_list", "test_flow");
    const data = await firstValueFrom(obs);
    expect(data[0].string).toEqual("sets an item correctly for current item");
    expect(data[1].string).toEqual("goodbye");
  });

  it("sets an item correctly for a given _id", async () => {
    await actions.set_item({
      context: SET_ITEM_CONTEXT,
      _id: "id2",
      writeableProps: { string: "sets an item correctly for a given _id" },
    });
    const obs = await service.query$<any>("data_list", "test_flow");
    const data = await firstValueFrom(obs);
    expect(data[0].string).toEqual("hello");
    expect(data[1].string).toEqual("sets an item correctly for a given _id");
  });

  it("sets an item correctly for a given _index", async () => {
    await actions.set_item({
      context: SET_ITEM_CONTEXT,
      _index: 1,
      writeableProps: { string: "sets an item correctly for a given _index" },
    });
    const obs = await service.query$<any>("data_list", "test_flow");
    const data = await firstValueFrom(obs);
    expect(data[0].string).toEqual("hello");
    expect(data[1].string).toEqual("sets an item correctly for a given _index");
  });

  it("ignores writes to protected fields", async () => {
    await actions.set_item({
      context: SET_ITEM_CONTEXT,
      writeableProps: { _meta_field: "updated", string: "updated" },
    });
    const obs = await service.query$("data_list", "test_flow");
    const data = await firstValueFrom(obs);
    expect(data[0]["string"]).toEqual("updated");
    expect(data[0]["_meta_field"]).toEqual({ test: "hello" });
  });
});
