import { defineAuthorParameterSchema, parseTemplateParameterList } from "./parameter-list.utils"; // adjust path

const getTestSchema = () =>
  defineAuthorParameterSchema((coerce) => ({
    allowed_values_param: coerce.allowedValues(["v1", "v2"], "v1"),
    any_param: coerce.any({}),
    boolean_param: coerce.boolean(),
    comma_list_param: coerce.commaSeparatedList(),
    custom_param: coerce.custom((v) => v.split("-").map(Number), []),
    number_param: coerce.number(-1),
    string_param: coerce.string("fallback"),
  }));

/**
 * Call standalone tests via:
 * yarn ng test --include src/app/shared/components/template/utils/parameter-list.utils.spec.ts
 */
describe("defineAuthorParameterSchema", () => {
  let schema: ReturnType<typeof getTestSchema>;

  beforeEach(() => {
    schema = getTestSchema();
  });

  it("coerce allowed_values", () => {
    const { allowed_values_param } = schema.parse({
      allowed_values_param: "not_allowed",
    });
    expect(allowed_values_param).toEqual("v1");
    // fallback
    expect(schema.parse({}).allowed_values_param).toEqual("v1");
  });

  it("coerce boolean", () => {
    expect(schema.parse({ boolean_param: " TrUe " }).boolean_param).toEqual(true);
    expect(schema.parse({ boolean_param: 1 }).boolean_param).toEqual(false);
    // fallback
    expect(schema.parse({}).boolean_param).toEqual(false);
  });

  it("coerce commaSeparatedList", () => {
    const { comma_list_param } = schema.parse({
      comma_list_param: "a, b , c",
    });
    expect(comma_list_param).toEqual(["a", "b", "c"]);
    // fallback
    expect(schema.parse({}).comma_list_param).toEqual([]);
  });

  it("coerce custom", () => {
    const customStr = "1-2-3-4";
    const { custom_param } = schema.parse({
      custom_param: customStr,
    });
    expect(custom_param).toEqual([1, 2, 3, 4]);
    // fallback
    expect(schema.parse({}).custom_param).toEqual([]);
  });

  it("coerce number", () => {
    const { number_param } = schema.parse({ number_param: "42" });
    expect(number_param).toEqual(42);
    // fallback
    expect(schema.parse({}).number_param).toEqual(-1);
  });

  it("coerce string", () => {
    const { string_param } = schema.parse({ string_param: "hello" });
    expect(string_param).toEqual("hello");
    // fallback
    expect(schema.parse({}).string_param).toEqual("fallback");
  });

  it("coerce any", () => {
    const obj = { a: 1 };
    const { any_param } = schema.parse({ any_param: obj });
    expect(any_param).toEqual({ a: 1 });
    // fallback
    expect(schema.parse({}).any_param).toEqual({});
  });
});

describe("parseTemplateParameterList", () => {
  let schema: ReturnType<typeof getTestSchema>;

  beforeEach(() => {
    schema = getTestSchema();
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
});
