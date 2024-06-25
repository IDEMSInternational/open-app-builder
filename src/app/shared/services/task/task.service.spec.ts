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
import { _wait } from "packages/shared/src/utils/async-utils";

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
  let fetchTaskRowSpy: jasmine.Spy<jasmine.Func>;
  let fetchTaskRowsSpy: jasmine.Spy<jasmine.Func>;

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
            ready: async () => {
              return true;
            },
            scheduleCampaignNotifications: scheduleCampaignNotificationsSpy,
          },
        },
      ],
    });
    service = TestBed.inject(TaskService);

    fetchTaskRowSpy = spyOn<TaskService, any>(service, "fetchTaskRow").and.callFake(
      (dataListName, rowId) => {
        if (rowId === "validRowId") {
          return Promise.resolve({
            completed: false,
            task_child: "childDataList",
            completed_field: "completed_field",
          });
        }
        return Promise.resolve(null);
      }
    );

    fetchTaskRowsSpy = spyOn<TaskService, any>(service, "fetchTaskRows").and.callFake(
      (dataListName) => {
        if (dataListName === "childDataList") {
          return Promise.resolve([{ completed: true }, { completed: true }]);
        }
        return Promise.resolve([]);
      }
    );

    spyOn<TaskService, any>(service, "setTaskCompletion").and.resolveTo(true);
  });

  it("should be created", () => {
    expect(service).toBeTruthy();
  });
  it("enables service via app config", async () => {
    await service.ready();
    expect(service.tasksFeatureEnabled).toEqual(true);
  });
  it("can get task group data rows", async () => {
    await service.ready();
    expect(await service.getTaskGroupDataRows(taskGroupsListName)).toEqual(
      MOCK_DATA.data_list[taskGroupsListName].rows
    );
  });
  it("can get highlighted task group (set to highest priority task group on init)", async () => {
    await service.ready();
    expect(service.getHighlightedTaskGroup()).toBe(
      MOCK_DATA.data_list[taskGroupsListName].rows[0].id
    );
  });
  it("can get highlighted task group index", async () => {
    await service.ready();
    expect(await service.getHighlightedTaskGroupIndex(taskGroupsListName)).toBe(0);
  });
  it("evaluates highlighted task group correctly after init", async () => {
    await service.ready();
    expect(service.evaluateHighlightedTaskGroup().previousHighlightedTaskGroup).toBe(
      MOCK_DATA.data_list[taskGroupsListName].rows[0].id
    );
    expect(service.evaluateHighlightedTaskGroup().newHighlightedTaskGroup).toBe(
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
  it("can set a task group's completed status", async () => {
    await service.ready();
    await service.setTaskGroupCompletedField(
      MOCK_DATA.data_list[taskGroupsListName].rows[0].completed_field,
      true
    );
    expect(
      await mockTemplateFieldService.getField(
        MOCK_DATA.data_list[taskGroupsListName].rows[0].completed_field
      )
    ).toBe(true);
  });
  it("completing the highlighted task causes the next highest priority task to be highlighted upon re-evaluation", async () => {
    await service.ready();
    // Complete highlighted task
    await service.setTaskGroupCompletedField(
      MOCK_DATA.data_list[taskGroupsListName].rows[0].completed_field,
      true
    );
    const { previousHighlightedTaskGroup, newHighlightedTaskGroup } =
      service.evaluateHighlightedTaskGroup();
    expect(previousHighlightedTaskGroup).toBe(MOCK_DATA.data_list[taskGroupsListName].rows[0].id);
    expect(newHighlightedTaskGroup).toBe(MOCK_DATA.data_list[taskGroupsListName].rows[2].id);
  });
  it("when all tasks are completed, the highlighted task group is set to ''", async () => {
    await service.ready();
    // Complete all tasks
    await service.setTaskGroupCompletedField(
      MOCK_DATA.data_list[taskGroupsListName].rows[0].completed_field,
      true
    );
    await service.setTaskGroupCompletedField(
      MOCK_DATA.data_list[taskGroupsListName].rows[1].completed_field,
      true
    );
    await service.setTaskGroupCompletedField(
      MOCK_DATA.data_list[taskGroupsListName].rows[2].completed_field,
      true
    );
    expect(service.evaluateHighlightedTaskGroup().newHighlightedTaskGroup).toBe("");
  });
  it("schedules campaign notifications on change of highlighted task", async () => {
    await service.ready();
    // Complete highlighted task
    await service.setTaskGroupCompletedField(
      MOCK_DATA.data_list[taskGroupsListName].rows[0].completed_field,
      true
    );
    service.evaluateHighlightedTaskGroup();
    await _wait(50);
    // scheduleCampaignNotifications() should be called once on init (since the highlighted task group changes),
    // and again on the evaluation called above
    expect(scheduleCampaignNotificationsSpy).toHaveBeenCalledTimes(2);
  });

  it("evaluate task completion: should return null if taskRow is not found", async () => {
    const result = await service["evaluateTaskCompletion"]("dataList", "invalidRowId");
    expect(result).toBeNull();
  });
  it("evaluate task completion: should set parent task completion to true if all child tasks are completed", async () => {
    const result = await service["evaluateTaskCompletion"]("dataList", "validRowId");
    expect(service["setTaskCompletion"]).toHaveBeenCalledWith(
      "dataList",
      "validRowId",
      true,
      "completed_field"
    );
    expect(result).toBeTrue();
  });
  it("evaluate task completion: should set parent task completion to false if not all child tasks are completed", async () => {
    fetchTaskRowsSpy.and.resolveTo([
      { id: "a", completed: true },
      { id: "b", completed: false },
    ]);
    const result = await service["evaluateTaskCompletion"]("dataList", "validRowId");
    expect(service["setTaskCompletion"]).toHaveBeenCalledWith(
      "dataList",
      "validRowId",
      false,
      "completed_field"
    );
    expect(result).toBeFalse();
  });
  it("evaluate task completion: should log a warning if task row does not have a 'task_child' property", async () => {
    spyOn(console, "warn");
    fetchTaskRowSpy.and.resolveTo({
      completed: false,
    });
    await service["evaluateTaskCompletion"]("dataList", "validRowId");
    expect(console.warn).toHaveBeenCalledWith(
      '[TASK] evaluate - row "validRowId" in "dataList" has no child tasks to evaluate'
    );
  });
});
