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
  // File may appear in multiple albums, so find the path that includes the deployment's source folder ID
  const albumDetails = fileEntry.relatedAlbums?.find((album) =>
    album.idPath?.split("/").includes(cantoFolderID)
  );
  if (!albumDetails) {
    throw new Error(
      `Canto album path not found for file "${fileEntry.name}" in "${cantoFolderID}"`
    );
  }
  const { idPath, namePath } = albumDetails;
  if (!idPath || !namePath) {
    throw new Error(`Canto album path metadata missing for file "${fileEntry.name}"`);
  }
  // Paths below the configured source folder become the relative asset path.
  const idPathSegments = idPath.split("/");
  const namePathSegments = namePath.split("/");
  const folderIndex = idPathSegments.indexOf(cantoFolderID);
  if (folderIndex === -1) {
    throw new Error(
      `Canto folder "${cantoFolderID}" not found in album path for file "${fileEntry.name}"`
    );
  }
  const relativePathSegments = namePathSegments.slice(folderIndex + 1);
  return path.join(...relativePathSegments, fileEntry.name);
}

export function getOutputFolder(folderId?: string) {
  const { _workspace_path } = WorkflowRunner.config;
  return path.resolve(_workspace_path, "tasks", "canto", "outputs", folderId || "");
}
