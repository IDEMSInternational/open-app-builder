import { ComponentFixture, TestBed } from "@angular/core/testing";

import { IActionSetItemParams, TmplDataItemsComponent } from "./data-items.component";
import { FlowTypes } from "../../models";
import { HttpClientTestingModule } from "@angular/common/http/testing";
import { DeploymentService } from "src/app/shared/services/deployment/deployment.service";
import { MockDeploymentService } from "src/app/shared/services/deployment/deployment.service.spec";
import { DynamicDataService } from "src/app/shared/services/dynamic-data/dynamic-data.service";
import { _wait } from "packages/shared/src/utils/async-utils";
import { TemplatedData } from "packages/shared/src/models/templatedData/templatedData";
import { MockDynamicDataService } from "src/app/shared/services/dynamic-data/dynamic-data.service.mock.spec";

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
  value: "mock_item_list",
  rows: [MOCK_TEMPLATE_ROW],
};

// HACK - ordinarily rows would be processed using a one-off templateRowService instance
// however mocking this is incredibly difficult (lots of tangled code)
// As we still want to test full functionality, replace the service with a more lightweight
// alternative which should handle dynamic replacement in a similar way
const mockHackProcessRows: TmplDataItemsComponent["hackProcessRows"] = async (rows) =>
  rows.map((row) =>
    new TemplatedData({ context: { item: row._evalContext.itemContext } }).parse(row)
  );

// Utility to make it easier to test setting setting component row and returning rendered items
// It triggers row set side-effects and returns rendered item rows
const setTestRow = async (component: TmplDataItemsComponent, row: FlowTypes.TemplateRow) => {
  component.row = row;
  // NOTE - the query that retrieves data_list rows for templating has a 50ms debounce,
  // so include wait time during tests to allow items to finish populating
  await _wait(50);
  return component.itemRows();
};

