import { defineAuthorParameterSchema, parseTemplateParameterList } from "./parameter-list.utils"; // adjust path

const MOCK_SCHEMA = () =>
  defineAuthorParameterSchema((coerce) => ({
    allowed_values_param: coerce.allowedValues(["v1", "v2"], "v1"),
    any_param: coerce.any({}),
    boolean_param: coerce.boolean(),
    comma_list_param: coerce.commaSeparatedList(),
    custom_param: coerce.custom<number[]>((v) => {
      if (Array.isArray(v)) return v;
      return v.split("-").map(Number);
    }, []),
    number_param: coerce.number(-1),
    string_param: coerce.string("fallback"),
  }));

/**
 * Call standalone tests via:
 * yarn ng test --include src/app/shared/components/template/utils/parameter-list.utils.spec.ts
 */
describe("parameter_list utils - coerce", () => {
  it("coerce allowed_values", () => {
    const consoleSpy = spyOn(console, "warn");
    const testSchema = MOCK_SCHEMA().pick({ allowed_values_param: true });
    // from string (not allowed value)
    const { allowed_values_param } = testSchema.parse({
      allowed_values_param: "not_allowed",
    });
    expect(allowed_values_param).toEqual("v1");

    // with console warning
    expect(consoleSpy).toHaveBeenCalledTimes(1);
    expect(consoleSpy.calls.first().args).toEqual([
      "[Parameter List] invalid value",
      {
        value: "not_allowed",
        allowed: ["v1", "v2"],
        default: "v1",
      },
    ]);
    // fallback
    expect(testSchema.parse({}).allowed_values_param).toEqual("v1");
  });

  it("coerce boolean", () => {
    const testSchema = MOCK_SCHEMA().pick({ boolean_param: true });
    // from string
    expect(testSchema.parse({ boolean_param: " TrUe " }).boolean_param).toEqual(true);
    expect(testSchema.parse({ boolean_param: "1" }).boolean_param).toEqual(false);
    // pre-parsed
    expect(testSchema.parse({ boolean_param: true }).boolean_param).toEqual(true);
    // fallback
    expect(testSchema.parse({}).boolean_param).toEqual(false);
  });

  it("coerce commaSeparatedList", () => {
    const testSchema = MOCK_SCHEMA().pick({ comma_list_param: true });
    // from string
    expect(
      testSchema.parse({
        comma_list_param: "a, b , c",
      }).comma_list_param
    ).toEqual(["a", "b", "c"]);
    // pre-parsed
    expect(testSchema.parse({ comma_list_param: ["a", "b"] }).comma_list_param).toEqual(["a", "b"]);
    // fallback
    expect(testSchema.parse({}).comma_list_param).toEqual([]);
  });

  it("coerce custom", () => {
    const testSchema = MOCK_SCHEMA().pick({ custom_param: true });
    // from string
    const { custom_param } = testSchema.parse({
      custom_param: "1-2-3-4",
    });
    expect(custom_param).toEqual([1, 2, 3, 4]);
    // pre-parsed
    expect(testSchema.parse({ custom_param: [1, 2, 3, 4] }).custom_param).toEqual([1, 2, 3, 4]);
    // fallback
    expect(testSchema.parse({}).custom_param).toEqual([]);
  });

  it("coerce number", () => {
    const testSchema = MOCK_SCHEMA().pick({ number_param: true });
    // from string
    expect(testSchema.parse({ number_param: "42" }).number_param).toEqual(42);
    // pre-parsed
    expect(testSchema.parse({ number_param: 5 }).number_param).toEqual(5);
    // fallback
    expect(testSchema.parse({}).number_param).toEqual(-1);
  });

  it("coerce string", () => {
    const testSchema = MOCK_SCHEMA().pick({ string_param: true });
    // from string
    expect(testSchema.parse({ string_param: "hello" }).string_param).toEqual("hello");
    // fallback
    expect(testSchema.parse({}).string_param).toEqual("fallback");
  });

  it("coerce any", () => {
    const testSchema = MOCK_SCHEMA().pick({ any_param: true });
    const { any_param } = testSchema.parse({ any_param: { a: 1 } });
    expect(any_param).toEqual({ a: 1 });
    // fallback
    expect(testSchema.parse({}).any_param).toEqual({});
  });
});

describe("parameter_list utils - parse", () => {
  let schema: ReturnType<typeof MOCK_SCHEMA>;

  beforeEach(() => {
    schema = MOCK_SCHEMA();
  });

  it("converts snake_case to camelCase", () => {
    const result = parseTemplateParameterList(undefined, schema);
    expect(Object.keys(result)).toEqual([
      "allowedValuesParam",
      "anyParam",
      "booleanParam",
      "commaListParam",
      "customParam",
      "numberParam",
      "stringParam",
    ]);
  });

  it("parses parameter list with default values", () => {
    const result = parseTemplateParameterList(undefined, schema);
    expect(result).toEqual({
      allowedValuesParam: "v1",
      anyParam: {},
      booleanParam: false,
      commaListParam: [],
      customParam: [],
      numberParam: -1,
      stringParam: "fallback",
    });
  });

  it("warns if invalid keys passed from parameter_list", () => {
    const consoleSpy = spyOn(console, "warn");
    parseTemplateParameterList({ invalid_key: "value" }, schema);
    expect(consoleSpy).toHaveBeenCalledTimes(1);
    expect(consoleSpy.calls.first().args).toEqual([
      '[Parameter List] Invalid Property: "invalid_key"',
      {
        allowedKeys: [
          "allowed_values_param",
          "any_param",
          "boolean_param",
          "comma_list_param",
          "custom_param",
          "number_param",
          "string_param",
        ],
      },
    ]);
  });
});
