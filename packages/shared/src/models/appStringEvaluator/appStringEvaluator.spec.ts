import { AppStringEvaluator } from "./appStringEvaluator";

describe("App String Evaluator", () => {
  const evaluator = new AppStringEvaluator();

  evaluator.setExecutionContext({
    row: { first_name: "Ada", last_name: "Lovelace", number_1: 1, number_2: 2 },
  });

  it("@row.number_1 > @row.number_2", () => {
    expect(evaluator.evaluate("@row.number_1 > @row.number_2")).toEqual(false);
  });

  it("Hello @row.first_name @row.last_name)", () => {
    expect(evaluator.evaluate("Hello @row.first_name @row.last_name")).toEqual(
      "Hello Ada Lovelace"
    );
  });

  it("Evaluates boolean strings as booleans", () => {
    expect(evaluator.evaluate("false")).toEqual(false);
    expect(evaluator.evaluate("FALSE")).toEqual(false);
    expect(evaluator.evaluate("False")).toEqual(false);
    expect(evaluator.evaluate("true")).toEqual(true);
    expect(evaluator.evaluate("TRUE")).toEqual(true);
    expect(evaluator.evaluate("True")).toEqual(true);
  });
});