// Utility to make it easier to test setting actions
// This applies the set_item/set_items action on a generic template with parsed parameters
// It will trigger action_list update side-effects
const setTestActionList = async (
  component: TmplDataItemsComponent,
  payload: { action_id: "set_item" | "set_items"; params: IActionSetItemParams }
) => {
  const { action_id, params } = payload;
  const row: FlowTypes.TemplateRow = {
    ...MOCK_DATA_ITEMS_ROW,
    rows: [
      { ...MOCK_TEMPLATE_ROW, action_list: [{ trigger: "click", action_id, args: [], params }] },
    ],
  };
  return setTestRow(component, row);
};

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
      providers: [
        { provide: DeploymentService, useValue: new MockDeploymentService({ name: "test" }) },
        {
          provide: DynamicDataService,
          useValue: new MockDynamicDataService({ data_list: { mock_item_list: MOCK_ITEMS_LIST } }),
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(TmplDataItemsComponent);
    fixture.componentInstance["hackProcessRows"] = mockHackProcessRows;
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  it("generates evaluation context for rows", async () => {
    const renderedRows = await setTestRow(component, MOCK_DATA_ITEMS_ROW);
    // all rows should be populated with full item data alongside metadata fields
    expect(renderedRows[0]._evalContext).toEqual({
      itemContext: { ...MOCK_ITEMS_LIST[0], _first: true, _id: "id_1", _index: 0, _last: false },
    });
    expect(renderedRows[1]._evalContext).toEqual({
      itemContext: { ...MOCK_ITEMS_LIST[1], _first: false, _id: "id_2", _index: 1, _last: true },
    });
  });

  it("generates item rows when input row set", async () => {
    const renderedRows = await setTestRow(component, MOCK_DATA_ITEMS_ROW);
    expect(renderedRows.length).toEqual(2);

    // check rendered item rows, ignoring eval context (as checked in previous test)
    const [row_1, row_2] = renderedRows;
    const { _evalContext, ...parsed_1 } = row_1;
    expect(parsed_1).toEqual({ _nested_name: "", name: "", type: "button", value: "item 1" });
    const { _evalContext: _2, ...parsed_2 } = row_2;
    expect(parsed_2).toEqual({ _nested_name: "", name: "", type: "button", value: "item 2" });
  });

  // TODO - test items re-render when data updated (requires better mock dynamic data service)

  it("sets dataList name from parsed row", async () => {
    component.row = MOCK_DATA_ITEMS_ROW;
    await _wait(50);
    expect(component["dataListName"]).toEqual("mock_item_list");
    // TODO - could also test different ways to pass row name used in `hackGetRawDataListName`
  });

  it("set_item action uses global set_data", async () => {
    const params = { hello: "test" };
    // call utility to set action list with parameters on component row
    const parsedRows = await setTestActionList(component, { action_id: "set_item", params });

    // should convert to set_data action with updated params
    expect(parsedRows[0].action_list).toEqual([
      {
        trigger: "click",
        action_id: "set_data",
        args: [],
        params: { _list_id: "mock_item_list", _updates: [{ ...params, id: "id_1" }] },
      },
    ]);
  });

  it("set_item with context variables", async () => {
    const params = { number: "@item.number * 10" };
    const parsedRows = await setTestActionList(component, { action_id: "set_item", params });
    // expect action to strip away metadata fields and also assign target id
    expect(parsedRows[0].action_list[0].params).toEqual({
      _list_id: "mock_item_list",
      _updates: [{ id: "id_1", number: 10 }],
    });
    expect(parsedRows[1].action_list[0].params).toEqual({
      _list_id: "mock_item_list",
      _updates: [{ id: "id_2", number: 20 }],
    });
  });

  it("set_item by id", async () => {
    const params = { hello: "test", _id: "id_2" };
    const parsedRows = await setTestActionList(component, { action_id: "set_item", params });
    // expect action to strip away metadata fields and also assign target id
    const { _id, ...writeableProps } = params;
    expect(parsedRows[0].action_list[0].params).toEqual({
      _list_id: "mock_item_list",
      _updates: [{ ...writeableProps, id: "id_2" }],
    });
    expect(parsedRows[1].action_list[0].params).toEqual({
      _list_id: "mock_item_list",
      _updates: [{ ...writeableProps, id: "id_2" }],
    });
  });

  it("set_item by id uses target item context", async () => {
    const params = { number: "@item.number * 10", _id: "id_2" };
    const parsedRows = await setTestActionList(component, { action_id: "set_item", params });
    // expect action to strip away metadata fields and also assign target id
    expect(parsedRows[0].action_list[0].params).toEqual({
      _list_id: "mock_item_list",
      _updates: [{ number: 20, id: "id_2" }],
    });
    expect(parsedRows[1].action_list[0].params).toEqual({
      _list_id: "mock_item_list",
      _updates: [{ number: 20, id: "id_2" }],
    });
  });

  it("set_item by index", async () => {
    const params = { hello: "test", _index: 1 };
    const parsedRows = await setTestActionList(component, { action_id: "set_item", params });
    // expect action to strip away metadata fields and also assign target id
    const { _index, ...writeableProps } = params;
    expect(parsedRows[0].action_list[0].params).toEqual({
      _list_id: "mock_item_list",
      _updates: [{ ...writeableProps, id: "id_2" }],
    });
  });

  it("set_item by dynamic _index", async () => {
    const params = { hello: "test", _index: `@item._index + 1` };
    // NOTE - will log error due to final item not having target reference
    const parsedRows = await setTestActionList(component, { action_id: "set_item", params });
    const { _index, ...writeableProps } = params;
    expect(parsedRows[0].action_list[0].params).toEqual({
      _list_id: "mock_item_list",
      _updates: [{ ...writeableProps, id: "id_2" }],
    });
  });

  it("set_items bulk update", async () => {
    const params = { boolean: false };
    const parsedRows = await setTestActionList(component, { action_id: "set_items", params });
    // all rows should contain action that update all rows
    expect(parsedRows[0].action_list[0].params).toEqual({
      _list_id: "mock_item_list",
      _updates: [
        { id: "id_1", boolean: false },
        { id: "id_2", boolean: false },
      ],
    });
    expect(parsedRows[1].action_list[0].params).toEqual({
      _list_id: "mock_item_list",
      _updates: [
        { id: "id_1", boolean: false },
        { id: "id_2", boolean: false },
      ],
    });
  });

  it("set_items preserves own item context", async () => {
    const params = { number: "@item.number * 10" };
    const parsedRows = await setTestActionList(component, { action_id: "set_items", params });
    // all rows should contain action that update all rows
    expect(parsedRows[0].action_list[0].params).toEqual({
      _list_id: "mock_item_list",
      _updates: [
        { id: "id_1", number: 10 },
        { id: "id_2", number: 20 },
      ],
    });
    expect(parsedRows[1].action_list[0].params).toEqual({
      _list_id: "mock_item_list",
      _updates: [
        { id: "id_1", number: 10 },
        { id: "id_2", number: 20 },
      ],
    });
  });
});
