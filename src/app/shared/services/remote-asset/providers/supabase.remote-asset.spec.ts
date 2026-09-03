import { Injector } from "@angular/core";
import { SupabaseRemoteAssetProvider } from "./supabase.remote-asset";

/**
 * Call standalone tests via:
 * yarn ng test --include src/app/shared/services/remote-asset/providers/supabase.remote-asset.spec.ts
 */
describe("SupabaseRemoteAssetProvider", () => {
  const BUCKET = "test-bucket";
  const FOLDER = "asset_packs";
  const ARCHIVE_PATH = "my_pack/my_pack.zip";
  const PUBLIC_URL = `https://project.supabase.co/storage/v1/object/public/${BUCKET}/${FOLDER}/${ARCHIVE_PATH}`;
  const SIGNED_URL = `${PUBLIC_URL}?token=signed`;

  let createSignedUrlSpy: jasmine.Spy;
  let getPublicUrlSpy: jasmine.Spy;

  /** Provider wired to a stub SupabaseService exposing just the storage surface under test */
  async function createProvider() {
    const storage = {
      from: () => ({ createSignedUrl: createSignedUrlSpy, getPublicUrl: getPublicUrlSpy }),
    };
    const supabaseService = { storage, isEnabled: true, ready: async () => undefined };
    const injector = { get: () => supabaseService } as unknown as Injector;
    const provider = new SupabaseRemoteAssetProvider();
    await provider.initialise(injector, { bucketName: BUCKET, folderName: FOLDER });
    provider["supabase"] = { storage } as any;
    return provider;
  }

  beforeEach(() => {
    createSignedUrlSpy = jasmine.createSpy("createSignedUrl").and.resolveTo({
      data: { signedUrl: SIGNED_URL },
      error: null,
    });
    getPublicUrlSpy = jasmine
      .createSpy("getPublicUrl")
      .and.returnValue({ data: { publicUrl: PUBLIC_URL } });
    spyOn(console, "warn");
  });

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
    expect(await provider.getFetchableUrl(ARCHIVE_PATH)).toBe(PUBLIC_URL);
  });

  it("falls back to the public url when signing throws", async () => {
    createSignedUrlSpy.and.rejectWith(new Error("network"));
    const provider = await createProvider();

    expect(await provider.getFetchableUrl(ARCHIVE_PATH)).toBe(PUBLIC_URL);
  });

  it("returns null when no url can be resolved at all", async () => {
    createSignedUrlSpy.and.resolveTo({ data: null, error: { message: "nope" } });
    getPublicUrlSpy.and.returnValue({ data: { publicUrl: "" } });
    const provider = await createProvider();

    // null is what makes the caller raise "no archive published" and latch to per-file
    expect(await provider.getFetchableUrl(ARCHIVE_PATH)).toBeNull();
  });
});
