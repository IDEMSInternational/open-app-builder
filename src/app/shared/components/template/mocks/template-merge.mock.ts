namespace FlowTypes {
  export interface TemplateRow {
    name: string;
    type: "set_variable" | "nested_properties" | "template";
    value?: string;
    rows?: TemplateRow[];
    _dynamicFields: any;
  }
}

const data = {
  overrides: {
    text_1: {
      name: "text_1",
      value: "Do not override the action list",
    },
    text_2: {
      name: "text_2",
      value: "Do not override the action list",
    },
  },
  originalRows: [
    {
      name: "field_1",
      value: "debug_actions_middle_1",
      type: "set_variable",
      _nested_name: "field_1",
    },
    {
      name: "value_1",
      value: "Value 1",
      type: "set_variable",
      _nested_name: "value_1",
    },
    {
      type: "text",
      name: "text_1",
      value: "Set the field debug_actions_middle_1 through a local variable",
      _nested_name: "text_1",
    },
    {
      type: "template",
      name: "debug_actions_bottom_1",
      value: "debug_actions_bottom",
      action_list: [
        {
          trigger: "completed",
          action_id: "set_field",
          args: ["@local.field_1", "@local.value_1"],
          _raw: "completed | set_field: @local.field_1 : @local.value_1",
          _cleaned: "completed | set_field: @local.field_1 : @local.value_1",
        },
        {
          trigger: "completed",
          action_id: "emit",
          args: ["completed"],
          _raw: "completed | emit: completed",
          _cleaned: "completed | emit: completed",
        },
      ],
      rows: [],
      _nested_name: "debug_actions_bottom_1",
      _dynamicFields: {
        action_list: {
          "0": {
            args: {
              "0": [
                {
                  fullExpression: "@local.field_1",
                  matchedExpression: "@local.field_1",
                  type: "local",
                  fieldName: "field_1",
                },
              ],
              "1": [
                {
                  fullExpression: "@local.value_1",
                  matchedExpression: "@local.value_1",
                  type: "local",
                  fieldName: "value_1",
                },
              ],
            },
            _raw: [
              {
                fullExpression: "completed | set_field: @local.field_1 : @local.value_1",
                matchedExpression: "@local.field_1",
                type: "local",
                fieldName: "field_1",
              },
              {
                fullExpression: "completed | set_field: @local.field_1 : @local.value_1",
                matchedExpression: "@local.value_1",
                type: "local",
                fieldName: "value_1",
              },
            ],
            _cleaned: [
              {
                fullExpression: "completed | set_field: @local.field_1 : @local.value_1",
                matchedExpression: "@local.field_1",
                type: "local",
                fieldName: "field_1",
              },
              {
                fullExpression: "completed | set_field: @local.field_1 : @local.value_1",
                matchedExpression: "@local.value_1",
                type: "local",
                fieldName: "value_1",
              },
            ],
          },
        },
      },
      _dynamicDependencies: {
        "@local.field_1": ["action_list.0.args.0", "action_list.0._raw", "action_list.0._cleaned"],
        "@local.value_1": ["action_list.0.args.1", "action_list.0._raw", "action_list.0._cleaned"],
      },
    },
    {
      type: "text",
      name: "text_2",
      value: "Set the field debug_actions_middle_2 directly",
      _nested_name: "text_2",
    },
    {
      type: "template",
      name: "debug_actions_bottom_2",
      value: "debug_actions_bottom",
      action_list: [
        {
          trigger: "completed",
          action_id: "set_field",
          args: ["debug_actions_middle_2", "Value 2"],
          _raw: "completed | set_field: debug_actions_middle_2 : Value 2",
          _cleaned: "completed | set_field: debug_actions_middle_2 : Value 2",
        },
        {
          trigger: "completed",
          action_id: "emit",
          args: ["completed"],
          _raw: "completed | emit: completed",
          _cleaned: "completed | emit: completed",
        },
      ],
      rows: [],
      _nested_name: "debug_actions_bottom_2",
    },
  ],
};

export class TestClass {
  private parentRowOverrides = data.overrides;

  /****************************************************************************
   * template-row.service methods
   ***************************************************************************/

  public processParentOverrides(originalRows: FlowTypes.TemplateRow[]) {
    if (Object.keys(this.parentRowOverrides).length > 0) {
      const processedRows = originalRows.map((r) => {
        const processed = this.processRowOverride(r);
        // Note, whilst the main template merge function performs a recursive merge
        // we also want to process any nested overrides
        if (processed.rows) {
          processed.rows = this.processParentOverrides(processed.rows);
        }
        return processed;
      });
      return processedRows;
    } else {
      return originalRows;
    }
  }

  /**
   *  Lookup any overrides for a row or a row's nested child rows and apply
   */
  private processRowOverride(originalRow: FlowTypes.TemplateRow) {
    const override = this.parentRowOverrides[originalRow.name];
    if (override) {
      this.parentRowOverrides[originalRow.name]._processed = true;
    }
    return mergeTemplateRows(override as any, originalRow);
  }
}

/****************************************************************************
 * template-utils methods
 ***************************************************************************/
export function mergeTemplateRows(
  primaryRow?: FlowTypes.TemplateRow,
  secondaryRow?: FlowTypes.TemplateRow
) {
  let mergedRow = { ...secondaryRow };
  if (primaryRow) {
    // merge
    mergedRow = { ...secondaryRow, ...primaryRow };
    // remove overriden dynamic references
    // TODO - also remove _dynamicDependencies references (or recalc at end)
    Object.keys(primaryRow).forEach((field) => {
      if (mergedRow._dynamicFields?.[field]) {
        delete mergedRow._dynamicFields[field];
        if (Object.keys(mergedRow._dynamicFields).length === 0) {
          delete mergedRow._dynamicFields;
        }
      }
    });
  }
  if (mergedRow.rows) {
    mergedRow.rows = mergeTemplateNestedRows(primaryRow?.rows, secondaryRow.rows);
  }
  return mergedRow;
}

/**
 * Given two sets of template rows, perform a deep merge on them and any nested child rows
 */
function mergeTemplateNestedRows(
  primary: FlowTypes.TemplateRow[] = [],
  secondary: FlowTypes.TemplateRow[] = []
): FlowTypes.TemplateRow[] {
  const primaryHashmap = arrayToHashmap(primary, "name");
  const secondaryHashmap = arrayToHashmap(secondary, "name");
  const merged = [];
  // make sure all secondary rows exist are overridden
  secondary.forEach((secondaryRow) => {
    const primaryRow = primaryHashmap[secondaryRow.name];
    const mergedRow = mergeTemplateRows(primaryRow, secondaryRow);

    merged.push(mergedRow);
  });
  // make sure all primary rows exist
  Object.keys(primaryHashmap).forEach((name) => {
    if (!secondaryHashmap[name]) {
      merged.push(primaryHashmap[name]);
    }
  });
  return merged;
}

/****************************************************************************
 * shared/utils methods
 ***************************************************************************/

export function arrayToHashmap<T>(arr: T[], keyfield: string): { [key: string]: T } {
  const hashmap: { [key: string]: T } = {};
  for (const el of arr) {
    if (el.hasOwnProperty(keyfield)) {
      hashmap[el[keyfield]] = el;
    }
  }
  return hashmap;
}

/****************************************************************************
 * Main Test Run
 ***************************************************************************/
const t1 = new TestClass();
const result = t1.processParentOverrides(data.originalRows as any[]);

console.log(JSON.stringify(result, null, 2));
