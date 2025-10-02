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
    // Firebase Storage doesn't support simple public URLs through this interface
    // Return empty string - the service will use downloadFile instead
    return "";
  }

  public async downloadFile(relativePath: string): Promise<Blob | null> {
    if (!this.firebaseService.app) {
      return null;
    }

    try {
      const fullPath = `${this.config.folderName}/${relativePath}`;

      // Use Capacitor Firebase Storage to get the download URL
      const result = await FirebaseStorage.getDownloadUrl({
        path: fullPath,
      });

      if (result.downloadUrl) {
        // Download the file using fetch - response varies depending on platform
        const response = await fetch(result.downloadUrl);

        if (response.ok) {
          return await response.blob();
        } else {
          console.error(`[Firebase Remote Asset] HTTP ${response.status}: ${response.statusText}`);
          return null;
        }
      }

      return null;
    } catch (error) {
      console.error("[Firebase Remote Asset] Error downloading file:", error);
      return null;
    }
  }

  public async downloadFileAsText(relativePath: string): Promise<string | null> {
    if (!this.firebaseService.app) {
      return null;
    }

    try {
      const fullPath = `${this.config.folderName}/${relativePath}`;

      // Use Capacitor Firebase Storage to get the download URL
      const result = await FirebaseStorage.getDownloadUrl({
        path: fullPath,
      });

      if (result.downloadUrl) {
        // Download the file using fetch
        const response = await fetch(result.downloadUrl);

        if (response.ok) {
          const blob = await response.blob();

          // Check if this is a data URL (Firebase's format sometimes)
          const firstChunk = await blob.slice(0, 50).text();
          if (firstChunk.includes("data:application/json;base64")) {
            // Extract base64 content from data URL
            const dataUrl = await blob.text();
            const base64Content = dataUrl.split(",")[1];
            const jsonContent = atob(base64Content);
            return jsonContent;
          } else {
            // Regular blob, convert to text
            return await blob.text();
          }
        } else {
          console.error(`[Firebase Remote Asset] HTTP ${response.status}: ${response.statusText}`);
          return null;
        }
      }

      return null;
    } catch (error) {
      console.error("[Firebase Remote Asset] Error downloading file as text:", error);
      return null;
    }
  }

  public async downloadFileFromPrivateBucket(filepath: string): Promise<Blob | null> {
    // Legacy method - delegate to downloadFile
    const relativePath = filepath.replace(`${this.config.folderName}/`, "");
    return this.downloadFile(relativePath);
  }

  public async getRemoteFileMetadata(relativePath: string): Promise<IRemoteFileMetadata | null> {
    if (!this.firebaseService.app) {
      return null;
    }

    try {
      const fullPath = `${this.config.folderName}/${relativePath}`;

      // Use Capacitor Firebase Storage to get file metadata
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
