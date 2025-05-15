import { TestBed } from "@angular/core/testing";

import { FlowTypes } from "../../models";
import { DataItemsService } from "./data-items.service";
import { DynamicDataService } from "src/app/shared/services/dynamic-data/dynamic-data.service";
import { MockDynamicDataService } from "src/app/shared/services/dynamic-data/dynamic-data.service.mock.spec";
import { firstValueFrom } from "rxjs";
import { Injector } from "@angular/core";
import { TemplateVariablesService } from "../../services/template-variables.service";
import { TemplateTranslateService } from "../../services/template-translate.service";
import { TemplateCalcService } from "../../services/template-calc.service";
import { MockTemplateCalcService } from "../../services/template-calc.service.mock.spec";
import { provideHttpClient, withInterceptorsFromDi } from "@angular/common/http";
import { provideHttpClientTesting } from "@angular/common/http/testing";

/***************************************************************************************
 * Test Setup
 **************************************************************************************/
const MOCK_DATA_ITEMS_LIST: FlowTypes.Data_listRow[] = [
  {
    id: "id_1",
    completed: true,
    number: 1,
  },
  {
    id: "id_2",
    completed: true,
    number: 2,
  },
  {
    id: "id_3",
    completed: false,
    number: 3,
  },
];

const MOCK_BUTTON = (overrides: Partial<FlowTypes.TemplateRow> = {}): FlowTypes.TemplateRow => ({
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
  ...overrides,
});

const MOCK_TEMPLATE_ROWS_WITH_NESTED = (): FlowTypes.TemplateRow[] => [
  MOCK_BUTTON(),
  {
    _nested_name: "",
    name: "",
    type: "display_group",
    rows: [MOCK_BUTTON()],
  },
];

const MOCK_DATA_ITEMS_ROW = (): FlowTypes.TemplateRow => ({
  _nested_name: "",
  name: "",
  type: "data_items",
  value: "mock_data_items_list",
  rows: MOCK_TEMPLATE_ROWS_WITH_NESTED(),
});

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
  let translateDataListRowsSpy: jasmine.Spy;

  beforeEach(async () => {
    TestBed.configureTestingModule({
      imports: [],
      providers: [
        provideHttpClient(withInterceptorsFromDi()),
        provideHttpClientTesting(),
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
        { provide: TemplateVariablesService, useValue: { evaluateConditionString: (v) => v } },
        { provide: TemplateTranslateService, useValue: {} },
        {
          provide: TemplateCalcService,
          // use custom calc service methods to test item local context evaluation
          useValue: new MockTemplateCalcService({ globalFunctions: { double: (v) => v * 2 } }),
        },
      ],
    });
    service = TestBed.inject(DataItemsService);

    // spy on calls to rowProcessor and just return unprocessed
    rowProcessorSpy = jasmine.createSpy().and.callFake(async (v) => v);
    service["hackProcessRows"] = rowProcessorSpy;
    // use spy for calls to templateTranslateService
    translateDataListRowsSpy = jasmine.createSpy().and.callFake((v) => v);
    service["templateTranslateService"]["translateDataListRows"] = translateDataListRowsSpy;
  });

  it("should be created", () => {
    expect(service).toBeTruthy();
  });

  it("retrieves data_list data and provides observable list of processed data", async () => {
    const obs = service.getItemsObservable(MOCK_DATA_ITEMS_ROW(), {});
    const data = await firstValueFrom(obs);
    // should generate looped item rows (2 template rows x 3 item rows)
    expect(data.length).toEqual(6);
    // ordinarily data from items row will be processed
    // check that it calls processor with item context
    expect(rowProcessorSpy).toHaveBeenCalledTimes(1);
    const [rowProcessorItemRowsArg] = rowProcessorSpy.calls.first().args;
    console.log({ rowProcessorItemRowsArg });
    expect(rowProcessorItemRowsArg[0]._evalContext).toEqual({
      item: {
        id: "id_1",
        completed: true,
        number: 1,
        _index: 0,
        _id: "id_1",
        _first: true,
        _last: false,
      },
    });
  });

  it("includes local variable context within item loops", async () => {
    // child rows include local variable setter and display component
    const itemsRow = {
      ...MOCK_DATA_ITEMS_ROW(),
      rows: [
        {
          type: "set_variable",
          name: "itemDouble",
          _nested_name: "",
          // use custom calc context variable to test calc evaluation
          value: "@calc(double(@item.number))",
        },
        {
          type: "set_variable",
          name: "mockString",
          _nested_name: "",
          // test previous variables can be processed within templated data
          value: "test @local.itemDouble",
        },
        MOCK_BUTTON({ value: "@local.mockString" }),
      ],
    };

    const obs = service.getItemsObservable(itemsRow, {});
    const data: FlowTypes.TemplateRow[] = await firstValueFrom(obs);
    expect(data.length).toEqual(3);
    // local context
    expect(data[0]._evalContext.local).toEqual({ itemDouble: 2, mockString: "test 2" });
    expect(data[1]._evalContext.local).toEqual({ itemDouble: 4, mockString: "test 4" });
    expect(data[2]._evalContext.local).toEqual({ itemDouble: 6, mockString: "test 6" });
    // templated row values will not be evaluated by service, but instead by template processor
    expect(data[0].value).toEqual("@local.mockString");
  });

  it("supports non-string intermediate variables", async () => {
    // child rows include local variable setter and display component
    const itemsRow = {
      ...MOCK_DATA_ITEMS_ROW(),
      rows: [
        {
          type: "set_variable",
          name: "intermediateMultiplier",
          _nested_name: "",
          value: 10,
        },
        {
          type: "set_variable",
          name: "multipliedNumber",
          _nested_name: "",
          value: "@calc(@local.intermediateMultiplier * @item.number)",
        },
        MOCK_BUTTON({ value: "test @local.multipliedNumber" }),
      ],
    };

    const obs = service.getItemsObservable(itemsRow, {});
    const data: FlowTypes.TemplateRow[] = await firstValueFrom(obs);
    // local context
    expect(data[1]._evalContext.local).toEqual({
      intermediateMultiplier: 10,
      multipliedNumber: 20,
    });
  });

  it("evaluates data actions rows with items context (if empty)", async () => {
    // HACK - Actions only trigger correctly if data_items do not contain looped child rows
    const emptyItemsRow = { ...MOCK_DATA_ITEMS_ROW(), rows: undefined };
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
    const obs = service.getItemsObservable(MOCK_DATA_ITEMS_ROW(), {});
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

  it("translated data_item rows", async () => {
    const obs = service.getItemsObservable(MOCK_DATA_ITEMS_ROW(), {});
    await firstValueFrom(obs);
    expect(translateDataListRowsSpy).toHaveBeenCalledTimes(1);
  });

  // TODO - unique id created as part of row processor which is stubbed during tests
  // Should refactor when replacing hack method with alt. row processor class
  xit("creates unique _nested_name for row", async () => {
    const obs = service.getItemsObservable(MOCK_DATA_ITEMS_ROW(), {});
    const data = await firstValueFrom(obs);
    expect(data[0]._nested_name).toEqual(`button.id_1`);
  });

  // TODO - requires improvement to mocked dynamic data service
  // it("provides live update when data changes", async () => {
  //   const obs = service.getItemsObservable(MOCK_DATA_ITEMS_ROW, {});
  //   await firstValueFrom(obs);
  // });
});
