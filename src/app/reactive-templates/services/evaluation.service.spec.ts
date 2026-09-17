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

  it("reactively re-evaluates a dynamic bracket reference (with optional chaining) when the referenced sibling row's value changes later", () => {
    variableStore.set({ name: "answer_loop", type: "local" }, [{ key: "key_1" }, { key: "key_2" }]);
    variableStore.set({ name: "question_loop", type: "local" }, [
      { key: "key_1" },
      { key: "key_2" },
    ]);

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

    const expression = "local.question_loop[item.key]?.answer";
    const namespace = "answer_loop.key_1";

    // No answer typed yet.
    expect(service.evaluateExpression<string>(expression, namespace, "script")).toBeUndefined();

    const dependencies = service.getDependencies(expression, namespace, "script");
    expect(dependencies).toEqual([{ type: "local", name: "answer_loop.key_1.question_loop" }]);

    let emissionCount = 0;
    const subscription = variableStore
      .watchMultipleWithDescendants(dependencies)
      .subscribe(() => emissionCount++);
    const emissionsBeforeTyping = emissionCount;

    // Simulate typing an answer into the text_box in question_loop's key_1 instance.
    variableStore.set({ name: "question_loop.key_1.answer", type: "local" }, "My Answer");

    expect(emissionCount).toBeGreaterThan(emissionsBeforeTyping);
    expect(service.evaluateExpression<string>(expression, namespace, "script")).toBe("My Answer");

    subscription.unsubscribe();
  });

  it("reactively re-evaluates without optional chaining, and when the target key already exists with an undefined value (mirrors a text_box with no initial value)", () => {
    variableStore.set({ name: "answer_loop", type: "local" }, [{ key: "key_1" }, { key: "key_2" }]);
    variableStore.set({ name: "question_loop", type: "local" }, [
      { key: "key_1" },
      { key: "key_2" },
    ]);
    // Mirrors a text_box row with no "value" in the JSON: it still calls set(..., undefined) on mount.
    variableStore.set({ name: "question_loop.key_1.answer", type: "local" }, undefined);
    variableStore.set({ name: "question_loop.key_1.question", type: "local" }, "Question 1");

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

    const expression = "local.question_loop[item.key].answer";
    const namespace = "answer_loop.key_1";

    expect(service.evaluateExpression<string>(expression, namespace, "script")).toBeUndefined();

    const dependencies = service.getDependencies(expression, namespace, "script");
    let emissionCount = 0;
    const subscription = variableStore
      .watchMultipleWithDescendants(dependencies)
      .subscribe(() => emissionCount++);
    const emissionsBeforeTyping = emissionCount;

    // Simulate typing into the already-existing (previously undefined) answer key.
    variableStore.set({ name: "question_loop.key_1.answer", type: "local" }, "My Answer");

    expect(emissionCount).toBeGreaterThan(emissionsBeforeTyping);
    expect(service.evaluateExpression<string>(expression, namespace, "script")).toBe("My Answer");

    subscription.unsubscribe();
  });
});
