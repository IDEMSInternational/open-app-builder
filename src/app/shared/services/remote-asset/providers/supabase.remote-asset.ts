import { Injectable, Injector } from "@angular/core";
import { SupabaseClient } from "@supabase/supabase-js";
import {
  IRemoteAssetProvider,
  IRemoteAssetConfig,
  IRemoteAssetDownloadOptions,
  IRemoteFileMetadata,
  appendCacheBuster,
} from "./base.remote-asset";
import { SupabaseService } from "../../supabase/supabase.service";

/**
 * Lifetime of a signed archive URL. Only has to outlive a single archive download, but that is a
 * ~35MB transfer on a connection that may be slow, so it is generous rather than tight - an
 * expiry mid-download surfaces as a truncated stream, which costs a whole archive attempt.
 */
const SUPABASE_SIGNED_URL_EXPIRY_SECONDS = 60 * 60;

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

  public async downloadFile(
    relativePath: string,
    options: IRemoteAssetDownloadOptions = {}
  ): Promise<Blob | null> {
    // The supabase-js `download()` accepts only a `transform` option, with no way to control
    // caching, so anything that must be fresh has to go via the public URL instead.
    if (options.noCache) {
      return this.downloadFromPublicUrl(relativePath, options);
    }
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
      return this.downloadFromPublicUrl(relativePath, options);
    }
  }

  /** Fetch straight from the bucket's public URL, the only route that can bypass caches */
  private async downloadFromPublicUrl(
    relativePath: string,
    options: IRemoteAssetDownloadOptions = {}
  ): Promise<Blob | null> {
    try {
      const publicUrl = this.getPublicUrl(relativePath);
      if (publicUrl) {
        const response = await fetch(
          options.noCache ? appendCacheBuster(publicUrl) : publicUrl,
          options.noCache ? { cache: "no-store" } : {}
        );
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

  public async downloadFileAsText(
    relativePath: string,
    options: IRemoteAssetDownloadOptions = {}
  ): Promise<string | null> {
    try {
      const blob = await this.downloadFile(relativePath, options);

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

  public async getFetchableUrl(relativePath: string): Promise<string | null> {
    if (!this.supabase) return null;
    // A signed URL first, because this method's whole reason for existing is that not every
    // deployment's objects are publicly readable - and on a private bucket a public URL resolves
    // fine and then 403s, which reads as a broken archive rather than an auth problem. Signing is
    // a round trip, but one per archive rather than one per asset.
    try {
      const { data, error } = await this.supabase.storage
        .from(this.config.bucketName)
        .createSignedUrl(
          this.getSupabaseFilepath(relativePath),
          SUPABASE_SIGNED_URL_EXPIRY_SECONDS
        );
      if (data?.signedUrl) return data.signedUrl;
      // Not an error worth surfacing: signing needs a policy the anon key may not have, and on a
      // public bucket the URL below works anyway
      if (error) {
        console.warn(
          `[Supabase Remote Asset] Could not sign ${relativePath}, falling back to public URL:`,
          error.message
        );
      }
    } catch (error) {
      console.warn("[Supabase Remote Asset] Error creating signed URL:", error);
    }
    return this.getPublicUrl(relativePath) || null;
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
