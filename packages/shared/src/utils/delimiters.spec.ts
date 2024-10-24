import type { ITemplatedStringVariable } from "../types";
import * as Delimiters from "./delimiters";

interface IDelimitedTestData {
  input: string;
  delimited: string;
}

const prefixes = ["row", "local"];
const stringDelimiterTests: IDelimitedTestData[] = [
  // basic
  {
    input: "Name: @row.first_name",
    delimited: "Name: {@row.first_name}",
  },
  // multiple
  {
    input: "@row.first_name @row.last_name",
    delimited: "{@row.first_name} {@row.last_name}",
  },
  // mixed contexts
  {
    input: "@row.first_name @local.name",
    delimited: "{@row.first_name} {@local.name}",
  },
  // nested
  {
    input: "@row.@row.first_name",
    delimited: "{@row.{@row.first_name}}",
  },
  // mixed
  {
    input: "@row.{@row.first_name}",
    delimited: "{@row.{@row.first_name}}",
  },
  // ignore
  {
    input: "{@row.last_name}_completed",
    delimited: "{@row.last_name}_completed",
  },
];

interface IParseTestData {
  delimited: string;
  extracted: ITemplatedStringVariable;
}

/**
 * yarn workspace shared test --filter "addStringDelimiters"
 */
describe("addStringDelimiters", () => {
  // Test individual string parsing
  for (const testData of stringDelimiterTests) {
    execTest(testData);
  }

  // Use a function wrapper to allow looping tests
  function execTest(testData: IDelimitedTestData) {
    const { input, delimited } = testData;

    it(JSON.stringify(input), () => {
      const parsedValue = Delimiters.addStringDelimiters(input, prefixes);
      expect(parsedValue).toEqual(delimited);
      process.nextTick(() => console.log(`      ${JSON.stringify(parsedValue)}\n`));
      // NOTE - in case of errors additional tests can be carried out just on intermediate
    });
  }
});

const jsDelimterTests: IDelimitedTestData[] = [
  // basic
  {
    input: "@row.first_name",
    delimited: "this.row.first_name",
  },

  // expression
  {
    input: "@row.first_name === 'Ada'",
    delimited: "this.row.first_name === 'Ada'",
  },
  // mixed context expressions
  {
    input: "@row.number_1 > @local.number_2",
    delimited: "this.row.number_1 > this.local.number_2",
  },

  // nested
  {
    input: "@row.@row.first_name",
    delimited: "this.row[this.row.first_name]",
  },

  // nested with braces
  {
    input: "@row.{@row.first_name}",
    delimited: "this.row[this.row.first_name]",
  },
  // invalid (will need to be parsed as templated string)
  {
    input: "Hello @row.first_name @row.last_name",
    delimited: "Hello this.row.first_name this.row.last_name",
  },
];

interface IParseTestData {
  delimited: string;
  extracted: ITemplatedStringVariable;
}

describe("addJSDelimiters", () => {
  // Test individual string parsing
  for (const testData of jsDelimterTests) {
    execTest(testData);
  }

  // Use a function wrapper to allow looping tests
  function execTest(testData: IDelimitedTestData) {
    const { input, delimited } = testData;

    it(JSON.stringify(input), () => {
      const parsedValue = Delimiters.addJSDelimiters(input, prefixes);
      expect(parsedValue).toEqual(delimited);
      process.nextTick(() => console.log(`      ${JSON.stringify(parsedValue)}\n`));
      // NOTE - in case of errors additional tests can be carried out just on intermediate
    });
  }
});

const parseTests: IParseTestData[] = [
  // basic
  {
    delimited: "{@row.first_name}",
    extracted: { value: "[$1]", variables: { "[$1]": { value: "@row.first_name" } } },
  },
  // nested
  {
    delimited: "{@row.{@row.first_name}}",
    extracted: {
      value: "[$1]",
      variables: {
        "[$1]": {
          value: "@row.[$1.1]",
          variables: {
            "[$1.1]": { value: "@row.first_name" },
          },
        },
      },
    },
  },
  // nested concatenated
  {
    delimited: "{@row.{@row.first_name}_{@row.last_name}}",
    extracted: {
      value: "[$1]",
      variables: {
        "[$1]": {
          value: "@row.[$1.1]_[$1.2]",
          variables: {
            "[$1.1]": { value: "@row.first_name" },
            "[$1.2]": { value: "@row.last_name" },
          },
        },
      },
    },
  },
  // mixed contexts (rows parsed, fields ignored)
  {
    delimited: "{@fields.{@row.first_name}}",
    extracted: {
      value: "{[$1]}",
      variables: {
        "[$1]": {
          value: "@fields.[$1.1]",
          variables: {
            "[$1.1]": { value: "@row.first_name" },
          },
        },
      },
    },
  },
];

describe("Parses delimiters", () => {
  // Test individual string parsing
  for (const testData of parseTests) {
    execTest(testData);
  }

  // Use a function wrapper to allow looping tests
  function execTest(testData: IParseTestData) {
    const { delimited, extracted } = testData;
    if (extracted) {
      it(JSON.stringify(delimited), () => {
        const parsed = Delimiters.extractDelimitedTemplateString({ value: delimited }, ["row"]);
        expect(parsed).toEqual(extracted);
        process.nextTick(() => console.log(`      ${JSON.stringify(parsed)}\n`));
        // NOTE - in case of errors additional tests can be carried out just on intermediate
      });
    }
  }
});
