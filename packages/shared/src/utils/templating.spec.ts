import * as Templating from "./templating";

interface ITestData {
  input: any; // Source data for evaluation
  output: any; // Expected end parsed data
  intermediate?: Templating.ITemplatedStringVariable; // Expected intermediate extracted values
}

/** This context is applied to all tests. Input will be processed for subsitition into output */
const context = {
  input: {
    row: {
      first_name: "Bob",
      last_name: "Smith",
      firstname_lookup_field: "first_name",
      Bob_Smith: "Bob_Smith Lookup Row",
    },
  },
  output: {
    "@row": {
      first_name: "Bob",
      last_name: "Smith",
      firstname_lookup_field: "first_name",
      Bob_Smith: "Bob_Smith Lookup Row",
    },
    "@row.first_name": "Bob",
    "@row.last_name": "Smith",
    "@row.firstname_lookup_field": "first_name",
    "@row.Bob_Smith": "Bob_Smith Lookup Row",
  },
};

/**
 * Each set of inputs will be evaluated to see if they match the output when parsed
 * An intermediate value exists for debugging purposes (output of extraction process)
 */
const tests: ITestData[] = [
  // Concatenation
  {
    input: "Hello {@row.first_name}-{@row.last_name}",
    output: "Hello Bob-Smith",
    intermediate: {
      value: "Hello [$1]-[$2]",
      variables: {
        "[$1]": { value: "@row.first_name" },
        "[$2]": { value: "@row.last_name" },
      },
    },
  },
  // Recursive lookup
  {
    input: "{@row.{@row.firstname_lookup_field}}",
    output: "Bob",
    intermediate: {
      value: "[$1]",
      variables: {
        "[$1]": {
          value: "@row.[$1.1]",
          variables: {
            "[$1.1]": {
              value: "@row.firstname_lookup_field",
            },
          },
        },
      },
    },
  },
  // Recursive lookup with concatenation
  {
    input: "{@row.{@row.first_name}_{@row.last_name}}",
    output: "Bob_Smith Lookup Row",
    intermediate: {
      value: "[$1]",
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
  // Text with curly braces but no templated data
  {
    input: "{non-dynamic}",
    output: "{non-dynamic}",
    intermediate: {
      value: "{non-dynamic}",
    },
  },
  // JSON objects and arrays
  {
    input: {
      string: "@row.first_name",
      array: ["@row.first_name", "@row.last_name"],
      nested: { string: "@row.last_name" },
    },
    output: {
      string: "Bob",
      array: ["Bob", "Smith"],
      nested: { string: "Smith" },
    },
    intermediate: {}, // not currently used
  },
  // Legacy concatenation (append missing bit)
  {
    input: "@row.first_name.sent.2",
    output: "Bob.sent.2",
  },
  // Missing values are not replaced
  {
    input: "@row.missing",
    output: "@row.missing",
  },
];

describe("Templating", () => {
  // Use a function wrapper to allow looping tests
  function execTest(testData: ITestData) {
    const { input, output } = testData;
    it(JSON.stringify(input), () => {
      const parser = new Templating.TemplatedData({ context: context.input, initialValue: input });

      const parsedValue = parser.parse();

      expect(parsedValue).toEqual(output);
      process.nextTick(() => console.log(`      ${JSON.stringify(parsedValue)}\n`));
      // NOTE - in case of errors additional tests can be carried out just on intermediate
    });
  }

  // Test context replacements
  it("Generates context replacments", () => {
    const { parsedContext } = new Templating.TemplatedData({ context: context.input });
    expect(parsedContext).toEqual(context.output);
    // process.nextTick(() => console.log(`\n${JSON.stringify(parsedContext, null, 2)}\n`));
  });

  // Test individual string parsing
  for (const testData of tests) {
    execTest(testData);
  }
});
