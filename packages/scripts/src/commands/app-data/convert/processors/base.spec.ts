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
  public processInput(input: string) {
    return { processed: input };
  }
}
const processor = new TestProcessor({ namespace: "BaseProcessor", paths });

describe("Base Processor", () => {
  it("Processes inputs", () => {
    const inputs = testData.map((t) => t.input);
    const outputs = processor.process(inputs);
    expect(outputs).toEqual(testData.map((t) => t.output));
  });

  it("Uses cache", () => {
    const { input, output } = testData[0];
    const cacheName = processor.cache.generateCacheEntryName(input);
    expect(processor.cache.get(cacheName)).toEqual(output);
  });
});
