export interface CantoContentSummary {
  id: string;
  scheme: string;
}

export interface CantoResponseSearchUnderFolder {
  results: CantoContentSummary[];
}

export interface CantoRelatedAlbum {
  id: string;
  idPath?: string;
  name: string;
  namePath?: string;
  scheme: string;
  url?: {
    detail?: string;
  };
}

export interface CantoManifestEntry {
  id: string;
  name: string;
  scheme: string;
  additional?: Record<string, string | string[] | null>;
  relatedAlbums?: CantoRelatedAlbum[];
  url: {
    directUrlOriginal: string;
  };
}

export type CantoManifest = CantoManifestEntry[];

export interface CantoResponseBatchContentDetails {
  docResult: CantoManifest;
}

export interface CantoSourceFolder {
  id: string;
  name: string;
}

export interface CantoDownloadedFolder {
  path: string;
  folderConfig: CantoSourceFolder;
}

export interface CantoSourceFolderFileList {
  folderConfig: CantoSourceFolder;
  results: CantoResponseSearchUnderFolder["results"];
}
