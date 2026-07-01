import { Injectable } from "@angular/core";
import { Capacitor } from "@capacitor/core";
import { FileManagerService } from "../file-manager/file-manager.service";
import { SystemVariableService } from "../system-variable/system-variable.service";

/** Fixed path for native profile picture storage (overwritten on each login) */
const AUTH_PROFILE_PICTURE_PATH = "auth/profile-picture.jpg";

const LOG_PREFIX = "[Auth Profile Picture]";

export interface ICachedProfilePicture {
  src: string;
  revoke: () => void;
}

/**
 * Downloads and caches auth provider profile pictures (e.g. Google) to local
 * display-ready URLs for use in AUTH_USER_PICTURE.
 */
@Injectable({ providedIn: "root" })
export class AuthProfilePictureService {
  /** Tracks in-flight cache requests so sign-out can invalidate stale updates */
  private cacheGeneration = 0;

  /** Revoke callback for web blob URLs created during profile picture caching */
  private revoke: (() => void) | undefined;

  /** Remote URL and src cached in the current session */
  private sessionRemoteUrl: string | undefined;
  private sessionSrc: string | undefined;

  /** Tracks the in-flight remote URL to dedupe concurrent requests */
  private latestRemoteUrl: string | undefined;

  constructor(
    private fileManagerService: FileManagerService,
    private systemVariableService: SystemVariableService
  ) {}

  /**
   * Download and cache a remote profile picture, then store a display-ready URL
   * in AUTH_USER_PICTURE. Fire-and-forget: never throws or blocks callers.
   */
  public setFromRemoteUrl(remoteUrl: string): void {
    if (remoteUrl === this.latestRemoteUrl) {
      return;
    }

    this.latestRemoteUrl = remoteUrl;

    this.applyRemoteUrl(remoteUrl)
      .catch((error) => {
        console.warn(LOG_PREFIX, "Unhandled error caching profile picture:", error);
      })
      .finally(() => {
        if (this.latestRemoteUrl === remoteUrl) {
          this.latestRemoteUrl = undefined;
        }
      });
  }

  private async applyRemoteUrl(remoteUrl: string) {
    const generation = this.cacheGeneration;

    if (!remoteUrl) {
      this.sessionRemoteUrl = undefined;
      this.sessionSrc = undefined;
      this.revokeCached();
      this.systemVariableService.set("AUTH_USER_PICTURE", "");
      return;
    }

    if (remoteUrl === this.sessionRemoteUrl && this.sessionSrc) {
      this.systemVariableService.set("AUTH_USER_PICTURE", this.sessionSrc);
      return;
    }

    try {
      const cached = await this.resolveSrc(remoteUrl);

      if (generation !== this.cacheGeneration) {
        this.safeRevoke(cached.revoke);
        return;
      }

      this.revokeCached();
      this.revoke = cached.revoke;
      this.sessionRemoteUrl = remoteUrl;
      this.sessionSrc = cached.src;
      this.systemVariableService.set("AUTH_USER_PICTURE", cached.src);
    } catch (error) {
      console.warn(LOG_PREFIX, "Failed to cache profile picture, clearing picture field:", error);
      if (generation !== this.cacheGeneration) {
        return;
      }
      this.sessionRemoteUrl = undefined;
      this.sessionSrc = undefined;
      this.revokeCached();
      this.systemVariableService.set("AUTH_USER_PICTURE", "");
    }
  }

  /** Invalidate in-flight updates and clear cached blob URLs. Never throws. */
  public clear() {
    try {
      this.cacheGeneration++;
      this.sessionRemoteUrl = undefined;
      this.sessionSrc = undefined;
      this.latestRemoteUrl = undefined;
      this.revokeCached();
      this.systemVariableService.remove("AUTH_USER_PICTURE");
    } catch (error) {
      console.warn(LOG_PREFIX, "Error clearing profile picture cache:", error);
    }
  }

  /**
   * Resolve a remote profile picture URL to a local display-ready src.
   * Provider URLs block fetch/ky on web and in the native WebView, so:
   * - Web: Image element + canvas → blob URL
   * - Native: FileManager.saveFile → capacitor file URL, with Image fallback
   */
  private async resolveSrc(remoteUrl: string): Promise<ICachedProfilePicture> {
    if (Capacitor.isNativePlatform()) {
      try {
        return await this.cacheViaFileManager(remoteUrl);
      } catch {
        return this.cacheViaImageElement(remoteUrl);
      }
    }

    return this.cacheViaImageElement(remoteUrl);
  }

  /** Native: download via fetch and save to app data directory */
  private async cacheViaFileManager(remoteUrl: string): Promise<ICachedProfilePicture> {
    const response = await fetch(remoteUrl, { referrerPolicy: "no-referrer" });
    if (!response.ok) {
      throw new Error(`Failed to download profile picture (${response.status})`);
    }
    const blob = await response.blob();
    const { src } = await this.fileManagerService.saveFile({
      data: blob,
      targetPath: AUTH_PROFILE_PICTURE_PATH,
    });
    return { src, revoke: () => {} };
  }

  /**
   * Load via Image (no CORS required to display), then export to a blob URL.
   * Used on web; also fallback on native when fetch to disk fails.
   */
  private async cacheViaImageElement(remoteUrl: string): Promise<ICachedProfilePicture> {
    const blob = await this.loadImageBlob(remoteUrl);
    const src = URL.createObjectURL(blob);
    return { src, revoke: () => URL.revokeObjectURL(src) };
  }

  private loadImageBlob(url: string): Promise<Blob> {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.crossOrigin = "anonymous";
      img.referrerPolicy = "no-referrer";
      img.onload = () => {
        try {
          const canvas = document.createElement("canvas");
          canvas.width = img.naturalWidth;
          canvas.height = img.naturalHeight;
          const ctx = canvas.getContext("2d");
          if (!ctx) {
            reject(new Error("Canvas not supported"));
            return;
          }
          ctx.drawImage(img, 0, 0);
          canvas.toBlob(
            (blob) => (blob ? resolve(blob) : reject(new Error("Failed to create image blob"))),
            "image/jpeg",
            0.92
          );
        } catch (error) {
          reject(error);
        }
      };
      img.onerror = () => reject(new Error("Failed to load profile picture"));
      img.src = url;
    });
  }

  private revokeCached() {
    this.safeRevoke(this.revoke);
    this.revoke = undefined;
  }

  private safeRevoke(revoke?: () => void) {
    if (!revoke) return;
    try {
      revoke();
    } catch (error) {
      console.warn(LOG_PREFIX, "Error revoking cached profile picture URL:", error);
    }
  }
}
