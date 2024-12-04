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
import { DeploymentService } from "src/app/shared/services/deployment/deployment.service";
import { MockDeploymentService } from "src/app/shared/services/deployment/deployment.service.spec";

const MOCK_APP_DATA = {};

// Fields populated to mock field service
const MOCK_FIELDS = {
  _app_language: "gb_en",
  _app_skin: "default",
  string_field: "test_string_value",
  number_field: 2,
  dynamic_field: "number",
};

const MOCK_CONTEXT_BASE: IVariableContext = {
  // Assume the row will have a dynamic 'field' entry
  field: "value",
  row: {
    type: "text",
    value: "",
    name: "test_row",
    _nested_name: "test_row",
  },
  templateRowMap: {},
  calcContext: {
    globalConstants: {},
    globalFunctions: {},
    thisCtxt: {
      fields: MOCK_FIELDS,
      local: {},
    },
  },
};

const TEST_FIELD_CONTEXT: IVariableContext = {
  ...MOCK_CONTEXT_BASE,
  row: {
    ...MOCK_CONTEXT_BASE.row,
    value: "Hello @fields.string_field",
    _dynamicFields: {
      value: [
        {
          fullExpression: "Hello @fields.string_field",
          matchedExpression: "@fields.string_field",
          type: "fields",
          fieldName: "string_field",
        },
      ],
    },
  },
};

// Context adapted from this debug template:
// https://docs.google.com/spreadsheets/d/1tL6CPHEIW-GPMYjdhVKQToy_hZ1H5qNIBkkh9XnA5QM/edit#gid=114708400
const TEST_ITEM_CONTEXT: IVariableContext = {
  ...MOCK_CONTEXT_BASE,
  row: {
    ...MOCK_CONTEXT_BASE.row,
    value: "@item._index + 1",
    // NOTE - any evaluated fields should appea
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
  },
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
};

const TEST_LOCAL_CONTEXT: IVariableContext = {
  ...MOCK_CONTEXT_BASE,
  templateRowMap: {
    // Mock row setting a local variable
    string_local: {
      name: "string_local",
      value: "Jasper",
      type: "set_variable",
      _nested_name: "string_local",
    },
  },
  row: {
    ...MOCK_CONTEXT_BASE.row,
    value: "Hello @local.string_local",
    _dynamicFields: {
      value: [
        {
          fullExpression: "Hello @local.string_local",
          matchedExpression: "@local.string_local",
          type: "local",
          fieldName: "string_local",
        },
      ],
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

  beforeEach(async () => {
    getNextCampaignRowsSpy = jasmine.createSpy();
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        {
          provide: TemplateFieldService,
          useValue: new MockTemplateFieldService(MOCK_FIELDS),
        },
        {
          provide: AppDataService,
          useValue: new MockAppDataService(MOCK_APP_DATA),
        },
        {
          provide: DeploymentService,
          useValue: new MockDeploymentService({ name: "test" }),
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
    await service.ready();
  });

  it("should be created", () => {
    expect(service).toBeTruthy();
  });

  it("Evaluates PLH Data String", async () => {
    console.log({ TEST_FIELD_CONTEXT });
    const res = await service.evaluatePLHData("Hello @fields.string_field", TEST_FIELD_CONTEXT);
    expect(res).toEqual("Hello test_string_value");
    // Data will only be evaluated if it has been pre-parsed, extracting dynamic references
    // If not returns raw value
    delete TEST_FIELD_CONTEXT.row._dynamicFields;
    const resWithoutDynamicContext = await service.evaluatePLHData(
      "@fields.string_field",
      TEST_FIELD_CONTEXT
    );
    expect(resWithoutDynamicContext).toEqual("@fields.string_field");
    /** 
     * TODO - include all edge cases, e.g. raw, item, calc, deep-nested, object, array etc.
    const res = await service.evaluatePLHData(["@fields.string_field"], MOCK_CONTEXT);
    expect(res).toEqual({ 1: "test_string_value" });
    const res = await service.evaluatePLHData(
      {
        nested: "@fields.string_field",
      },
      MOCK_CONTEXT
    );
    expect(res).toEqual({ nested: "test_string_value" });
     */
  });
  it("Evaluates condition strings", async () => {
    // Condition strings are evaluated without any previous pre-parsed dynamic fields
    const res = await service.evaluateConditionString("@fields.number_field > 3");
    expect(res).toEqual(false);
  });

  it("evaluates string containing item variable", async () => {
    const MOCK_ITEM_STRING = "@item._index + 1";
    // Parse expression when item context included
    const resWithItemContext = await service.evaluatePLHData(MOCK_ITEM_STRING, TEST_ITEM_CONTEXT);
    expect(resWithItemContext).toEqual(1);
    // Retain raw expression if evaluating outside of item context
    // https://github.com/IDEMSInternational/parenting-app-ui/pull/2215#discussion_r1514757364
    delete TEST_ITEM_CONTEXT.itemContext;
    const resWithoutItemContext = await service.evaluatePLHData(
      MOCK_ITEM_STRING,
      TEST_ITEM_CONTEXT
    );
    expect(resWithoutItemContext).toEqual(MOCK_ITEM_STRING);
  });

  it("Evaluates string containing local variable", async () => {
    const MOCK_LOCAL_STRING = "Hello @local.string_local";
    const resWithLocalContext = await service.evaluatePLHData(
      MOCK_LOCAL_STRING,
      TEST_LOCAL_CONTEXT
    );
    expect(resWithLocalContext).toEqual("Hello Jasper");
  });

  it("Evaluates templateLiteral with dynamic keys", async () => {
    const res = await service.evaluatePLHData({ "@field.dynamic_field": 2 }, TEST_FIELD_CONTEXT);
    expect(res).toEqual({ number: 2 });
  });
});
