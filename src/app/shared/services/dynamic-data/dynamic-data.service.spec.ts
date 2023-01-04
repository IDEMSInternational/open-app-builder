import { TestBed } from "@angular/core/testing";

import { HttpClientTestingModule } from "@angular/common/http/testing";

import { DynamicDataService } from "./dynamic-data.service";
import { firstValueFrom } from "rxjs";

const DATA_BASE = [
  { id: "id1", number: 1, string: "hello", boolean: true },
  { id: "id2", number: 2, string: "goodbye", boolean: false },
];

describe("DynamicDataService", () => {
  let service: DynamicDataService;

  beforeEach(async () => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });

    // HACK - polyfill not loaded for rxdb dev plugin so manually fill global before running tests
    window.global = window;

    service = TestBed.inject(DynamicDataService);
    await service.ready();
    const { id, ...data } = DATA_BASE[0];
    await service.update("data_list", "test", id, data);
  });

  it("populates initial flows from json", () => {});
  it("ovewrites flow value with user data", () => {});
  it("persists changes on restart", () => {});
  it("discards incompatible changes on flow update", () => {});

  it("provides initial value when watching", async () => {
    const obs = await service.query$("data_list", "test");
    const data = await firstValueFrom(obs);
    expect(data.length).toEqual(1);
    expect(data[0]).toEqual(DATA_BASE[0]);
  });

  it("supports partial flow row updates", async () => {
    await service.update("data_list", "test", "id1", { number: 2 });
    const obs = await service.query$<any>("data_list", "test");
    const data = await firstValueFrom(obs);
    expect(data.length).toEqual(1);
    expect(data[0]).toEqual({ ...DATA_BASE[0], number: 2 });
  });

  it("removes keys set to undefined", async () => {
    await service.update("data_list", "test", "id1", { number: undefined });
    const obs = await service.query$<any>("data_list", "test");
    const data = await firstValueFrom(obs);
    expect(data.length).toEqual(1);
    expect("number" in data[0]).toBeFalse();
  });

  it("populates cached data on load", () => {});

  fit("provides live querying", async () => {
    const obs = await service.query$("data_list", "test", { selector: { number: { $gt: 1 } } });
    const data = await firstValueFrom(obs);
    console.log("data", data);
  });

  // QA
  it("returns an empty array when data does not exist", async () => {
    const obs = await service.query$("data_list", "fakeData");
    const initialValue = await firstValueFrom(obs);
    expect(Array.isArray(initialValue)).toBeTrue();
    expect(initialValue.length).toEqual(0);
  });
  it("prevents updates to non-existent rows", async () => {});
});
