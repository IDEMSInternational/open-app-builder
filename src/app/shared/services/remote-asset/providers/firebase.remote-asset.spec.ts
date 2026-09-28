import { Injector } from "@angular/core";
import { FirebaseStorage } from "@capacitor-firebase/storage";
import { FirebaseRemoteAssetProvider } from "./firebase.remote-asset";

/**
 * Call standalone tests via:
 * yarn ng test --include src/app/shared/services/remote-asset/providers/firebase.remote-asset.spec.ts
 */
describe("FirebaseRemoteAssetProvider", () => {
  const BUCKET = "test-bucket.appspot.com";
  const FOLDER = "asset_packs";
  const ASSET_PATH = "my_pack/images/welcome.png";
  const PUBLIC_URL =
    `https://firebasestorage.googleapis.com/v0/b/${BUCKET}/o/` +
    `${encodeURIComponent(`${FOLDER}/${ASSET_PATH}`)}?alt=media`;
  const TOKENISED_URL = `${PUBLIC_URL}&token=39d1b0a2`;

  let fetchSpy: jasmine.Spy;
  let getDownloadUrlSpy: jasmine.Spy;
  let warnSpy: jasmine.Spy;

  /**
   * Provider wired to a stub FirebaseService and a stub storage plugin. `storageBucket` is always
   * passed explicitly - a default would swallow the `undefined` case these tests rely on.
   */
  async function createProvider(storageBucket: string | undefined) {
    const firebaseService = { app: { options: { storageBucket } } };
    const injector = { get: () => firebaseService } as unknown as Injector;
    const provider = new FirebaseRemoteAssetProvider();
    await provider.initialise(injector, { bucketName: "unused", folderName: FOLDER });
    provider["storage"] = {
      getDownloadUrl: getDownloadUrlSpy,
    } as unknown as typeof FirebaseStorage;
    return provider;
  }

  /**
   * Queue responses in call order, the last repeating for any further calls. Factories rather than
   * instances so a repeated response is not a body that has already been consumed.
   */
  function stubFetchResponses(...factories: (() => Response)[]) {
    let callIndex = 0;
    fetchSpy.and.callFake(() => {
      const factory = factories[Math.min(callIndex, factories.length - 1)];
      callIndex++;
      return Promise.resolve(factory());
    });
  }

  const ok = () => new Response(new Blob(["asset-bytes"]), { status: 200 });
  const failed = (status: number) => () => new Response(null, { status });

  /** The url string passed to `fetch` on a given call */
  const fetchedUrl = (callIndex: number) => fetchSpy.calls.argsFor(callIndex)[0] as string;

  beforeEach(() => {
    fetchSpy = spyOn(window, "fetch");
    // Plain spy rather than `spyOn`: the plugin is a Proxy that synthesises members on access
    getDownloadUrlSpy = jasmine.createSpy("getDownloadUrl").and.resolveTo({
      downloadUrl: TOKENISED_URL,
    });
    warnSpy = spyOn(console, "warn");
    spyOn(console, "error");
  });

  it("fetches the deterministic public url, without asking storage for a download url", async () => {
    const provider = await createProvider(BUCKET);
    stubFetchResponses(ok);

    const blob = await provider.downloadFile(ASSET_PATH);

    expect(await blob.text()).toEqual("asset-bytes");
    expect(fetchSpy).toHaveBeenCalledTimes(1);
    expect(fetchedUrl(0)).toEqual(PUBLIC_URL);
    expect(getDownloadUrlSpy).not.toHaveBeenCalled();
  });

  it("does not spend a download-url round trip on a transfer already cancelled", async () => {
    const provider = await createProvider(BUCKET);
    const controller = new AbortController();
    // Cancel lands while the public-url attempt is in flight, and that attempt comes back forbidden.
    // `getDownloadUrl` is a plugin call with no signal to take, so the only way to honour the cancel
    // is not to make it - otherwise the user waits out a native round trip they already stopped.
    fetchSpy.and.callFake(() => {
      controller.abort();
      return Promise.resolve(new Response(null, { status: 403 }));
    });

    await expectAsync(
      provider.downloadFile(ASSET_PATH, { signal: controller.signal })
    ).toBeRejectedWith(jasmine.objectContaining({ name: "AbortError" }));
    expect(getDownloadUrlSpy).not.toHaveBeenCalled();
  });

  it("falls back to a tokenised download url when the public url is forbidden", async () => {
    const provider = await createProvider(BUCKET);
    stubFetchResponses(failed(403), ok);

    const blob = await provider.downloadFile(ASSET_PATH);

    expect(await blob.text()).toEqual("asset-bytes");
    expect(getDownloadUrlSpy).toHaveBeenCalledOnceWith({ path: `${FOLDER}/${ASSET_PATH}` });
    expect(fetchSpy).toHaveBeenCalledTimes(2);
    expect(fetchedUrl(0)).toEqual(PUBLIC_URL);
    expect(fetchedUrl(1)).toEqual(TOKENISED_URL);
    expect(warnSpy).toHaveBeenCalledTimes(1);
  });

  it("falls back when the public url is unauthorized rather than forbidden", async () => {
    const provider = await createProvider(BUCKET);
    stubFetchResponses(failed(401), ok);

    // 403 is Storage's usual denial, but 401 is treated the same and nothing else is
    expect(await (await provider.downloadFile(ASSET_PATH)).text()).toEqual("asset-bytes");
    expect(getDownloadUrlSpy).toHaveBeenCalledTimes(1);
    expect(fetchedUrl(1)).toEqual(TOKENISED_URL);
  });

  it("stops retrying the public url for the rest of the session once forbidden", async () => {
    const provider = await createProvider(BUCKET);
    stubFetchResponses(failed(403), ok);
    await provider.downloadFile(ASSET_PATH);

    fetchSpy.calls.reset();
    getDownloadUrlSpy.calls.reset();
    stubFetchResponses(ok);
    await provider.downloadFile("my_pack/images/second.png");

    // Straight to the SDK - the wasted public-url request is paid once per session, not per asset
    expect(fetchSpy).toHaveBeenCalledTimes(1);
    expect(fetchedUrl(0)).toEqual(TOKENISED_URL);
    expect(getDownloadUrlSpy).toHaveBeenCalledTimes(1);
  });

  it("returns null without falling back when the object is missing", async () => {
    const provider = await createProvider(BUCKET);
    stubFetchResponses(failed(404));

    expect(await provider.downloadFile(ASSET_PATH)).toBeNull();
    expect(fetchSpy).toHaveBeenCalledTimes(1);
    expect(getDownloadUrlSpy).not.toHaveBeenCalled();
  });

  it("returns null without falling back when storage errors", async () => {
    const provider = await createProvider(BUCKET);
    stubFetchResponses(failed(500));

    expect(await provider.downloadFile(ASSET_PATH)).toBeNull();
    expect(fetchSpy).toHaveBeenCalledTimes(1);
    expect(getDownloadUrlSpy).not.toHaveBeenCalled();
  });

  it("leaves the public url path enabled after a non-permission failure", async () => {
    const provider = await createProvider(BUCKET);
    stubFetchResponses(failed(404));
    await provider.downloadFile(ASSET_PATH);

    fetchSpy.calls.reset();
    stubFetchResponses(ok);
    await provider.downloadFile("my_pack/images/second.png");

    // A missing object says nothing about whether the next one can be read unauthenticated
    expect(fetchedUrl(0)).toContain("?alt=media");
    expect(fetchedUrl(0)).not.toContain("token=");
    expect(getDownloadUrlSpy).not.toHaveBeenCalled();
  });

  it("uses the sdk when the js config carries no storage bucket", async () => {
    const provider = await createProvider(undefined);
    stubFetchResponses(ok);

    const blob = await provider.downloadFile(ASSET_PATH);

    // Native config may still name a bucket the JS side does not know about
    expect(await blob.text()).toEqual("asset-bytes");
    expect(getDownloadUrlSpy).toHaveBeenCalledTimes(1);
    expect(fetchSpy).toHaveBeenCalledTimes(1);
    expect(fetchedUrl(0)).toEqual(TOKENISED_URL);
  });

  it("returns null when the sdk cannot resolve a download url", async () => {
    const provider = await createProvider(undefined);
    getDownloadUrlSpy.and.resolveTo({ downloadUrl: "" });

    expect(await provider.downloadFile(ASSET_PATH)).toBeNull();
    expect(fetchSpy).not.toHaveBeenCalled();
  });

  it("returns null when the sdk throws", async () => {
    const provider = await createProvider(undefined);
    getDownloadUrlSpy.and.rejectWith(new Error("storage unavailable"));

    expect(await provider.downloadFile(ASSET_PATH)).toBeNull();
    expect(fetchSpy).not.toHaveBeenCalled();
  });

  it("returns null when the tokenised url is also forbidden, without looping", async () => {
    const provider = await createProvider(BUCKET);
    stubFetchResponses(failed(403), failed(403));

    expect(await provider.downloadFile(ASSET_PATH)).toBeNull();
    expect(fetchSpy).toHaveBeenCalledTimes(2);
    expect(getDownloadUrlSpy).toHaveBeenCalledTimes(1);
  });

  it("passes an abort signal through to the fetch", async () => {
    const provider = await createProvider(BUCKET);
    stubFetchResponses(ok);
    const controller = new AbortController();

    await provider.downloadFile(ASSET_PATH, { signal: controller.signal });

    expect(fetchSpy.calls.argsFor(0)[1]).toEqual({ signal: controller.signal });
  });

  it("combines the abort signal with noCache rather than dropping either", async () => {
    const provider = await createProvider(BUCKET);
    stubFetchResponses(ok);
    const controller = new AbortController();

    await provider.downloadFile(ASSET_PATH, { noCache: true, signal: controller.signal });

    expect(fetchSpy.calls.argsFor(0)[1]).toEqual({
      cache: "no-store",
      signal: controller.signal,
    });
    expect(fetchedUrl(0)).toMatch(/&_oab_ts=\d+$/);
  });

  it("propagates a cancelled transfer instead of reporting it as a failed download", async () => {
    const provider = await createProvider(BUCKET);
    const abortError = new DOMException("The operation was aborted", "AbortError");
    fetchSpy.and.rejectWith(abortError);

    // Returning null here would look like a missing file and earn retries against a transfer the
    // caller has already abandoned
    await expectAsync(provider.downloadFile(ASSET_PATH)).toBeRejectedWith(abortError);
  });

  it("still reports a genuine network error as a failed download", async () => {
    const provider = await createProvider(BUCKET);
    fetchSpy.and.rejectWith(new TypeError("Failed to fetch"));

    expect(await provider.downloadFile(ASSET_PATH)).toBeNull();
  });

  it("cache-busts the tokenised url when falling back with noCache", async () => {
    const provider = await createProvider(BUCKET);
    stubFetchResponses(failed(403), ok);

    // Manifests are the `noCache` caller, and on a token-gated bucket they take the fallback
    await provider.downloadFile(ASSET_PATH, { noCache: true });

    expect(fetchedUrl(1)).toMatch(/&token=39d1b0a2&_oab_ts=\d+$/);
    expect(fetchSpy.calls.argsFor(1)[1]).toEqual({ cache: "no-store" });
  });

  it("cache-busts the public url when noCache is requested", async () => {
    const provider = await createProvider(BUCKET);
    stubFetchResponses(ok);

    await provider.downloadFile(ASSET_PATH, { noCache: true });

    // Appended to the existing `?alt=media` rather than opening a second query string
    expect(fetchedUrl(0)).toMatch(/\?alt=media&_oab_ts=\d+$/);
    expect(fetchSpy.calls.argsFor(0)[1]).toEqual({ cache: "no-store" });
  });
});
