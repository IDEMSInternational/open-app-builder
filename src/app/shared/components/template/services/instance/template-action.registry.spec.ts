import { TestBed } from "@angular/core/testing";

import { TemplateActionRegistry } from "./template-action.registry";

describe("TemplateActionRegistry", () => {
  let registry: TemplateActionRegistry;

  let fakeHandler: jasmine.Spy;

  beforeEach(async () => {
    TestBed.configureTestingModule({
      imports: [],
    });

    registry = TestBed.inject(TemplateActionRegistry);
    fakeHandler = jasmine.createSpy();
    registry.register({
      test_action_1: (args) => fakeHandler(args),
      test_action_2: () => null,
    } as any);
  });

  it("should create", () => {
    expect(registry).toBeTruthy();
  });

  it("registers action handler", () => {
    expect(registry.has("test_action_1" as any)).toBeTrue();
    expect(registry.has("test_action_2" as any)).toBeTrue();
  });

  it("triggers action handlers", async () => {
    const action = {
      action_id: "test_action_1" as any,
      args: [1, 2, 3],
      trigger: "click" as any,
    };
    await registry.trigger(action);
    expect(fakeHandler).toHaveBeenCalledOnceWith(action);
  });

  // QA
  it("throws on duplicate registration", () => {
    expect(() =>
      registry.register({
        test_action_1: () => null,
      } as any)
    ).toThrowError("Action handler already exists for trigger: test_action_1");
  });

  it("throws on missing action handler", () => {
    const action = {
      action_id: "missing_action" as any,
      args: [],
      trigger: "click" as any,
    };
    expect(() => registry.trigger(action)).toThrowError(
      "No handler registered for action_id: missing_action"
    );
  });
});
