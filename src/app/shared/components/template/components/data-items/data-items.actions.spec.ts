import type { FlowTypes } from "packages/data-models";
import { DataItemsActionService } from "./data-items.actions";
import { generateItemMeta } from "./data-items.utils";

/***********************************************************************************************
 * Mock Data
 **********************************************************************************************/

const MOCK_ITEMS_LIST: FlowTypes.Data_listRow[] = [
  { id: "id_1", text: "item 1", number: 1, boolean: true },
  { id: "id_2", text: "item 2", number: 2, boolean: false },
];

const MOCK_TEMPLATE_ROW: FlowTypes.TemplateRow = {
  _nested_name: "",
  name: "",
  type: "button",
  value: "@item.text",
};

/**
 * Mock structure for `begin_data_items .... end_data_items` syntax
 * The list provided in `value` will be used to source data_list items, and the `rows`
 * nested will be templated from the items
 */
const MOCK_DATA_ITEMS_ROW: FlowTypes.TemplateRow = {
  _nested_name: "",
  name: "",
  type: "data_items",
  value: "@data.mock_item_list",
  rows: [MOCK_TEMPLATE_ROW],
};

/**
 * Call standalone tests via:
 * yarn ng test --include src/app/shared/components/template/components/data-items/data-items.utils.spec.ts
 */
describe("DataItems Utils", () => {
  service: DataItemsActionService;

  fit("convertItemActionToSetDataAction", () => {
    const itemListRows = generateItemMeta(MOCK_ITEMS_LIST);
    // const res = convertItemActionToSetDataAction({
    //   action: {
    //     action_id: "set_item",
    //     args: [],
    //     trigger: "click",
    //     // advanced example
    //     // target the next item and update relative text to that item
    //     params: { _index: "@item._index+1", text: "{@item.text} updated" },
    //   },
    //   dataListName: "mock_list",
    //   itemContext: itemListRows[0],
    //   itemListRows,
    // });
    // console.log("res", res);
  });
});
