import BaseProcessor from "./base";

import { clearLogs, getLogs } from "../utils";
import { TEST_DATA_PATHS } from "../../../../../test/helpers/utils";

const testData = [
  {
    input: "Hello",
    output: { processed: "Hello" },
  },
];

class TestProcessor extends BaseProcessor<string, any> {
  public async processInput(input: string) {
    return { processed: input };
  }
}
let processor: TestProcessor;

/** yarn workspace scripts test -t base.spec.ts */
describe("Base Processor", () => {
  beforeAll(() => {
    processor = new TestProcessor({
      namespace: "BaseProcessor",
      paths: TEST_DATA_PATHS,
      cacheVersion: new Date().getTime(),
    });
    processor.cache.clear();
  });
  afterAll(() => {
    processor.cache.clear();
  });

  it("Processes inputs", async () => {
    const inputs = testData.map((t) => t.input);
    const outputs = await processor.process(inputs);
    expect(outputs).toEqual(testData.map((t) => t.output));
  });

  it("Uses cache", () => {
    const { input, output } = testData[0];
    const cacheName = processor.cache.generateCacheEntryName(input);
    expect(processor.cache.get(cacheName)).toEqual(output);
  });
});

describe("Deferred Processor", () => {
  let errMsg = "";
  class DeferredProcessor extends BaseProcessor<any, any> {
    public async processInput(input: any) {
      let shouldDefer = input === 1 && this.outputs.length === 0;
      if (shouldDefer) {
        return this.deferInputProcess(input, input);
      }
      return input;
    }
  }
  let deferredProcessor: DeferredProcessor;
  beforeEach(() => {
    deferredProcessor = new DeferredProcessor({
      namespace: "BaseProcessor",
      paths: TEST_DATA_PATHS,
      cacheVersion: new Date().getTime(),
    });
    deferredProcessor.cache.clear();
  });
  afterAll(() => {
    deferredProcessor.cache.clear();
  });
  it("Defers processing", async () => {
    const outputs = await deferredProcessor.process([1, 2]);
    expect(outputs).toEqual([2, 1]);
  });
  it("Limits max defer", async () => {
    clearLogs();
    await deferredProcessor.process([1]);
    const errorLogs = getLogs("error");
    expect(errorLogs).toEqual([
      {
        source: "BaseProcessor",
        message: "Max defer limit reached",
        details: 1,
        level: "error",
      },
    ]);
  });
});
