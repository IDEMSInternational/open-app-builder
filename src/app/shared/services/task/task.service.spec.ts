import { TestBed } from "@angular/core/testing";
import { HttpClientTestingModule } from "@angular/common/http/testing";
import clone from "clone";

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
const highlightedTaskFieldName = "_task_highlighted_group_id";

const taskGroupsListName = "mock_task_groups_data";

const MOCK_FIELDS = {
  [highlightedTaskFieldName]: "_placeholder",
};

const MOCK_CONFIG = {
  TASKS: {
    highlightedTaskField: highlightedTaskFieldName,
    taskGroupsListName,
    enabled: true,
  },
} as Partial<IAppConfig>;

const MOCK_DATA: Partial<IAppDataCache> = {
  data_list: {
    mock_task_groups_data: {
      flow_type: "data_list",
      flow_name: taskGroupsListName,
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

// Define at this namespace to allow tests to call methods to update fields.
let mockTemplateFieldService: MockTemplateFieldService;

/**
 * Call standalone tests via:
 * yarn ng test --include src/app/shared/services/task/task.service.spec.ts
 */
describe("TaskService", () => {
  let service: TaskService;
  let scheduleCampaignNotificationsSpy: jasmine.Spy<jasmine.Func>;

  beforeEach(async () => {
    scheduleCampaignNotificationsSpy = jasmine.createSpy();
    // Clone MOCK_FIELDS data so that updates do not persist between tests
    mockTemplateFieldService = new MockTemplateFieldService(clone(MOCK_FIELDS));

    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        {
          provide: TemplateFieldService,
          useValue: mockTemplateFieldService,
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
  it("Initial highlighted task is set to first in list", async () => {
    await service.ready();
    expect(service.evaluateHighlightedTaskGroup().newHighlightedTaskGroup).toBe(
      MOCK_DATA.data_list[taskGroupsListName].rows[0].id
    );
  });
  it("Highlighted task field is updated correctly", async () => {
    await service.ready();
    expect(service.getHighlightedTaskGroup()).toBe(
      MOCK_DATA.data_list[taskGroupsListName].rows[0].id
    );
  });
  it("checking whether a task group is highlighted returns the correct value", async () => {
    await service.ready();
    expect(
      service.checkHighlightedTaskGroup(MOCK_DATA.data_list[taskGroupsListName].rows[1].id)
    ).toBe(false);
    expect(
      service.checkHighlightedTaskGroup(MOCK_DATA.data_list[taskGroupsListName].rows[0].id)
    ).toBe(true);
  });
  it("completing a task causes the next highest priority task to be made the highlighted one upon re-evaluation", async () => {
    await service.ready();
    mockTemplateFieldService.setField(
      MOCK_DATA.data_list[taskGroupsListName].rows[0].completed_field,
      "true"
    );
    expect(service.evaluateHighlightedTaskGroup().previousHighlightedTaskGroup).toBe(
      MOCK_DATA.data_list[taskGroupsListName].rows[0].id
    );
    expect(service.evaluateHighlightedTaskGroup().newHighlightedTaskGroup).toBe(
      MOCK_DATA.data_list[taskGroupsListName].rows[2].id
    );
  });

  // TODO - test if campaign service mock functions as intended
  // it("schedules campaign notifications on change of highlighted task", async () => {
  //   await service.ready();
  //   // Update task group
  //   // service.setHighlightedTaskGroup(MOCK_DATA.data_list[taskGroupsListName].rows[1].id)
  //   // await service.evaluateTaskGroupData(MOCK_DATA.data_list.mock_task_groups_data.rows, {
  //   //   completedColumnName: "",
  //   //   completedField: "",
  //   //   completedFieldColumnName: "",
  //   //   dataListName: "",
  //   //   useDynamicData: false,
  //   // });
  //   // expect(scheduleCampaignNotificationsSpy).toHaveBeenCalledTimes(1);
  // });
  // TODO: test setHighlightedTaskGroup
  // it("setting...", async () => {
  //   await service.ready();
  //   service.setHighlightedTaskGroup(MOCK_DATA.data_list[taskGroupsListName].rows[1].id);
  // });
});
