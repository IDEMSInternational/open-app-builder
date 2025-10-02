import { Injectable, Injector } from "@angular/core";
import { FirebaseService } from "../../firebase/firebase.service";
import { IRemoteAssetProvider, IRemoteAssetConfig, IRemoteFileMetadata } from "./base.remote-asset";
import { FirebaseStorage } from "@capacitor-firebase/storage";

@Injectable({
  providedIn: "root",
})
export class FirebaseRemoteAssetProvider implements IRemoteAssetProvider {
  private firebaseService: FirebaseService;
  private config: IRemoteAssetConfig;

  async initialise(injector: Injector, config: IRemoteAssetConfig): Promise<void> {
    this.config = config;
    this.firebaseService = injector.get(FirebaseService);

    // Ensure Firebase app is initialized
    if (!this.firebaseService.app) {
      console.warn(`[Firebase Remote Asset] Firebase app not initialized`);
      return;
    }
  }

  public getPublicUrl(relativePath: string): string {
    if (!this.firebaseService.app || !this.firebaseService.app.options.storageBucket) {
      return "";
    }

    try {
      const filePath = `${this.config.folderName}/${relativePath}`;
      const bucketName = this.firebaseService.app.options.storageBucket;
      // Firebase Storage public URLs follow this pattern for public files
      // For authenticated access, we would use Firebase Storage SDK
      return `https://firebasestorage.googleapis.com/v0/b/${bucketName}/o/${encodeURIComponent(filePath)}?alt=media&firebase_csrf_token=unknown`;
    } catch (error) {
      console.error("[Firebase Remote Asset] Error getting public URL:", error);
      return "";
    }
  }

  public async downloadFileFromPrivateBucket(filepath: string): Promise<Blob | null> {
    if (!this.firebaseService.app) {
      return null;
    }

    try {
      const fullPath = `${this.config.folderName}/${filepath}`;

      // Use Firebase Storage for downloading files
      const result = await FirebaseStorage.getDownloadUrl({
        path: fullPath,
      });

      // Download the file using the signed URL
      if (result.downloadUrl) {
        const response = await fetch(result.downloadUrl);
        if (response.ok) {
          return await response.blob();
        }
      }

      return null;
    } catch (error) {
      console.error("[Firebase Remote Asset] Error downloading from private bucket:", error);
      return null;
    }
  }

  public async getRemoteFileMetadata(relativePath: string): Promise<IRemoteFileMetadata | null> {
    if (!this.firebaseService.app) {
      return null;
    }

    try {
      const fullPath = `${this.config.folderName}/${relativePath}`;

      // Use Firebase Storage to get file metadata
      const result = await FirebaseStorage.getMetadata({
        path: fullPath,
      });

      // The result contains metadata properties directly, not nested
      if (result) {
        return {
          name: relativePath.split("/").pop() || relativePath,
          size: result.size,
          lastModified: new Date(result.updatedAt || Date.now()).toISOString(),
          contentType: result.contentType,
        };
      }

      return null;
    } catch (error) {
      console.error("[Firebase Remote Asset] Error getting file metadata:", error);
      return null;
    }
  }
}
