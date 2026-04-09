import { HttpCacheAdapterFile } from "./file.adapter";
import { Directory } from "@capacitor/filesystem";
import { Capacitor } from "@capacitor/core";

/**
 * Call standalone tests via:
 * yarn ng test --include src/app/shared/services/http/cache/adapters/file.adapter.spec.ts
 */
describe("HttpCacheAdapterFile", () => {
  let adapter: HttpCacheAdapterFile;
  let mockFs: any;

  beforeEach(() => {
    jasmine.getEnv().allowRespy(true);

    mockFs = {
      mkdir: jasmine.createSpy("mkdir").and.resolveTo(undefined),
      readdir: jasmine.createSpy("readdir").and.resolveTo({ files: [] }),
      stat: jasmine.createSpy("stat").and.resolveTo({}),
      getUri: jasmine
        .createSpy("getUri")
        .and.resolveTo({ uri: "file://path/test-cache/test.data" }),
      deleteFile: jasmine.createSpy("deleteFile").and.resolveTo({}),
      writeFile: jasmine.createSpy("writeFile").and.resolveTo({ uri: "file://path" }),
      readFile: jasmine.createSpy("readFile").and.resolveTo({ data: "" }),
    };

    spyOn(Capacitor, "convertFileSrc").and.callFake((uri: string) => `converted-${uri}`);

    adapter = new HttpCacheAdapterFile("test-cache", mockFs);
  });

  it("should ensure folder exists", async () => {
    await (adapter as any).ensureFolder();
    expect(mockFs.mkdir).toHaveBeenCalled();
  });

  it("should list file names", async () => {
    mockFs.readdir.and.resolveTo({
      files: [{ name: "f1.data" }, { name: "f1.meta" }],
    });
    const files = await adapter.list();
    expect(files).toEqual(["f1.data", "f1.meta"]);
  });

  it("should check if file exists", async () => {
    const result = await adapter.has("test.data");
    expect(result).toBeDefined();
  });

  it("should return false if file does not exist", async () => {
    mockFs.stat.and.rejectWith(new Error("File not found"));
    expect(await adapter.has("missing")).toBeFalse();
  });

  it("should get URI for external access", async () => {
    const url = await adapter.getUrl("test.data");
    expect(url).toContain("test-cache/test.data");
  });

  it("should delete file", async () => {
    const result = await adapter.delete("test.data");
    expect(result).toBeTrue();
  });

  it("should return false if delete fails", async () => {
    mockFs.deleteFile.and.rejectWith(new Error("Fail"));
    expect(await adapter.delete("test.data")).toBeFalse();
  });

  it("should get blob via fetch using converted URI", async () => {
    const mockBlob = new Blob(["content"]);
    const mockResponse = new Response(mockBlob);

    const fetchSpy = spyOn(window, "fetch").and.resolveTo(mockResponse);

    const result = await adapter.get("test.data");
    expect(result).toEqual(mockBlob);
    expect(fetchSpy).toHaveBeenCalled();
  });

  it("should return undefined if fetch fails in get", async () => {
    spyOn(window, "fetch").and.rejectWith(new Error("Network fail"));
    const result = await adapter.get("test.data");
    expect(result).toBeUndefined();
  });

  it("should clear all entries", async () => {
    const files = ["file1", "file2"];
    spyOn(adapter, "list").and.resolveTo(files);
    spyOn(adapter, "delete").and.resolveTo(true);

    await adapter.clear();
    expect(adapter.list).toHaveBeenCalled();
    expect(adapter.delete).toHaveBeenCalledWith("file1");
    expect(adapter.delete).toHaveBeenCalledWith("file2");
  });
});
