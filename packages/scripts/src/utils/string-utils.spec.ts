import * as StringUtils from "./string-utils";

describe("extractTemplatedString", () => {
  const tests = [
    {
      text: "Hello {@row.first_name}-{@row.last_name}",
      expected: {
        value: "Hello [1]-[2]",
        variables: {
          "[1]": { value: "@row.first_name" },
          "[2]": { value: "@row.last_name" },
        },
      },
    },
    {
      text: "Hello {@row.{@row.name_field}}",
      expected: {
        value: "Hello [1]",
        variables: {
          "[1]": {
            value: "@row.[1.1]",
            variables: {
              "[1.1]": {
                value: "@row.name_field",
              },
            },
          },
        },
      },
    },
    {
      text: "Hello {@row.first_name} {@row.{@row.name_field}}",
      expected: {
        value: "Hello [1] [2]",
        variables: {
          "[1]": {
            value: "@row.first_name",
          },
          "[2]": {
            value: "@row.[2.1]",
            variables: {
              "[2.1]": {
                value: "@row.name_field",
              },
            },
          },
        },
      },
    },
  ];

  // Use a function wrapper to allow looping tests
  function execTest(text: string, expected: any) {
    it(text, () => {
      const output = StringUtils.extractTemplatedString(text);
      expect(output).toEqual(expected as any);
    });
  }
  for (const { text, expected } of tests) {
    execTest(text, expected);
  }
});
