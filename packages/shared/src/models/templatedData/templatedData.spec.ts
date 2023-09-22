import { TemplatedData } from "./templatedData";

interface ITestData {
  input: any; // Source data for evaluation
  output: any; // Expected end parsed data
}

/** This context is applied to all tests. Input will be processed for subsitition into output */
const context = {
  input: {
    row: {
      first_name: "Ada",
      last_name: "Lovelace",
      firstname_lookup_field: "first_name",
      Ada_Lovelace: "Ada_Lovelace Lookup Row",
      full_name: "@row.first_name @row.last_name",
    },
  },
  output: {
    "@row": {
      first_name: "Ada",
      last_name: "Lovelace",
      firstname_lookup_field: "first_name",
      Ada_Lovelace: "Ada_Lovelace Lookup Row",
      full_name: "@row.first_name @row.last_name",
    },
    "@row.first_name": "Ada",
    "@row.last_name": "Lovelace",
    "@row.firstname_lookup_field": "first_name",
    "@row.Ada_Lovelace": "Ada_Lovelace Lookup Row",
    "@row.full_name": "Ada Lovelace", // evaluated recursive context
  },
};

/**
 * Each set of inputs will be evaluated to see if they match the output when parsed
 * An intermediate value exists for debugging purposes (output of extraction process)
 */
const tests: ITestData[] = [
  // Basic delimited
  {
    input: "Hello {@row.first_name}-{@row.last_name}",
    output: "Hello Ada-Lovelace",
  },
  // Mixed contexts
  { input: "@local.@row.first_name", output: "@local.Ada" },
  // Recursive lookup
  {
    input: "{@row.{@row.firstname_lookup_field}}",
    output: "Ada",
  },
  // Recursive lookup with concatenation
  {
    input: "{@row.{@row.first_name}_{@row.last_name}}",
    output: "Ada_Lovelace Lookup Row",
  },
  // Text with curly braces but no templated data
  {
    input: "{non-dynamic}",
    output: "{non-dynamic}",
  },
  // JSON objects and arrays
  {
    input: {
      string: "@row.first_name",
      array: ["@row.first_name", "@row.last_name"],
      nested: { string: "@row.last_name" },
    },
    output: {
      string: "Ada",
      array: ["Ada", "Lovelace"],
      nested: { string: "Lovelace" },
    },
  },
  // Recursive lookup with context-dependent return
  {
    input: "@row.full_name",
    output: "Ada Lovelace",
  },
  // Legacy concatenation (append missing bit)
  {
    input: "@row.first_name.sent.2",
    output: "Ada.sent.2",
  },
  // Missing values are not replaced
  {
    input: "@row.missing",
    output: "@row.missing",
  },
  {
    input: "{@row.first_name}_{@row.last_name}_completed",
    output: "Ada_Lovelace_completed",
  },
  // Missing contexts ignored (field variables preserved, row evaluated)
  {
    input: "Text @data.workshop.{@fields.current_workshop}.title @row.first_name?",
    output: "Text @data.workshop.{@fields.current_workshop}.title Ada?",
  },
];

/**
 * Text parse method
 */
describe("Templated Data Parsing", () => {
  // Test context replacements
  it("Generates context replacments", () => {
    const { parsedContext } = new TemplatedData({ context: context.input });
    expect(parsedContext).toEqual(context.output);
    // process.nextTick(() => console.log(`\n${JSON.stringify(parsedContext, null, 2)}\n`));
  });

  // Test individual string parsing
  for (const testData of tests) {
    execTest(testData);
  }

  // Use a function wrapper to allow looping tests
  function execTest(testData: ITestData) {
    const { input, output } = testData;
    it(JSON.stringify(input), () => {
      const parser = new TemplatedData({ context: context.input, initialValue: input });
      const parsedValue = parser.parse();
      expect(parsedValue).toEqual(output);
      // process.nextTick(() => console.log(`      ${JSON.stringify(parsedValue)}\n`));
    });
  }
});

/**
 * Text extract method of
 */
describe("Templated Data Extraction", () => {
  const extractTests: ITestData[] = [
    {
      input: "hello @row.value_1 @row.value_2",
      output: { row: { value_1: true, value_2: true } },
    },
    {
      input: "hello @row.value_1.child_property",
      output: { row: { value_1: true } },
    },
    {
      input: "@unknown_prefix.value",
      output: {},
    },
    {
      input: "@row.@row.recursive_value",
      output: { row: { __recursive: true, recursive_value: true } },
    },
    {
      input: "@row.row_value @field.field_value",
      output: { row: { row_value: true }, field: { field_value: true } },
    },
    {
      input: {
        string: "hello @row.value_1",
        array: ["@row.value_2", "@row.value_3"],
        nested: { string: ["@row.value_4"] },
      },
      output: { row: { value_1: true, value_2: true, value_3: true, value_4: true } },
    },
  ];
  // Test individual string parsing
  for (const testData of extractTests) {
    execExtractTests(testData);
  }

  // Use a function wrapper to allow looping tests
  function execExtractTests(testData: ITestData) {
    const { input, output } = testData;
    it(JSON.stringify(input), () => {
      const parser = new TemplatedData();
      const parsedValue = parser.listContextVariables(input, ["row", "field"]);
      expect(parsedValue).toEqual(output);
      // process.nextTick(() => console.log(`      ${JSON.stringify(parsedValue)}\n`));
    });
  }

  it("Returns empty object when no variables exist", () => {
    const parser = new TemplatedData();
    const list = parser.listContextVariables("non-templated data", ["row"]);
    expect(list).toEqual({});
  });
});
