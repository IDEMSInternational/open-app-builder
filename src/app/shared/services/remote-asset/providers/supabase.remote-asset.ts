import { Injectable, Injector } from "@angular/core";
import { SupabaseClient } from "@supabase/supabase-js";
import { IRemoteAssetProvider, IRemoteAssetConfig, IRemoteFileMetadata } from "./base.remote-asset";
import { SupabaseService } from "../../supabase/supabase.service";

@Injectable({
  providedIn: "root",
})
export class SupabaseRemoteAssetProvider implements IRemoteAssetProvider {
  private supabase: SupabaseClient;
  private config: IRemoteAssetConfig;
  private supabaseService: SupabaseService;

  async initialise(injector: Injector, config: IRemoteAssetConfig): Promise<void> {
    this.config = config;
    this.supabaseService = injector.get(SupabaseService);
    this.supabaseService.ready();
    if (this.supabaseService.client) {
      this.supabase = this.supabaseService.client;
    } else {
      console.warn(`[Supabase Remote Asset] Supabase client not initialized`);
      return;
    }
  }

  public getPublicUrl(relativePath: string): string {
    if (!this.supabase) {
      return "";
    }

    try {
      const {
        data: { publicUrl },
      } = this.supabase.storage
        .from(this.config.bucketName)
        .getPublicUrl(this.getSupabaseFilepath(relativePath));
      return publicUrl || "";
    } catch (error) {
      console.error("[Supabase Remote Asset] Error getting public URL:", error);
      return "";
    }
  }

  public async downloadFile(relativePath: string): Promise<Blob | null> {
    // For Supabase, we can either use the public URL (for public files) or download directly
    // If direct download fails, fall back to public URL fetching
    try {
      const filepath = this.getSupabaseFilepath(relativePath);
      const { data: blob, error } = await this.supabase.storage
        .from(this.config.bucketName)
        .download(filepath);

      if (error) {
        throw error;
      }

      return blob;
    } catch (error) {
      console.error(
        "[Supabase Remote Asset] Error downloading file directly, falling back to public URL:",
        error
      );

      // Fallback to public URL fetching
      try {
        const publicUrl = this.getPublicUrl(relativePath);
        if (publicUrl) {
          const response = await fetch(publicUrl);
          if (response.ok) {
            return await response.blob();
          } else {
            console.error(
              `[Supabase Remote Asset] HTTP ${response.status}: ${response.statusText} when fetching from public URL`
            );
          }
        }
      } catch (fallbackError) {
        console.error("[Supabase Remote Asset] Error fetching from public URL:", fallbackError);
      }

      return null;
    }
  }

  public async downloadFileAsText(relativePath: string): Promise<string | null> {
    try {
      const blob = await this.downloadFile(relativePath);

      if (blob) {
        return await blob.text();
      }

      return null;
    } catch (error) {
      console.error("[Supabase Remote Asset] Error downloading file as text:", error);
      return null;
    }
  }

  public async downloadFileFromPrivateBucket(filepath: string): Promise<Blob | null> {
    if (!this.supabase) {
      return null;
    }

    try {
      const { data: blob, error } = await this.supabase.storage
        .from(this.config.bucketName)
        .download(this.getSupabaseFilepath(filepath));

      if (error) {
        throw error;
      }

      return blob;
    } catch (error) {
      console.error("[Supabase Remote Asset] Error downloading from private bucket:", error);
      return null;
    }
  }

  public async getRemoteFileMetadata(relativePath: string): Promise<IRemoteFileMetadata | null> {
    if (!this.supabase) {
      return null;
    }

    try {
      const pathSegments = relativePath.split("/");
      const fileName = pathSegments.pop();
      const dirname = pathSegments.join("/");

      const { data } = await this.supabase.storage
        .from(this.config.bucketName)
        .list(`${this.config.folderName}/${dirname}`);

      const fileObject = data?.find((element) => element.name === fileName);

      if (fileObject) {
        return {
          name: fileObject.name,
          size: fileObject.metadata?.size,
          lastModified: fileObject.updated_at,
          contentType: fileObject.metadata?.mimetype,
        };
      }

      return null;
    } catch (error) {
      console.error("[Supabase Remote Asset] Error getting file metadata:", error);
      return null;
    }
  }

  private getSupabaseFilepath(relativePath: string): string {
    return `${this.config.folderName}/${relativePath}`;
  }
}
