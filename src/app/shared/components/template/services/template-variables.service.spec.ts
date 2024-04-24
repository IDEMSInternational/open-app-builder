import { TestBed } from "@angular/core/testing";
import { IVariableContext, TemplateVariablesService } from "./template-variables.service";
import { HttpClientTestingModule } from "@angular/common/http/testing";
import { TemplateFieldService } from "./template-field.service";
import { MockTemplateFieldService } from "./template-field.service.spec";
import { AppDataService } from "src/app/shared/services/data/app-data.service";
import { CampaignService } from "src/app/feature/campaign/campaign.service";
import { MockAppDataService } from "src/app/shared/services/data/app-data.service.spec";
import { TemplateCalcService } from "./template-calc.service";
import { MockTemplateCalcService } from "./template-calc.service.spec";

const MOCK_APP_DATA = {};

const MOCK_ITEM_STRING = "@item._index + 1";

// Context as logged from this debug template:
// https://docs.google.com/spreadsheets/d/1tL6CPHEIW-GPMYjdhVKQToy_hZ1H5qNIBkkh9XnA5QM/edit#gid=114708400
const MOCK_CONTEXT_WITH_ITEM_CTXT: IVariableContext = {
  itemContext: {
    id: "id1",
    number: 1,
    string: "hello",
    boolean: true,
    _index: 0,
    _id: "id1",
    _first: true,
    _last: false,
  },
  templateRowMap: {
    "data_items_2.text_1": {
      type: "text",
      value: 2,
      _translations: {
        value: {},
      },
      name: "text_1",
      _nested_name: "data_items_2.text_1",
      _dynamicFields: {
        value: [
          {
            fullExpression: "@item._index + 1",
            matchedExpression: "@item._index",
            type: "item",
            fieldName: "_index",
          },
        ],
      },
      _dynamicDependencies: {
        "@item._index": ["value"],
      },
      _evalContext: {
        itemContext: {
          id: "id2",
          number: 2,
          string: "goodbye",
          boolean: false,
          _index: 1,
          _id: "id2",
          _first: false,
          _last: true,
        },
      },
    },
  },
  row: {
    type: "text",
    value: "@item._index + 1",
    _translations: {
      value: {},
    },
    name: "text_1",
    _nested_name: "data_items_2.text_1",
    _dynamicFields: {
      value: [
        {
          fullExpression: "@item._index + 1",
          matchedExpression: "@item._index",
          type: "item",
          fieldName: "_index",
        },
      ],
    },
    _dynamicDependencies: {
      "@item._index": ["value"],
    },
    _evalContext: {
      itemContext: {
        id: "id1",
        number: 1,
        string: "hello",
        boolean: true,
        _index: 0,
        _id: "id1",
        _first: true,
        _last: false,
      },
    },
  },
  field: "value",
  calcContext: {
    globalConstants: {
      test_var: "hello",
    },
    globalFunctions: {},
    thisCtxt: {
      app_day: 8,
      app_first_launch: "2024-04-05T17:49:29",
      fields: {
        _app_language: "gb_en",
        _app_skin: "default",
      },
      local: {
        button_list: [
          {
            image: "images/icons/house_white.svg",
            target_template: "home_screen",
          },
          {
            image: "images/icons/star_white.svg",
            target_template: "comp_button",
          },
          {
            image: "images/icons/book_white.svg",
            target_template: "comp_button",
          },
        ],
      },
      item: {
        _index: 1,
      },
    },
  },
};

const MOCK_CONTEXT_WITHOUT_ITEM_CTXT: IVariableContext = {
  templateRowMap: {
    "data_items_2.text_1": {
      type: "text",
      value: "@item._index + 1",
      _translations: {
        value: {},
      },
      name: "text_1",
      _nested_name: "data_items_2.text_1",
      _dynamicFields: {
        value: [
          {
            fullExpression: "@item._index + 1",
            matchedExpression: "@item._index",
            type: "item",
            fieldName: "_index",
          },
        ],
      },
      _dynamicDependencies: {
        "@item._index": ["value"],
      },
    },
    data_items_2: {
      type: "data_items",
      value: "debug_item_data",
      rows: [
        {
          type: "text",
          value: "@item._index + 1",
          _translations: {
            value: {},
          },
          name: "text_1",
          _nested_name: "data_items_2.text_1",
          _dynamicFields: {
            value: [
              {
                fullExpression: "@item._index + 1",
                matchedExpression: "@item._index",
                type: "item",
                fieldName: "_index",
              },
            ],
          },
          _dynamicDependencies: {
            "@item._index": ["value"],
          },
        },
      ],
      name: "data_items_2",
      _nested_name: "data_items_2",
    },
  },
  row: {
    type: "text",
    value: "@item._index + 1",
    _translations: {
      value: {},
    },
    name: "text_1",
    _nested_name: "data_items_2.text_1",
    _dynamicFields: {
      value: [
        {
          fullExpression: "@item._index + 1",
          matchedExpression: "@item._index",
          type: "item",
          fieldName: "_index",
        },
      ],
    },
    _dynamicDependencies: {
      "@item._index": ["value"],
    },
  },
  field: "value",
  calcContext: {
    globalConstants: {
      test_var: "hello",
    },
    globalFunctions: {},
    thisCtxt: {
      app_day: 8,
      app_first_launch: "2024-04-05T17:49:29",
      fields: {
        _app_language: "gb_en",
        _app_skin: "default",
      },
      local: {
        button_list: [
          {
            image: "images/icons/house_white.svg",
            target_template: "home_screen",
          },
          {
            image: "images/icons/star_white.svg",
            target_template: "comp_button",
          },
          {
            image: "images/icons/book_white.svg",
            target_template: "comp_button",
          },
        ],
      },
      item: {
        _index: 1,
      },
    },
  },
};

/**
 * Call standalone tests via:
 * yarn ng test --include src/app/shared/components/template/services/template-variables.service.spec.ts
 */
describe("TemplateVariablesService", () => {
  let service: TemplateVariablesService;
  let getNextCampaignRowsSpy: jasmine.Spy<jasmine.Func>;

  beforeEach(() => {
    getNextCampaignRowsSpy = jasmine.createSpy();
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        {
          provide: TemplateFieldService,
          useValue: new MockTemplateFieldService(),
        },
        {
          provide: AppDataService,
          useValue: new MockAppDataService(MOCK_APP_DATA),
        },
        {
          provide: TemplateCalcService,
          useValue: new MockTemplateCalcService(),
        },
        // Mock single method from campaign service called
        {
          provide: CampaignService,
          useValue: {
            ready: async () => {
              return true;
            },
            getNextCampaignRows: getNextCampaignRowsSpy,
          },
        },
      ],
    });
    service = TestBed.inject(TemplateVariablesService);
  });

  it("should be created", () => {
    expect(service).toBeTruthy();
  });

  it("evaluates string containing item variable", async () => {
    const value = await service.evaluatePLHData(MOCK_ITEM_STRING, MOCK_CONTEXT_WITH_ITEM_CTXT);
    expect(value).toBe(1);
  });
  it("does not evaluate item string without appropriate context", async () => {
    const value = await service.evaluatePLHData(MOCK_ITEM_STRING, MOCK_CONTEXT_WITHOUT_ITEM_CTXT);
    expect(value).toBe(MOCK_ITEM_STRING);
  });
});
