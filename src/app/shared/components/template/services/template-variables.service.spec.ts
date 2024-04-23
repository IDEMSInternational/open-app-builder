import { TestBed } from "@angular/core/testing";
import { IVariableContext, TemplateVariablesService } from "./template-variables.service";
import { FlowTypes } from "src/app/shared/model";
import { HttpClientTestingModule } from "@angular/common/http/testing";
import { TemplateFieldService } from "./template-field.service";
import { MockTemplateFieldService } from "./template-field.service.spec";
import { AppDataService } from "src/app/shared/services/data/app-data.service";
import { CampaignService } from "src/app/feature/campaign/campaign.service";
import { MockAppDataService } from "src/app/shared/services/data/app-data.service.spec";

const MOCK_EVALUATOR: FlowTypes.TemplateRowDynamicEvaluator = {
  fullExpression: "text_completed_@item.id",
  matchedExpression: "@item.id",
  type: "item",
  fieldName: "id",
};

const MOCK_CONTEXT: IVariableContext = {
  itemContext: {
    id: "id_3",
    label: "Task 3",
    completed: true,
    _index: 2,
    _id: "id_3",
    _first: false,
    _last: true,
  },
  templateRowMap: {},
  row: {
    type: "text",
    name: "text_completed_@item.id",
    _nested_name: "data_items_4.text_completed_id_3",
  },
  calcContext: {
    globalConstants: {
      test_var: "hello",
    },
    globalFunctions: {},
    thisCtxt: {
      app_day: 6,
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
      data: {
        comp_data_items_list: {
          id_1: {
            id: "id_1",
            label: "Task 1",
            completed: false,
          },
          id_2: {
            id: "id_2",
            label: "Task 2",
            completed: true,
          },
          id_3: {
            id: "id_3",
            label: "Task 3",
            completed: true,
          },
        },
      },
      item: {
        id: "id_3",
        completed: true,
        _index: 0,
        _id: "id_2",
        _first: true,
        _last: true,
      },
    },
  },
};

const MOCK_DATA = {};

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
          useValue: MockTemplateFieldService,
        },
        {
          provide: AppDataService,
          useValue: new MockAppDataService(MOCK_DATA),
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
});
