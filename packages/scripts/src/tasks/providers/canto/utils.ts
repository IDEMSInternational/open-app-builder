import path from "path";
import { CantoManifest } from "./types";
import { WorkflowRunner } from "../../../commands/workflow/run";

type CantoManifestEntry = CantoManifest[0];

export function getCantoConfig() {
  const { canto } = WorkflowRunner.config;
  if (!canto) {
    throw new Error("Canto configuration is missing in deployment config.");
  }
  return canto;
}

export function getFilePath(fileEntry: CantoManifestEntry, cantoFolderID: string) {
  // File may appear in multiple albums, so find the path that includes the deployment's named folder ID
  const albumDetails = fileEntry.relatedAlbums.find((album) =>
    album.idPath.includes(cantoFolderID)
  );
  if (!albumDetails) {
    throw new Error(
      `Canto album path not found for file "${fileEntry.name}" in "${cantoFolderID}"`
    );
  }
  // Match Google Drive downloads by making paths relative to the configured source folder/album.
  const idPathSegments = albumDetails.idPath.split("/");
  const namePathSegments = albumDetails.namePath.split("/");
  const dirname =
    idPathSegments[0] === cantoFolderID
      ? namePathSegments.slice(1).join(path.sep)
      : albumDetails.namePath;
  return path.join(dirname, fileEntry.name);
}

export function getOutputFolder(folderId?: string) {
  const { _workspace_path } = WorkflowRunner.config;
  return path.resolve(_workspace_path, "tasks", "canto", "outputs", folderId || "");
}
