/**
 * Deployed URL of iframe proxy. This allows embedding target url within an https site,
 * instead of local capacitor:// (youtube has error on mismatched protocols)
 * e.g. https://idemsinternational.github.io/youtube-iframe-proxy/?v=YE7VzlLtp-4
 * See https://github.com/ionic-team/capacitor/issues/8205
 */
export const YOUTUBE_IFRAME_PROXY_URL =
  "https://idemsinternational.github.io/youtube-iframe-proxy/";

/**
 * Partial list of query params passed by URL
 * These will be set via a combination of defaults and derived values
 *
 * All other params will be passed without modification
 * For a full list and explanation, see https://developers.google.com/youtube/player_parameters
 */
interface YoutubeQueryParams {
  /** Video Id - extracted from URL */
  v: string;
  /** Player color - prefer white for more theme compatibility */
  color: "red" | "white";
  /** Show full screen - default "1" can can be disabled via authoring param */
  fs: "0" | "1";
  /** Interface language - 2-letter ISO 639-1 code extracted from language service */
  hl?: string;
  /** Show related videos - prefer to disable (will still show same-channel related) */
  rel: "0" | "1";
  /** Plays inline - Always enable for iOS compatibility */
  playsinline: "1";
}

export interface IYoutubeEmbedOptions {
  allowFullscreen: boolean;
  /** Player interface language, omitted if not set */
  languageCode?: string;
  /** Use the iframe proxy site (fixes a protocol issue on iOS) */
  useProxy: boolean;
}

/**
 * Embed URL for a YouTube video link, or undefined if the link is not a valid https URL
 * with a video id `v` parameter (e.g. youtu.be/12345678901 is not supported)
 */
export function getYoutubeEmbedUrl(value: unknown, options: IYoutubeEmbedOptions) {
  // Don't specify domain as could start youtube.com, youtu.be, m.youtube.com, etc.
  // https://stackoverflow.com/a/70512384/5693245
  if (typeof value !== "string" || !value.startsWith("https://")) return undefined;
  let url: URL;
  try {
    url = new URL(value);
  } catch {
    return undefined;
  }
  const videoId = url.searchParams.get("v");
  if (!videoId) return undefined;

  const params: YoutubeQueryParams = {
    ...Object.fromEntries(url.searchParams.entries()),
    color: "white",
    fs: options.allowFullscreen ? "1" : "0",
    // Attempt to set the player's interface language to match the app language
    ...(options.languageCode ? { hl: options.languageCode } : {}),
    playsinline: "1",
    // Disable related videos (at least those from external channels)
    rel: "0",
    v: videoId,
  };

  // The proxy forwards all params; the no-cookie embed takes the video id in its path
  const { v, ...embedParams } = params;
  const embedUrl = options.useProxy
    ? new URL(YOUTUBE_IFRAME_PROXY_URL)
    : new URL(`https://www.youtube-nocookie.com/embed/${v}`);
  for (const [key, paramValue] of Object.entries(options.useProxy ? params : embedParams)) {
    embedUrl.searchParams.set(key, paramValue);
  }
  return embedUrl.toString();
}
