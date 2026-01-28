import { TestBed } from "@angular/core/testing";
import { Filesystem, Directory, Encoding } from "@capacitor/filesystem";
import { FilePersistenceStrategy } from "./file.strategy";
import { PersistedState } from "./persistence.interface";

/**
 * Call standalone tests via:
 * yarn ng test --include src/app/shared/services/dynamic-data/adapters/persistence/file.strategy.spec.ts
 */
describe("FilePersistenceStrategy", () => {
  let strategy: FilePersistenceStrategy;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    strategy = new FilePersistenceStrategy();
  });

  const MOCK_STATE: PersistedState = {
    data_list: {
      test_flow: {
        row_1: { id: "1", value: "test" },
      },
    },
  };

  it("should be created", () => {
    expect(strategy).toBeTruthy();
  });

  it("should save state to filesystem", async () => {
    const writeFileSpy = spyOn(Filesystem, "writeFile").and.resolveTo({ uri: "" });

    await strategy.save(MOCK_STATE);

    expect(writeFileSpy).toHaveBeenCalledWith({
      path: "open-app-builder-user-data.json",
      data: JSON.stringify(MOCK_STATE),
      directory: Directory.Data,
      encoding: Encoding.UTF8,
    });
  });

  it("should load state from filesystem", async () => {
    const readFileSpy = spyOn(Filesystem, "readFile").and.resolveTo({
      data: JSON.stringify(MOCK_STATE),
    });

    const loadedState = await strategy.load();

    expect(readFileSpy).toHaveBeenCalledWith({
      path: "open-app-builder-user-data.json",
      directory: Directory.Data,
      encoding: Encoding.UTF8,
    });
    expect(loadedState).toEqual(MOCK_STATE);
  });

  it("should return empty object if file does not exist", async () => {
    // Mock failure (e.g. file not found)
    spyOn(Filesystem, "readFile").and.rejectWith(new Error("File not found"));

    const loadedState = await strategy.load();

    expect(loadedState).toEqual({});
  });

  it("should clear state from filesystem", async () => {
    const deleteFileSpy = spyOn(Filesystem, "deleteFile").and.resolveTo();

    await strategy.clear();

    expect(deleteFileSpy).toHaveBeenCalledWith({
      path: "open-app-builder-user-data.json",
      directory: Directory.Data,
    });
  });
});
