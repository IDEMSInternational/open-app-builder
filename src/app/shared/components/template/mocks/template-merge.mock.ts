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
          value: "It’s great to have you here.",
          type: "set_variable",
          _nested_name: "welcome_individual.workshop_activity.intro_text",
        },
        {
          type: "nested_properties",
          name: "content_box",
          rows: [
            {
              name: "reply_happy",
              value: "Wonderful, I am so happy things are going well.",
              type: "set_variable",
              _nested_name: "welcome_individual.workshop_activity.content_box.reply_happy",
            },
            {
              name: "reply_ok",
              value:
                "Sorry that things are difficult now. It is completely normal to struggle sometimes. Remember that you are not alone!",
              type: "set_variable",
              _nested_name: "welcome_individual.workshop_activity.content_box.reply_ok",
            },
            {
              name: "reply_sad",
              value:
                "Sorry that things are difficult now. It is completely normal to struggle sometimes. Remember that you are not alone!",
              type: "set_variable",
              _nested_name: "welcome_individual.workshop_activity.content_box.reply_sad",
            },
          ],
          _nested_name: "welcome_individual.workshop_activity.content_box",
        },
      ],
      _processed: true,
    },
  },
  originalRows: [
    {
      type: "template",
      name: "workshop_activity",
      value: "workshop_activity",
      action_list: [
        {
          trigger: "completed",
          action_id: "emit",
          args: ["completed"],
          _raw: "completed | emit:completed",
          _cleaned: "completed | emit:completed",
        },
      ],
      rows: [
        {
          name: "activity_image",
          value: "plh_images/workshop_modes/guide_2/wave.svg",
          type: "set_variable",
          _nested_name: "workshop_activity.activity_image",
        },
        {
          name: "activity_title",
          value: "Welcome @field.user_name",
          type: "set_variable",
          _nested_name: "workshop_activity.activity_title",
          _dynamicFields: {
            value: [
              {
                fullExpression: "Welcome @field.user_name",
                matchedExpression: "@field.user_name",
                type: "field",
                fieldName: "user_name",
              },
            ],
          },
          _dynamicDependencies: {
            "@field.user_name": ["value"],
          },
        },
        {
          name: "intro_text",
          value: "It's great to see you again! ",
          type: "set_variable",
          _nested_name: "workshop_activity.intro_text",
        },
        {
          name: "activity_banner",
          hidden: false,
          type: "set_variable",
          _nested_name: "workshop_activity.activity_banner",
        },
        {
          type: "nested_properties",
          name: "content_box",
          value: "box_radio_buttons_emo_temp",
          rows: [
            {
              name: "radio_button_field",
              value: "current_feeling",
              type: "set_variable",
              _nested_name: "workshop_activity.content_box.radio_button_field",
            },
            {
              name: "question_text",
              value: "How are you feeling today?",
              type: "set_variable",
              _nested_name: "workshop_activity.content_box.question_text",
            },
          ],
          _nested_name: "workshop_activity.content_box",
        },
      ],
      _nested_name: "workshop_activity",
    },
  ],
  parentRows: [
    {
      type: "nested_properties",
      name: "workshop_activity",
      rows: [
        {
          name: "intro_text",
          value: "It’s great to have you here.",
          type: "set_variable",
          _nested_name: "welcome_individual.workshop_activity.intro_text",
        },
        {
          type: "nested_properties",
          name: "content_box",
          rows: [
            {
              name: "reply_happy",
              value: "Wonderful, I am so happy things are going well.",
              type: "set_variable",
              _nested_name: "welcome_individual.workshop_activity.content_box.reply_happy",
            },
            {
              name: "reply_ok",
              value:
                "Sorry that things are difficult now. It is completely normal to struggle sometimes. Remember that you are not alone!",
              type: "set_variable",
              _nested_name: "welcome_individual.workshop_activity.content_box.reply_ok",
            },
            {
              name: "reply_sad",
              value:
                "Sorry that things are difficult now. It is completely normal to struggle sometimes. Remember that you are not alone!",
              type: "set_variable",
              _nested_name: "welcome_individual.workshop_activity.content_box.reply_sad",
            },
          ],
          _nested_name: "welcome_individual.workshop_activity.content_box",
        },
      ],
      _nested_name: "welcome_individual.workshop_activity",
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
  const mergedHashmap = secondaryHashmap;
  Object.entries(primaryHashmap).forEach(([key, primaryRow]) => {
    const secondaryRow = secondaryHashmap[key];
    if (secondaryRow) {
      mergedHashmap[key] = { ...secondaryRow, ...primaryRow };
      if (mergedHashmap[key].rows) {
        mergedHashmap[key].rows = mergeNestedTemplateRows(primaryRow.rows, secondaryRow.rows);
      }
    } else {
      mergedHashmap[key] = primaryRow;
    }
  });
  return Object.values(mergedHashmap);
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
