import { TestBed } from "@angular/core/testing";

import { HttpClientTestingModule } from "@angular/common/http/testing";

import { AppDataVariableService } from "./app-data-variable.service";
import { AppDataService } from "./app-data.service";
import { FlowTypes } from "../../model";
import { DbService } from "../db/db.service";
import { LocalStorageService } from "../local-storage/local-storage.service";
import { MockLocalStorageService } from "../local-storage/local-storage.service.spec";
import { MockDbService } from "../db/db.service.spec";
import { AppDataHandlerBase } from "./variable-handlers";

const DATA_MOCK = {
  test_flow: [
    { id: "id1", number: 1, string: "hello", boolean: true },
    { id: "id2", number: 2, string: "goodbye", boolean: false },
  ],
};

class MockHandler extends AppDataHandlerBase {
  constructor() {
    super("mock" as any);
  }
}

const fieldHandler = new MockHandler();

const MockHandlers: AppDataVariableService["handlers"] = {
  field: fieldHandler,
  fields: fieldHandler,
};

/** Mock calls for sheets from the appData service to return test data */
export class MockAppDataService implements Partial<AppDataService> {
  public async getSheet<T extends FlowTypes.FlowTypeWithData>(
    flow_type: FlowTypes.FlowType,
    flow_name: string
  ): Promise<T> {
    const rows = DATA_MOCK[flow_name] || [];
    return { flow_name, flow_type, rows } as any;
  }
}

describe("AppDataVariableService", () => {
  let service: AppDataVariableService;

  beforeEach(async () => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        AppDataVariableService,
        { provide: AppDataService, useValue: new MockAppDataService() },
        { provide: DbService, useValue: new MockDbService() },
        { provide: LocalStorageService, useValue: new MockLocalStorageService() },
      ],
    });

    service = TestBed.inject(AppDataVariableService);
    TestBed.inject(AppDataService);
    await service.ready();
    service.handlers = MockHandlers;
  });

  it("@field - set and get", async () => {
    await service.set("field", "test_field_1", "value_test_field_1");
    const fieldValue = await service.get("field", "test_field_1");
    expect(fieldValue).toEqual("value_test_field_1");
  });
  it("@fields - use interoperably with @field", async () => {
    await service.set("fields", "test_field_2", "value_test_fields_2");
    const fieldValue = await service.get("field", "test_field_2");
    expect(fieldValue).toEqual("value_test_fields_2");
  });

  it("parses expressions", async () => {
    await service.set("field", "expression_field_1", "value_expression_field_1");
    const evaluated = await service.parseExpression("hello @field.expression_field_1");
    expect(evaluated).toEqual("hello value_expression_field_1");
  });

  it("evaluates expressions", async () => {
    await service.set("field", "test_value", "2");
    const evaluated = await service.evaluateExpression("@field.test_value < 3");
    expect(evaluated).toEqual(true);
  });

  //   TODO - requires mock error logger pending refactor in open #2019

  // it("logs error on unknown prefix", async () => {
  //   await service.set("unkown" as any, "test", "value_1");
  //   expect(true).toEqual(false);
  // });
});
