import { getYoutubeEmbedUrl, YOUTUBE_IFRAME_PROXY_URL } from "./youtube.utils";

const VIDEO_URL = "https://www.youtube.com/watch?v=YE7VzlLtp-4&t=10";

const embedUrl = (options: Parameters<typeof getYoutubeEmbedUrl>[1]) =>
  new URL(getYoutubeEmbedUrl(VIDEO_URL, options) as string);

describe("getYoutubeEmbedUrl", () => {
  it("builds a no-cookie embed url with player params", () => {
    const url = embedUrl({ allowFullscreen: true, languageCode: "en", useProxy: false });

    expect(url.origin + url.pathname).toBe("https://www.youtube-nocookie.com/embed/YE7VzlLtp-4");
    expect(Object.fromEntries(url.searchParams.entries())).toEqual({
      t: "10",
      color: "white",
      fs: "1",
      hl: "en",
      playsinline: "1",
      rel: "0",
    });
  });

  it("forwards all params including the video id to the proxy", () => {
    const url = embedUrl({ allowFullscreen: false, languageCode: "en", useProxy: true });

    expect(url.origin + url.pathname).toBe(YOUTUBE_IFRAME_PROXY_URL);
    expect(url.searchParams.get("v")).toBe("YE7VzlLtp-4");
    expect(url.searchParams.get("fs")).toBe("0");
  });

  it("omits the language without a language code", () => {
    const url = embedUrl({ allowFullscreen: true, useProxy: false });

    expect(url.searchParams.has("hl")).toBeFalse();
  });

  it("returns undefined for values that are not a link with a video id", () => {
    const options = { allowFullscreen: true, useProxy: false };

    expect(getYoutubeEmbedUrl(undefined, options)).toBeUndefined();
    expect(getYoutubeEmbedUrl("not a link", options)).toBeUndefined();
    expect(getYoutubeEmbedUrl("https://youtu.be/YE7VzlLtp-4", options)).toBeUndefined();
    expect(getYoutubeEmbedUrl("https://?v=YE7VzlLtp-4", options)).toBeUndefined();
  });
});
