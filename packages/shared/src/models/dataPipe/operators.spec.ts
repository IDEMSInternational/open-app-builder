import { DataFrame, toJSON } from "danfojs";
import { OPERATORS } from "./operators";

// https://famous-mathematicians.com/list/
const testData = {
  names: [
    {
      id: "id_1",
      first_name: "Ada",
      last_name: "Lovelace",
      year_of_birth: 1815,
    },
    {
      id: "id_2",
      first_name: "Blaise",
      last_name: "Pascal",
      year_of_birth: 1623,
    },
    {
      id: "id_3",
      first_name: "Charles",
      last_name: "Babbage",
      year_of_birth: 1791,
    },
    {
      id: "id_4",
      first_name: "Daniel",
      last_name: "Bernoulli",
      year_of_birth: 1700,
    },
  ],
};

describe("Pipe Operators", () => {
  it("filter", () => {
    const testDf = new DataFrame(testData.names);
    const output = new OPERATORS.filter(testDf, [
      "last_name.startsWith('B')",
      "year_of_birth > 1750",
    ]).apply();
    expect(toJSON(output)).toEqual([testData.names[2]]);
  });
  fit("append_columns", () => {
    const testDf = new DataFrame(testData.names);
    const output = new OPERATORS.append_columns(testDf, [
      "full_name : @row.first_name @row.last_name",
      "greeting : hello @row.full_name",
    ]).apply();
    console.log("output", toJSON(output));
    expect(toJSON(output)).toEqual([testData.names[0]]);
  });
});
