import { TestBed } from "@angular/core/testing";

import { TaskService } from "./task.service";
import { TemplateFieldService } from "../../components/template/services/template-field.service";
import { MockTemplateFieldService } from "../../components/template/services/template-field.service.spec";
import { AppConfigService } from "../app-config/app-config.service";
import { MockAppConfigService } from "../app-config/app-config.service.spec";
import { IAppConfig } from "../../model";

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
  },
} as Partial<IAppConfig>;

/**
 * Call standalone tests via:
 * yarn ng test --include src/app/shared/services/task/task.service.spec.ts
 */
describe("TaskService", () => {
  let service: TaskService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        TaskService,
        {
          provide: TemplateFieldService,
          useValue: new MockTemplateFieldService(MOCK_FIELDS),
        },
        {
          provide: AppConfigService,
          useValue: new MockAppConfigService(MOCK_CONFIG),
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
