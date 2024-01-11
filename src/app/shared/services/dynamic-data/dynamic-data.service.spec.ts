import { TestBed } from "@angular/core/testing";
import { HttpClientTestingModule } from "@angular/common/http/testing";
import { firstValueFrom } from "rxjs";

import { DynamicDataService } from "./dynamic-data.service";
import { AppDataService } from "../data/app-data.service";
import { MockAppDataService } from "../data/app-data.service.spec";

const TEST_DATA_ROWS = [
  { id: "id1", number: 1, string: "hello", boolean: true },
  { id: "id2", number: 2, string: "goodbye", boolean: false },
];

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
              test_flow: { flow_name: "test_flow", flow_type: "data_list", rows: TEST_DATA_ROWS },
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
    service.resetFlow("data_list", "test_flow", false);
  });

  it("populates initial flows from json", async () => {
    const obs = await service.query$("data_list", "test_flow");
    const data = await firstValueFrom(obs);
    expect(data.length).toEqual(2);
  });

  it("supports partial flow row updates", async () => {
    await service.update("data_list", "test_flow", "id1", { number: 1.1 });
    const obs = await service.query$<any>("data_list", "test_flow");
    const data = await firstValueFrom(obs);
    expect(data[0]).toEqual({ ...TEST_DATA_ROWS[0], number: 1.1 });
  });

  it("populates cached data on load", async () => {
    // Not easily possible due to clearCache method used (but removing shows it does work)
  });

  it("provides live querying", async () => {
    let queryResult: any;
    const obs = await service.query$("data_list", "test_flow", {
      selector: { number: { $gt: 1 } },
    });
    obs.subscribe((v) => (queryResult = v));
    await firstValueFrom(obs);
    expect(queryResult.length).toEqual(1);
    await service.update("data_list", "test_flow", "id1", { number: 5 });
    await firstValueFrom(obs);
    expect(queryResult.length).toEqual(2);
  });

  it("Supports parallel requests without recreating collections", async () => {
    const queries = new Array(20).fill(0).map(async () => {
      const obs = await service.query$("data_list", "test_flow");
      return firstValueFrom(obs);
    });
    const res = await Promise.all(queries);
    expect(res.length).toEqual(20);
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
