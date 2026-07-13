import { TestBed } from "@angular/core/testing";

import { LifecycleActionsService } from "./lifecycle-actions.service";
import { AppDataService } from "../data/app-data.service";
import { TemplateVariablesService } from "../../components/template/services/template-variables.service";
import { TemplateActionService } from "../../components/template/services/instance/template-action.service";
import type { FlowTypes } from "src/app/shared/model";

/**
 * Call standalone tests via:
 * yarn ng test --include src/app/shared/services/lifecycle-actions/lifecycle-actions.service.spec.ts
 */
describe("LifecycleActionsService", () => {
  let service: LifecycleActionsService;
  let mockTemplateVariablesService: jasmine.SpyObj<TemplateVariablesService>;
  let handleActionsSpy: jasmine.Spy;

  const dynamicReference = "@global.example_value";
  const resolvedValue = "resolved_value";

  const launchActionWithDynamicReference: FlowTypes.Lifecycle_Action = {
    id: "launch_action_1",
    lifecycle_event: "app_start",
    action_list: [
      {
        trigger: "click",
        action_id: "track_event",
        args: ["@global.example_value"],
      },
    ],
  };

  beforeEach(() => {
    mockTemplateVariablesService = jasmine.createSpyObj<TemplateVariablesService>(
      "TemplateVariablesService",
      ["evaluateConditionString", "ready"]
    );
    mockTemplateVariablesService.ready.and.resolveTo();
    mockTemplateVariablesService.evaluateConditionString.and.callFake(async (value) => value);

    TestBed.configureTestingModule({
      providers: [
        LifecycleActionsService,
        {
          provide: AppDataService,
          useValue: {
            ready: () => true,
            getSheetsWithData: async () => [],
          },
        },
        { provide: TemplateVariablesService, useValue: mockTemplateVariablesService },
      ],
    });
    service = TestBed.inject(LifecycleActionsService);
    handleActionsSpy = spyOn(TemplateActionService.prototype, "handleActions").and.resolveTo();
  });

  it("should be created", () => {
    expect(service).toBeTruthy();
  });

  it("evaluates dynamic action args before running lifecycle actions", async () => {
    spyOn<any>(service, "getAllLifecycleActionsByEventType").and.resolveTo([
      launchActionWithDynamicReference,
    ]);
    mockTemplateVariablesService.evaluateConditionString
      .withArgs(dynamicReference)
      .and.resolveTo(resolvedValue);

    await service.handleLaunchActions();

    expect(handleActionsSpy).toHaveBeenCalledWith([
      jasmine.objectContaining({
        action_id: "track_event",
        args: [resolvedValue],
      }),
    ]);
  });

  it("runs static lifecycle actions without calling dynamic evaluation", async () => {
    spyOn<any>(service, "getAllLifecycleActionsByEventType").and.resolveTo([
      {
        id: "launch_action_2",
        lifecycle_event: "app_start",
        action_list: [
          {
            trigger: "click",
            action_id: "track_event",
            args: ["static_value"],
          },
        ],
      },
    ]);

    await service.handleLaunchActions();

    expect(handleActionsSpy).toHaveBeenCalledWith([
      jasmine.objectContaining({
        action_id: "track_event",
        args: ["static_value"],
      }),
    ]);
    expect(mockTemplateVariablesService.evaluateConditionString).not.toHaveBeenCalled();
  });

  it("skips lifecycle actions when conditions are not satisfied", async () => {
    spyOn<any>(service, "getAllLifecycleActionsByEventType").and.resolveTo([
      {
        id: "conditional_launch",
        lifecycle_event: "app_start",
        condition_list: ["@fields.example_flag"],
        action_list: launchActionWithDynamicReference.action_list,
      },
    ]);
    mockTemplateVariablesService.evaluateConditionString
      .withArgs("@fields.example_flag")
      .and.resolveTo(false);

    await service.handleLaunchActions();

    expect(handleActionsSpy).not.toHaveBeenCalled();
  });

  it("evaluates condition_list before running lifecycle actions", async () => {
    spyOn<any>(service, "getAllLifecycleActionsByEventType").and.resolveTo([
      {
        id: "conditional_launch",
        lifecycle_event: "app_start",
        condition_list: ["@fields.example_flag"],
        action_list: [
          {
            trigger: "click",
            action_id: "track_event",
            args: ["static_value"],
          },
        ],
      },
    ]);
    mockTemplateVariablesService.evaluateConditionString
      .withArgs("@fields.example_flag")
      .and.resolveTo(true);

    await service.handleLaunchActions();

    expect(mockTemplateVariablesService.evaluateConditionString).toHaveBeenCalledWith(
      "@fields.example_flag"
    );
    expect(handleActionsSpy).toHaveBeenCalled();
  });
});
