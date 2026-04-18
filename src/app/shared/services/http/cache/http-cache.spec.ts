import { HttpCache } from "./http-cache";
import { HttpCacheAdapterMemory } from "./adapters/memory.adapter";

/**
 * Call standalone tests via:
 * yarn ng test --include src/app/shared/services/http/cache/http-cache.spec.ts
 */
describe("HttpCache", () => {
  let cache: HttpCache;

  beforeEach(() => {
    cache = new HttpCache("test");
    cache.adapter = new HttpCacheAdapterMemory();
  });

  describe("ready", () => {
    it("should not replace existing adapter", async () => {
      const original = cache.adapter;
      await cache.ready();
      expect(cache.adapter).toBe(original);
    });
  });

  describe("list", () => {
    it("should return keys excluding meta files", async () => {
      await cache.adapter.set("abc", new Blob(["body"]));
      await cache.adapter.set("abc.meta.json", new Blob(["{}"]));
      await cache.adapter.set("def", new Blob(["body2"]));
      await cache.adapter.set("def.meta.json", new Blob(["{}"]));

      const result = await cache.list();
      expect(result).toEqual(["abc", "def"]);
    });
  });

  describe("getEntry", () => {
    const meta = {
      contentType: "text/plain",
      created: 1000,
      size: 5,
      status: 200,
      headers: {},
      url: "https://example.com",
    };

    it("should return parsed metadata", async () => {
      await cache.adapter.set("abc.meta.json", new Blob([JSON.stringify(meta)]));
      expect(await cache.getEntry("abc")).toEqual(meta);
    });

    it("should return undefined when key not found", async () => {
      expect(await cache.getEntry("missing")).toBeUndefined();
    });

    it("should return undefined for invalid JSON", async () => {
      await cache.adapter.set("bad.meta.json", new Blob(["not json"]));
      expect(await cache.getEntry("bad")).toBeUndefined();
    });
  });

  describe("setMeta", () => {
    it("should store metadata with created timestamp", async () => {
      spyOn(Date, "now").and.returnValue(99999);

      await cache.setMeta("abc", {
        contentType: "text/plain",
        size: 5,
        status: 200,
        headers: {},
        url: "https://example.com",
      });

      const blob = await cache.adapter.get("abc.meta.json");
      const stored = JSON.parse(await blob!.text());
      expect(stored.created).toBe(99999);
      expect(stored.contentType).toBe("text/plain");
    });
  });

  describe("delete", () => {
    it("should delete both body and meta files", async () => {
      await cache.adapter.set("abc", new Blob(["body"]));
      await cache.adapter.set("abc.meta.json", new Blob(["{}"]));

      await cache.delete("abc");

      expect(await cache.adapter.get("abc")).toBeUndefined();
      expect(await cache.adapter.get("abc.meta.json")).toBeUndefined();
    });
  });
});
