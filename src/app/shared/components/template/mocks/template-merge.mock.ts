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
  originalRows: [
    {
      type: "template",
      name: "subtemplate_1",
      rows: [],
      _nested_name: "subtemplate_1",
    },
  ],
  overrides: {
    text: {
      name: "text",
      value: "New text",
      _processed: true,
    },
    subtemplate_1: {
      name: "subtemplate_1",
      value: "debug_text_and_blank_child_1",
      rows: [
        {
          name: "subtemplate_1",
        },
      ],
      _processed: true,
    },
    "subtemplate_1.subtemplate_1": {
      name: "subtemplate_1",
      rows: [
        {
          name: "text_1",
          value: "example_text",
        },
      ],
    },
  },
};

export class TestClass {
  private parentRowOverrides = data.overrides;

  /****************************************************************************
   * template-row.service methods
   ***************************************************************************/

  public processParentOverrides(
    originalRows: FlowTypes.TemplateRow[]
    // isNested = false
  ) {
    if (Object.keys(this.parentRowOverrides).length > 0) {
      const processedRows = originalRows.map((r) => {
        const processed = this.processRowOverride(r);
        // Note, whilst the main template merge function performs a recursive merge
        // we also want to process any nested overrides
        if (processed.rows && processed.rows.length > 0) {
          const mapped = processed.rows.map((r) => {
            r.name = `${processed.name}.${r.name}`;
            return r;
          });
          const processedNested = this.processParentOverrides(mapped);
          processed.rows = processedNested.map((r) => {
            r.name = r.name.replace(`${processed.name}.`, "");
            return r;
          });
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
