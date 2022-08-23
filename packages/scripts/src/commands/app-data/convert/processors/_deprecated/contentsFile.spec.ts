import { DeprecatedContentsFileProcessor } from "./contentsFile";

describe("Contents File Processor", () => {
  it("Compares server and cache contents", () => {
    const testConverterVersion = 2;
    const processor = new DeprecatedContentsFileProcessor<any>(testConverterVersion);
    const actions = processor.compare(
      // E.g. Server
      {
        "1.xlsx": { modifiedTime: "2022-01-02", name: "1" },
        "2.xlsx": { modifiedTime: "2022-01-02", name: "2" },
        "3.xlsx": { modifiedTime: "2022-01-02", name: "3" },
      },
      // E.g. Cache
      {
        "2.xlsx": { modifiedTime: "2022-01-02", name: "2", converterVersion: 1 },
        "3.xlsx": { modifiedTime: "2022-01-02", name: "3", converterVersion: testConverterVersion },
        "4.xlsx": { modifiedTime: "2021-12-30", name: "4" },
      }
    );
    const { CREATE, DELETE, IGNORE } = actions;
    console.log(actions);
    // Create files where modified time or converter version changed
    const expectCreated = [
      { modifiedTime: "2022-01-02", name: "1" },
      { modifiedTime: "2022-01-02", name: "2" },
    ];
    expect(CREATE).toEqual(expectCreated);
    const expectDeleted = [{ modifiedTime: "2021-12-30", name: "4" }];
    expect(DELETE).toEqual(expectDeleted);
    const expectIgnored = [{ modifiedTime: "2022-01-02", name: "3" }];
    expect(IGNORE).toEqual(expectIgnored);
  });
});
