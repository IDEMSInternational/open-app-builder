import { TestBed } from "@angular/core/testing";

import { TemplateActionService } from "./template-action.service";
import { Injector } from "@angular/core";
import { TemplateContainerComponent } from "../../template-container.component";
import { TemplateActionRegistry } from "./template-action.registry";
import { TemplateRowService } from "./template-row.service";
import { TemplateNavService } from "../template-nav.service";

// Use a stubbed template action registry to allow registering custom actions in test
const MockTemplateActionRegistry = new TemplateActionRegistry();

// HACK - templateActionService injects child dependencies from injector
// stub all injected services with stub (can be replaced as future tests require)
const mockInjector: Injector = {
  get: (token: any) => {
    switch (token) {
      case TemplateActionRegistry:
        return MockTemplateActionRegistry;
      case TemplateNavService:
        return { handleNavActionsFromChild: () => null, isReady: () => true, ready: () => true };
      default:
        return { ready: () => true, isReady: () => true };
    }
  },
};

// use mockTemplateRowService to handle set_local test actions
class MockTemplateRowService implements Partial<TemplateRowService> {
  templateRowMap = {
    mock_row_1: { value: "", _nested_name: "mock_row_1", name: "mock_row_1", type: "" },
    mock_row_2: { value: "", _nested_name: "mock_row_2", name: "mock_row_2", type: "" },
  };
  templateRowMapValues = {
    mock_row_1: "",
    mock_row_2: "",
  };
  processRowUpdates = async () => null;
}

class MockContainer implements Partial<TemplateContainerComponent> {
  templateRowService = new MockTemplateRowService() as any as TemplateRowService;

  get templateRowMap() {
    return this.templateRowService.templateRowMap;
  }
}

/**
 * Call standalone tests via:
 * yarn ng test --include src/app/shared/components/template/services/instance/template-action.service.spec.ts
 */
describe("TemplateActionService", () => {
  let service: TemplateActionService;
  let setDataSpy: jasmine.Spy;

  beforeEach(async () => {
    TestBed.configureTestingModule({
      imports: [],
    });
    service = new TemplateActionService(
      mockInjector,
      new MockContainer() as TemplateContainerComponent
    );
    // use mock template action registry to allow for custom handlers for testing
    // allow registry override as single registry persists across actions
    setDataSpy = jasmine.createSpy("set_data");
    service["templateActionRegistry"].register(
      { set_data: async (action) => setDataSpy(action) },
      true
    );
  });

  it("should create", () => {
    expect(service).toBeTruthy();
  });

  it("set_local action", async () => {
    await service.handleActions([
      { trigger: "click", action_id: "set_local", args: ["mock_row_1", "updated"] },
    ]);
    expect(service.container.templateRowService.templateRowMap.mock_row_1.value).toEqual("updated");
    expect(service.container.templateRowService.templateRowMapValues.mock_row_1).toEqual("updated");
  });

  it("set_self action", async () => {
    await service.handleActions([
      { trigger: "click", action_id: "set_self", args: ["mock_row_1", "updated"] },
    ]);
    expect(service.container.templateRowService.templateRowMap.mock_row_1.value).toEqual("updated");
    expect(service.container.templateRowService.templateRowMapValues.mock_row_1).toEqual("updated");
  });

  it("Uses latest value for `this.value` arg from trigger row", async () => {
    const _triggeredBy = { _nested_name: "", name: "", type: "", value: "updated" };
    await service.handleActions(
      [
        {
          trigger: "click",
          action_id: "set_local",
          args: ["mock_row_2", "this.value"],
        },
      ],
      _triggeredBy
    );
    expect(service.container.templateRowService.templateRowMap.mock_row_2.value).toEqual("updated");
    expect(service.container.templateRowService.templateRowMapValues.mock_row_2).toEqual("updated");
    // also include test case of concatenated expression
    await service.handleActions(
      [
        {
          trigger: "click",
          action_id: "set_local",
          args: ["mock_row_2", "prefix_{this.value}"],
        },
      ],
      _triggeredBy
    );
    expect(service.container.templateRowService.templateRowMap.mock_row_2.value).toEqual(
      "prefix_updated"
    );
  });

  it("Uses latest value for `this.value` param", async () => {
    const _triggeredBy = { _nested_name: "", name: "", type: "", value: "updated" };
    await service.handleActions(
      [
        { trigger: "click", action_id: "set_self", args: ["mock_row_1", "updated"] },
        {
          trigger: "click",
          action_id: "set_data",
          args: [],
          params: { value: "this.value" },
        },
      ],
      _triggeredBy
    );
    expect(setDataSpy).toHaveBeenCalledOnceWith({
      trigger: "click",
      action_id: "set_data",
      args: [],
      params: { value: "updated" },
      _triggeredBy,
    });
  });

  /**
   * Actions registered as immediate must interrupt work already holding the queue open (the
   * `asset_pack: cancel_download` case - a download blocks the queue for its full duration, so a
   * queued cancel would only run once the download it aborts had already finished)
   */
  it("dispatches immediate actions ahead of the queue", async () => {
    const order: string[] = [];
    let signalQueuedStarted!: () => void;
    let releaseQueuedAction!: () => void;
    const queuedStarted = new Promise<void>((resolve) => (signalQueuedStarted = resolve));
    const queuedRunning = new Promise<void>((resolve) => (releaseQueuedAction = resolve));
    const registry = service["templateActionRegistry"] as TemplateActionRegistry;
    registry.register(
      {
        set_data: async () => {
          order.push("queued_start");
          signalQueuedStarted();
          await queuedRunning;
          order.push("queued_end");
        },
        immediate_action: async () => {
          order.push("immediate");
        },
      } as any,
      true
    );
    registry.registerImmediate("immediate_action" as any);

    const queued = service.handleActions([{ trigger: "click", action_id: "set_data", args: [] }]);
    await queuedStarted;
    await service.handleActions([
      { trigger: "click", action_id: "immediate_action" as any, args: [] },
    ]);

    // the immediate action both ran and resolved while the queued action was still in flight
    expect(order).toEqual(["queued_start", "immediate"]);
    releaseQueuedAction();
    await queued;
    expect(order).toEqual(["queued_start", "immediate", "queued_end"]);
    registry.unregister(["immediate_action" as any]);
  });

  it("queues actions not registered as immediate", async () => {
    const order: string[] = [];
    let signalQueuedStarted!: () => void;
    let releaseQueuedAction!: () => void;
    const queuedStarted = new Promise<void>((resolve) => (signalQueuedStarted = resolve));
    const queuedRunning = new Promise<void>((resolve) => (releaseQueuedAction = resolve));
    service["templateActionRegistry"].register(
      {
        set_data: async () => {
          order.push("queued_start");
          signalQueuedStarted();
          await queuedRunning;
          order.push("queued_end");
        },
        add_data: async () => {
          order.push("second");
        },
      } as any,
      true
    );

    const queued = service.handleActions([{ trigger: "click", action_id: "set_data", args: [] }]);
    await queuedStarted;
    const second = service.handleActions([{ trigger: "click", action_id: "add_data", args: [] }]);
    await queuedStarted;

    expect(order).toEqual(["queued_start"]);
    releaseQueuedAction();
    await Promise.all([queued, second]);
    expect(order).toEqual(["queued_start", "queued_end", "second"]);
  });

  //   TODO - improve test coverage
});
