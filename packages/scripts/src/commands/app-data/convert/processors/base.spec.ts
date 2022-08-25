import path from "path";
import BaseProcessor from "./base";

import { SCRIPTS_WORKSPACE_PATH } from "../../../../paths";
const testDataDir = path.resolve(SCRIPTS_WORKSPACE_PATH, "test", "data");
const paths = {
  SHEETS_CACHE_FOLDER: path.resolve(testDataDir, "cache"),
  SHEETS_INPUT_FOLDER: path.resolve(testDataDir, "input"),
  SHEETS_OUTPUT_FOLDER: path.resolve(testDataDir, "output"),
};

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
describe("Base Processor", () => {
  beforeAll(() => {
    processor = new TestProcessor({ namespace: "BaseProcessor", paths });
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
