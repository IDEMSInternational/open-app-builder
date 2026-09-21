/** Timestamp file written each time app data is copied to src assets (`copyDeploymentDataToApp`) */
const DEV_SYNC_PATH = "/assets/app_data/dev_sync.json";

/**
 * Development only. Reload the page when app data is copied to src assets
 * (e.g. by `yarn workflow sync`) while the dev server is running (`yarn start`)
 *
 * The dev server serves updated asset files after a change, but does not reload the browser
 * when only asset files have changed, so poll a timestamp file written after each copy instead
 * https://github.com/angular/angular-cli/issues/22751
 *
 * @returns function to stop checking for changes
 */
export function reloadOnDevSync(options: { intervalMs?: number; reload?: () => void } = {}) {
  const { intervalMs = 2000, reload = () => location.reload() } = options;
  /** Last timestamp file contents, or `null` if the file did not exist when first checked */
  let lastValue: string | null | undefined;
  let stopped = false;
  let timeout: ReturnType<typeof setTimeout>;

  const check = async () => {
    try {
      // include cache-buster in case `no-store` is not respected by browser
      const res = await fetch(`${DEV_SYNC_PATH}?t=${Date.now()}`, { cache: "no-store" });
      if (res.status === 200) {
        const value = await res.text();
        if (lastValue !== undefined && value !== lastValue) {
          console.log("[DEV SYNC] App data updated, reloading");
          reload();
          return;
        }
        lastValue = value;
      } else if (lastValue === undefined) {
        lastValue = null;
      }
      // otherwise ignore a missing file and keep comparing against last value
    } catch (error) {
      // dev server may be restarting, check again on next interval
    }
    // schedule after completion as requests are held while the dev server rebuilds
    if (!stopped) {
      timeout = setTimeout(check, intervalMs);
    }
  };
  check();

  return () => {
    stopped = true;
    clearTimeout(timeout);
  };
}
