import { fakeAsync, flushMicrotasks, tick } from "@angular/core/testing";
import { reloadOnDevSync } from "./dev-sync.utils";

const INTERVAL_MS = 1000;

/** Mock minimal fetch response */
const mockResponse = (status: number, body = "") =>
  Promise.resolve({ status, text: () => Promise.resolve(body) } as Response);

describe("reloadOnDevSync", () => {
  let reload: jasmine.Spy;
  let stop: () => void;

  beforeEach(() => {
    reload = jasmine.createSpy("reload");
    spyOn(console, "log");
  });

  /** Start checking and flush the initial check */
  function start() {
    stop = reloadOnDevSync({ intervalMs: INTERVAL_MS, reload });
    flushMicrotasks();
  }

  it("does not reload on first check", fakeAsync(() => {
    spyOn(window, "fetch").and.returnValues(mockResponse(200, "a"));
    start();
    expect(reload).not.toHaveBeenCalled();
    stop();
  }));

  it("does not reload when timestamp unchanged", fakeAsync(() => {
    spyOn(window, "fetch").and.returnValues(mockResponse(200, "a"), mockResponse(200, "a"));
    start();
    tick(INTERVAL_MS);
    expect(window.fetch).toHaveBeenCalledTimes(2);
    expect(reload).not.toHaveBeenCalled();
    stop();
  }));

  it("reloads when timestamp changes", fakeAsync(() => {
    spyOn(window, "fetch").and.returnValues(mockResponse(200, "a"), mockResponse(200, "b"));
    start();
    tick(INTERVAL_MS);
    expect(reload).toHaveBeenCalledTimes(1);
  }));

  it("ignores missing file after first check, then reloads when timestamp changes", fakeAsync(() => {
    spyOn(window, "fetch").and.returnValues(
      mockResponse(200, "a"),
      mockResponse(404),
      mockResponse(200, "a"),
      mockResponse(200, "b")
    );
    start();
    tick(INTERVAL_MS);
    tick(INTERVAL_MS);
    expect(reload).not.toHaveBeenCalled();
    tick(INTERVAL_MS);
    expect(reload).toHaveBeenCalledTimes(1);
  }));

  it("reloads when file is created after being missing on first check", fakeAsync(() => {
    spyOn(window, "fetch").and.returnValues(mockResponse(404), mockResponse(200, "a"));
    start();
    tick(INTERVAL_MS);
    expect(reload).toHaveBeenCalledTimes(1);
  }));

  it("continues checking after fetch error", fakeAsync(() => {
    spyOn(window, "fetch").and.returnValues(
      Promise.reject(new Error("network error")),
      mockResponse(200, "a")
    );
    start();
    tick(INTERVAL_MS);
    expect(window.fetch).toHaveBeenCalledTimes(2);
    expect(reload).not.toHaveBeenCalled();
    stop();
  }));

  it("stops checking when stopped", fakeAsync(() => {
    spyOn(window, "fetch").and.callFake(() => mockResponse(200, "a"));
    start();
    stop();
    tick(INTERVAL_MS * 3);
    expect(window.fetch).toHaveBeenCalledTimes(1);
  }));

  it("requests timestamp file without cache", fakeAsync(() => {
    spyOn(window, "fetch").and.returnValues(mockResponse(200, "a"));
    start();
    const [url, init] = (window.fetch as jasmine.Spy).calls.mostRecent().args;
    expect(url).toMatch(/^\/assets\/app_data\/dev_sync\.json\?t=\d+$/);
    expect(init).toEqual({ cache: "no-store" });
    stop();
  }));
});
