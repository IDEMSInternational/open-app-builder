import { TestBed } from "@angular/core/testing";
import { provideHttpClient, withInterceptorsFromDi } from "@angular/common/http";
import { provideHttpClientTesting } from "@angular/common/http/testing";
import { FlowTypes } from "packages/data-models";
import { UserMetaService } from "./userMeta.service";
import { MockDynamicDataService } from "../dynamic-data/dynamic-data.service.mock.spec";
import { DynamicDataService } from "../dynamic-data/dynamic-data.service";
import { MockLocalStorageService } from "../local-storage/local-storage.service.mock.spec";
import { MockDbService } from "../db/db.service.mock.spec";
import { MockAppDataService } from "../data/app-data.service.mock.spec";
import { MockDeploymentService } from "../deployment/deployment.service.mock.spec";
import { TemplateActionRegistry } from "../../components/template/services/instance/template-action.registry";
import { TemplateFieldService } from "../../components/template/services/template-field.service";

describe("UserMetaService", () => {
  let service: UserMetaService;
  let mockDynamicDataService: MockDynamicDataService;
  let mockLocalStorageService: MockLocalStorageService;
  let mockDbService: MockDbService;
  let mockAppDataService: MockAppDataService;
  let mockDeploymentService: MockDeploymentService;
  let mockTemplateActionRegistry: jasmine.SpyObj<TemplateActionRegistry>;
  let mockTemplateFieldService: jasmine.SpyObj<TemplateFieldService>;

  beforeEach(() => {
    // Initialize mock services
    mockLocalStorageService = new MockLocalStorageService();
    mockDbService = new MockDbService();
    mockAppDataService = new MockAppDataService();
    mockDeploymentService = new MockDeploymentService();
    mockTemplateActionRegistry = jasmine.createSpyObj("TemplateActionRegistry", ["register"]);
    mockTemplateFieldService = jasmine.createSpyObj("TemplateFieldService", ["ready"]);

    // Initialize mock dynamic data service with test data
    mockDynamicDataService = new MockDynamicDataService({
      data_list: {
        test_flow: [
          { id: "existing_1", name: "Existing Item 1", value: "existing_value_1" },
          { id: "existing_2", name: "Existing Item 2", value: "existing_value_2" },
        ],
      },
    });

    TestBed.configureTestingModule({
      providers: [
        UserMetaService,
        provideHttpClient(withInterceptorsFromDi()),
        provideHttpClientTesting(),
        { provide: DynamicDataService, useValue: mockDynamicDataService },
        { provide: "LocalStorageService", useValue: mockLocalStorageService },
        { provide: "DbService", useValue: mockDbService },
        { provide: "AppDataService", useValue: mockAppDataService },
        { provide: "DeploymentService", useValue: mockDeploymentService },
        { provide: TemplateActionRegistry, useValue: mockTemplateActionRegistry },
        { provide: TemplateFieldService, useValue: mockTemplateFieldService },
      ],
    });

    service = TestBed.inject(UserMetaService);
  });

  describe("importUserDynamicData", () => {
    it("should reset all dynamic data before importing", async () => {
      // Setup spies
      spyOn(mockDynamicDataService, "resetAll").and.returnValue(Promise.resolve());
      spyOn(mockDynamicDataService, "snapshot").and.returnValue(Promise.resolve([]));
      spyOn(mockDynamicDataService, "bulkUpsert").and.returnValue(Promise.resolve());
      spyOn(mockDynamicDataService, "getState").and.returnValue(Promise.resolve({}));

      const dynamicData = {
        data_list: {
          test_flow: {
            new_1: { name: "New Item 1", value: "new_value_1" },
            new_2: { name: "New Item 2", value: "new_value_2" },
          },
        },
      };

      await (service as any).importUserDynamicData(dynamicData);

      expect(mockDynamicDataService.resetAll).toHaveBeenCalled();
    });

    it("should handle empty dynamic data gracefully", async () => {
      spyOn(mockDynamicDataService, "resetAll").and.returnValue(Promise.resolve());
      spyOn(mockDynamicDataService, "getState").and.returnValue(Promise.resolve({}));

      await (service as any).importUserDynamicData(undefined);

      expect(mockDynamicDataService.resetAll).toHaveBeenCalled();
      // getState() should not be called when dynamic_data is undefined due to early return
      expect(mockDynamicDataService.getState).not.toHaveBeenCalled();
    });

    it("should merge existing data with imported data", async () => {
      spyOn(mockDynamicDataService, "resetAll").and.returnValue(Promise.resolve());
      spyOn(mockDynamicDataService, "snapshot").and.returnValue(
        Promise.resolve([
          { id: "existing_1", name: "Existing Item 1", value: "existing_value_1" },
          { id: "existing_2", name: "Existing Item 2", value: "existing_value_2" },
        ])
      );
      spyOn(mockDynamicDataService, "bulkUpsert").and.returnValue(Promise.resolve());
      spyOn(mockDynamicDataService, "getState").and.returnValue(Promise.resolve({}));

      const dynamicData = {
        data_list: {
          test_flow: {
            existing_1: { name: "Updated Item 1", value: "updated_value_1" },
            new_1: { name: "New Item 1", value: "new_value_1" },
          },
        },
      };

      await (service as any).importUserDynamicData(dynamicData);

      expect(mockDynamicDataService.snapshot).toHaveBeenCalledWith("data_list", "test_flow");
      expect(mockDynamicDataService.bulkUpsert).toHaveBeenCalledWith(
        "data_list",
        "test_flow",
        jasmine.arrayContaining([
          jasmine.objectContaining({
            id: "existing_1",
            name: "Updated Item 1",
            value: "updated_value_1",
          }),
          jasmine.objectContaining({
            id: "new_1",
            name: "New Item 1",
            value: "new_value_1",
          }),
        ])
      );
    });

    it("should skip empty entry arrays", async () => {
      spyOn(mockDynamicDataService, "resetAll").and.returnValue(Promise.resolve());
      spyOn(mockDynamicDataService, "bulkUpsert").and.returnValue(Promise.resolve());
      spyOn(mockDynamicDataService, "getState").and.returnValue(Promise.resolve({}));

      const dynamicData = {
        data_list: {
          empty_flow: {},
          populated_flow: {
            item1: { name: "Item 1", value: "value_1" },
          },
        },
      };

      await (service as any).importUserDynamicData(dynamicData);

      expect(mockDynamicDataService.bulkUpsert).toHaveBeenCalledTimes(1);
      expect(mockDynamicDataService.bulkUpsert).toHaveBeenCalledWith(
        "data_list",
        "populated_flow",
        jasmine.arrayContaining([
          jasmine.objectContaining({ id: "item1", name: "Item 1", value: "value_1" }),
        ])
      );
    });

    it("should call getState to ensure all writes are persisted", async () => {
      spyOn(mockDynamicDataService, "resetAll").and.returnValue(Promise.resolve());
      spyOn(mockDynamicDataService, "snapshot").and.returnValue(Promise.resolve([]));
      spyOn(mockDynamicDataService, "bulkUpsert").and.returnValue(Promise.resolve());
      spyOn(mockDynamicDataService, "getState").and.returnValue(Promise.resolve({}));

      const dynamicData = {
        data_list: {
          test_flow: {
            item1: { name: "Item 1", value: "value_1" },
          },
        },
      };

      await (service as any).importUserDynamicData(dynamicData);

      expect(mockDynamicDataService.getState).toHaveBeenCalled();
    });
  });
});
