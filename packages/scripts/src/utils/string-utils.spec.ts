import * as StringUtils from "./string-utils";

describe("extractTemplatedString", () => {
  const tests = [
    {
      text: "1. {@row.first_name}-{@row.last_name}",
      expected: {
        value: "1. [$1]-[$2]",
        variables: {
          "[$1]": { value: "@row.first_name" },
          "[$2]": { value: "@row.last_name" },
        },
      },
    },
    {
      text: "2. {@row.{@row.name_field}}",
      expected: {
        value: "2. [$1]",
        variables: {
          "[$1]": {
            value: "@row.[$1.1]",
            variables: {
              "[$1.1]": {
                value: "@row.name_field",
              },
            },
          },
        },
      },
    },
    {
      text: "3. {@row.first_name} {@row.{@row.name_field}}",
      expected: {
        value: "3. [$1] [$2]",
        variables: {
          "[$1]": {
            value: "@row.first_name",
          },
          "[$2]": {
            value: "@row.[$2.1]",
            variables: {
              "[$2.1]": {
                value: "@row.name_field",
              },
            },
          },
        },
      },
    },
    {
      text: "4. {@row.{@row.first_name}_{@row.last_name}}",
      expected: {
        value: "4. [$1]",
        variables: {
          "[$1]": {
            value: "@row.[$1.1]_[$1.2]",
            variables: {
              "[$1.1]": {
                value: "@row.first_name",
              },
              "[$1.2]": {
                value: "@row.last_name",
              },
            },
          },
        },
      },
    },
    {
      text: "5. {non-dynamic}",
      expected: {
        value: "5. {non-dynamic}",
      },
    },
  ];

  // Use a function wrapper to allow looping tests
  function execTest(text: string, expected: any) {
    it(text, () => {
      const output = StringUtils.extractTemplatedString(text);
      expect(output.value).toEqual(expected.value);
      expect(output.variables).toEqual(expected.variables);
    });
  }

  for (const { text, expected } of tests) {
    execTest(text, expected);
  }
});
