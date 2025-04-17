import { AppDataEvaluator } from "./appDataEvaluator";

describe("AppDataEvaluator - String Replacement", () => {
  const evaluator = new AppDataEvaluator();

  evaluator.setExecutionContext({
    row: { first_name: "Ada", last_name: "Lovelace", number_1: 1, number_2: 2 },
  });

  it("Hello @row.first_name @row.last_name)", () => {
    expect(evaluator.evaluate("Hello @row.first_name @row.last_name")).toEqual(
      "Hello Ada Lovelace"
    );
  });
  it("{nested:[@row.first_name]}", () => {
    expect(evaluator.evaluate({ nested: ["@row.first_name"] })).toEqual({ nested: ["Ada"] });
  });

  it("prefix_{@row.first_name}_suffix", () => {
    expect(evaluator.evaluate("prefix_{@row.first_name}_suffix")).toEqual("prefix_Ada_suffix");
  });
});

describe("AppDataEvaluator - JS Evaluate", () => {
  const evaluator = new AppDataEvaluator();

  beforeEach(() => {
    evaluator.setExecutionContext({
      row: { first_name: "Ada", last_name: "Lovelace", number_1: 1, number_2: 2 },
    });
  });

  it("@row.number_1 > @row.number_2", () => {
    expect(evaluator.evaluate("@row.number_1 > @row.number_2")).toEqual(false);
  });

  it("@row.number_1 > @local.number", () => {
    evaluator.updateExecutionContext({ local: { number: 2 } });
    expect(evaluator.evaluate("@row.number_1 > @local.number")).toEqual(false);
  });

  it("@row.first_name === 'Ada'", () => {
    expect(evaluator.evaluate("@row.first_name === 'Ada'")).toEqual(true);
  });

  it("@row.first_name.length", () => {
    expect(evaluator.evaluate("@row.first_name.length")).toEqual(3);
  });
  it("@row.first_name==='Ada' ? 'It is Ada' : 'It is not Ada'", () => {
    const res = evaluator.evaluate("@row.first_name==='Ada' ? 'It is Ada' : 'It is not Ada'");
    expect(res).toEqual("It is Ada");
  });
});
