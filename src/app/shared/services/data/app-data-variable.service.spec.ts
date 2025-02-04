import { TestBed } from "@angular/core/testing";

import { AppDataVariableService, IVariableContext } from "./app-data-variable.service";
import { DbService } from "../db/db.service";
import { LocalStorageService } from "../local-storage/local-storage.service";
import { AppDataHandlerBase } from "./variable-handlers";
import { MockDbService } from "../db/db.service.mock.spec";
import { MockLocalStorageService } from "../local-storage/local-storage.service.mock.spec";

function getMockHandlers() {
  /** Mock handler inherits base handler which stores all get/set in-memory */
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
  return MockHandlers;
}

/** Export a mock in-memory service for use in other tests */
export class MockAppDataVariableService implements Partial<AppDataVariableService> {
  public handlers: { [context in IVariableContext]: AppDataHandlerBase };
  constructor() {
    this.handlers = getMockHandlers();
  }
  public async ready() {
    return true;
  }
  public async evaluateExpression(expression: string) {
    return expression;
  }
}

/********************************************************************************
 * Tests
 * yarn ng test --include src\app\shared\services\data\app-data-variable.service.spec.ts
 *******************************************************************************/
describe("AppDataVariableService", () => {
  let service: AppDataVariableService;

  beforeEach(async () => {
    TestBed.configureTestingModule({
      providers: [
        { provide: DbService, useValue: new MockDbService() },
        { provide: LocalStorageService, useValue: new MockLocalStorageService() },
      ],
    });

    service = TestBed.inject(AppDataVariableService);
    TestBed.inject(AppDataVariableService);
    await service.ready();
    service.handlers = getMockHandlers();
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
    const { parsed } = await service.parseExpression("hello @field.expression_field_1");
    expect(parsed).toEqual("hello value_expression_field_1");
  });

  it("evaluates expressions", async () => {
    await service.set("field", "test_value", "2");
    const evaluated = await service.evaluateExpression("@field.test_value < 3");
    expect(evaluated).toEqual(true);
  });

  it("supports JS evaluation on replaced string values", async () => {
    await service.set("field", "test_value", "hello");
    const evaluated = await service.evaluateExpression("@field.test_value.startsWith('h')");
    expect(evaluated).toEqual(true);
  });
  it("evaluates expressions with string value", async () => {
    await service.set("field", "test_value", "hello");
    const evaluated = await service.evaluateExpression("@field.test_value === 'hello'");
    expect(evaluated).toEqual(true);
  });
  // Using '{}' delimters does not work, evaluated returns `hello.startsWith('h')`
  // it("evaluates expressions with string methods applied to field values - delimited", async () => {
  //   await service.set("field", "test_value", "hello");
  //   const evaluated = await service.evaluateExpression("{@field.test_value}.startsWith('h')");
  //   console.log("evaluated", evaluated)
  //   expect(evaluated).toEqual(true);
  // });

  //   TODO - requires mock error logger pending refactor in open #2019

  // it("logs error on unknown prefix", async () => {
  //   await service.set("unknown" as any, "test", "value_1");
  //   expect(true).toEqual(false);
  // });
});
