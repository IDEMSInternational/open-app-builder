import { TestBed } from "@angular/core/testing";
import { LoopItemEvaluator } from "./loop-item.evaluator";
import { RowRegistry } from "../row.registry";

/**
 * Call standalone tests via:
 * yarn ng test --include src/app/reactive-templates/services/evaluators/loop-item.evaluator.spec.ts
 */
describe("LoopItemEvaluator", () => {
  let subject: LoopItemEvaluator;
  let rowRegistry: jasmine.SpyObj<RowRegistry>;

  beforeEach(() => {
    rowRegistry = jasmine.createSpyObj("RowRegistry", ["has"]);

    TestBed.configureTestingModule({
      providers: [{ provide: RowRegistry, useValue: rowRegistry }],
    });
    subject = TestBed.inject(LoopItemEvaluator);
  });

  it("aliases loop tokens to loop context paths", () => {
    rowRegistry.has.and.returnValue(true);

    const result = subject.evaluate(
      "The item is @item and the index is @index and name is @item.name",
      "items.1"
    );

    expect(result).toBe(
      "The item is loop.item and the index is loop.index and name is loop.item.name"
    );
  });

  it("aliases loop summary tokens to loop context paths", () => {
    rowRegistry.has.and.returnValue(true);

    const result = subject.evaluate("@first @last @count @is_first @is_last", "items.1");

    expect(result).toBe("loop.first loop.last loop.count loop.is_first loop.is_last");
  });

  it("leaves non-loop namespaces untouched", () => {
    rowRegistry.has.and.returnValue(false);

    expect(subject.evaluate("The item is @item", "plain.namespace")).toBe("The item is @item");
  });
});
