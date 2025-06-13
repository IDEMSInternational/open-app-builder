import { fakeAsync, TestBed, tick } from "@angular/core/testing";
import { Capacitor, PermissionState } from "@capacitor/core";
import { LocalNotifications } from "@capacitor/local-notifications";
import { of } from "rxjs";
import { NotificationService } from "./notification.service";
import { AppConfigService } from "src/app/shared/services/app-config/app-config.service";
import { DynamicDataService } from "src/app/shared/services/dynamic-data/dynamic-data.service";
import { LocalStorageService } from "src/app/shared/services/local-storage/local-storage.service";
import { INotification, IDBNotification } from "./notification.types";
import { IAppConfig } from "data-models/appConfig";

/**
 * Call standalone tests via:
 * yarn ng test --include src\app\feature\notification\notification.service.spec.ts
 */
describe("NotificationService", () => {
  let service: NotificationService;
  let mockLocalStorageService: jasmine.SpyObj<LocalStorageService>;
  let mockAppConfigService: jasmine.SpyObj<AppConfigService>;
  let mockDynamicDataService: jasmine.SpyObj<DynamicDataService>;

  const mockNotificationDefaults: IAppConfig["NOTIFICATION_DEFAULTS"] = {
    title: "Default Title",
    text: "Default Text",
    time: { hour: 0, minute: 0 },
  };

  const mockAppConfig: Partial<IAppConfig> = {
    NOTIFICATION_DEFAULTS: mockNotificationDefaults,
  };

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

    // Spy on Capacitor methods
    spyOn(Capacitor, "isNativePlatform").and.returnValue(true);
    spyOn(LocalNotifications, "checkPermissions").and.resolveTo({
      display: "granted" as PermissionState,
    });
    spyOn(LocalNotifications, "requestPermissions").and.resolveTo({
      display: "granted" as PermissionState,
    });
    spyOn(LocalNotifications, "schedule").and.resolveTo({ notifications: [] });
    spyOn(LocalNotifications, "cancel").and.resolveTo();
    spyOn(LocalNotifications, "getPending").and.resolveTo({ notifications: [] });

    TestBed.configureTestingModule({
      providers: [
        NotificationService,
        { provide: LocalStorageService, useValue: mockLocalStorageService },
        { provide: AppConfigService, useValue: mockAppConfigService },
        { provide: DynamicDataService, useValue: mockDynamicDataService },
      ],
    });

    service = TestBed.inject(NotificationService);
  });

  afterEach(() => {
    // Clean up any global spies
    if ((window as any).Notification) {
      delete (window as any).Notification;
    }
  });

  describe("constructor and initialization", () => {
    it("should be created", () => {
      expect(service).toBeTruthy();
    });

    it("should check permissions on initialization", () => {
      expect(LocalNotifications.checkPermissions).toHaveBeenCalled();
    });

    it("should set permission status to local storage", fakeAsync(() => {
      tick(); // Allow effect to run
      expect(mockLocalStorageService.setProtected).toHaveBeenCalledWith(
        "NOTIFICATION_PERMISSION_STATUS",
        "granted"
      );
    }));
  });

  describe("checkPermissions", () => {
    it("should set permission status to unsupported on web when Notification API unavailable", async () => {
      (Capacitor.isNativePlatform as jasmine.Spy).and.returnValue(false);
      // Don't set window.Notification to simulate unsupported browser

      // Recreate service to trigger constructor
      service = TestBed.inject(NotificationService);

      await new Promise((resolve) => setTimeout(resolve, 0)); // Allow async initialization

      expect(mockLocalStorageService.setProtected).toHaveBeenCalledWith(
        "NOTIFICATION_PERMISSION_STATUS",
        "unsupported"
      );
    });

    it("should check permissions on web when Notification API is available", async () => {
      (Capacitor.isNativePlatform as jasmine.Spy).and.returnValue(false);
      (window as any).Notification = {}; // Mock Notification API availability

      // Recreate service to trigger constructor
      service = TestBed.inject(NotificationService);

      expect(LocalNotifications.checkPermissions).toHaveBeenCalled();
    });
  });

  describe("requestPermission", () => {
    it("should request permissions and update status", async () => {
      const result = await service.requestPermission();

      expect(LocalNotifications.requestPermissions).toHaveBeenCalled();
      expect(result).toBe("granted");
    });

    it("should handle denied permissions", async () => {
      (LocalNotifications.requestPermissions as jasmine.Spy).and.resolveTo({
        display: "denied" as PermissionState,
      });

      const result = await service.requestPermission();

      expect(result).toBe("denied");
    });
  });

  describe("scheduleNotification", () => {
    const validNotification: INotification = {
      id: "test-notification",
      schedule_at: new Date(Date.now() + 60000).toISOString(), // 1 minute from now
      title: "Test Title",
      text: "Test Text",
    };

    beforeEach(() => {
      mockDynamicDataService.query$.and.returnValue(of([])); // No existing notification
    });

    it("should schedule a valid notification", async () => {
      await service.scheduleNotification(validNotification);

      expect(LocalNotifications.schedule).toHaveBeenCalled();
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

      const scheduleCall = (LocalNotifications.schedule as jasmine.Spy).calls.mostRecent();
      const scheduledNotification = scheduleCall.args[0].notifications[0];

      expect(scheduledNotification.title).toBe(mockNotificationDefaults.title);
      expect(scheduledNotification.body).toBe(mockNotificationDefaults.text);
    });

    it("should cancel existing notification with same id before scheduling new one", async () => {
      const existingNotification: IDBNotification = {
        ...validNotification,
        _internal_id: 12345,
      };
      mockDynamicDataService.query$.and.returnValue(of([existingNotification]));

      await service.scheduleNotification(validNotification);

      expect(LocalNotifications.cancel).toHaveBeenCalledWith({
        notifications: [{ id: 12345 }],
      });
    });

    it("should not schedule notification without id", async () => {
      const invalidNotification = {
        schedule_at: new Date(Date.now() + 60000).toISOString(),
        title: "Test",
      } as INotification;

      spyOn(console, "warn");
      await service.scheduleNotification(invalidNotification);

      expect(console.warn).toHaveBeenCalled();
      expect(LocalNotifications.schedule).not.toHaveBeenCalled();
    });

    it("should not schedule notification without schedule_at", async () => {
      const invalidNotification = {
        id: "test",
        title: "Test",
      } as INotification;

      spyOn(console, "warn");
      await service.scheduleNotification(invalidNotification);

      expect(console.warn).toHaveBeenCalled();
      expect(LocalNotifications.schedule).not.toHaveBeenCalled();
    });

    it("should not schedule notification with past schedule_at", async () => {
      const invalidNotification: INotification = {
        id: "test",
        schedule_at: new Date(Date.now() - 60000).toISOString(), // 1 minute ago
        title: "Test",
        text: "test text",
      };

      spyOn(console, "warn");
      await service.scheduleNotification(invalidNotification);

      expect(console.warn).toHaveBeenCalled();
      expect(LocalNotifications.schedule).not.toHaveBeenCalled();
    });

    it("should handle scheduling errors and rollback", async () => {
      (LocalNotifications.schedule as jasmine.Spy).and.rejectWith(new Error("Scheduling failed"));
      spyOn(console, "error");
      spyOn(service, "cancelNotification");

      await service.scheduleNotification(validNotification);

      expect(console.error).toHaveBeenCalled();
      expect(service.cancelNotification).toHaveBeenCalledWith(validNotification.id);
    });
  });

  describe("cancelNotification", () => {
    it("should cancel existing notification", async () => {
      const existingNotification: IDBNotification = {
        id: "test-notification",
        schedule_at: new Date(Date.now() + 60000).toISOString(),
        _internal_id: 12345,
      };
      mockDynamicDataService.query$.and.returnValue(of([existingNotification]));

      await service.cancelNotification("test-notification");

      expect(LocalNotifications.cancel).toHaveBeenCalledWith({
        notifications: [{ id: 12345 }],
      });
      expect(mockDynamicDataService.remove).toHaveBeenCalledWith("data_list", "_notifications", [
        "test-notification",
      ]);
    });

    it("should do nothing when notification does not exist", async () => {
      mockDynamicDataService.query$.and.returnValue(of([]));

      await service.cancelNotification("non-existent");

      expect(LocalNotifications.cancel).not.toHaveBeenCalled();
      expect(mockDynamicDataService.remove).not.toHaveBeenCalled();
    });
  });

  describe("cancelAll", () => {
    it("should cancel all notifications", async () => {
      const pendingNotifications = [{ id: 1 }, { id: 2 }];
      (LocalNotifications.getPending as jasmine.Spy).and.resolveTo({
        notifications: pendingNotifications,
      });

      await service.cancelAll();

      expect(LocalNotifications.cancel).toHaveBeenCalledWith({
        notifications: pendingNotifications,
      });
      expect(mockDynamicDataService.resetFlow).toHaveBeenCalledWith("data_list", "_notifications");
    });
  });

  describe("permission validation", () => {
    it("should reject scheduling when permissions are unsupported", async () => {
      // Simulate unsupported permissions
      (LocalNotifications.checkPermissions as jasmine.Spy).and.resolveTo({
        display: "denied" as PermissionState,
      });
      (Capacitor.isNativePlatform as jasmine.Spy).and.returnValue(false);

      // Recreate service with unsupported permissions
      service = TestBed.inject(NotificationService);

      const notification: INotification = {
        id: "test",
        schedule_at: new Date(Date.now() + 60000).toISOString(),
      };

      spyOn(console, "warn");
      await service.scheduleNotification(notification);

      expect(console.warn).toHaveBeenCalled();
      expect(LocalNotifications.schedule).not.toHaveBeenCalled();
    });

    it("should request permission when not granted and proceed if granted", async () => {
      // Start with prompt permission state
      (LocalNotifications.checkPermissions as jasmine.Spy).and.resolveTo({
        display: "prompt" as PermissionState,
      });
      (LocalNotifications.requestPermissions as jasmine.Spy).and.resolveTo({
        display: "granted" as PermissionState,
      });

      const notification: INotification = {
        id: "test",
        schedule_at: new Date(Date.now() + 60000).toISOString(),
      };

      await service.scheduleNotification(notification);

      expect(LocalNotifications.requestPermissions).toHaveBeenCalled();
      expect(LocalNotifications.schedule).toHaveBeenCalled();
    });
  });

  describe("web platform specific behavior", () => {
    beforeEach(() => {
      (Capacitor.isNativePlatform as jasmine.Spy).and.returnValue(false);
      (window as any).Notification = {}; // Mock Notification API
    });

    it("should reschedule pending notifications on web platform when permissions granted", async () => {
      const futureDate = new Date(Date.now() + 60000).toISOString();
      const pendingNotifications: IDBNotification[] = [
        {
          id: "test1",
          schedule_at: futureDate,
          _internal_id: 1,
        },
      ];

      mockDynamicDataService.query$.and.returnValue(of(pendingNotifications));
      spyOn(service, "scheduleNotification").and.resolveTo();

      // Recreate service to trigger constructor and permission check
      service = TestBed.inject(NotificationService);

      // Wait for async operations
      await new Promise((resolve) => setTimeout(resolve, 0));

      expect(service.scheduleNotification).toHaveBeenCalledWith(
        jasmine.objectContaining({ id: "test1" })
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

      const scheduleCall = (LocalNotifications.schedule as jasmine.Spy).calls.mostRecent();
      const internalNotification = scheduleCall.args[0].notifications[0];

      expect(internalNotification).toEqual(
        jasmine.objectContaining({
          title: "Test Title",
          body: "Test Text",
          schedule: { at: jasmine.any(Date) },
          id: jasmine.any(Number),
          extra: { id: "test-notification" },
        })
      );

      // Verify ID is within valid range
      expect(internalNotification.id).toBeGreaterThan(0);
      expect(internalNotification.id).toBeLessThanOrEqual(2147483647);
    });
  });
});
