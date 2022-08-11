import * as Templating from "./templating";

interface ITestData {
  input: string; // Source string for evaluation
  output: string; // Expected end parsed string
  intermediate: Templating.ITemplatedStringVariable; // Expected intermediate extracted values
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
  {
    input: "1. {@row.first_name}-{@row.last_name}",
    output: "1. Bob-Smith",
    intermediate: {
      value: "1. [$1]-[$2]",
      variables: {
        "[$1]": { value: "@row.first_name" },
        "[$2]": { value: "@row.last_name" },
      },
    },
  },
  {
    input: "2. {@row.{@row.firstname_lookup_field}}",
    output: "2. Bob",
    intermediate: {
      value: "2. [$1]",
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
  {
    input: "3. {@row.first_name} {@row.{@row.firstname_lookup_field}}",
    output: "3. Bob Bob",
    intermediate: {
      value: "3. [$1] [$2]",
      variables: {
        "[$1]": {
          value: "@row.first_name",
        },
        "[$2]": {
          value: "@row.[$2.1]",
          variables: {
            "[$2.1]": {
              value: "@row.firstname_lookup_field",
            },
          },
        },
      },
    },
  },
  {
    input: "4. {@row.{@row.first_name}_{@row.last_name}}",
    output: "4. Bob_Smith Lookup Row",
    intermediate: {
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
    input: "5. {non-dynamic}",
    output: "5. {non-dynamic}",
    intermediate: {
      value: "5. {non-dynamic}",
    },
  },
];

describe("Templating", () => {
  // Use a function wrapper to allow looping tests
  function execTest(testData: ITestData) {
    const { input, output } = testData;
    it(input, () => {
      const parsed = Templating.parseTemplatedString(input, context.input);
      expect(parsed).toEqual(output);
      process.nextTick(() => console.log(`      ${parsed}\n`));
      // NOTE - in case of errors additional tests can be carried out just on intermediate
    });
  }

  // Test context replacements
  const parsed = Templating.generateContextReplacements(context.input);
  it("Generates context replacments", () => {
    expect(parsed).toEqual(context.output);
    // process.nextTick(() => console.log(`\n${JSON.stringify(parsed, null, 2)}\n`));
  });

  // Test individual string parsing
  for (const testData of tests) {
    execTest(testData);
  }
});
