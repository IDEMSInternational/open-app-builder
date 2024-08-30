import { ComponentFixture, TestBed } from "@angular/core/testing";

import { TmplDataItemsComponent } from "./data-items.component";
import { FlowTypes } from "../../models";
import { HttpClientTestingModule } from "@angular/common/http/testing";

const TEST_ITEM_DATA: FlowTypes.Data_listRow[] = [
  {
    id: "id_1",
    completed: true,
  },
  {
    id: "id_2",
    completed: true,
  },
];

// Template rows representing an item loop consisting of one button per item
const TEST_ROWS: FlowTypes.TemplateRow[] = [
  {
    type: "button",
    value: "Click here",
    action_list: [
      {
        trigger: "click",
        action_id: "set_item",
        args: [],
        _raw: "click | set_item | completed: true",
        _cleaned: "click | set_item | completed: true",
        params: {
          completed: true,
        },
      },
    ],
    name: "button_1",
    _nested_name: "data_items_3.button_1",
    _evalContext: {
      itemContext: {
        id: "id_1",
        label: "Task 1",
        completed: true,
        _index: 0,
        _id: "id_1",
        _first: true,
        _last: false,
      },
    },
  },
  {
    type: "button",
    value: "Click here",
    _translations: {
      value: {},
    },
    action_list: [
      {
        trigger: "click",
        action_id: "set_item",
        args: [],
        _raw: "click | set_item | completed: true",
        _cleaned: "click | set_item | completed: true",
        params: {
          completed: true,
        },
      },
    ],
    name: "button_1",
    _nested_name: "data_items_3.button_1",
    _evalContext: {
      itemContext: {
        id: "id_2",
        label: "Task 2",
        completed: true,
        _index: 1,
        _id: "id_2",
        _first: false,
        _last: false,
      },
    },
  },
];

// Template rows representing an item loop consisting of one button inside a display_group per item
const TEST_ROWS_NESTED: FlowTypes.TemplateRow[] = [
  {
    type: "display_group",
    name: "display_group_1",
    _nested_name: "data_items_6.display_group_1",
    _evalContext: {
      itemContext: {
        id: "id_1",
        label: "Task 1",
        completed: true,
        _index: 0,
        _id: "id_1",
        _first: true,
        _last: false,
      },
    },
    rows: [
      {
        type: "button",
        value: "Click here",
        _translations: {
          value: {},
        },
        action_list: [
          {
            trigger: "click",
            action_id: "set_item",
            args: [],
            _raw: "click | set_item | completed: true",
            _cleaned: "click | set_item | completed: true",
            params: {
              completed: true,
            },
          },
        ],
        name: "button_1",
        _nested_name: "data_items_6.display_group_1.button_1",
        _evalContext: {
          itemContext: {
            id: "id_1",
            label: "Task 1",
            completed: true,
            _index: 0,
            _id: "id_1",
            _first: true,
            _last: false,
          },
        },
      },
    ],
  },
  {
    type: "display_group",
    name: "display_group_1",
    _nested_name: "data_items_6.display_group_1",
    _evalContext: {
      itemContext: {
        id: "id_2",
        label: "Task 2",
        completed: true,
        _index: 1,
        _id: "id_2",
        _first: false,
        _last: false,
      },
    },
    rows: [
      {
        type: "button",
        value: "Click here",
        _translations: {
          value: {},
        },
        action_list: [
          {
            trigger: "click",
            action_id: "set_item",
            args: [],
            _raw: "click | set_item | completed: true",
            _cleaned: "click | set_item | completed: true",
            params: {
              completed: true,
            },
          },
        ],
        name: "button_1",
        _nested_name: "data_items_6.display_group_1.button_1",
        _evalContext: {
          itemContext: {
            id: "id_2",
            label: "Task 2",
            completed: true,
            _index: 1,
            _id: "id_2",
            _first: false,
            _last: false,
          },
        },
      },
    ],
  },
];

/**
 * Call standalone tests via:
 * yarn ng test --include src/app/shared/components/template/components/data-items/data-items.component.spec.ts
 */
describe("DataItemsComponent", () => {
  let component: TmplDataItemsComponent;
  let fixture: ComponentFixture<TmplDataItemsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [TmplDataItemsComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TmplDataItemsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  it("adds item meta to action arguments", () => {
    // ID of original item
    const rowItemId = TEST_ROWS[0]._evalContext.itemContext._id;
    // add item meta
    const rowsWithItemMeta = component["setItemMeta"](TEST_ROWS, TEST_ITEM_DATA, "test_data_list");
    // get action args for a set_item action (setItemContext object is passed within an array)
    const setItemContext = rowsWithItemMeta[0].action_list.find(
      (action) => action.action_id === "set_item"
    ).args[0];
    expect(setItemContext.currentItemId).toBe(rowItemId);
  });

  it("adds item meta to action arguments nested inside child rows", () => {
    // ID of original item
    const rowItemId = TEST_ROWS_NESTED[0]._evalContext.itemContext._id;
    // add item meta
    const rowsWithItemMeta = component["setItemMeta"](
      TEST_ROWS_NESTED,
      TEST_ITEM_DATA,
      "test_data_list"
    );
    // get rows at one level of nesting (e.g. those within a display group)
    const nestedRowsWithItemMeta = rowsWithItemMeta[0].rows;
    // get action args for a set_item action (args object is passed within an array)
    const setItemContext = nestedRowsWithItemMeta[0].action_list.find(
      (action) => action.action_id === "set_item"
    ).args[0];
    expect(setItemContext.currentItemId).toBe(rowItemId);
  });
});

// TODO

// it("sets an item correctly for a given _index", async () => {
//   await actions.set_item({
//     context: SET_ITEM_CONTEXT,
//     _index: 1,
//     writeableProps: { string: "sets an item correctly for a given _index" },
//   });
//   const obs = await service.query$<any>("data_list", "test_flow");
//   const data = await firstValueFrom(obs);
//   expect(data[0].string).toEqual("hello");
//   expect(data[1].string).toEqual("sets an item correctly for a given _index");
// });
