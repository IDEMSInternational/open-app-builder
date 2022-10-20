import { DataFrame } from "danfojs";
import { OPERATORS } from "./operators";

const testData = {
  names: [
    {
      id: "id_1",
      first_name: "Ada",
      "first_name::eng": "Ada",
      last_name: "Lovelace",
    },
    {
      id: "id_2",
      first_name: "Blaise",
      "first_name::eng": "Blaise",
      last_name: "Pascal",
    },
  ],
};

describe("Bugs", () => {
  // catch specific error where columns containing language (e.g. text::eng) would fail to evaluate logic statements
  // https://github.com/IDEMSInternational/parenting-app-ui/issues/1573
  it("1573 - text::eng", () => {
    const df = new DataFrame(testData.names);
    const output = new OPERATORS.filter(df, ["first_name.startsWith('B')"]).apply();
    expect(output.column("id").values).toEqual(["id_2"]);
  });
});
