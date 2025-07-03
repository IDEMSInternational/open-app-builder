import { TestBed } from "@angular/core/testing";
import { PermissionState } from "@capacitor/core";
import {
  CancelOptions,
  LocalNotifications,
  LocalNotificationsPlugin,
  ScheduleOptions,
} from "@capacitor/local-notifications";
import { of } from "rxjs";
import { NotificationService } from "./notification.service";
import { AppConfigService } from "src/app/shared/services/app-config/app-config.service";
import { DynamicDataService } from "src/app/shared/services/dynamic-data/dynamic-data.service";
import { LocalStorageService } from "src/app/shared/services/local-storage/local-storage.service";
import { INotification, IDBNotification, INotificationInternal } from "./notification.types";
import { IAppConfig } from "data-models/appConfig";
import { CapacitorEventService } from "src/app/shared/services/capacitor-event/capacitor-event.service";
import { MockCapacitorEventService } from "src/app/shared/services/capacitor-event/capacitor-event.mock.spec";

/**
 * Mock methods designed to replace native calls to capacitor api
 * Individual tests can also spy on these methods and replace with their own return objects
 *
 * This requires test code to call LocalNotification api via an intermediate variable,
 * as the native api uses proxy objects that cannot be directly mocked
 */
export class MockCapacitorLocalNotifications implements Partial<LocalNotificationsPlugin> {
  async checkPermissions() {
    return { display: "granted" as PermissionState };
  }
  async requestPermissions() {
    return { display: "granted" as PermissionState };
  }
  async schedule(options: ScheduleOptions) {
    return { notifications: [] };
  }
  async getPending() {
    return { notifications: [] };
  }

  async cancel(options: CancelOptions) {
    return;
  }
}

const mockNotificationDefaults: IAppConfig["NOTIFICATION_DEFAULTS"] = {
  title: "Default Title",
  text: "Default Text",
  time: { hour: 0, minute: 0 },
};

const mockAppConfig: Partial<IAppConfig> = {
  NOTIFICATION_DEFAULTS: mockNotificationDefaults,
};

const validNotification: INotification = {
  id: "test-notification",
  schedule_at: new Date(Date.now() + 60000).toISOString(), // 1 minute from now
  title: "Test Title",
  text: "Test Text",
};
const validNotificationInternal: INotificationInternal = {
  body: validNotification.text,
  id: 12345,
  extra: { source: "action", id: validNotification.id },
  title: validNotification.title,
  schedule: {
    at: new Date(validNotification.schedule_at),
  },
};

/**
 * Call standalone tests via:
 * yarn ng test --include src\app\feature\notification\notification.service.spec.ts
 */
