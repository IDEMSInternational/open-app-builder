package utils;

import android.app.Activity;
import android.app.AlertDialog;
import android.content.Context;
import android.content.Intent;
import android.content.pm.PackageInfo;
import android.content.pm.PackageManager;
import android.net.Uri;
import android.os.Build;
import android.webkit.WebView;


public class WebViewChecker {

    public static final int TARGET_WEBVIEW_MAJOR_VERSION = 100;

    public static void check(Activity activity) {
        // 1. Ensure running on android 6.0 (API 23) or higher
        // NOTE - play store will prevent install but could potentially be older device updating or sideloaded
        if (Build.VERSION.SDK_INT < 23) {
            showUnsupportedDialog(activity, "🚫📱 This app is not supported on Android 5.\n➡️📱 Use a device running Android 6 or higher");
            return;
        }

        // 2. Check WebView provider and version
        String webViewPackage = "";
        String webViewVersion = "";
        String playStoreUrl = "";
        String provider = "";

        try {
//            From Android API 29+ (Android 10) webview apk used   (
            if (Build.VERSION.SDK_INT >= 29) {
                PackageInfo info = WebView.getCurrentWebViewPackage();
                if (info != null) {
                    webViewPackage = info.packageName;
                    webViewVersion = info.versionName;
                }
            } else {
                // For older devices can either use WebView or Chrome depending on manufacturer
                try {
                    PackageInfo info = activity.getPackageManager().getPackageInfo("com.google.android.webview", 0);
                    webViewPackage = info.packageName;
                    webViewVersion = info.versionName;
                } catch (PackageManager.NameNotFoundException e) {
                    try {
                        PackageInfo info = activity.getPackageManager().getPackageInfo("com.android.chrome", 0);
                        webViewPackage = info.packageName;
                        webViewVersion = info.versionName;
                    } catch (PackageManager.NameNotFoundException ex) {
                        // Not found
                    }
                }
            }
        } catch (Exception e) {
            showUnsupportedDialog(activity, "Unable to determine WebView provider.");
            return;
        }

        // 3. Decide if update is needed
        boolean needsUpdate = false;
        if (webViewPackage.contains("chrome")) {
            provider = "Chrome";
            playStoreUrl = "https://play.google.com/store/apps/details?id=com.android.chrome";
            if (getMajorVersion(webViewVersion) < TARGET_WEBVIEW_MAJOR_VERSION) needsUpdate = true;
        } else if (webViewPackage.contains("webview")) {
            provider = "Android System WebView";
            playStoreUrl = "https://play.google.com/store/apps/details?id=com.google.android.webview";
            if (getMajorVersion(webViewVersion) < TARGET_WEBVIEW_MAJOR_VERSION) needsUpdate = true;
        } else {
            showUnsupportedDialog(activity, "No supported WebView provider found.");
            return;
        }

        if (needsUpdate) {
            showUpdateDialog(activity, provider, playStoreUrl);
            return;
        }

    }

    private static int getMajorVersion(String versionName) {
        if (versionName == null) return 0;
        try {
            String[] parts = versionName.split("\\.");
            return Integer.parseInt(parts[0]);
        } catch (Exception e) {
            return 0;
        }
    }

    private static void showUnsupportedDialog(Activity activity, String message) {
        new AlertDialog.Builder(activity)
            .setTitle("Unsupported Device")
            .setMessage(message)
            .setCancelable(false)
            .setPositiveButton("Exit", (dialog, which) -> activity.finish())
            .show();
    }

    private static void showUpdateDialog(Activity activity, String provider, String playStoreUrl) {
        new AlertDialog.Builder(activity)
            .setTitle("⬆️🔄 Update Required")
            .setMessage("Your " + provider + " is outdated. Please update to continue.")
            .setCancelable(false)
            .setPositiveButton("📲 1. Update from the Play Store", (dialog, which) -> {
                Intent intent = new Intent(Intent.ACTION_VIEW, Uri.parse(playStoreUrl));
                intent.addFlags(Intent.FLAG_ACTIVITY_NEW_TASK);
                activity.startActivity(intent);
                activity.finish();
            })
            .setNegativeButton("🔁 2. Restart the app", (dialog, which) -> activity.finish())
            .show();
    }
}