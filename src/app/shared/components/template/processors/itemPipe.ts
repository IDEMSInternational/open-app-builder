import type { FlowTypes } from "packages/data-models/flowTypes";
import { JSEvaluator } from "packages/shared/src/models/jsEvaluator/jsEvaluator";
import { shuffleArray } from "src/app/shared/utils";

/** List of operations should by item pipe (exported to allow extraction from parameter_list by task-progress-bar */
export const ITEM_PIPE_OPERATOR_NAMES = ["shuffle", "sort", "filter", "reverse", "limit"] as const;
type IOperationName = (typeof ITEM_PIPE_OPERATOR_NAMES)[number];

export class ItemDataPipe {
  public process(data: any[], operations: { name: string; arg?: string }[]) {
    for (const { name, arg } of operations) {
      const operator = this.operations[name];
      if (operator) {
        data = operator(data, arg);
      } else {
        console.error("No item pipeline operation found", name);
      }
    }
    return data;
  }

  private operations: Record<IOperationName, (items: any[], arg?: string) => any> = {
    shuffle: (items: any[] = []) => {
      return shuffleArray(items);
    },
    sort: (items: any[] = [], sortField: string) => {
      if (!sortField) return items;
      return items.sort((a, b) => (a[sortField] > b[sortField] ? 1 : -1));
    },
    filter: (
      items: any[] = [],
      expression: string,
      contextVariables: FlowTypes.IDynamicContext = {}
    ) => {
      if (!expression) return;
      return items.filter((item) => {
        // NOTE - expects all non-item condition to be evaluated
        // e.g. `@item.field > @local.some_value` already be evaluated to `this.item.field > "local value"`
        const evaluator = new JSEvaluator();
        const evaluated = evaluator.evaluate(expression, { ...contextVariables, item });
        return evaluated;
      });
    },
    reverse: (items: any[] = []) => items.reverse(),
    limit: (items: any[] = [], value: string) => {
      if (!value) return items;
      return items.slice(0, Number(value));
    },
  };
}
