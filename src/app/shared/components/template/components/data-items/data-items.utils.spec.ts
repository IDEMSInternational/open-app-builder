import type { FlowTypes } from "packages/data-models";
import {
  convertItemActionToSetDataAction,
  updateActionList,
  generateLoopItemRows,
  generateItemMeta,
} from "./data-items.utils";

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
  it("generateItemMeta", () => {
    const res = generateItemMeta(MOCK_ITEMS_LIST);
    expect(res).toEqual([
      {
        id: "id_1",
        text: "item 1",
        number: 1,
        boolean: true,
        _id: "id_1",
        _index: 0,
        _first: true,
        _last: false,
      },
      {
        id: "id_2",
        text: "item 2",
        number: 2,
        boolean: false,
        _id: "id_2",
        _index: 1,
        _first: false,
        _last: true,
      },
    ]);
  });
  it("generateLoopItemRows", () => {
    const res = generateLoopItemRows([MOCK_TEMPLATE_ROW], MOCK_ITEMS_LIST);
    console.log(res);
    expect(res).toEqual([
      {
        _nested_name: "",
        name: "",
        type: "button",
        value: "@item.text",
        _item: {
          id: "id_1",
          text: "item 1",
          number: 1,
          boolean: true,
          _id: "id_1",
          _index: 0,
          _first: true,
          _last: false,
        },
      },
      {
        _nested_name: "",
        name: "",
        type: "button",
        value: "@item.text",
        _item: {
          id: "id_2",
          text: "item 2",
          number: 2,
          boolean: false,
          _id: "id_2",
          _index: 1,
          _first: false,
          _last: true,
        },
      },
    ]);
  });

  fit("convertItemActionToSetDataAction", () => {
    const res = convertItemActionToSetDataAction({
      action: { action_id: "set_item", args: [], trigger: "click", params: {} },
      dataListName: "",
      itemListRows: [],
      update: { completed: true },
    });
  });

  it("updateActionList", () => {});
});
