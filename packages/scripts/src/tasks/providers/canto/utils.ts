import path from "path";
import { CantoManifest } from "./types";
import { WorkflowRunner } from "../../../commands/workflow/run";

type CantoManifestEntry = CantoManifest[0];

export function getFilePath(fileEntry: CantoManifestEntry, cantoFolderID: string) {
  // File may appear in multiple albums, so find the path that includes the deployment's named folder ID
  const albumDetails = fileEntry.relatedAlbums.find((album) =>
    album.idPath.includes(cantoFolderID)
  );
  // Alternatively, could save at idPath, e.g. "V0DQB/S9CBS/H45JP/JN6JU/TDEJQ", for simpler lookup, but would not be human readable
  const dirname = albumDetails.namePath;
  return path.join(dirname, fileEntry.name);
}

export function getOutputFolder(folderId?: string) {
  const { _workspace_path } = WorkflowRunner.config;
  return path.resolve(_workspace_path, "tasks", "canto", "outputs", folderId || "");
}
