import * as path from "path";
import sharp from "sharp";

const iconSizeMap = {
  "mipmap-xxxhdpi": 192,
  "mipmap-xxhdpi": 144,
  "mipmap-xhdpi": 96,
  "mipmap-hdpi": 72,
  "mipmap-mdpi": 48,
};

const RESOURCE_FOLDER_PATH = "resources";
const ANDROID_RES_PATH = "android/app/src/main/res";

/**
 * Resize icons and splash screen assets for different android variants
 * NOTE (CC 2020-12-01) - could likely be replaced by `npx cordova-res` or similar npm scripts
 */
async function main() {
  await resizeIcons();
  await resizeSplashScreen();
}

main()
  .then(() => {
    console.log("Done!");
  })
  .catch((ex) => {
    console.error("Failed to resize icons", ex);
  });

async function resizeIcons() {
  for (let folderName of Object.keys(iconSizeMap)) {
    for (let fileName of [
      "ic_launcher_foreground.png",
      "ic_launcher_round.png",
      "ic_launcher.png",
    ]) {
      console.log(
        `Resizing ${fileName} for ${folderName}, ${iconSizeMap[folderName]} x ${iconSizeMap[folderName]}`
      );
      await sharp(path.join(RESOURCE_FOLDER_PATH, fileName))
        .resize(iconSizeMap[folderName], iconSizeMap[folderName])
        .toFile(path.join(ANDROID_RES_PATH, folderName, fileName));
    }
  }
}

const splashSizeMapLandscape = {
  "drawable-land-xxxhdpi": [1920, 1280],
  "drawable-land-xxhdpi": [1440, 960],
  "drawable-land-xhdpi": [960, 640],
  "drawable-land-hdpi": [720, 480],
  "drawable-land-mdpi": [480, 320],
};

async function resizeSplashScreen() {
  for (let folderName of Object.keys(splashSizeMapLandscape)) {
    console.log(
      `Resizing splash screen for ${folderName}, ${splashSizeMapLandscape[folderName][0]} x ${splashSizeMapLandscape[folderName][1]}`
    );
    await sharp(`${RESOURCE_FOLDER_PATH}/splash_land.png`)
      .resize(splashSizeMapLandscape[folderName][0], splashSizeMapLandscape[folderName][1])
      .toFile(path.join(ANDROID_RES_PATH, folderName, "splash.png"));
    const portraitFolder = folderName.replace("-land-", "-port-");
    console.log(
      `Resizing splash screen for ${portraitFolder}, ${splashSizeMapLandscape[folderName][1]} x ${splashSizeMapLandscape[folderName][0]}`
    );
    await sharp("./resources/splash_port.png")
      .resize(splashSizeMapLandscape[folderName][1], splashSizeMapLandscape[folderName][0])
      .toFile(path.join(ANDROID_RES_PATH, portraitFolder, "splash.png"));
  }
}
