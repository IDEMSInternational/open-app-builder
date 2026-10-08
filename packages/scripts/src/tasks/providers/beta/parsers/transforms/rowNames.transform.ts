import { FlowTypes } from "data-models";

/**
 * Assign names to any template rows (including nested rows) not named by the author.
 * Adapted from `generateRowName` and `generateItemRowNames` in the template flowParser,
 * and numbered in the same way (top-level rows start from 2 to match the sheet without header,
 * nested rows start from 1 within their parent). Expects rows to already be nested
 */
export function assignRowNames(
  rows: FlowTypes.TemplateRow[],
  isTopLevel = true
): FlowTypes.TemplateRow[] {
  return rows.map((row, i) => {
    const named = row.name
      ? row
      : { ...row, name: generateRowName(row, isTopLevel ? i + 2 : i + 1) };
    if (!Array.isArray(named.rows)) return named;
    let childRows = named.rows;
    // Ensure child rows of items or data_items generate uniquely with reference to item id
    if (named.type === "data_items" || named.type === "items") {
      childRows = generateItemRowNames(childRows);
    }
    return { ...named, rows: assignRowNames(childRows, false) };
  });
}

/** Name unnamed child rows of items or data_items with a reference to the item id */
function generateItemRowNames(rows: FlowTypes.TemplateRow[]) {
  return rows.map((row, i) =>
    row.name ? row : { ...row, name: `${generateRowName(row, i + 1)}_@item.id` }
  );
}

/** Automatically generate a row name when not provided by author */
function generateRowName(row: FlowTypes.TemplateRow, rowNumber: number) {
  switch (row.type) {
    // template row name assigned to target template name
    case "template":
      return row.value as string;
    // default use combination of row type and row number
    default:
      return `${row.type}_${rowNumber}`;
  }
}

/**
 * Assign `_nested_name` to all rows, tracking the path to nested rows by parent names,
 * e.g. `parent_name.child_name`. Expects rows to already be nested and named
 * @param excludedTypes parent row types that are not included in child paths,
 * e.g. rows within a `display_group` are named as if they were not nested within it
 */
export function assignNestedNames(
  rows: FlowTypes.TemplateRow[],
  excludedTypes: string[] = [],
  parentPath?: string
): FlowTypes.TemplateRow[] {
  return rows.map((row) => {
    const _nested_name = parentPath ? `${parentPath}.${row.name}` : row.name;
    if (!Array.isArray(row.rows)) return { ...row, _nested_name };
    const childPath = excludedTypes.includes(row.type) ? parentPath : _nested_name;
    return {
      ...row,
      _nested_name,
      rows: assignNestedNames(row.rows, excludedTypes, childPath),
    };
  });
}
