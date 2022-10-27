import { DataFrame } from "danfojs";
import { OPERATORS } from "./operators";
import workshop_data from "./bugs/1590.json";
import { normalizeData } from ".";

const testData = {
  names: [
    {
      id: "id_1",
      first_name: "Ada",
      "first_name::eng": "Ada",
      last_name: "Lovelace",
      _translatedFields: { first_name: {} },
    },
    {
      id: "id_2",
      first_name: "Blaise",
      "first_name::eng": "Blaise",
      last_name: "Pascal",
      _translatedFields: { first_name: {} },
    },
  ],
  workshop_data: normalizeData(workshop_data.rows),
};

describe("Bugs", () => {
  // catch specific error where columns containing language (e.g. text::eng) would fail to evaluate logic statements
  // https://github.com/IDEMSInternational/parenting-app-ui/issues/1573
  it("1573 - text::eng", () => {
    const df = new DataFrame(testData.names);
    const output = new OPERATORS.filter(df, ["first_name.startsWith('B')"]).apply();
    expect(output.column("id").values).toEqual(["id_2"]);
  });
  it("1590 - missing columns", () => {
    const df = new DataFrame(testData.workshop_data);
    const output = new OPERATORS.append_columns(df, [
      "completed_field: test_{@row.id}_completed",
    ]).apply();
    expect(output.column("completed_field").values).toEqual([
      "test_w_self_care_completed",
      "test_w_1on1_completed",
      "test_w_praise_completed",
      "test_w_instruct_completed",
      "test_w_stress_completed",
      "test_w_money_completed",
      "test_w_rules_completed",
      "test_w_consequence_completed",
      "test_w_solve_completed",
      "test_w_safe_completed",
      "test_w_crisis_completed",
      "test_w_celebrate_completed",
    ]);
  });
});
