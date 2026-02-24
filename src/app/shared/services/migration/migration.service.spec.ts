import { TestBed } from "@angular/core/testing";
import { MigrationService } from "./migration.service";
import { LocalStorageService } from "../local-storage/local-storage.service";
import { Migration, MigrationHistory } from "./migration.types";
import { Injector } from "@angular/core";
import { AlertController } from "@ionic/angular";

/**
 * Call standalone tests via:
 * yarn ng test --include src/app/shared/services/migration/migration.service.spec.ts
 */
describe("MigrationService", () => {
  let service: MigrationService;
  let mockLocalStorage: jasmine.SpyObj<LocalStorageService>;
  let mockInjector: jasmine.SpyObj<Injector>;
  let mockAlertCtrl: jasmine.SpyObj<AlertController>;
  let mockMigrations: Migration<Injector>[];
  let storage: Record<string, string>;

  beforeEach(() => {
    storage = {};
    mockLocalStorage = jasmine.createSpyObj("LocalStorageService", [
      "getProtected",
      "setProtected",
    ]);
    mockInjector = jasmine.createSpyObj("Injector", ["get"]);
    mockAlertCtrl = jasmine.createSpyObj("AlertController", ["create"]);
    const mockAlertElement = jasmine.createSpyObj("HTMLIonAlertElement", [
      "present",
      "onDidDismiss",
    ]);
    mockAlertElement.onDidDismiss.and.resolveTo({ role: "ok" });
    mockAlertCtrl.create.and.resolveTo(mockAlertElement as any);

    mockLocalStorage.getProtected.and.callFake((key) => storage[key] || null);
    mockLocalStorage.setProtected.and.callFake((key, val) => {
      storage[key] = val;
    });

    mockMigrations = [
      {
        id: "20230101_init",
        run: jasmine.createSpy("run_init").and.resolveTo(),
      },
      {
        id: "20230201_update",
        run: jasmine.createSpy("run_update").and.resolveTo(),
      },
    ];

    TestBed.configureTestingModule({
      providers: [
        MigrationService,
        { provide: LocalStorageService, useValue: mockLocalStorage },
        { provide: Injector, useValue: mockInjector },
        { provide: AlertController, useValue: mockAlertCtrl },
      ],
    });
    service = TestBed.inject(MigrationService);
  });

  describe("handleMigrations() - Execution Logic", () => {
    it("should run all pending migrations and mark as RUN", async () => {
      await service.handleMigrations(mockMigrations, mockInjector, "test");

      // Verify all ran
      expect(mockMigrations[0].run).toHaveBeenCalled();
      expect(mockMigrations[1].run).toHaveBeenCalled();

      // Verify completion marked with RUN status
      // usage of storage to verify final state
      const history = JSON.parse(storage["MIGRATION_HISTORY"]);

      expect(history[`test:${mockMigrations[0].id}`].status).toBe("RUN");
      expect(history[`test:${mockMigrations[1].id}`].status).toBe("RUN");
      expect(history[`test:${mockMigrations[0].id}`].timestamp).toBeDefined();
    });

    it("should skip migrations if preconditions return false", async () => {
      mockMigrations[0].preconditions = jasmine.createSpy("pre").and.resolveTo(false);

      await service.handleMigrations(mockMigrations, mockInjector, "test");

      expect(mockMigrations[0].preconditions).toHaveBeenCalled();
      expect(mockMigrations[0].run).not.toHaveBeenCalled();

      // Verify marked as SKIPPED
      const history = JSON.parse(storage["MIGRATION_HISTORY"]);
      expect(history[`test:${mockMigrations[0].id}`].status).toBe("SKIPPED");
    });
  });

  describe("handleMigrations() - History & State", () => {
    it("should not re-run RUN or SKIPPED migrations", async () => {
      const fullId = `test:${mockMigrations[0].id}`;
      const historyMock: MigrationHistory = {
        [fullId]: { status: "RUN", timestamp: 12345 },
      };

      storage["MIGRATION_HISTORY"] = JSON.stringify(historyMock);

      await service.handleMigrations(mockMigrations, mockInjector, "test");

      expect(mockMigrations[0].run).not.toHaveBeenCalled();
      expect(mockMigrations[1].run).toHaveBeenCalled();
    });

    it("should retry FAILED migrations", async () => {
      const fullId = `test:${mockMigrations[0].id}`;
      const historyMock: MigrationHistory = {
        [fullId]: { status: "FAILED", timestamp: 12345 },
      };

      storage["MIGRATION_HISTORY"] = JSON.stringify(historyMock);

      await service.handleMigrations(mockMigrations, mockInjector, "test");

      expect(mockMigrations[0].run).toHaveBeenCalled(); // Should retry
    });
  });

  describe("handleMigrations() - Error Handling", () => {
    it("should mark status as FAILED on error", async () => {
      const error = new Error("Migration Critical Failure");
      (mockMigrations[0].run as jasmine.Spy).and.rejectWith(error);

      // Suppress console.error for test
      spyOn(console, "error");

      try {
        await service.handleMigrations(mockMigrations, mockInjector, "test");
        fail("Should have thrown error");
      } catch (e) {
        expect(e).toBe(error);
      }

      // Check storage for FAILED status
      const history = JSON.parse(storage["MIGRATION_HISTORY"]);
      expect(history[`test:${mockMigrations[0].id}`].status).toBe("FAILED");
    });
  });
});
