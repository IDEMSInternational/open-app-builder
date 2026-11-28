import { FlowTypes } from "data-models";
import { FlowDebugLog } from "./flowDebugLog";

const flow = { flow_type: "template", flow_name: "test" } as FlowTypes.FlowTypeBase;

/** yarn workspace scripts test -t flowDebugLog.spec.ts */
describe("FlowDebugLog", () => {
  it("writes errors and warnings to _debug in the order logged", () => {
    const log = new FlowDebugLog("test");
    log.warning("w1");
    log.error("e1");
    log.warning("w2");
    expect(log.applyTo(flow)._debug).toEqual({ errors: ["e1"], warnings: ["w1", "w2"] });
  });

  it("only includes lists with messages", () => {
    const log = new FlowDebugLog();
    log.error("e1");
    expect(log.applyTo(flow)._debug).toEqual({ errors: ["e1"] });
  });

  it("removes _debug when there are no messages", () => {
    const withDebug = { ...flow, _debug: { warnings: ["old"] } };
    expect(new FlowDebugLog().applyTo(withDebug)).toEqual(flow);
  });
});
