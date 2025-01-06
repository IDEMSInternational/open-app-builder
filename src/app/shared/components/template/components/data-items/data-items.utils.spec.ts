import { FlowTypes } from "../../models";
import { updateItemMeta } from "./data-items.utils";

const MOCK_ITEM_ROWS = [{ id: "id_0" }, { id: "id_1" }];

const MOCK_TEMPLATE_ITEM_ROW: FlowTypes.TemplateRow = {
  _nested_name: "",
  name: "",
  type: "display_group",
  rows: [
    {
      type: "button",
      _nested_name: "",
      name: "",
      action_list: [
        { trigger: "click", action_id: "set_item", args: [], params: { completed: false } },
      ],
      _evalContext: {
        itemContext: {
          _id: "id_1",
        },
      },
    },
  ],
  _evalContext: {
    itemContext: {
      _id: "id_1",
    },
  },
};

/**
 * Call standalone tests via:
 * yarn ng test --include src/app/shared/components/template/components/data-items/data-items.utils.spec.ts
 */
describe("Data Items Utils", () => {
  it("updateItemMeta updates item metadata", () => {
    const res = updateItemMeta([MOCK_TEMPLATE_ITEM_ROW], MOCK_ITEM_ROWS, "mock_data_list");
    const [updatedRow] = res;
    // should automatically assign index, first and last meta from item list id lookup
    const expectedItemContext = { _id: "id_1", _index: 1, _first: false, _last: true };
    expect(updatedRow._evalContext.itemContext).toEqual(expectedItemContext);
    // also check recursive child rows updated
    expect(updatedRow.rows[0]._evalContext.itemContext).toEqual(expectedItemContext);
  });

  it("updateItemMeta assigns set_item action context", () => {
    const res = updateItemMeta([MOCK_TEMPLATE_ITEM_ROW], MOCK_ITEM_ROWS, "mock_data_list");
    const updatedButtonActionListArgs = res[0].rows[0].action_list[0].args;
    expect(updatedButtonActionListArgs).toEqual([
      {
        flow_name: "mock_data_list",
        itemDataIDs: ["id_0", "id_1"],
        currentItemId: "id_1",
      },
    ]);
  });
});
