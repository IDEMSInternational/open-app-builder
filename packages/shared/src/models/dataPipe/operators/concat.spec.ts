import { DataFrame, toJSON } from "danfojs";
import { normalizeData } from "..";
import { DataPipe } from "../pipe";
import testData from "../testData.spec";
import concat from "./concat";

(testData as any).concat_names = [
  {
    id: "id_5",
    first_name: "Edward",
    last_name: "Lorenz",
    // year_of_birth omitted, additional field added
    additonal_field: "EL",
  },
  {
    id: "id_6",
    first_name: "Felix",
    last_name: "Klein",
    // year_of_birth omitted, additional field added
    additonal_field: "FK",
  },
];

describe("Concat Operator", () => {
  const emptyDf = new DataFrame([]);
  const testPipe: DataPipe = new DataPipe([], testData);
  it("Throws on missing data_list", () => {
    expect(() => new concat(emptyDf, ["missing_list"], testPipe)).toThrowError(
      "Arg validation error"
    );
  });
  it("Throws if concatenating lists with duplicate ids", () => {
    const duplicateDf = new DataFrame([{ id: "id_3", first_name: "Duplicated" }]);
    expect(() => new concat(duplicateDf, ["names"], testPipe).apply()).toThrowError(
      "[names] Multiple entries exist for index: id_3"
    );
  });
  it("concatenates multiple lists", () => {
    const output = new concat(emptyDf, ["names", "concat_names"], testPipe).apply();
    expect(output.index).toEqual(["id_1", "id_2", "id_3", "id_4", "id_5", "id_6"]);
    const expectedCols = ["id", "first_name", "last_name", "year_of_birth", "additonal_field"];
    expect(output.columns).toEqual(expectedCols);
  });
  it("concatenates complex example", () => {
    const { debugData1, debugData2, outputExpected } = DEBUG_TEST_DATA();
    (testData as any).debugData1 = debugData1;
    (testData as any).debugData2 = debugData2;
    const output = new concat(emptyDf, ["debugData1", "debugData2"], testPipe).apply();
    expect(toJSON(output)).toEqual(outputExpected);
  });
});

/** Example concatenating 2 lists containing irregular shaped data */
function DEBUG_TEST_DATA() {
  const debugData1 = [
    {
      id: "welcome_individual",
      individual: true,
      together: false,
      priority: 1,
    },
    {
      id: "care_together",
      individual: false,
      together: true,
      priority: 2,
    },
  ];
  // Importantly debugData2's first entry does not contain all columns (requires normalising)
  // and contains columns in different order to debugData1
  // NOTE - ordinarily this will be normalised during inputSources parsing
  const debugData2 = normalizeData([
    {
      id: "question_1",
      template: "w_praise_question_1",
      individual: true,
      together: false,
      priority: 11,
    },
    {
      id: "read",
      subtask_group: "read",
      template: "w_praise_read",
      individual: true,
      together: true,
      priority: 12,
    },
  ]);
  // concatenated data should contain all rows and fill missing values
  const outputExpected = normalizeData([
    {
      id: "welcome_individual",
      individual: true,
      together: false,
      priority: 1,
      template: undefined,
      subtask_group: undefined,
    },
    {
      id: "care_together",
      individual: false,
      together: true,
      priority: 2,
      template: undefined,
      subtask_group: undefined,
    },
    {
      id: "question_1",
      individual: true,
      together: false,
      priority: 11,
      template: "w_praise_question_1",
      subtask_group: undefined,
    },
    {
      id: "read",
      individual: true,
      together: true,
      priority: 12,
      template: "w_praise_read",
      subtask_group: "read",
    },
  ]);
  return { debugData1, debugData2, outputExpected };
}
