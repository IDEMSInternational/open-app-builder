import BaseProcessor from "./base";

import { clearLogs, getLogs } from "../utils";
import { MockJsonFileCache } from "../cacheStrategy/jsonFile.mock";

const testData = [{ string: "Hello" }];

class TestProcessor extends BaseProcessor<any, any> {
  public async processInput(input: string) {
    return { processed: input };
  }
}
let processor: TestProcessor;

// yarn workspace scripts test -t base.spec.ts
describe("Base Processor", () => {
  beforeEach(() => {
    processor = new TestProcessor({
      namespace: "BaseProcessor",
      cache: new MockJsonFileCache(),
    });
    processor.cache.configure("baseProcessor", 1);
  });

  it("Processes inputs", async () => {
    const outputs = await processor.process(testData);
    expect(outputs.length).toEqual(1);
    expect(outputs[0]).toEqual({ processed: { string: "Hello" } });
  });

  it("Uses cache", async () => {
    const cacheName = processor.generateCacheEntryName(testData[0]);
    await processor.process(testData);
    expect(processor.cache.get(cacheName)).toBeTruthy();
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
      cache: new MockJsonFileCache(),
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
