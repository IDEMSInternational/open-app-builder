import { Injector } from "@angular/core";

export interface IRemoteAssetProvider {
  /** Initialize the provider with configuration */
  initialise(injector: Injector, config: IRemoteAssetConfig): Promise<void>;

  /** Get public URL for a file (legacy method, used only when direct HTTP downloads possible) */
  getPublicUrl(relativePath: string): string;

  /** Download file using provider's own SDK/methods (preferred) */
  downloadFile(relativePath: string): Promise<Blob | null>;

  /** Download file and return as text string (for JSON/XML files) */
  downloadFileAsText(relativePath: string): Promise<string | null>;

  /** Download file from private bucket (legacy method) */
  downloadFileFromPrivateBucket(filepath: string): Promise<Blob | null>;

  /** Get file metadata */
  getRemoteFileMetadata(relativePath: string): Promise<IRemoteFileMetadata | null>;
}

export interface IRemoteAssetConfig {
  /** Supabase bucket name only; Firebase reads `firebase.config.storageBucket` instead. */
  bucketName: string;
  /** Prefix prepended to object paths within the bucket (all providers). */
  folderName: string;
}

export interface IRemoteFileMetadata {
  name: string;
  size?: number;
  lastModified?: string;
  contentType?: string;
}
