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
  const ARCHIVE_PATH = "my_pack/my_pack.v1.zip";
  const publicUrlFor = (relativePath: string) =>
    `https://project.supabase.co/storage/v1/object/public/${BUCKET}/${FOLDER}/${relativePath}`;
  const SIGNED_URL = `${publicUrlFor(ARCHIVE_PATH)}?token=signed`;

  let fetchSpy: jasmine.Spy;
  let downloadSpy: jasmine.Spy;
  let createSignedUrlSpy: jasmine.Spy;
  let getPublicUrlSpy: jasmine.Spy;

  /** Provider wired through the real `initialise`, so the client it ends up holding is the stub */
  async function createProvider() {
    const supabaseClient = {
      storage: {
        from: () => ({
          getPublicUrl: getPublicUrlSpy,
          download: downloadSpy,
          createSignedUrl: createSignedUrlSpy,
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
    downloadSpy = jasmine.createSpy("download").and.resolveTo({ data: new Blob(["sdk"]) });
    createSignedUrlSpy = jasmine
      .createSpy("createSignedUrl")
      .and.resolveTo({ data: { signedUrl: SIGNED_URL }, error: null });
    getPublicUrlSpy = jasmine.createSpy("getPublicUrl").and.callFake((filepath: string) => ({
      data: {
        publicUrl: `https://project.supabase.co/storage/v1/object/public/${BUCKET}/${filepath}`,
      },
    }));
    spyOn(console, "error");
    spyOn(console, "warn");
  });

  describe("downloadFile", () => {
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

  describe("getFetchableUrl", () => {
    it("signs the url rather than assuming the bucket is publicly readable", async () => {
      const provider = await createProvider();

      // A public URL resolves fine against a private bucket and only fails at fetch time, where it
      // reads as a broken archive rather than as an auth problem
      expect(await provider.getFetchableUrl(ARCHIVE_PATH)).toBe(SIGNED_URL);
      expect(getPublicUrlSpy).not.toHaveBeenCalled();
      // Signed against the folder-prefixed object path, and long enough to outlive a ~35MB transfer
      // on a slow connection - an expiry mid-download surfaces as a truncated stream, which costs a
      // whole archive attempt
      expect(createSignedUrlSpy).toHaveBeenCalledOnceWith(`${FOLDER}/${ARCHIVE_PATH}`, 60 * 60);
    });

    it("falls back to the public url when signing is not permitted", async () => {
      createSignedUrlSpy.and.resolveTo({ data: null, error: { message: "not authorized" } });
      const provider = await createProvider();

      // Signing needs a policy the anon key may not hold; on a public bucket the plain URL works
      expect(await provider.getFetchableUrl(ARCHIVE_PATH)).toBe(publicUrlFor(ARCHIVE_PATH));
    });

    it("falls back to the public url when signing throws", async () => {
      createSignedUrlSpy.and.rejectWith(new Error("network"));
      const provider = await createProvider();

      expect(await provider.getFetchableUrl(ARCHIVE_PATH)).toBe(publicUrlFor(ARCHIVE_PATH));
    });

    it("returns null when no url can be resolved at all", async () => {
      createSignedUrlSpy.and.resolveTo({ data: null, error: { message: "nope" } });
      getPublicUrlSpy.and.returnValue({ data: { publicUrl: "" } });
      const provider = await createProvider();

      // null is what makes the caller raise "no archive published" and latch to per-file
      expect(await provider.getFetchableUrl(ARCHIVE_PATH)).toBeNull();
    });
  });
});
