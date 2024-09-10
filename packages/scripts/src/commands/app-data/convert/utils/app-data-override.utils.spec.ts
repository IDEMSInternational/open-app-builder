import { FlowTypes } from "data-models";
import { useMockLogger } from "../../../../../test/helpers/utils";
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

/** yarn workspace scripts test -t app-data-override.utils.spec.ts */
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
    const loggerSpy = useMockLogger(true);
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
    expect(loggerSpy.warning).toHaveBeenCalledTimes(1);
    expect(loggerSpy.warning).toHaveBeenCalledWith({
      msg1: "Override target does not exist: missing_list",
      msg2: "override_invalid",
    });
  });
});
