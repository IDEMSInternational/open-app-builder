import { Injector } from "@angular/core";
import { FlowTypes } from "src/app/shared/model";
import { TemplateContainerComponent } from "../../template-container.component";
import { TemplateTranslateService } from "../template-translate.service";
import { TemplateVariablesService } from "../template-variables.service";
import { TemplateRowService } from "./template-row.service";

/** Conditions are evaluated by lookup of the row condition expression, so that tests can toggle the result */
let mockConditionValues: Record<string, boolean> = {};

// HACK - templateRowService injects child dependencies from injector
// stub all injected services with stub (can be replaced as future tests require)
const mockInjector: Injector = {
  get: (token: any) => {
    const base = { ready: () => true, isReady: () => true };
    switch (token) {
      case TemplateVariablesService:
        return {
          ...base,
          // as with the real service, evaluate from the original expression stored in _dynamicFields
          // (the row condition itself is replaced with the evaluated value after processing)
          evaluatePLHData: async (data: any, context: FlowTypes.TemplateRowEvalContext) => {
            const evaluators = context.row._dynamicFields?.condition as
              | FlowTypes.TemplateRowDynamicEvaluator[]
              | undefined;
            if (evaluators && data?.hasOwnProperty("condition")) {
              return { ...data, condition: mockConditionValues[evaluators[0].fullExpression] };
            }
            return data;
          },
        };
      case TemplateTranslateService:
        return { ...base, translateRow: (row: FlowTypes.TemplateRow) => ({ ...row }) };
      default:
        return base;
    }
  },
};

function mockUpdateActionListRow(
  name: string,
  action_id: FlowTypes.TemplateRowAction["action_id"],
  condition?: string
) {
  const row: FlowTypes.TemplateRow = {
    type: "update_action_list",
    name,
    _nested_name: name,
    action_list: [{ trigger: "nav_resume", action_id, args: [] }],
  };
  if (condition) {
    row.condition = condition;
    row._dynamicFields = { condition: [{ fullExpression: condition } as any] };
  }
  return row;
}

function mockContainer(rows: FlowTypes.TemplateRow[], row?: FlowTypes.TemplateRow) {
  return {
    name: "mock_template",
    template: { flow_type: "template", flow_name: "mock_template", rows },
    row,
  } as Partial<TemplateContainerComponent> as TemplateContainerComponent;
}

/**
 * Call standalone tests via:
 * yarn ng test --include src/app/shared/components/template/services/instance/template-row.service.spec.ts
 */
describe("TemplateRowService", () => {
  /** List action_ids of all actions currently registered on container */
  function getContainerActionIds(service: TemplateRowService) {
    return (service.container.row?.action_list || []).map((a) => a.action_id);
  }

  beforeEach(() => {
    mockConditionValues = {};
  });

  describe("update_action_list", () => {
    it("adds actions when no condition specified", async () => {
      const service = new TemplateRowService(
        mockInjector,
        mockContainer([mockUpdateActionListRow("update_1", "pop_up")])
      );
      await service.processContainerTemplateRows();
      expect(service.container.row.action_list).toEqual([
        {
          trigger: "nav_resume",
          action_id: "pop_up",
          args: [],
          _update_name: "update_1",
          _self_triggered: true,
        } as any,
      ]);
    });

    it("does not add actions when condition false", async () => {
      mockConditionValues = { is_enabled: false };
      const service = new TemplateRowService(
        mockInjector,
        mockContainer([mockUpdateActionListRow("update_1", "pop_up", "is_enabled")])
      );
      await service.processContainerTemplateRows();
      expect(getContainerActionIds(service)).toEqual([]);
    });

    it("removes previously added actions when condition becomes false", async () => {
      mockConditionValues = { is_enabled: true };
      const service = new TemplateRowService(
        mockInjector,
        mockContainer([mockUpdateActionListRow("update_1", "pop_up", "is_enabled")])
      );
      await service.processContainerTemplateRows();
      expect(getContainerActionIds(service)).toEqual(["pop_up"]);

      mockConditionValues = { is_enabled: false };
      await service.processRowUpdates();
      expect(getContainerActionIds(service)).toEqual([]);
    });

    it("re-adds actions when condition becomes true again", async () => {
      mockConditionValues = { is_enabled: true };
      const service = new TemplateRowService(
        mockInjector,
        mockContainer([mockUpdateActionListRow("update_1", "pop_up", "is_enabled")])
      );
      await service.processContainerTemplateRows();
      mockConditionValues = { is_enabled: false };
      await service.processRowUpdates();
      mockConditionValues = { is_enabled: true };
      await service.processRowUpdates();
      expect(getContainerActionIds(service)).toEqual(["pop_up"]);
    });

    it("removes previously added actions on full reload", async () => {
      mockConditionValues = { is_enabled: true };
      const rows = [mockUpdateActionListRow("update_1", "pop_up", "is_enabled")];
      const service = new TemplateRowService(mockInjector, mockContainer(rows));
      await service.processContainerTemplateRows();

      // simulate emit:force_reload, which re-renders from the original template rows
      mockConditionValues = { is_enabled: false };
      service.clearRenderedState();
      service.container.template.rows = rows;
      await service.processContainerTemplateRows();
      expect(getContainerActionIds(service)).toEqual([]);
    });

    it("retains parent actions and actions from other updates when removing", async () => {
      mockConditionValues = { is_enabled: true };
      const parentRow: FlowTypes.TemplateRow = {
        type: "template",
        name: "mock_template",
        _nested_name: "mock_template",
        action_list: [{ trigger: "completed", action_id: "go_to", args: [] }],
      };
      const service = new TemplateRowService(
        mockInjector,
        mockContainer(
          [
            mockUpdateActionListRow("update_1", "pop_up", "is_enabled"),
            mockUpdateActionListRow("update_2", "set_field"),
          ],
          parentRow
        )
      );
      await service.processContainerTemplateRows();
      expect(getContainerActionIds(service)).toEqual(["go_to", "pop_up", "set_field"]);

      mockConditionValues = { is_enabled: false };
      await service.processRowUpdates();
      expect(getContainerActionIds(service)).toEqual(["go_to", "set_field"]);
    });

    // Rows that share a name with opposing conditions should behave the same in either order
    for (const order of ["true row first", "false row first"]) {
      it(`keeps actions from same-named row with true condition - ${order}`, async () => {
        mockConditionValues = { is_a: true, is_b: false };
        const rows = [
          mockUpdateActionListRow("update_1", "pop_up", "is_a"),
          mockUpdateActionListRow("update_1", "set_field", "is_b"),
        ];
        if (order === "false row first") rows.reverse();
        const service = new TemplateRowService(mockInjector, mockContainer(rows));
        await service.processContainerTemplateRows();
        expect(getContainerActionIds(service)).toEqual(["pop_up"]);

        // swap which row is active
        mockConditionValues = { is_a: false, is_b: true };
        await service.processRowUpdates();
        expect(getContainerActionIds(service)).toEqual(["set_field"]);

        mockConditionValues = { is_a: false, is_b: false };
        await service.processRowUpdates();
        expect(getContainerActionIds(service)).toEqual([]);
      });
    }
  });
});
