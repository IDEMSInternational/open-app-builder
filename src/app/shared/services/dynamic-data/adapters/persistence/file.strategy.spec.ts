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
  let mockFilesystem: jasmine.SpyObj<any>; // Using any to avoid complex typing of Capacitor plugin for mock

  const MOCK_STATE: PersistedState = {
    data_list: {
      test_flow: {
        row_1: { id: "1", value: "test" },
      },
    },
  };

  beforeEach(() => {
    TestBed.configureTestingModule({});

    // Create a mock Filesystem object
    mockFilesystem = jasmine.createSpyObj("Filesystem", ["writeFile", "readFile", "deleteFile"]);
    mockFilesystem.writeFile.and.resolveTo({ uri: "mock-uri" });
    mockFilesystem.readFile.and.resolveTo({ data: JSON.stringify(MOCK_STATE) });
    mockFilesystem.deleteFile.and.resolveTo();

    // Inject the mock into the strategy
    strategy = new FilePersistenceStrategy(mockFilesystem, Directory.Data, Encoding.UTF8);
  });

  it("should have Capacitor dependencies available", () => {
    // These checks ensure the environment has valid Enum values even if we mock the implementation logic
    expect(Filesystem).toBeDefined();
    expect(Directory).toBeDefined();
    expect(Directory.Data).toBeTruthy();
  });

  it("should be created", () => {
    expect(strategy).toBeTruthy();
  });

  it("should save state to filesystem", async () => {
    await strategy.save(MOCK_STATE);

    expect(mockFilesystem.writeFile).toHaveBeenCalledWith(
      jasmine.objectContaining({
        path: "oab-dynamic-data.json",
        data: JSON.stringify(MOCK_STATE),
        directory: Directory.Data,
        encoding: Encoding.UTF8,
      })
    );
  });

  it("should load state from filesystem", async () => {
    const loadedState = await strategy.load();

    expect(mockFilesystem.readFile).toHaveBeenCalledWith(
      jasmine.objectContaining({
        path: "oab-dynamic-data.json",
        directory: Directory.Data,
        encoding: Encoding.UTF8,
      })
    );
    expect(loadedState).toEqual(MOCK_STATE);
  });

  it("should return empty object if file does not exist", async () => {
    // Mock failure (e.g. file not found)
    mockFilesystem.readFile.and.rejectWith(new Error("File not found"));

    const loadedState = await strategy.load();

    expect(loadedState).toEqual({});
  });

  it("should clear state from filesystem", async () => {
    await strategy.clear();

    expect(mockFilesystem.deleteFile).toHaveBeenCalledWith(
      jasmine.objectContaining({
        path: "oab-dynamic-data.json",
        directory: Directory.Data,
      })
    );
  });
});
