import { HTTPCacheAdapterOPFS } from "./opfs.adapter";

describe("HTTPCacheAdapterOPFS", () => {
  let adapter: HTTPCacheAdapterOPFS;
  let mockRoot: jasmine.SpyObj<FileSystemDirectoryHandle>;
  let mockFileHandle: jasmine.SpyObj<FileSystemFileHandle>;
  let mockWritable: jasmine.SpyObj<FileSystemWritableFileStream>;

  beforeEach(() => {
    mockWritable = jasmine.createSpyObj("FileSystemWritableFileStream", ["write", "close"]);
    mockFileHandle = jasmine.createSpyObj("FileSystemFileHandle", ["getFile", "createWritable"]);
    mockRoot = jasmine.createSpyObj("FileSystemDirectoryHandle", ["getFileHandle", "removeEntry"]);
    // The keys() method is on the directory handle but not in the standard TS lib for FileSystemDirectoryHandle sometimes
    // depending on the version, so we cast to any to mock it.
    (mockRoot as any).keys = jasmine.createSpy("keys");

    adapter = new HTTPCacheAdapterOPFS(mockRoot);
  });

  it("should check if file exists using getFileHandle", async () => {
    mockRoot.getFileHandle.and.resolveTo(mockFileHandle);
    expect(await adapter.has("test")).toBeTrue();
    expect(mockRoot.getFileHandle).toHaveBeenCalledWith("test");
  });

  it("should return false if getFileHandle throws", async () => {
    mockRoot.getFileHandle.and.rejectWith(new Error("Not found"));
    expect(await adapter.has("test")).toBeFalse();
  });

  it("should get file as Blob", async () => {
    const mockBlob = new Blob(["data"]);
    mockRoot.getFileHandle.and.resolveTo(mockFileHandle);
    mockFileHandle.getFile.and.resolveTo(mockBlob as any);

    const result = await adapter.get("test");
    expect(result).toBe(mockBlob as any);
  });

  it("should return undefined if get fails", async () => {
    mockRoot.getFileHandle.and.rejectWith(new Error("Fail"));
    expect(await adapter.get("test")).toBeUndefined();
  });

  it("should set file content", async () => {
    const content = new Blob(["hello"]);
    mockRoot.getFileHandle.and.resolveTo(mockFileHandle);
    mockFileHandle.createWritable.and.resolveTo(mockWritable);

    await adapter.set("test", content);

    expect(mockRoot.getFileHandle).toHaveBeenCalledWith("test", {
      create: true,
    });
    expect(mockWritable.write).toHaveBeenCalledWith(content);
    expect(mockWritable.close).toHaveBeenCalled();
  });

  it("should delete entry", async () => {
    mockRoot.removeEntry.and.resolveTo();
    expect(await adapter.delete("test")).toBeTrue();
    expect(mockRoot.removeEntry).toHaveBeenCalledWith("test");
  });

  it("should return false if delete fails", async () => {
    mockRoot.removeEntry.and.rejectWith(new Error("Fail"));
    expect(await adapter.delete("test")).toBeFalse();
  });

  it("should list entries", async () => {
    const keys = ["a", "b", "c"];
    (mockRoot as any).keys.and.callFake(() => {
      return {
        async *[Symbol.asyncIterator]() {
          for (const key of keys) {
            yield key;
          }
        },
      };
    });

    const result = await adapter.list();
    expect(result).toEqual(keys);
  });

  it("should clear all entries", async () => {
    const keys = ["file1", "file2"];
    spyOn(adapter, "list").and.resolveTo(keys);
    spyOn(adapter, "delete").and.resolveTo(true);

    await adapter.clear();
    expect(adapter.list).toHaveBeenCalled();
    expect(adapter.delete).toHaveBeenCalledWith("file1");
    expect(adapter.delete).toHaveBeenCalledWith("file2");
  });
});
