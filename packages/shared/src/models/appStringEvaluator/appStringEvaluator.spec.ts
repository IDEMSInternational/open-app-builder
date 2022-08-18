import { AppStringEvaluator } from "./appStringEvaluator";

describe("App String Evaluator", () => {
  const evaluator = new AppStringEvaluator();

  evaluator.setExecutionContext({
    row: { first_name: "Ada", last_name: "Lovelace", number_1: 1, number_2: 2 },
  });

  fit("@row.number_1 > @row.number_2", () => {
    expect(evaluator.evaluate("@row.number_1 > @row.number_2")).toEqual(false);
  });

  fit("Hello @row.first_name @row.last_name)", () => {
    expect(evaluator.evaluate("Hello @row.first_name @row.last_name")).toEqual(
      "Hello Ada Lovelace"
    );
  });
});
