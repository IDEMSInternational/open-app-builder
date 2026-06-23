export interface CantoFolderListingEntry {
  id: string;
  name: string;
  scheme: string;
  md5?: string;
  additional?: Record<string, string | string[] | null>;
  relatedAlbums?: CantoRelatedAlbum[];
  url: {
    directUrlOriginal: string;
    [key: string]: string | undefined;
  };
}

export interface CantoResponseSearchUnderFolder {
  results: CantoFolderListingEntry[];
  found?: number;
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
  md5?: string;
  additional?: Record<string, string | string[] | null>;
  relatedAlbums?: CantoRelatedAlbum[];
  url: {
    directUrlOriginal: string;
  };
}

export type CantoManifest = CantoManifestEntry[];

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
