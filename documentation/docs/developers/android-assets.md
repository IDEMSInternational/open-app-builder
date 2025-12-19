# Android Assets

Generate Android launcher icon and splash screen assets from source images. See Google's official docs for [adaptive icons](https://developer.android.com/guide/practices/ui_guidelines/icon_design_adaptive) and [splash screens](https://developer.android.com/guide/topics/ui/splash-screen).

## Two approaches

There are two ways to generate Android assets:

1. **Asset-based** (full control): Provide separate icon and splash images, with optional adaptive icon foreground/background
2. **Logo-based** (simple): Provide a single logo image and background colours – all assets are auto-generated

If both are configured, the asset-based approach takes precedence.

---

## Option 1: Asset-based

Provide separate source images for icon and splash screen. This gives full control over how each asset looks.

### Source images

| Asset | Filename (convention) | Minimum size | Required |
|-------|----------------------|--------------|----------|
| Splash screen | `splash.png` | 2732×2732px | Yes |
| App icon | `icon.png` | 1024×1024px | Yes |
| Adaptive icon foreground | `icon-foreground.png` | 432×432px | Optional |
| Adaptive icon background | `icon-background.png` | 432×432px | Optional |

The adaptive icon images (`icon-foreground.png` and `icon-background.png`) are combined dynamically to generate [adaptive icons](https://developer.android.com/guide/practices/ui_guidelines/icon_design_adaptive) of different shapes. The static `icon.png` is used as a fallback for older devices.

### Example source files

| splash.png | icon.png | icon-background.png | icon-foreground.png |
|------------|----------|---------------------|---------------------|
|![](./images/splash.png)|![](./images/icon.png)|![](./images/icon-background.png)|![](./images/icon-foreground.png)|

### Configuration

```ts title=".idems_app/deployments/plh/global.config.ts"
const config: IDeploymentConfig = {
  ...
  android: {
    splash_asset_path: "packages/app-data/assets/global/android/splash.png",
    icon_asset_path: "packages/app-data/assets/global/android/icon.png",
    icon_asset_foreground_path: "packages/app-data/assets/global/android/icon-foreground.png",
    icon_asset_background_path: "packages/app-data/assets/global/android/icon-background.png",
  },
  ...
};
```

---

## Option 2: Logo-based

Provide a single logo image and background colours. The logo is centred on the background colour to generate all icons and splash screens automatically.

### Source images

| Asset | Filename (convention) | Minimum size | Required |
|-------|----------------------|--------------|----------|
| Logo | `logo.png` | 1024×1024px | Yes |

### Configuration

```ts title=".idems_app/deployments/plh/global.config.ts"
const config: IDeploymentConfig = {
  ...
  android: {
    logo_asset_path: "packages/app-data/assets/global/android/logo.png",
    icon_background_color: "#ffffff",
    splash_background_color: "#3498db",
  },
  ...
};
```

---

## Running the workflow

### Locally

To generate Android assets and configure the Android project:
```sh
yarn workflow android
```

This runs both `configure` (populates `app_id`, `app_name`, etc.) and `generate_assets` (creates icons and splash screens).

To generate just the launcher assets:
```sh
yarn workflow android generate_assets
```

### Via GitHub Actions

The assets are automatically generated when the `Android - Release to Google Play` action is run.

---

## Generated files

The following files are generated in the Android project:

| Splash screens | App icons |
|----------------|-----------|
|![](./images/generated-splash-files.png)|![](./images/generated-icon-files.png)|
