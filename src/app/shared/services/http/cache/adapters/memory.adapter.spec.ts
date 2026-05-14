import { HttpCacheAdapterMemory } from "./memory.adapter";

/**
 * Call standalone tests via:
 * yarn ng test --include src/app/shared/services/http/cache/adapters/memory.adapter.spec.ts
 */
describe("HttpCacheAdapterMemory", () => {
  let adapter: HttpCacheAdapterMemory;

  beforeEach(() => {
    adapter = new HttpCacheAdapterMemory();
  });

  it("should check if file exists", async () => {
    expect(await adapter.has("test")).toBeFalse();
    await adapter.set("test", new Blob(["data"]));
    expect(await adapter.has("test")).toBeTrue();
  });

  it("should get file as Blob", async () => {
    const mockBlob = new Blob(["data"]);
    await adapter.set("test", mockBlob);

    const result = await adapter.get("test");
    expect(result).toBe(mockBlob);
  });

  it("should return undefined if file doesn't exist", async () => {
    expect(await adapter.get("test")).toBeUndefined();
  });

  it("should return a URL for a created file", async () => {
    const mockBlob = new Blob(["data"]);
    await adapter.set("test", mockBlob);

    const url = await adapter.getUrl("test");
    expect(url).toBeDefined();
    expect(url?.startsWith("blob:")).toBeTrue();
  });

  it("should return undefined URL if file doesn't exist", async () => {
    expect(await adapter.getUrl("test")).toBeUndefined();
  });

  it("should set file content", async () => {
    const content = new Blob(["hello"]);
    const result = await adapter.set("test", content);

    expect(result).toBeTrue();
    expect(await adapter.get("test")).toBe(content);
  });

  it("should delete entry", async () => {
    await adapter.set("test", new Blob(["123"]));
    expect(await adapter.delete("test")).toBeTrue();
    expect(await adapter.has("test")).toBeFalse();
  });

  it("should return false if deleting non-existent entry", async () => {
    expect(await adapter.delete("test")).toBeFalse();
  });

  it("should list entries", async () => {
    await adapter.set("a", new Blob([""]));
    await adapter.set("b", new Blob([""]));
    await adapter.set("c", new Blob([""]));

    const result = await adapter.list();
    expect(result.length).toBe(3);
    expect(result).toContain("a");
    expect(result).toContain("b");
    expect(result).toContain("c");
  });

  it("should clear all entries", async () => {
    await adapter.set("file1", new Blob([""]));
    await adapter.set("file2", new Blob([""]));

    await adapter.clear();

    const result = await adapter.list();
    expect(result.length).toBe(0);
    expect(await adapter.has("file1")).toBeFalse();
    expect(await adapter.has("file2")).toBeFalse();
  });
});
