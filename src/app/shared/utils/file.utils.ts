import { Directory, Filesystem } from "@capacitor/filesystem";

export async function fileExists(path: string, directory: Directory) {
  try {
    await Filesystem.stat({ path, directory });
    return true;
  } catch (e) {
    return false;
  }
}
