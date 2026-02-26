import { Directory, Filesystem } from "@capacitor/filesystem";

/**
 * Check if a file exists on native device.
 * Path can be a filename or a path with subdirs (e.g. "subdir/file.json").
 */
export async function fileExists(path: string, directory: Directory): Promise<boolean> {
  try {
    const lastSlash = path.lastIndexOf("/");
    const dirPath = lastSlash === -1 ? "" : path.slice(0, lastSlash);
    const fileName = lastSlash === -1 ? path : path.slice(lastSlash + 1);
    const { files } = await Filesystem.readdir({ directory, path: dirPath });
    return files.some((f) => f.name === fileName);
  } catch {
    return false;
  }
}
