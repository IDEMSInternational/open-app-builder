import { TestBed } from "@angular/core/testing";
import { HttpClientTestingModule } from "@angular/common/http/testing";
import { firstValueFrom } from "rxjs";

import { DynamicDataService, ISetItemContext } from "./dynamic-data.service";
import { AppDataService } from "../data/app-data.service";
import { MockAppDataService } from "../data/app-data.service.spec";

const TEST_DATA_ROWS = [
  { id: "id1", number: 1, string: "hello", boolean: true },
  { id: "id2", number: 2, string: "goodbye", boolean: false },
  { id: "id0", number: 3, string: "goodbye", boolean: false },
];
type ITestRow = (typeof TEST_DATA_ROWS)[number];

const SET_ITEM_CONTEXT: ISetItemContext = {
  flow_name: "test_flow",
  itemDataIDs: ["id1", "id2"],
  currentItemId: "id1",
};

/**
 * Call standalone tests via:
 * yarn ng test --include src/app/shared/services/dynamic-data/dynamic-data.service.spec.ts
 */
describe("DynamicDataService", () => {
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
  });

  it("populates initial flows from json", async () => {
    const obs = await service.query$("data_list", "test_flow");
    const data = await firstValueFrom(obs);
    expect(data.length).toEqual(3);
  });

  it("supports partial flow row updates", async () => {
    await service.update("data_list", "test_flow", "id1", { number: 1.1 });
    const obs = await service.query$<any>("data_list", "test_flow");
    const data = await firstValueFrom(obs);
    expect(data[0].number).toEqual(1.1);
  });
  it("allows reset to initial data", async () => {
    await service.update("data_list", "test_flow", "id1", { number: 1.1 });
    await service.resetFlow("data_list", "test_flow");
    const obs = await service.query$<any>("data_list", "test_flow");
    const data = await firstValueFrom(obs);
    expect(data[0].number).toEqual(1);
  });

  it("populates cached data on load", async () => {
    // Not easily possible due to clearCache method used (but removing shows it does work)
  });

  it("provides live querying", async () => {
    // HACK - ensure any previous data cleared before running test
    await service.resetFlow("data_list", "test_flow");
    const queryResults: ITestRow[][] = [];
    const obs = await service.query$("data_list", "test_flow", {
      selector: { number: { $gt: 2 } },
    });
    obs.subscribe((v) => {
      queryResults.push(v as ITestRow[]);
    });
    await service.update("data_list", "test_flow", "id1", { number: 5 });
    await firstValueFrom(obs);
    // should have 2 updates, initial result and updated query result
    expect(queryResults.length).toEqual(2);
    const [beforeQuery, afterQuery] = queryResults;
    expect(beforeQuery.map((row) => row.id)).toEqual(["id0"]);
    expect(afterQuery.map((row) => row.id)).toEqual(["id1", "id0"]);
  });

  it("Supports parallel requests without recreating collections", async () => {
    const queries = new Array(20).fill(0).map(async () => {
      const obs = await service.query$("data_list", "test_flow");
      return firstValueFrom(obs);
    });
    const res = await Promise.all(queries);
    expect(res.length).toEqual(20);
  });

  it("sets an item correctly for current item", async () => {
    await service.setItem({
      context: SET_ITEM_CONTEXT,
      writeableProps: { string: "sets an item correctly for current item" },
    });
    const obs = await service.query$<any>("data_list", "test_flow");
    const data = await firstValueFrom(obs);
    expect(data[0].string).toEqual("sets an item correctly for current item");
    expect(data[1].string).toEqual("goodbye");
  });

  it("sets an item correctly for a given _id", async () => {
    await service.setItem({
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
    await service.setItem({
      context: SET_ITEM_CONTEXT,
      _index: 1,
      writeableProps: { string: "sets an item correctly for a given _index" },
    });
    const obs = await service.query$<any>("data_list", "test_flow");
    const data = await firstValueFrom(obs);
    expect(data[0].string).toEqual("hello");
    expect(data[1].string).toEqual("sets an item correctly for a given _index");
  });

  it("adds metadata (row_index) to docs", async () => {
    const obs = await service.query$<any>("data_list", "test_flow");
    const data = await firstValueFrom(obs);
    expect(data[0].row_index).toEqual(0);
    expect(data[1].row_index).toEqual(1);
  });

  it("returns data sorted by row_index", async () => {
    const obs = await service.query$<any>("data_list", "test_flow");
    const data = await firstValueFrom(obs);
    expect(data[0].id).toEqual("id1");
    expect(data[1].id).toEqual("id2");
    expect(data[2].id).toEqual("id0");
  });

  it("does not allow manual updates to row_index property", async () => {
    await expectAsync(
      service.update("data_list", "test_flow", "id1", { row_index: 5 })
    ).toBeRejectedWithError();
  });

  // QA
  it("prevents query of non-existent data lists", async () => {
    let errMsg: string;
    await service.query$("data_list", "fakeData").catch((err) => {
      errMsg = err.message;
    });
    expect(errMsg).toEqual("No data exists for collection [fakeData], cannot initialise");
  });

  it("ignores cached data where initial data no longer exists", async () => {
    // TODO - add methods that ignore rows from cached data if row id deleted from source data_list
  });
});
