import type { FlowTypes } from "packages/data-models";
import { generateLoopItemRows, generateItemMeta } from "./data-items.utils";

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
});
