import { FlowTypes } from "../../models";
import { updateItemActionLists, generateItemMeta } from "./data-items.utils";

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
        item: {
          _id: "id_1",
        } as any,
      },
    },
  ],
  _evalContext: {
    item: {
      _id: "id_1",
    } as any,
  },
};

/**
 * Call standalone tests via:
 * yarn ng test --include src/app/shared/components/template/components/data-items/data-items.utils.spec.ts
 */
describe("Data Items Utils", () => {
  it("generateItemMeta", () => {
    const res = generateItemMeta(MOCK_ITEM_ROWS[0], 0, 1);
    expect(res).toEqual({ _first: true, _last: false, _id: "id_0", _index: 0 });
  });

  it("updateItemActionLists assigns set_item action context", () => {
    const res = updateItemActionLists(MOCK_TEMPLATE_ITEM_ROW, "mock_data_list", ["id_0", "id_1"]);
    const updatedButtonActionListArgs = res.rows[0].action_list[0].args;
    expect(updatedButtonActionListArgs).toEqual([
      {
        flow_name: "mock_data_list",
        itemDataIDs: ["id_0", "id_1"],
        currentItemId: "id_1",
      },
    ]);
  });
});
