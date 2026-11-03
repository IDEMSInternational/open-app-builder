import { TestBed } from "@angular/core/testing";
import { FlowTypes } from "packages/data-models";
import { TemplateActionRegistry } from "src/app/shared/components/template/services/instance/template-action.registry";
import { ActionHandler } from "./action.handler";
import { ActionRegistry, IAction } from "./action.registry";

describe("ActionHandler", () => {
  let actionRegistry: ActionRegistry;
  let templateActionRegistry: TemplateActionRegistry;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ActionHandler, ActionRegistry, TemplateActionRegistry],
    });

    actionRegistry = TestBed.inject(ActionRegistry);
    templateActionRegistry = TestBed.inject(TemplateActionRegistry);
    TestBed.inject(ActionHandler);
  });

  it("executes the nearest registered action scope", async () => {
    const rootAction = createAction("save");
    const parentAction = createAction("screen.save");
    actionRegistry.register(rootAction);
    actionRegistry.register(parentAction);

    await templateActionRegistry.trigger(createActionCall("save", "screen.section"));

    expect(parentAction.execute).toHaveBeenCalled();
    expect(rootAction.execute).not.toHaveBeenCalled();
  });

  it("falls back to the root action when no scoped action is registered", async () => {
    const action = createAction("save");
    actionRegistry.register(action);

    await templateActionRegistry.trigger(createActionCall("save", "screen.section"));

    expect(action.execute).toHaveBeenCalled();
  });
});

function createAction(name: string): jasmine.SpyObj<IAction> {
  return jasmine.createSpyObj<IAction>(
    "IAction",
    ["init", "execute", "condition", "value", "setExpression", "evaluate", "row"],
    {
      name: () => name,
      params: {},
    }
  );
}

function createActionCall(name: string, namespace: string): FlowTypes.TemplateRowAction {
  return {
    trigger: "click",
    action_id: "action",
    args: [name],
    namespace,
  };
}
