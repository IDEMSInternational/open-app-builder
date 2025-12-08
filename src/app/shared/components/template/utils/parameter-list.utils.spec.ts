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
    object_array_param: coerce.objectArray<{ key1: string; key2: string }>([
      { key1: "default1", key2: "default2" },
    ]),
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

  it("coerce objectArray", () => {
    const testSchema = MOCK_SCHEMA().pick({ object_array_param: true });
    const fallback = [{ key1: "default1", key2: "default2" }];

    // from string format: 'key_1: value_1_a | key_2: value_2_a; key_1: value_1_b | key_2: value_2_b'
    const { object_array_param: parsed1 } = testSchema.parse({
      object_array_param: "key1: value1_a | key2: value2_a; key1: value1_b | key2: value2_b",
    });
    expect(parsed1).toEqual([
      { key1: "value1_a", key2: "value2_a" },
      { key1: "value1_b", key2: "value2_b" },
    ]);

    // from string with whitespace trimming
    const { object_array_param: parsed2 } = testSchema.parse({
      object_array_param: " key1 : value1 | key2 : value2 ",
    });
    expect(parsed2).toEqual([{ key1: "value1", key2: "value2" }]);

    // from string with values containing colons
    const { object_array_param: parsed3 } = testSchema.parse({
      object_array_param: "key1: value:with:colons | key2: normal_value",
    });
    expect(parsed3).toEqual([{ key1: "value:with:colons", key2: "normal_value" }]);

    // pre-parsed array
    const preParsed = [
      { key1: "pre1", key2: "pre2" },
      { key1: "pre3", key2: "pre4" },
    ];
    expect(testSchema.parse({ object_array_param: preParsed }).object_array_param).toEqual(
      preParsed
    );

    // hashmap object
    const hashmap = {
      id1: { key1: "h1", key2: "h2" },
      id2: { key1: "h3", key2: "h4" },
    };
    expect(testSchema.parse({ object_array_param: hashmap }).object_array_param).toEqual([
      { key1: "h1", key2: "h2" },
      { key1: "h3", key2: "h4" },
    ]);

    // fallback when undefined
    expect(testSchema.parse({}).object_array_param).toEqual(fallback);

    // fallback when string doesn't match format (no colons)
    expect(testSchema.parse({ object_array_param: "invalid format" }).object_array_param).toEqual(
      fallback
    );

    // fallback when empty string
    expect(testSchema.parse({ object_array_param: "" }).object_array_param).toEqual(fallback);
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
      "objectArrayParam",
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
      objectArrayParam: [{ key1: "default1", key2: "default2" }],
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
          "object_array_param",
          "string_param",
        ],
      },
    ]);
  });
});
