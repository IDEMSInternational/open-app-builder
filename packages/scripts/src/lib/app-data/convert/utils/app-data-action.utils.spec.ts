import { parseAppDataActionString } from "./app-data-action.utils";

/** yarn workspace scripts test -t app-data-action.utils.spec.ts */
describe("parseAppDataActionString", () => {
  it("parses a basic trigger + action + params", () => {
    const action = parseAppDataActionString("click | set_value | hide_intro:true");
    expect(action).toMatchObject({
      trigger: "click",
      action_id: "set_value",
      args: [],
      params: { hide_intro: true },
    });
    expect(action.trigger_args).toBeUndefined();
  });

  it("defaults to the click trigger when none is specified", () => {
    const action = parseAppDataActionString("set_value | hide_intro:true");
    expect(action.trigger).toEqual("click");
    expect(action.trigger_args).toBeUndefined();
  });

  it("parses action_id args split on ':'", () => {
    const action = parseAppDataActionString("completed | emit:completed");
    expect(action).toMatchObject({ trigger: "completed", action_id: "emit", args: ["completed"] });
    expect(action.trigger_args).toBeUndefined();
  });

  it("does not treat existing triggers as taking arguments", () => {
    // regression guard: no existing trigger segment contains a ':'
    const action = parseAppDataActionString("nav_resume | emit:nav_resume");
    expect(action.trigger).toEqual("nav_resume");
    expect(action.trigger_args).toBeUndefined();
  });

  it("parses a trigger argument, e.g. `on_progress: 50`", () => {
    const action = parseAppDataActionString("on_progress: 50 | set_local: my_var | value: 3");
    expect(action.trigger).toEqual("on_progress");
    expect(action.trigger_args).toEqual(["50"]);
    // the child action and its params remain cleanly separated from the trigger argument
    expect(action.action_id).toEqual("set_local");
    expect(action.args).toEqual(["my_var"]);
    expect(action.params).toEqual({ value: 3 });
  });

  it("coerces boolean-like trigger arguments", () => {
    const action = parseAppDataActionString("on_progress: true | some_action");
    expect(action.trigger_args).toEqual([true]);
  });
});
