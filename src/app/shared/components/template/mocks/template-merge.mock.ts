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
    workshop_activity: {
      name: "workshop_activity",
      rows: [
        {
          name: "intro_text",
          value: "Let's try it out and do a short relaxation activity together!",
          type: "set_variable",
          _nested_name: "relax.workshop_activity.intro_text",
        },
      ],
    },
  },
  originalRows: [
    {
      type: "template",
      name: "workshop_activity",
      value: "workshop_activity",
      rows: [
        {
          name: "intro_text",
          value: "Let’s do a 30 second relaxation activity together.",
          condition: "@field.do_workshops_together",
          type: "set_variable",
          _nested_name: "workshop_activity.intro_text",
          _dynamicFields: {
            condition: [
              {
                fullExpression: "@field.do_workshops_together",
                matchedExpression: "@field.do_workshops_together",
                type: "field",
                fieldName: "do_workshops_together",
              },
            ],
          },
          _dynamicDependencies: {
            "@field.do_workshops_together": ["condition"],
          },
        },
        {
          name: "intro_text",
          value: "Let’s do a 30 second relaxation activity.",
          condition: "!@field.do_workshops_together",
          type: "set_variable",
          _nested_name: "workshop_activity.intro_text",
          _dynamicFields: {
            condition: [
              {
                fullExpression: "!@field.do_workshops_together",
                matchedExpression: "@field.do_workshops_together",
                type: "field",
                fieldName: "do_workshops_together",
              },
            ],
          },
        },
      ],
      _nested_name: "workshop_activity",
    },
  ],
  parentRows: [
    {
      name: "relax",
      value: "relax_5",
      type: "set_variable",
      _nested_name: "relax.relax",
    },
    {
      type: "nested_properties",
      name: "workshop_activity",
      rows: [
        {
          name: "intro_text",
          value: "Let's try it out and do a short relaxation activity together!",
          type: "set_variable",
          _nested_name: "relax.workshop_activity.intro_text",
        },
        {
          name: "outro_text",
          value: "Well done! Try to do this every day.",
          type: "set_variable",
          _nested_name: "relax.workshop_activity.outro_text",
        },
        {
          name: "outro_habit_text",
          value: "Every time you do a relax, click the ParentPoint and celebrate your success",
          hidden: false,
          type: "set_variable",
          _nested_name: "relax.workshop_activity.outro_habit_text",
          _dynamicFields: {
            value: [
              {
                fullExpression:
                  "Every time you do a relax, click the @global.parent_point and celebrate your success",
                matchedExpression: "@global.parent_point",
                type: "global",
                fieldName: "parent_point",
              },
            ],
          },
          _dynamicDependencies: {
            "@global.parent_point": ["value"],
          },
        },
      ],
      _nested_name: "relax.workshop_activity",
    },
  ],
};

export class TestClass {
  constructor() {}
  rowOverrides = data.overrides;
  processRowOverride(originalRow: FlowTypes.TemplateRow) {
    const override = this.rowOverrides[originalRow.name];
    let overriddenRow: FlowTypes.TemplateRow = { ...originalRow };

    if (override) {
      const { rows, _processed, ...mergeFields } = override;
      // If an override has child rows this implies we are in a deep nested_properties structure
      // As the template may also have a deep nested properties structure we need to merge the two
      if (override.rows) {
        console.warn("[W] - handle nested overrides");
        this.rowOverrides[originalRow.name]._processed = true;
        return mergeNestedTemplates(override as any, originalRow) as any;
      }
      // merge and remove dynamic references
      // TODO - also remove _dynamicFields references
      else {
        Object.keys(mergeFields).forEach((field) => {
          overriddenRow[field] = override[field];
          if (overriddenRow._dynamicFields && overriddenRow._dynamicFields.hasOwnProperty(field)) {
            delete overriddenRow._dynamicFields[field];
            if (Object.keys(overriddenRow._dynamicFields).length === 0) {
              delete overriddenRow._dynamicFields;
            }
          }
        });
        // keep track of applied overrides for debugging
        this.rowOverrides[originalRow.name]._processed = true;
      }
    } else {
      if (originalRow.rows) {
        const processedNestedRows: FlowTypes.TemplateRow[] = [];
        originalRow.rows.forEach((r) => {
          const processed = this.processRowOverride(r);
          processedNestedRows.push(processed);
        });
        overriddenRow = { ...overriddenRow, rows: processedNestedRows };
      }
    }

    return overriddenRow;
  }
}

/****************************************************************************
 * Main Test Run
 ***************************************************************************/
const t1 = new TestClass();
const parsed = data.originalRows.map((r) => t1.processRowOverride(r as any));

console.log(JSON.stringify(parsed, null, 2));

export function mergeNestedTemplates(
  primary: FlowTypes.TemplateRow,
  secondary: FlowTypes.TemplateRow
) {
  const merge = { ...secondary, ...primary };
  if (merge.rows) {
    merge.rows = mergeNestedTemplateRows(primary.rows, secondary.rows);
  }
  return merge;
}

/**
 * Given two sets of template rows, perform a deep merge on them and any nested child rows
 */
function mergeNestedTemplateRows(
  primary: FlowTypes.TemplateRow[] = [],
  secondary: FlowTypes.TemplateRow[] = []
): FlowTypes.TemplateRow[] {
  const primaryHashmap = arrayToHashmap(primary, "name");
  const secondaryHashmap = arrayToHashmap(secondary, "name");
  const merged = [];
  // make sure all secondary rows exist are overridden
  secondary.forEach((secondaryRow) => {
    const primaryRow = primaryHashmap[secondaryRow.name];
    let mergedRow = { ...secondaryRow };
    if (primaryRow) {
      mergedRow = { ...secondaryRow, ...primaryRow };
    }
    if (mergedRow.rows) {
      mergedRow.rows = mergeNestedTemplateRows(primaryRow?.rows, secondaryRow.rows);
    }
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

export function arrayToHashmap<T>(arr: T[], keyfield: string): { [key: string]: T } {
  const hashmap: { [key: string]: T } = {};
  for (const el of arr) {
    if (el.hasOwnProperty(keyfield)) {
      hashmap[el[keyfield]] = el;
    }
  }
  return hashmap;
}
