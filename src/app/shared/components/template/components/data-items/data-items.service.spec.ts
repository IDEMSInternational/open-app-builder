import { TestBed } from "@angular/core/testing";

import { FlowTypes } from "../../models";
import { HttpClientTestingModule } from "@angular/common/http/testing";
import { DataItemsService } from "./data-items.service";
import { DynamicDataService } from "src/app/shared/services/dynamic-data/dynamic-data.service";
import { MockDynamicDataService } from "src/app/shared/services/dynamic-data/dynamic-data.service.mock.spec";
import { firstValueFrom } from "rxjs";
import { Injector } from "@angular/core";
import { TemplateVariablesService } from "../../services/template-variables.service";

/***************************************************************************************
 * Test Setup
 **************************************************************************************/
const MOCK_DATA_ITEMS_LIST: FlowTypes.Data_listRow[] = [
  {
    id: "id_1",
    completed: true,
  },
  {
    id: "id_2",
    completed: true,
  },
  {
    id: "id_3",
    completed: false,
  },
];

const MOCK_BUTTON = (): FlowTypes.TemplateRow => ({
  _nested_name: "",
  name: "",
  type: "button",
  value: "@item.id",
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
});

const MOCK_TEMPLATE_ROWS_WITH_NESTED: FlowTypes.TemplateRow[] = [
  MOCK_BUTTON(),
  {
    _nested_name: "",
    name: "",
    type: "display_group",
    rows: [MOCK_BUTTON()],
  },
];

const MOCK_DATA_ITEMS_ROW: FlowTypes.TemplateRow = {
  _nested_name: "",
  name: "",
  type: "data_items",
  value: "mock_data_items_list",
  rows: MOCK_TEMPLATE_ROWS_WITH_NESTED,
};

/***************************************************************************************
 * Test Methods
 **************************************************************************************/

/**
 * Call standalone tests via:
 * yarn ng test --include src/app/shared/components/template/components/data-items/data-items.service.spec.ts
 */
describe("DataItemsService", () => {
  let service: DataItemsService;

  let rowProcessorSpy: jasmine.Spy;

  beforeEach(async () => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        {
          provide: DynamicDataService,
          useValue: new MockDynamicDataService({
            data_list: {
              mock_data_items_list: MOCK_DATA_ITEMS_LIST,
            },
          }),
        },
        // methods that call these providers are mocked so simply provide stub
        { provide: Injector, useValue: {} },
        { provide: TemplateVariablesService, useValue: {} },
      ],
    });
    service = TestBed.inject(DataItemsService);

    // mock calls to data items processor
    service["hackParseDataList"] = jasmine.createSpy().and.callFake(async (v) => v);
    // spy on calls to rowProcessor and just return unprocessed
    rowProcessorSpy = jasmine.createSpy().and.callFake(async (v) => v);
    service["hackProcessRows"] = rowProcessorSpy;
  });

  it("should be created", () => {
    expect(service).toBeTruthy();
  });

  it("retrieves data_list data and provides observable list of processed data", async () => {
    const obs = service.getItemsObservable(MOCK_DATA_ITEMS_ROW, {});
    const data = await firstValueFrom(obs);
    // should generate looped item rows (2 template rows x 3 item rows)
    expect(data.length).toEqual(6);
    // ordinarily data from items row will be processed
    // check that it calls processor with item context
    expect(rowProcessorSpy).toHaveBeenCalledTimes(1);
    const [rowProcessorItemRowsArg] = rowProcessorSpy.calls.first().args;
    expect(rowProcessorItemRowsArg[0]._evalContext).toEqual({
      itemContext: {
        id: "id_1",
        completed: true,
        _index: 0,
        _id: "id_1",
        _first: true,
        _last: false,
      },
    });
  });

  it("evaluates data actions rows with items context (if empty)", async () => {
    // HACK - Actions only trigger correctly if data_items do not contain looped child rows
    const emptyItemsRow = { ...MOCK_DATA_ITEMS_ROW, rows: undefined };
    const obs = service.getItemsObservable(emptyItemsRow, {});
    const data = await firstValueFrom(obs);
    const [evaluated] = service.evaluateDataActions(
      [
        {
          trigger: "data_changed",
          action_id: "set_local",
          args: ["my_local_var", "@items.length"],
        },
      ],
      data
    );
    console.log({ evaluated });
    expect(evaluated.args).toEqual(["my_local_var", 3]);
  });
  // TODO - fix case where items context refers to generated loop items and not list items
  xit("evaluates data actions rows with items context", async () => {
    const obs = service.getItemsObservable(MOCK_DATA_ITEMS_ROW, {});
    const data = await firstValueFrom(obs);
    const [evaluated] = service.evaluateDataActions(
      [
        {
          trigger: "data_changed",
          action_id: "set_local",
          args: ["my_local_var", "@items.length"],
        },
      ],
      data
    );
    // Note - currently return 6 due to generated loop item rows
    expect(evaluated.args).toEqual(["my_local_var", 3]);
  });

  // TODO - requires improvement to mocked dynamic data service
  // it("provides live update when data changes", async () => {
  //   const obs = service.getItemsObservable(MOCK_DATA_ITEMS_ROW, {});
  //   await firstValueFrom(obs);
  // });
});
