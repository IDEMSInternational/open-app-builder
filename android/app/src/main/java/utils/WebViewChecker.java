package utils;

import android.app.Activity;
import android.app.AlertDialog;
import android.content.Context;
import android.content.Intent;
import android.content.pm.PackageInfo;
import android.content.pm.PackageManager;
import android.net.Uri;
import android.os.Build;
import android.util.Log;
import android.webkit.WebView;


public class WebViewChecker {

    // Keep in sync with minimum supported Chrome/WebView from `.browserslistrc`
    public static final int TARGET_WEBVIEW_MAJOR_VERSION = 89;

    private static final String TAG = "WebViewChecker";

    public static void check(Activity activity) {
        // 1. Ensure running on android 6.0 (API 23) or higher
        // NOTE - play store will prevent install but could potentially be older device updating or sideloaded
        if (Build.VERSION.SDK_INT < 23) {
            showUnsupportedDialog(activity, "🚫📱 This app is not supported on Android 5.\n➡️📱 Use a device running Android 6 or higher");
            return;
        }

        // 2. Determine package used to render webview content
        PackageInfo info = getWebviewPackage(activity);

        if(info == null) {
             // If cannot determine simply return (avoid potential false-positive message popup)
            Log.e(TAG, "WebView provider not found");
            return;
        }

        int webViewVersion = getMajorVersion(info.versionName);

        // 3. Decide if update is needed and show prompt
        Log.i(TAG, "WebView provider: " + info.packageName + " version: " + webViewVersion);
        if (webViewVersion < TARGET_WEBVIEW_MAJOR_VERSION){
            String provider = getProviderName(info.packageName);
            String playStoreUrl= getPlayStoreUrl(info.packageName);
            showUpdateDialog(activity, provider, playStoreUrl);
        }
    }

    // Determine package used to display webview content
    private static PackageInfo getWebviewPackage(Activity activity){
        // Android 8+ - has api to determine package
        if(Build.VERSION.SDK_INT >= 26) {
            return WebView.getCurrentWebViewPackage();
        }

        // Android 6 and 7 - check multiple potential providers with fallback
        // Likely chrome on android 7 and google webview on Android 6, but may vary depending on manufacturer
        String[] providers = {"com.android.chrome", "com.google.android.webview", "com.android.webview"};
        PackageManager pm = activity.getPackageManager();

        for (String provider : providers) {
            try {
                return pm.getPackageInfo(provider, 0);
            } catch (PackageManager.NameNotFoundException e) {
                // Continue to next
            }
        }
        return null;
    }

    // User-facing name for specific web-view package
    private static String getProviderName(String packageName) {
        if (packageName.contains("chrome")) return "Chrome";
        if (packageName.contains("webview")) return "Android System WebView";
        return "WebView";
    }

    private static String getPlayStoreUrl(String packageName) {
        // Chrome uses its own package ID
        if ("com.android.chrome".equals(packageName)) {
            return "https://play.google.com/store/apps/details?id=com.android.chrome";
        }
        // Both system WebView variants should update via the main WebView app
        if ("com.google.android.webview".equals(packageName) ||
                "com.android.webview".equals(packageName)) {
            return "https://play.google.com/store/apps/details?id=com.google.android.webview";
        }
        // Fallback
        return "https://play.google.com/store/apps/details?id=com.google.android.webview";
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
            .setPositiveButton("1. Update from the Play Store 📲", (dialog, which) -> {
                Intent intent = new Intent(Intent.ACTION_VIEW, Uri.parse(playStoreUrl));
                intent.addFlags(Intent.FLAG_ACTIVITY_NEW_TASK);
                activity.startActivity(intent);
                activity.finish();
            })
            .setNegativeButton("2. Restart the app 🔁", (dialog, which) -> activity.finish())
            .show();
    }
}