import { defineAuthorParameterSchema, parseTemplateParameterList } from "./parameter-list.utils"; // adjust path

const getTestSchema = () =>
  defineAuthorParameterSchema((coerce) => ({
    allowed_values_param: coerce.allowedValues(["v1", "v2"], "v1"),
    any_param: coerce.any(),
    boolean_param: coerce.boolean(),
    comma_list_param: coerce.commaSeparatedList(),
    custom_param: coerce.custom((v) => new Date(v), new Date()),
    number_param: coerce.number(-1),
    string_param: coerce.string("fallback"),
  }));

describe("defineAuthorParameterSchema", () => {
  let schema: ReturnType<typeof getTestSchema>;

  beforeEach(() => {
    schema = getTestSchema();
  });

  it("creates schema and converts snake_case to camelCase", () => {
    const parsed = schema.parse({
      string_param: "hello",
    });

    expect(parsed).toContain("stringParam");
  });

  it("coerce allowed_values", () => {
    const { allowedValuesParam } = schema.parse({ allowed_values_param: "not_allowed" });
    expect(allowedValuesParam).toEqual("v1");
  });

  it("coerce boolean", () => {
    const { booleanParam } = schema.parse({ boolean_param: " TrUe " });
    expect(booleanParam).toEqual(true);
    const { booleanParam: booleanParamFromUndefined } = schema.parse({ boolean_param: undefined });
    expect(booleanParamFromUndefined).toEqual(false);
  });
});
