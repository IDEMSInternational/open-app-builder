import { jsComparisonToMangoQuery } from "./rxdb.utils";

/**
 * yarn workspace shared test --filter "RXDB Utils"
 */
describe("RXDB Utils", function () {
  it("should convert a numeric greater than comparison", function () {
    const js = "n > 2";
    const expectedMango = {
      n: {
        $gt: 2,
      },
    };
    expect(jsComparisonToMangoQuery(js)).toEqual(expectedMango);
  });

  it("should convert a numeric less than comparison", function () {
    const js = "age < 30";
    const expectedMango = {
      age: {
        $lt: 30,
      },
    };
    expect(jsComparisonToMangoQuery(js)).toEqual(expectedMango);
  });

  it("should convert a numeric greater than or equal to comparison", function () {
    const js = "level >= 5";
    const expectedMango = {
      level: {
        $gte: 5,
      },
    };
    expect(jsComparisonToMangoQuery(js)).toEqual(expectedMango);
  });

  it("should convert a numeric less than or equal to comparison", function () {
    const js = "score <= 95";
    const expectedMango = {
      score: {
        $lte: 95,
      },
    };
    expect(jsComparisonToMangoQuery(js)).toEqual(expectedMango);
  });

  it("should convert a numeric strict equality comparison", function () {
    const js = "count === 100";
    const expectedMango = {
      count: {
        $eq: 100,
      },
    };
    expect(jsComparisonToMangoQuery(js)).toEqual(expectedMango);
  });

  it("should convert a numeric strict inequality comparison", function () {
    const js = "isActive !== 0";
    const expectedMango = {
      isActive: {
        $ne: 0,
      },
    };
    expect(jsComparisonToMangoQuery(js)).toEqual(expectedMango);
  });

  it("should convert a string strict equality comparison with double quotes", function () {
    const js = 'name === "bob"';
    const expectedMango = {
      name: {
        $eq: "bob",
      },
    };
    expect(jsComparisonToMangoQuery(js)).toEqual(expectedMango);
  });

  it("should convert a string strict equality comparison with single quotes", function () {
    const js = "city === 'London'";
    const expectedMango = {
      city: {
        $eq: "London",
      },
    };
    expect(jsComparisonToMangoQuery(js)).toEqual(expectedMango);
  });

  it("should convert a string strict inequality comparison with double quotes", function () {
    const js = 'status !== "pending"';
    const expectedMango = {
      status: {
        $ne: "pending",
      },
    };
    expect(jsComparisonToMangoQuery(js)).toEqual(expectedMango);
  });

  it("should convert a string strict inequality comparison with single quotes", function () {
    const js = "type !== 'admin'";
    const expectedMango = {
      type: {
        $ne: "admin",
      },
    };
    expect(jsComparisonToMangoQuery(js)).toEqual(expectedMango);
  });

  it("should handle float numbers", function () {
    const js = "price > 100.50";
    const expectedMango = {
      price: {
        $gt: 100.5,
      },
    };
    expect(jsComparisonToMangoQuery(js)).toEqual(expectedMango);
  });

  it("should return null for an invalid format string", function () {
    const js = "invalid string";
    expect(jsComparisonToMangoQuery(js)).toBeNull();
  });

  it("should return null for a string with a missing operator", function () {
    const js = 'name "bob"';
    expect(jsComparisonToMangoQuery(js)).toBeNull();
  });

  it("should return null for a string with a missing value", function () {
    const js = "age > ";
    expect(jsComparisonToMangoQuery(js)).toBeNull();
  });

  it("should return null for a string with an invalid number value", function () {
    const js = "count === abc";
    expect(jsComparisonToMangoQuery(js)).toBeNull();
  });

  it("should return null for a string with an unsupported operator", function () {
    const js = 'value like "pattern"';
    expect(jsComparisonToMangoQuery(js)).toBeNull();
  });

  // Test cases for string comparison operators (less common but possible)
  it("should convert a string greater than comparison", function () {
    const js = "name > 'alice'";
    const expectedMango = { name: { $gt: "alice" } };
    expect(jsComparisonToMangoQuery(js)).toEqual(expectedMango);
  });

  it("should convert a string less than comparison", function () {
    const js = "name < 'zebra'";
    const expectedMango = { name: { $lt: "zebra" } };
    expect(jsComparisonToMangoQuery(js)).toEqual(expectedMango);
  });
});
