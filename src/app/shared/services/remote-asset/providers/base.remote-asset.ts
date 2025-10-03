import { Injector } from "@angular/core";

export interface IRemoteAssetProvider {
  /** Initialize the provider with configuration */
  initialise(injector: Injector, config: IRemoteAssetConfig): Promise<void>;

  /** Get public URL for a file */
  getPublicUrl(relativePath: string): string;

  /** Download file from private bucket (if supported) */
  downloadFileFromPrivateBucket(filepath: string): Promise<Blob | null>;

  /** Get file metadata */
  getRemoteFileMetadata(relativePath: string): Promise<IRemoteFileMetadata | null>;
}

export interface IRemoteAssetConfig {
  bucketName: string;
  folderName: string;
}

export interface IRemoteFileMetadata {
  name: string;
  size?: number;
  lastModified?: string;
  contentType?: string;
}
