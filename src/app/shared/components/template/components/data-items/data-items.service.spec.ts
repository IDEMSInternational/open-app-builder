import { TestBed } from "@angular/core/testing";

import { FlowTypes } from "../../models";
import { DataItemsService } from "./data-items.service";
import { TemplateVariablesService } from "../../services/template-variables.service";

// Additional rows used when evaluating `@local` expression
const MOCK_LOCAL_ROWS = {
  button_text: { value: "example button text" },
  filter_number: { value: 1 },
  sort_field: { value: "priority" },
};

const MOCK_ITEM_DATA_ROWS = (): FlowTypes.Data_listRow[] => [
  { id: "item_1", text: "item_1", number: 1, priority: 2 },
  { id: "item_2", text: "item_2", number: 2, priority: 1 },
];

const MOCK_ITEMS_TEMPLATE_ROW: FlowTypes.TemplateRow = {
  _nested_name: "",
  name: "",
  type: "items",
  rows: [
    { _nested_name: "", name: "", type: "text", value: "@item.text" },
    { _nested_name: "", name: "", type: "button", value: "@local.button_text" },
  ],
};

// Lightweight mock of templateVariable service which would be used to evaluate dynamic variables
class MockTemplateVariableService implements Partial<TemplateVariablesService> {
  public async getDynamicFieldValue(
    type: FlowTypes.IDynamicPrefix,
    fieldName: string,
    templateRowMap?: {}
  ): Promise<{ parsedValue: any; parseSuccess: boolean }> {
    if (type === "local") {
      return { parsedValue: templateRowMap[fieldName]?.value, parseSuccess: true };
    }
    return { parsedValue: fieldName, parseSuccess: false };
  }
}

/**
 * Call standalone tests via:
 * yarn ng test --include src/app/shared/components/template/components/data-items/data-items.service.spec.ts
 */
describe("DataItemsService", () => {
  let service: DataItemsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        { provide: TemplateVariablesService, useValue: new MockTemplateVariableService() },
      ],
    });
    service = TestBed.inject(DataItemsService);
  });

  it("should be created", () => {
    expect(service).toBeTruthy();
  });

  it("generateDynamicEvaluationContext", async () => {
    const res = await service["generateDynamicEvaluationContext"](
      MOCK_ITEMS_TEMPLATE_ROW,
      MOCK_LOCAL_ROWS
    );
    expect(res).toEqual({ local: { button_text: "example button text" } });
  });

  it("Generates item rows", async () => {
    const res = await service.generateItemRows({
      dataListRows: MOCK_ITEM_DATA_ROWS(),
      templateItemsRow: MOCK_ITEMS_TEMPLATE_ROW,
      parentRowMap: MOCK_LOCAL_ROWS,
      dataListName: "mock_data_list",
    });

    expect(res).toEqual([
      { _nested_name: "", name: "", type: "text", value: "item_1" },
      { _nested_name: "", name: "", type: "button", value: "example button text" },
      { _nested_name: "", name: "", type: "text", value: "item_2" },
      { _nested_name: "", name: "", type: "button", value: "example button text" },
    ]);
  });

  it("Supports operators with dynamic context", async () => {
    const templateItemsRow = {
      ...MOCK_ITEMS_TEMPLATE_ROW,
      parameter_list: {
        sort: "@local.sort_field",
      },
    };
    const res = await service.generateItemRows({
      dataListRows: MOCK_ITEM_DATA_ROWS(),
      templateItemsRow,
      parentRowMap: MOCK_LOCAL_ROWS,
      dataListName: "mock_data_list",
    });
    expect(res).toEqual([
      { _nested_name: "", name: "", type: "text", value: "item_2" },
      { _nested_name: "", name: "", type: "button", value: "example button text" },
      { _nested_name: "", name: "", type: "text", value: "item_1" },
      { _nested_name: "", name: "", type: "button", value: "example button text" },
    ]);
  });

  it("Supports filter operator with dynamic contexts and item context", async () => {
    const templateItemsRow = {
      ...MOCK_ITEMS_TEMPLATE_ROW,
      parameter_list: {
        filter: "@item.number > @local.filter_number",
        sort: "@local.sort_field",
      },
    };
    const res = await service.generateItemRows({
      dataListRows: MOCK_ITEM_DATA_ROWS(),
      templateItemsRow,
      parentRowMap: MOCK_LOCAL_ROWS,
      dataListName: "mock_data_list",
    });
    expect(res).toEqual([
      { _nested_name: "", name: "", type: "text", value: "item_2" },
      { _nested_name: "", name: "", type: "button", value: "example button text" },
    ]);
  });
});
