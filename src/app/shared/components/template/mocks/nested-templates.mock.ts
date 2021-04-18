import { FlowTypes } from "scripts/types";

const template_primary: FlowTypes.TemplateRow = {
  name: "template_name",
  type: "template",
  value: "template_1",
  rows: [
    {
      type: "set_variable",
      name: "key_a",
      value: "1a",
    },
    {
      type: "set_variable",
      name: "key_b",
      value: "1b",
    },
    {
      type: "nested_properties",
      name: "nest_level_1a",
      rows: [
        {
          type: "set_variable",
          name: "key_a",
          value: "1b",
        },
        {
          type: "nested_properties",
          name: "nest_level_2",
          value: "1c",
          rows: [
            {
              type: "set_variable",
              name: "key_a",
              value: "1a",
            },
          ],
        },
      ],
    },
  ],
};

const template_secondary: FlowTypes.TemplateRow = {
  name: "template_name",
  type: "template",
  value: "template_2",
  rows: [
    {
      type: "set_variable",
      name: "key_b",
      value: "2b",
    },
    {
      type: "set_variable",
      name: "key_c",
      value: "2c",
    },
    {
      type: "nested_properties",
      name: "nest_level_1a",
      rows: [
        {
          type: "nested_properties",
          name: "nest_level_2",
          value: "2c",
          rows: [
            {
              type: "set_variable",
              name: "key_b",
              value: "2b",
            },
          ],
        },
      ],
    },
    {
      type: "nested_properties",
      name: "nest_level_1b",
      rows: [
        {
          type: "nested_properties",
          name: "nest_level_2",
          value: "2c",
          rows: [
            {
              type: "set_variable",
              name: "key_a",
              value: "2a",
            },
          ],
        },
      ],
    },
  ],
};

function extract(row: FlowTypes.TemplateRow, nested = {}, namespace?: string) {
  namespace = namespace || row.name;
  const { name, rows } = row;
  // neither of these fields can be updated on template, so remove
  delete row.name;
  delete row.type;
  if (name) {
    nested[namespace] = { ...row };
    if (rows) {
      nested[namespace].rows = [];
      // repeat above process for extract nested_properties
      rows.forEach((r) => {
        if (r.type === "nested_properties") {
          const nestedName = r.name;
          delete r.name;
          delete r.type;
          const nestedTemplate: FlowTypes.TemplateRow = {
            ...r,
            name: nestedName,
          };
          nested = extract(nestedTemplate, nested, `${namespace}.${nestedName}`);
        } else {
          nested[namespace].rows.push(r);
        }
      });
    }
  }

  return nested;
}
const extracted_primary = extract(template_primary);
console.log("extracted_primary");
console.log(JSON.stringify(extracted_primary, null, 2));
const extracted_secondary = extract(template_secondary);
console.log("extracted_secondary");
console.log(JSON.stringify(extracted_secondary, null, 2));

const extracted_merged = extracted_secondary;
Object.entries(extracted_primary).forEach(([key, primary]) => {
  const secondary = extracted_secondary[key];
  if (secondary) {
    // override secondary field with primary-secondary merge
    extracted_merged[key] = mergeObjectsWithRows(primary, secondary);
  } else {
    // add new properties to secondary
    extracted_merged[key] = primary;
  }
});

console.log("merged");
console.log(JSON.stringify(extracted_merged, null, 2));

// Simple test case for merging two items that share properties and rows
const test_primary = {
  text_a: "1a",
  text_b: "1b",
  properties: { key_a: "1a", key_b: "1b" },
  list: [
    { id: "item_a", val: "1a" },
    { id: "item_b", val: "1a" },
  ],
  rows: [
    { name: "a", value: "1a" },
    { name: "b", value: "1b" },
  ],
};

const test_secondary = {
  text_b: "2b",
  text_c: "2c",
  properties: { key_b: "2b", key_c: "2c" },
  list: [
    { id: "item_b", val: "2b" },
    { id: "item_c", val: "2c" },
  ],
  rows: [
    { name: "b", value: "2b" },
    { name: "c", value: "2c" },
  ],
};

function mergeObjectsWithRows(primary, secondary) {
  return {
    ...secondary,
    ...primary,
    rows: mergeObjectArrays(primary.rows, secondary.rows, "name"),
  };
}

// assume primaryRows take priority in case of conflict
function mergeObjectArrays<T>(primaryRows: T[], secondaryRows: T[] = [], mergeKey: string): T[] {
  const secondaryHash = arrayToHashmap(secondaryRows, mergeKey as string);
  primaryRows.forEach((r) => {
    if (r.hasOwnProperty(mergeKey)) {
      secondaryHash[r[mergeKey]] = r;
    }
  });
  return Object.values(secondaryHash);
}

// const merged = mergeObjectsWithRows(primary, secondary);

function arrayToHashmap<T>(arr: T[], keyfield: string): { [key: string]: T } {
  const hashmap: { [key: string]: T } = {};
  for (const el of arr) {
    if (el.hasOwnProperty(keyfield)) {
      hashmap[el[keyfield]] = el;
    }
  }
  return hashmap;
}
