import { TestBed } from "@angular/core/testing";

import { LocalStorageService } from "./local-storage.service";

/** Mock calls to localstorage to store values in-memory */
export class MockLocalStorageService implements Partial<LocalStorageService> {
  private values: Record<string, string> = {};
  public getString(key: string): string {
    return this.values[key];
  }
  public setString(key: string, value: string): void {
    this.values[key] = value;
  }
  public ready(): boolean {
    return true;
  }
}
describe("LocalStorageService", () => {
  let service: LocalStorageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LocalStorageService);
  });

  it("should be created", () => {
    expect(service).toBeTruthy();
  });
});
