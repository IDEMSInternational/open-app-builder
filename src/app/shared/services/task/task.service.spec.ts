import { TestBed } from "@angular/core/testing";

import { TaskService } from "./task.service";
import {
  TemplateFieldService,
  TEMPLATE_FIELD_SERVICE_TOKEN,
} from "../../components/template/services/template-field.service";
import { HttpClientTestingModule } from "@angular/common/http/testing";
import { MockTemplateFieldService } from "../../components/template/services/template-field.service.spec";
import { AppConfigService } from "../app-config/app-config.service";
import { MockAppConfigService } from "../app-config/app-config.service.spec";
import { IAppConfig } from "../../model";
import { AppDataService, IAppDataCache, APP_DATA_SERVICE_TOKEN } from "../data/app-data.service";
import { MockAppDataService } from "../data/app-data.service.spec";
import { TemplateTranslateService } from "../../components/template/services/template-translate.service";
import { MockTemplateTranslateService } from "../../components/template/services/template-translate.service.spec";

// This must match the corresponding vallue in the deployment config, if the default value is overridden
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

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        TaskService,
        {
          provide: AppConfigService,
          useValue: new MockAppConfigService(MOCK_CONFIG),
        },
        {
          provide: TemplateFieldService,
          useValue: new MockTemplateFieldService(MOCK_FIELDS),
        },
        {
          provide: TemplateTranslateService,
          useValue: new MockTemplateTranslateService(),
        },
        {
          provide: AppDataService,
          useValue: new MockAppDataService(MOCK_DATA),
        },
      ],
    });
    service = TestBed.inject(TaskService);
  });

  it("should be created", () => {
    expect(service).toBeTruthy();
  });

  it("should return the name of the current highlighted task", () => {
    expect(service.getHighlightedTaskGroup()).toBe("task_a");
  });
});
