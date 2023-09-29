import { FlowTypes } from "data-models";
import { useMockWarningLogger } from "../../../../../test/helpers/utils";
import { assignFlowOverrides } from "./app-data-override.utils";

const TEST_INPUTS: FlowTypes.FlowTypeWithData[] = [
  {
    flow_name: "base_1",
    flow_type: "data_list",
    rows: [],
  },
  {
    flow_name: "override_1",
    flow_type: "data_list",
    rows: [],
    override_target: "base_1",
    override_condition: "test_condition",
  },
  {
    flow_name: "override_2",
    flow_type: "data_list",
    rows: [],
    override_target: "base_1",
    override_condition: "test_condition_2",
  },
];

describe("App Data Override", () => {
  it("Assigns flow override mapping", () => {
    const output = assignFlowOverrides(TEST_INPUTS);
    expect(output[0]).toEqual({
      flow_name: "base_1",
      flow_type: "data_list",
      rows: [],
      _overrides: { override_1: "test_condition", override_2: "test_condition_2" },
    });
  });

  it("Logs warning on missing override target", () => {
    const warningLogger = useMockWarningLogger();
    assignFlowOverrides([
      ...TEST_INPUTS,
      {
        flow_name: "override_invalid",
        flow_type: "data_list",
        rows: [],
        override_target: "missing_list",
        override_condition: "test_condition_3",
      },
    ]);
    expect(warningLogger).toHaveBeenCalledOnceWith({
      msg1: "Override target does not exist: missing_list",
      msg2: "override_invalid",
    });
  });
});
