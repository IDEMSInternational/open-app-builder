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

  it("reads an unset value of a boolean parameter as false, whatever the default", () => {
    const param: Parameter<any> = new Parameter("show_icons", true);

    param.setValue(undefined);
    expect(param.value()).toBe(false);

    param.setValue(true);
    param.setValue(null);
    expect(param.value()).toBe(false);
  });

  it("reads a number in a boolean parameter as false", () => {
    const param: Parameter<any> = new Parameter("show_close_button", true, "script");

    param.setValue(1);
    expect(param.value()).toBe(false);
  });

  it("treats boolean text as text only for boolean parameters", () => {
    expect(new Parameter("disabled", false, "script").isBooleanText(" TRUE ")).toBeTrue();
    expect(new Parameter("disabled", false, "script").isBooleanText("@local.x")).toBeFalse();
    expect(new Parameter("max_length", -1, "script").isBooleanText("TRUE")).toBeFalse();
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

    param.setValue(true);
    expect(param.value()).toBe(-1);
  });

  it("keeps values as they are when the default is null", () => {
    const param: Parameter<any> = new Parameter("help", null);

    param.setValue("Some help");
    param.setValue(5);
    expect(param.value()).toBe(5);
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
