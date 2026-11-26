import { Parameter } from "./parameters";

describe("Parameter", () => {
  it("falls back to the default when a string parameter is set to an unset value", () => {
    const param: Parameter<any> = new Parameter("speaker_position", "left");

    param.setValue("right");
    expect(param.value()).toBe("right");

    param.setValue(undefined);
    expect(param.value()).toBe("left");

    param.setValue("right");
    param.setValue(null);
    expect(param.value()).toBe("left");
  });

  it("converts other values of a string parameter to text", () => {
    const param: Parameter<any> = new Parameter("speaker_name", "");

    param.setValue(0);
    expect(param.value()).toBe("0");
  });
});