describe("NotificationService", () => {
  let service: NotificationService;
  let mockLocalStorageService: jasmine.SpyObj<LocalStorageService>;
  let mockAppConfigService: jasmine.SpyObj<AppConfigService>;
  let mockDynamicDataService: jasmine.SpyObj<DynamicDataService>;

  let scheduleSpy: jasmine.Spy<(typeof LocalNotifications)["schedule"]>;

  beforeEach(async () => {
    // Create spy objects
    mockLocalStorageService = jasmine.createSpyObj("LocalStorageService", ["setProtected"]);
    mockAppConfigService = jasmine.createSpyObj("AppConfigService", ["appConfig"]);
    mockDynamicDataService = jasmine.createSpyObj("DynamicDataService", [
      "upsert",
      "remove",
      "resetFlow",
      "query$",
    ]);

    // Setup default return values
    mockAppConfigService.appConfig.and.returnValue(mockAppConfig as IAppConfig);
    mockDynamicDataService.query$.and.returnValue(of([]));

    TestBed.configureTestingModule({
      providers: [
        { provide: LocalStorageService, useValue: mockLocalStorageService },
        { provide: AppConfigService, useValue: mockAppConfigService },
        { provide: DynamicDataService, useValue: mockDynamicDataService },
        { provide: CapacitorEventService, useValue: MockCapacitorEventService },
      ],
    });

    service = TestBed.inject(NotificationService);

    // Replace localnotification api with mock
    service["api"] = new MockCapacitorLocalNotifications() as any as LocalNotificationsPlugin;

    // Create shared schedule spy as used in most other tests
    scheduleSpy = spyOn(service["api"], "schedule").and.resolveTo({ notifications: [] });
  });

  it("should be created", () => {
    expect(service).toBeTruthy();
  });

  it("should set permission status to local storage", async () => {
    await service["checkPermissions"]();
    expect(mockLocalStorageService.setProtected).toHaveBeenCalled();
  });

  describe("scheduleNotification", () => {
    it("should schedule a valid notification", async () => {
      await service.scheduleNotification(validNotification);

      expect(scheduleSpy).toHaveBeenCalledOnceWith({
        notifications: [
          jasmine.objectContaining({
            id: jasmine.any(Number),
            extra: { id: validNotification.id, source: "action" },
          }),
        ],
      });

      expect(mockDynamicDataService.upsert).toHaveBeenCalledWith(
        "data_list",
        "_notifications",
        jasmine.objectContaining({
          id: validNotification.id,
          _internal_id: jasmine.any(Number),
        })
      );
    });

    it("should use default title and text when not provided", async () => {
      const notificationWithoutDefaults: INotification = {
        id: "test-notification",
        schedule_at: new Date(Date.now() + 60000).toISOString(),
      };

      await service.scheduleNotification(notificationWithoutDefaults);
      expect(scheduleSpy).toHaveBeenCalledWith({
        notifications: [
          jasmine.objectContaining({
            title: mockNotificationDefaults.title,
            body: mockNotificationDefaults.text,
          }),
        ],
      });
    });

    it("should cancel existing notification with same id before scheduling new one", async () => {
      const existingNotification: IDBNotification = {
        ...validNotification,
        status: "pending",
        _internal_id: 12345,
      };
      mockDynamicDataService.query$.and.returnValue(of([existingNotification]));

      const cancelSpy = spyOn(service["api"], "cancel").and.resolveTo();

      await service.scheduleNotification(validNotification);

      expect(cancelSpy).toHaveBeenCalledWith({
        notifications: [{ id: 12345 }],
      });
    });

    it("should not schedule notification without id", async () => {
      const invalidNotification = {
        schedule_at: new Date(Date.now() + 60000).toISOString(),
        title: "Test",
      } as INotification;
      const consoleWarnSpy = spyOn(console, "warn");
      await service.scheduleNotification(invalidNotification);
      expect(consoleWarnSpy).toHaveBeenCalledOnceWith(
        "[Notification]",
        "id not specified",
        "cannot create"
      );
      expect(scheduleSpy).not.toHaveBeenCalled();
    });

    it("should not schedule notification without schedule_at", async () => {
      const invalidNotification = {
        id: "test",
        title: "Test",
      } as INotification;
      const consoleWarnSpy = spyOn(console, "warn");
      await service.scheduleNotification(invalidNotification);
      expect(consoleWarnSpy).toHaveBeenCalledOnceWith(
        "[Notification]",
        "schedule_at not specified",
        "cannot create"
      );
      expect(scheduleSpy).not.toHaveBeenCalled();
    });

    it("should not schedule notification with past schedule_at", async () => {
      const invalidNotification: INotification = {
        id: "test",
        schedule_at: new Date(Date.now() - 60000).toISOString(), // 1 minute ago
        title: "Test",
        text: "test text",
      };
      const consoleWarnSpy = spyOn(console, "warn");
      await service.scheduleNotification(invalidNotification);
      expect(consoleWarnSpy).toHaveBeenCalled();
      expect(scheduleSpy).not.toHaveBeenCalled();
    });

    it("should handle native scheduling errors and rollback", async () => {
      // replace schedule spay
      service["api"].schedule = jasmine.createSpy().and.throwError("Native api schedule error");

      spyOn(service, "cancelNotification").and.resolveTo();
      const consoleErrorSpy = spyOn(console, "error");
      await service.scheduleNotification(validNotification);
      expect(consoleErrorSpy).toHaveBeenCalledOnceWith(
        "[Notification]",
        // Error object passed as second param
        jasmine.objectContaining({ message: "Native api schedule error" })
      );
      expect(mockDynamicDataService.upsert).not.toHaveBeenCalled();
      expect(service.cancelNotification).toHaveBeenCalledWith(validNotification.id);
    });
  });

  describe("cancelNotification", () => {
    it("should cancel existing notification", async () => {
      const existingNotification: IDBNotification = {
        id: "test-notification",
        schedule_at: new Date(Date.now() + 60000).toISOString(),
        status: "pending",
        _internal_id: 12345,
      };
      mockDynamicDataService.query$.and.returnValue(of([existingNotification]));

      const cancelSpy = spyOn(service["api"], "cancel").and.resolveTo();

      await service.cancelNotification("test-notification");

      expect(cancelSpy).toHaveBeenCalledWith({
        notifications: [{ id: 12345 }],
      });
      expect(mockDynamicDataService.remove).toHaveBeenCalledWith("data_list", "_notifications", [
        "test-notification",
      ]);
    });

    it("should do nothing when notification does not exist", async () => {
      mockDynamicDataService.query$.and.returnValue(of([]));

      const cancelSpy = spyOn(service["api"], "cancel").and.resolveTo();

      await service.cancelNotification("non-existent");

      expect(cancelSpy).not.toHaveBeenCalled();
      expect(mockDynamicDataService.remove).not.toHaveBeenCalled();
    });
  });

  describe("cancelAll", () => {
    it("should cancel all notifications", async () => {
      const pendingNotifications = [{ id: 1 }, { id: 2 }];
      spyOn(service["api"], "getPending").and.resolveTo({
        notifications: pendingNotifications as any,
      });
      const cancelSpy = spyOn(service["api"], "cancel").and.resolveTo();

      await service.cancelAll();

      expect(cancelSpy).toHaveBeenCalledWith({
        notifications: pendingNotifications,
      });
      expect(mockDynamicDataService.resetFlow).toHaveBeenCalledWith("data_list", "_notifications");
    });
  });

  describe("permission validation", () => {
    it("should reject scheduling when permissions are unsupported", async () => {
      const consoleWarnSpy = spyOn(console, "warn");
      spyOn(service["api"], "checkPermissions").and.resolveTo({
        display: "denied" as PermissionState,
      });
      spyOn(service["api"], "requestPermissions").and.resolveTo({
        display: "denied" as PermissionState,
      });
      await service.scheduleNotification(validNotification);
      expect(consoleWarnSpy).toHaveBeenCalledOnceWith(
        "[Notification]",
        "denied by user permission",
        "cannot create"
      );
      expect(scheduleSpy).not.toHaveBeenCalled();
    });

    it("should request permission when not granted and proceed if granted", async () => {
      spyOn(service["api"], "checkPermissions").and.resolveTo({
        display: "prompt" as PermissionState,
      });
      const requestPermissionsSpy = spyOn(service["api"], "requestPermissions").and.resolveTo({
        display: "granted" as PermissionState,
      });

      const notification: INotification = {
        id: "test",
        schedule_at: new Date(Date.now() + 60000).toISOString(),
      };

      await service.scheduleNotification(notification);

      expect(requestPermissionsSpy).toHaveBeenCalled();
      expect(scheduleSpy).toHaveBeenCalled();
    });
  });

  describe("web platform specific behavior", () => {
    it("should reschedule pending notifications on web platform", async () => {
      const serviceScheduleSpy = spyOn(service, "scheduleNotification");
      const futureDate = new Date(Date.now() + 60000).toISOString();
      const pendingNotification: IDBNotification = {
        ...validNotification,
        schedule_at: futureDate,
        status: "pending",
        _internal_id: 12345,
      };
      mockDynamicDataService.query$.and.returnValue(of([pendingNotification]));
      // will automatically be triggered by effect but call manually to ensure processed
      await service["recheckScheduledNotifications"]();
      expect(serviceScheduleSpy).toHaveBeenCalledWith(pendingNotification);
    });
  });

  describe("notification interaction", () => {
    xit("automatically updates notifications db on app start and when resumed from background", async () => {
      // TODO - hard to mock app lifecycle but present in code
    });
    it("marks notifications as dismissed if received while app in foreground", async () => {
      const pastDate = new Date(Date.now() - 60000).toISOString();
      const pendingNotification: IDBNotification = {
        ...validNotification,
        schedule_at: pastDate,
        status: "pending",
        _internal_id: 12345,
      };
      mockDynamicDataService.query$.and.returnValue(of([pendingNotification]));
      // NOTE - hard to mock specific notification listener so just trigger
      await service["handleNotificationReceived"](validNotificationInternal);
      expect(mockDynamicDataService.upsert).toHaveBeenCalledOnceWith(
        "data_list",
        "_notifications",
        jasmine.objectContaining({
          id: validNotification.id,
          status: "dismissed",
        })
      );
    });
    it("marks notifications as interacted if notified from native", async () => {
      const pastDate = new Date(Date.now() - 60000).toISOString();
      const pendingNotification: IDBNotification = {
        ...validNotification,
        schedule_at: pastDate,
        status: "pending",
        _internal_id: 12345,
      };
      mockDynamicDataService.query$.and.returnValue(of([pendingNotification]));
      // NOTE - hard to mock specific notification listener so just trigger
      await service["handleNotificationAction"]("tap", validNotificationInternal);
      expect(mockDynamicDataService.upsert).toHaveBeenCalledOnceWith(
        "data_list",
        "_notifications",
        jasmine.objectContaining({
          id: validNotification.id,
          status: "interacted",
          action_performed: {
            timestamp: jasmine.any(String), // timestamp generated when received
            id: "tap",
          },
        })
      );
    });
  });

  describe("generateInternalNotification", () => {
    it("should generate internal notification with correct structure", async () => {
      const notification: INotification = {
        id: "test-notification",
        schedule_at: new Date(Date.now() + 60000).toISOString(),
        title: "Test Title",
        text: "Test Text",
      };
      await service.scheduleNotification(notification);
      expect(scheduleSpy).toHaveBeenCalledOnceWith({
        notifications: [
          jasmine.objectContaining({
            title: "Test Title",
            body: "Test Text",
            schedule: { at: jasmine.any(Date) },
            id: jasmine.any(Number),
            extra: { id: "test-notification", source: "action" },
          }),
        ],
      });
    });
  });
});
