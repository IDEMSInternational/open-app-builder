import { TestBed } from "@angular/core/testing";
import { provideHttpClientTesting } from "@angular/common/http/testing";
import { catchError, firstValueFrom, of } from "rxjs";

import { DynamicDataService } from "./dynamic-data.service";
import { AppDataService } from "../data/app-data.service";
import { provideHttpClient, withInterceptorsFromDi } from "@angular/common/http";
import { MockAppDataService } from "../data/app-data.service.mock.spec";
import { DeploymentService } from "../deployment/deployment.service";
import { MockDeploymentService } from "../deployment/deployment.service.mock.spec";
import { FlowTypes } from "packages/data-models";

type ITestRow = { id: string; number: number; string: string; boolean: boolean; _meta_field?: any };

const TEST_DATA_ROWS = (): FlowTypes.Data_listRow<ITestRow>[] => [
  { id: "id1", number: 1, string: "hello", boolean: true, _meta_field: { test: "hello" } },
  { id: "id2", number: 2, string: "goodbye", boolean: false },
  { id: "id0", number: 3, string: "goodbye", boolean: false },
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

/**
 * Call standalone tests via:
 * yarn ng test --include src/app/shared/services/dynamic-data/dynamic-data.service.spec.ts
 */
describe("DynamicDataService", () => {
  let service: DynamicDataService;

  beforeEach(async () => {
    TestBed.configureTestingModule({
      imports: [],
      providers: [
        DynamicDataService,
        {
          provide: AppDataService,
          useValue: new MockAppDataService({
            data_list: { test_flow: TEST_DATA_LIST() },
          }),
        },
        provideHttpClient(withInterceptorsFromDi()),
        provideHttpClientTesting(),
        {
          provide: DeploymentService,
          useValue: new MockDeploymentService({ name: "test" }),
        },
      ],
    });

    // HACK - polyfill not loaded for rxdb dev plugin so manually fill global before running tests
    window.global = window;

    service = TestBed.inject(DynamicDataService);
    await service.ready();
    // Ensure any data previously persisted is cleared
    await service.resetAll();
  });

  it("populates initial flows from json", async () => {
    const obs = service.query$("data_list", "test_flow");
    const data = await firstValueFrom(obs);
    expect(data.length).toEqual(3);
  });

  it("supports partial flow row updates", async () => {
    await service.update("data_list", "test_flow", "id1", { number: 1.1 });
    const obs = service.query$<any>("data_list", "test_flow");
    const data = await firstValueFrom(obs);
    expect(data[0].number).toEqual(1.1);
  });
  it("allows reset to initial data", async () => {
    await service.update("data_list", "test_flow", "id1", { number: 1.1 });
    await service.resetFlow("data_list", "test_flow");
    const obs = service.query$<any>("data_list", "test_flow");
    const data = await firstValueFrom(obs);
    expect(data[0].number).toEqual(1);
  });

  it("populates cached data on load", async () => {
    // Not easily possible due to clearCache method used (but removing shows it does work)
  });

  it("persists partial updates to cache", async () => {
    await service.update("data_list", "test_flow", "id1", { number: 1.1 });
    await service.update("data_list", "test_flow", "id1", { string: "updated" });
    const cacheState = await service.getState();
    expect(cacheState).toEqual({
      data_list: {
        test_flow: {
          id1: {
            number: 1.1,
            string: "updated",
          },
        },
      },
    });
  });

  it("provides live querying", async () => {
    // HACK - ensure any previous data cleared before running test
    await service.resetFlow("data_list", "test_flow");
    const queryResults: ITestRow[][] = [];
    const obs = service.query$("data_list", "test_flow", {
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
      const obs = service.query$("data_list", "test_flow");
      return firstValueFrom(obs);
    });
    const res = await Promise.all(queries);
    expect(res.length).toEqual(20);
  });

  it("supports reading data with protected fields", async () => {
    const obs = service.query$("data_list", "test_flow");
    const data = await firstValueFrom(obs);
    expect(data[0]["_meta_field"]).toEqual({ test: "hello" });
  });

  it("adds metadata (row_index) to docs", async () => {
    const obs = service.query$<any>("data_list", "test_flow");
    const data = await firstValueFrom(obs);
    expect(data[0].row_index).toEqual(0);
    expect(data[1].row_index).toEqual(1);
  });

  it("returns data sorted by row_index", async () => {
    const obs = service.query$<any>("data_list", "test_flow");
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

  it("sets all values in internal collection", async () => {
    await service.setInternalCollection("mock", [{ id: "1", string: "hello" }]);
    const obs = service.query$<any>("data_list", "_mock");
    const data = await firstValueFrom(obs);
    expect(data).toEqual([{ id: "1", string: "hello" }]);
  });

  it("internal collection manual insert", async () => {
    await service.insert("data_list", "_local_list", { id: "id_1", number: 1 });
    const obs = service.query$<any>("data_list", "_local_list");
    const data = await firstValueFrom(obs);
    expect(data).toEqual([{ id: "id_1", number: 1 }]);
  });

  it("internal collection delete single", async () => {
    await service.bulkUpsert("data_list", "_local_list", [
      { id: "id_1", number: 1 },
      { id: "id_2", number: 2 },
    ]);
    await service.remove("data_list", "_local_list", ["id_1"]);
    const obs = service.query$<any>("data_list", "_local_list");
    const data = await firstValueFrom(obs);
    expect(data).toEqual([{ id: "id_2", number: 2 }]);
    // ensure state persisted correctly
    const persistState = await service.getState();
    expect(persistState).toEqual({
      data_list: {
        _local_list: {
          id_2: {
            id: "id_2",
            number: 2,
          },
        },
      },
    });
  });

  // QA
  it("prevents query of non-existent data lists", async () => {
    let errMsg: string;
    const query = service.query$("data_list", "fakeData").pipe(
      catchError((err) => {
        errMsg = err.message;
        return of([]);
      })
    );
    await firstValueFrom(query);
    expect(errMsg).toEqual(`No data exists for collection [fakeData], cannot initialise`);
  });

  it("ignores cached data where initial data no longer exists", async () => {
    // TODO - add methods that ignore rows from cached data if row id deleted from source data_list
  });

  it("upsertAndMerge updates existing row by merging partial data", async () => {
    // Test updating an existing row
    await service.upsertAndMerge<ITestRow>("data_list", "test_flow", "id1", {
      number: 999,
      string: "updated",
    });

    const obs = service.query$<any>("data_list", "test_flow");
    const data = await firstValueFrom(obs);
    const updatedRow = data.find((row) => row.id === "id1");

    expect(updatedRow.number).toEqual(999);
    expect(updatedRow.string).toEqual("updated");
    expect(updatedRow.boolean).toEqual(true); // Should preserve existing field
  });

  it("upsertAndMerge inserts new row when row doesn't exist", async () => {
    // Test inserting a new row
    await service.upsertAndMerge<ITestRow>("data_list", "test_flow", "new_id", {
      number: 42,
      string: "new row",
      boolean: true,
    });

    const obs = service.query$<any>("data_list", "test_flow");
    const data = await firstValueFrom(obs);
    const newRow = data.find((row) => row.id === "new_id");

    expect(newRow).toBeDefined();
    expect(newRow.number).toEqual(42);
    expect(newRow.string).toEqual("new row");
    expect(newRow.boolean).toEqual(true);
  });

  it("upsertAndMerge handles empty data gracefully", async () => {
    // Test that empty data doesn't cause errors
    await expectAsync(service.upsertAndMerge("data_list", "test_flow", "id1", {})).toBeResolved();

    // Should not change existing data
    const obs = service.query$<any>("data_list", "test_flow");
    const data = await firstValueFrom(obs);
    const row = data.find((r) => r.id === "id1");
    expect(row.number).toEqual(1); // Original value preserved
  });
});
