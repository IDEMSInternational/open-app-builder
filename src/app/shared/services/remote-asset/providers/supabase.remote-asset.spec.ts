import { Injector } from "@angular/core";
import { SupabaseRemoteAssetProvider } from "./supabase.remote-asset";

/**
 * Call standalone tests via:
 * yarn ng test --include src/app/shared/services/remote-asset/providers/supabase.remote-asset.spec.ts
 */
describe("SupabaseRemoteAssetProvider", () => {
  const BUCKET = "test-bucket";
  const FOLDER = "asset_packs";
  const MANIFEST_PATH = "my_pack/my_pack.json";
  const PUBLIC_URL = `https://project.supabase.co/storage/v1/object/public/${BUCKET}/${FOLDER}/${MANIFEST_PATH}`;

  let fetchSpy: jasmine.Spy;
  let downloadSpy: jasmine.Spy;

  async function createProvider() {
    downloadSpy = jasmine.createSpy("download").and.resolveTo({ data: new Blob(["sdk"]) });
    const supabaseClient = {
      storage: {
        from: () => ({
          getPublicUrl: () => ({ data: { publicUrl: PUBLIC_URL } }),
          download: downloadSpy,
        }),
      },
    };
    const supabaseService = { ready: () => {}, client: supabaseClient };
    const injector = { get: () => supabaseService } as unknown as Injector;
    const provider = new SupabaseRemoteAssetProvider();
    await provider.initialise(injector, { bucketName: BUCKET, folderName: FOLDER });
    return provider;
  }

  beforeEach(() => {
    fetchSpy = spyOn(window, "fetch").and.resolveTo(new Response(new Blob(["manifest"])));
    spyOn(console, "error");
  });

  it("carries both the cache bypass and the abort signal on the public url route", async () => {
    const provider = await createProvider();
    const controller = new AbortController();

    // `noCache` is the manifest path, and the only Supabase route that can be aborted at all
    await provider.downloadFile(MANIFEST_PATH, { noCache: true, signal: controller.signal });

    expect(fetchSpy.calls.argsFor(0)[1]).toEqual({
      cache: "no-store",
      signal: controller.signal,
    });
    expect(fetchSpy.calls.argsFor(0)[0] as string).toMatch(/&_oab_ts=\d+$|\?_oab_ts=\d+$/);
  });

  it("propagates a cancelled transfer instead of reporting it as a failed download", async () => {
    const provider = await createProvider();
    const abortError = new DOMException("The operation was aborted", "AbortError");
    fetchSpy.and.rejectWith(abortError);

    await expectAsync(provider.downloadFile(MANIFEST_PATH, { noCache: true })).toBeRejectedWith(
      abortError
    );
  });

  it("still reports a genuine public url failure as a failed download", async () => {
    const provider = await createProvider();
    fetchSpy.and.rejectWith(new TypeError("Failed to fetch"));

    expect(await provider.downloadFile(MANIFEST_PATH, { noCache: true })).toBeNull();
  });

  it("leaves asset downloads on the sdk route, which takes no abort signal", async () => {
    const provider = await createProvider();
    const controller = new AbortController();

    // Routing these via the public url to gain abortability would quietly require public buckets
    const blob = await provider.downloadFile("my_pack/images/asset.png", {
      signal: controller.signal,
    });

    expect(await blob.text()).toEqual("sdk");
    expect(downloadSpy).toHaveBeenCalledTimes(1);
    expect(fetchSpy).not.toHaveBeenCalled();
  });
});
