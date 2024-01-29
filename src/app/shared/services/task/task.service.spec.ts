import { TestBed } from "@angular/core/testing";
import { HttpClientTestingModule } from "@angular/common/http/testing";

import { IAppConfig } from "../../model";
import { TaskService } from "./task.service";

// Mock Services
import { MockTemplateFieldService } from "../../components/template/services/template-field.service.spec";
import { MockAppConfigService } from "../app-config/app-config.service.spec";
import { MockAppDataService } from "../data/app-data.service.spec";
// Mocked Services
import { AppDataService, IAppDataCache } from "../data/app-data.service";
import { AppConfigService } from "../app-config/app-config.service";
import { CampaignService } from "../../../feature/campaign/campaign.service";
import { TemplateFieldService } from "../../components/template/services/template-field.service";

// This must match the corresponding value in the deployment config, if the default value is overridden
const highlightedTaskField = "_task_highlighted_group_id" as Partial<
  IAppConfig["TASKS"]["highlightedTaskField"]
>;

const MOCK_FIELDS = {
  [highlightedTaskField]: "task_a",
};

const MOCK_CONFIG = {
  TASKS: {
    highlightedTaskField: "_task_highlighted_group_id",
    taskGroupsListName: "mock_task_groups_data",
    enabled: true,
  },
} as Partial<IAppConfig>;

const MOCK_DATA: Partial<IAppDataCache> = {
  data_list: {
    mock_task_groups_data: {
      flow_type: "data_list",
      flow_name: "mock_task_groups_data",
      data_list_name: "feat_task_groups",
      rows: [
        {
          id: "task_group_1",
          number: 1,
          title: "Task Group 1",
          completed_field: "task_group_1_completed",
        },
        {
          id: "task_group_2",
          number: 3,
          title: "Task Group 2",
          completed_field: "task_group_2_completed",
        },
        {
          id: "task_group_3",
          number: 2,
          title: "Task Group 3",
          completed_field: "task_group_3_completed",
        },
      ],
    },
  },
};

/**
 * Call standalone tests via:
 * yarn ng test --include src/app/shared/services/task/task.service.spec.ts
 */
describe("TaskService", () => {
  let service: TaskService;
  let scheduleCampaignNotificationsSpy: jasmine.Spy<jasmine.Func>;

  beforeEach(async () => {
    scheduleCampaignNotificationsSpy = jasmine.createSpy();
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        {
          provide: TemplateFieldService,
          useValue: new MockTemplateFieldService({ highlightedTaskField }),
        },
        {
          provide: AppDataService,
          useValue: new MockAppDataService(MOCK_DATA),
        },
        {
          provide: AppConfigService,
          useValue: new MockAppConfigService(MOCK_CONFIG),
        },
        // Mock single method from campaign service called
        {
          provide: CampaignService,
          useValue: {
            scheduleCampaignNotifications: scheduleCampaignNotificationsSpy,
          },
        },
      ],
    });
    service = TestBed.inject(TaskService);
  });

  it("should be created", () => {
    expect(service).toBeTruthy();
  });
  it("enables service via app config", async () => {
    await service.ready();
    expect(service.tasksFeatureEnabled).toEqual(true);
  });

  it("should return the name of the current highlighted task", async () => {
    await service.ready();
    expect(service.getHighlightedTaskGroup()).toBe("task_group_1");
  });

  // TODO - test if campaign service mock functions as intended

  // fit("schedules campaign notifications", async () => {
  //   await service.ready();
  //   await service.evaluateTaskGroupData(MOCK_DATA.data_list.mock_task_groups_data.rows, {
  //     completedColumnName: "",
  //     completedField: "",
  //     completedFieldColumnName: "",
  //     dataListName: "",
  //     useDynamicData: false,
  //   });
  //   expect(scheduleCampaignNotificationsSpy).toHaveBeenCalledTimes(1);
  // });
});
