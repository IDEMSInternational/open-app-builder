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

  it("reads boolean text regardless of case and surrounding spaces", () => {
    const param: Parameter<any> = new Parameter("show_icons", true);

    param.setValue("FALSE");
    expect(param.value()).toBe(false);

    param.setValue(" True ");
    expect(param.value()).toBe(true);

    param.setValue("no");
    expect(param.value()).toBe(false);
  });

  it("falls back to the default when a boolean parameter is set to an unset value", () => {
    const param: Parameter<any> = new Parameter("show_icons", true);

    param.setValue(false);
    param.setValue(undefined);
    expect(param.value()).toBe(true);
  });

  it("falls back to the default when a number parameter is set to an unset value or text", () => {
    const param: Parameter<any> = new Parameter("max_length", -1);

    param.setValue("10");
    expect(param.value()).toBe(10);

    param.setValue("ten");
    expect(param.value()).toBe(-1);

    param.setValue(10);
    param.setValue(undefined);
    expect(param.value()).toBe(-1);
  });

  it("falls back to the default when a list parameter is set to an unset value", () => {
    const param: Parameter<any> = new Parameter("options", [], "script");

    param.setValue(["a"]);
    param.setValue(undefined);
    expect(param.value()).toEqual([]);
  });

  it("only accepts allowed values, and warns about any other value", () => {
    const warn = spyOn(console, "warn");
    const param: Parameter<any> = Parameter.oneOf(
      "orientation",
      ["landscape", "portrait"],
      "landscape"
    );

    param.setValue("portrait");
    expect(param.value()).toBe("portrait");
    expect(warn).not.toHaveBeenCalled();

    param.setValue("vertical");
    expect(param.value()).toBe("landscape");
    expect(warn).toHaveBeenCalledOnceWith(
      "[Parameter List] invalid value",
      jasmine.objectContaining({ name: "orientation", value: "vertical" })
    );

    param.setValue("portrait");
    param.setValue("");
    expect(param.value()).toBe("landscape");
    expect(warn).toHaveBeenCalledTimes(1);
  });
});
