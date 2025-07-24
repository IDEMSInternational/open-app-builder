/********************************************************************************
 * Script to ensure user has up-to-date version of google chrome for Android
 * Should be included in main `index.html` via script tag, e.g.
 * 
 * <script
      type="text/javascript"
      id="compatibility"
      src="/assets/compatibility.js"
      async="false"
      defer="false"
    ></script>
 *******************************************************************************/

/** Min android version as mapped from `minSdkVersion` (API 23, Android 6.0) */
const minAndroidVersion = 6.0;

/**
 * Minimum version of chrome required to run app
 * Min baseline 45 to support arrow functions: https://caniuse.com/arrow-functions
 * Capacitor requirement 60, according to: https://capacitorjs.com/docs/android
 * Codebase pdf viewer 119 (but handled separately in component)
 * Legacy chrome versions available at: https://www.chromium.org/getting-involved/download-chromium/
 *
 * NOTE - whilst capacitor does have functionality to detect version and present custom error page,
 * using the `capacitor.config.ts` android property `minWebViewVersion`, however this requires capacitor
 * to load correctly which often does not happen
 */
const minAndroidWebviewVersion = 89;

/**
 * Check for compatibiliy issues that may arise before main app loads
 * This script is designed to be called from main index.html file to detect
 *
 * Uses web navigator instead of native APIs as Capacitor will fail to initialise
 * in some legacy browsers
 */
function checkCompatibility() {
  const info = getInfo();
  if (info.operatingSystem === 'android') {
    // Catch case where app may be sideloaded onto a device with sdk lower than `minSdkVersion` (API 23, Android 6.0)
    // Additionally the render prompt update will fail due to use of template literals
    if (info.androidVersion && info.androidVersion < minAndroidVersion) {
      alert('🚫📱 This app is not supported on Android 5.\n➡️📱 Use a device running Android 6 or higher');
      return;
    }
    // Check chrome webview version up-to-date
    if (info.chromeVersion && info.chromeVersion < minAndroidWebviewVersion) {
      console.log('[Compatibility check]');
      console.log(JSON.stringify(info, null, 2));
      // Webview version is controlled by different apps depending on android version
      // For android 7-9 this is the controlled by the preinstalled Google Chrome app
      // For android 6 and 10+ this is controlled by the standalone Android Webview app
      // https://chromium.googlesource.com/chromium/src/+/HEAD/android_webview/docs/faq.md#what_s-the-relationship-between-webview-and-chrome
      // https://techblogs.42gears.com/webkit-provider-changes-in-various-android-versions/

      if (info.androidVersion >= 7 && info.androidVersion <= 9) {
        renderUpdatePrompt('Google Chrome', 'https://play.google.com/store/apps/details?id=com.android.chrome');
      } else {
        renderUpdatePrompt(
          'Android Webview',
          'https://play.google.com/store/apps/details?id=com.google.android.webview'
        );
      }
    }
  }
}

checkCompatibility();

/**
 * Attempt to get core device info by parsing the navigator user object
 * Adapted from Capacitor Device api methods to support case where Capacitor itself
 * fails to correctly initialise (e.g. some legacy browsers)
 * https://github.com/ionic-team/capacitor-plugins/blob/main/device/src/web.ts
 * @returns
 */
function getInfo() {
  const uaFields = {};
  const ua = navigator.userAgent;
  const start = ua.indexOf('(') + 1;
  const end = ua.indexOf(') AppleWebKit');
  const fields = ua.substring(start, end);
  if (ua.indexOf('Android') !== -1) {
    const tmpFields = fields.replace('; wv', '').split('; ').pop();
    if (tmpFields) {
      uaFields.model = tmpFields.split(' Build')[0];
    }
    uaFields.osVersion = fields.split('; ')[1];
  }
  if (/android/i.test(ua)) {
    uaFields.operatingSystem = 'android';
  }
  // Additional fields that would normally be determined using native code (adapted for web)
  if (uaFields.operatingSystem === 'android') {
    uaFields.androidVersion = parseFloat(uaFields.osVersion.toLowerCase().replace('android', ''));
    uaFields.chromeVersion = getChromeVersion();
  }
  return uaFields;
}

function getChromeVersion() {
  const ua = navigator.userAgent.toLowerCase();
  const regex = /chrome\/([0-9]*)\./;
  const res = regex.exec(ua);
  if (res) {
    const chromeVersion = parseInt(res[1]);
    return chromeVersion;
  }
}

/** Create a custom popup element that blocks the screen to force user to update before continuing */
function renderUpdatePrompt(appName, appLink) {
  const backdropEl = document.createElement('div');
  backdropEl.id = 'updatePrompt';
  const styles = `
  position:absolute; 
  top:0;
  left:0;
  height:100vh; 
  width:100vw; 
  z-index:2; 
  background:#000c;
  display:flex;
  flex-direction:column;
  align-items:center;
  justify-content:center
  `;
  backdropEl.style.cssText = styles;

  // Main content container
  const contentEl = document.createElement('div');
  contentEl.style.cssText = `
  width:300px;
  background:#e9e9e9;
  padding: 16px;
  border-radius: 8px;
  `;

  // Close button
  const closeButtonEl = document.createElement('button');
  closeButtonEl.style.cssText = `
   float:right;
   `;
  closeButtonEl.textContent = 'X';
  closeButtonEl.onclick = closePrompt;
  contentEl.appendChild(closeButtonEl);

  // Heading
  const headingEl = document.createElement('h2');
  (headingEl.textContent = '⬆️🔄 Update Required'), (headingEl.style.cssText = `text-align:center`);
  contentEl.appendChild(headingEl);

  // Text
  const textEl = document.createElement('p');
  textEl.innerHTML = `📲 1. Update <u>${appName}</u> from the Play Store\n🔁 2. Restart the app`;
  contentEl.appendChild(textEl);

  //  Action button
  const buttonEl = document.createElement('button');
  buttonEl.textContent = 'Go To Play Store';
  buttonEl.style.cssText = `
  width: 100%;
  height: 48px;
  margin: 16px 0;
  font-size: 16px;
  padding: 8px;
  background: #01875f;
  color: white;
  border-radius: 8px;
  font-weight: bold;
  border: none;
  cursor: pointer;
  `;

  // Action button link
  const linkEl = document.createElement('a');
  linkEl.href = appLink;
  linkEl.target = '_blank';
  linkEl.appendChild(buttonEl);
  contentEl.appendChild(linkEl);

  // Append to main content
  backdropEl.appendChild(contentEl);
  const bodyEl = document.querySelector('body');
  bodyEl.appendChild(backdropEl);
}

function closePrompt() {
  document.getElementById('updatePrompt').remove();
}
