import { generateRequestKey } from "../http.utils";
import { HttpCacheAdapterMemory } from "./adapters/memory.adapter";
import { HttpCache } from "./http-cache";

/**
 * Extend the HttpCache by replacing native Layer-2 storage cache with in-memory
 */
export class MockHttpCache extends HttpCache {
  constructor(cacheValues: Record<string, any> = {}) {
    // create in-memory adapter to replace default storage
    const mockAdapter = new HttpCacheAdapterMemory();

    // populate initial values to storage adapter
    for (const [url, value] of Object.entries(cacheValues)) {
      const cacheKey = generateRequestKey({ method: "GET", url });
      mockAdapter.set(cacheKey, value);
    }

    super("mockCache", mockAdapter);
  }
}
