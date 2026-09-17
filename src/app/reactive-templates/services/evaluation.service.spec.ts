import { TestBed } from "@angular/core/testing";
import { EvaluationService } from "./evaluation.service";
import { VariableStore } from "../stores/variable-store";
import { RowRegistry } from "./row.registry";
import { Parameter } from "../reactive-components/parameters";

/**
 * Call standalone tests via:
 * yarn ng test --include src/app/reactive-templates/services/evaluation.service.spec.ts
 */
describe("EvaluationService", () => {
  let service: EvaluationService;
  let variableStore: VariableStore;
  let rowRegistry: RowRegistry;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EvaluationService);
    variableStore = TestBed.inject(VariableStore);
    rowRegistry = TestBed.inject(RowRegistry);
    variableStore.clear();
  });

  it("falls back to a root-level loop when referencing a dynamic bracket index from a nested loop namespace", () => {
    variableStore.set({ name: "answer_loop", type: "local" }, [{ key: "key_1" }, { key: "key_2" }]);
    variableStore.set({ name: "question_loop", type: "local" }, [
      { key: "key_1" },
      { key: "key_2" },
    ]);
    variableStore.set({ name: "question_loop.key_1.question", type: "local" }, "root-answer");

    rowRegistry.register({
      name: () => "answer_loop",
      value: () => undefined,
      setExpression: () => {},
      params: { index: new Parameter("index", "key") },
      row: () => ({
        name: "answer_loop",
        value: "",
        type: "loop",
        rows: [],
        _nested_name: "answer_loop",
      }),
    });

    const result = service.evaluateExpression<string>(
      "local.question_loop[item.key].question",
      "answer_loop.key_1",
      "script"
    );

    expect(result).toBe("root-answer");
  });
});
