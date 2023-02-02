import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { SyncServiceBase } from "../syncService.base";

interface ISEOMeta {
  title: string;
  faviconUrl: string;
  description: string;
  imageUrl: string;
}
/** Reduced list of meta properties used within site index.html for update */
type IPlatformMetaProperty = "og:title" | "og:image" | "og:description" | "og:url";
type IPlatformMetaName =
  | "description"
  | "twitter:title"
  | "twitter:description"
  | "twitter:image"
  | "twitter:card";

@Injectable({
  providedIn: "root",
})
export class SeoService extends SyncServiceBase {
  constructor() {
    super("SEO Service");
    this.updateMeta({ title: environment.deploymentConfig.app_config.APP_HEADER_DEFAULTS.title });
  }

  /**
   * Update document SEO tags
   *
   * NOTE - this only updates tags that already appear in the public index.html file and does not
   * add additional
   */
  public updateMeta = (update: Partial<ISEOMeta>) => {
    const allTags = { ...this.getDefaultSEOTags(), ...update };
    const { title, description, imageUrl, faviconUrl } = allTags;
    if (title) {
      document.title = title;
      this.setMetaProperty("og:title", title);
      this.setMetaName("twitter:title", title);
    }
    if (description) {
      this.setMetaName("description", description);
      this.setMetaProperty("og:description", description);
      this.setMetaName("twitter:description", description);
    }
    if (faviconUrl) {
      const el = document.getElementById("favicon") as HTMLLinkElement;
      if (el) {
        el.href = faviconUrl;
      }
    }
    if (imageUrl) {
      this.setMetaName("twitter:image", imageUrl);
      this.setMetaProperty("og:image", imageUrl);
    }
  };

  /**
   * Load the default SEO tags for the site (as currently hardcoded into the public index.html file)
   * TODO - it would be better if these were linked to the active site/deployment/theme in some way
   */
  private getDefaultSEOTags(): ISEOMeta {
    const PUBLIC_URL = location.origin;
    return {
      title: "Community Platform",
      description:
        "A series of tools for the Precious Plastic community to collaborate around the world. Connect, share and meet each other to tackle plastic waste.",
      faviconUrl: `${PUBLIC_URL}/favicon.ico`,
      imageUrl: `${PUBLIC_URL}/social-image.jpg`,
    };
  }

  private setMetaName(name: IPlatformMetaName, value: string) {
    const el = document.querySelector(`meta[name="${name}"]`);
    if (el) {
      el.setAttribute("content", value);
    }
  }
  private setMetaProperty(property: IPlatformMetaProperty, value: string) {
    const el = document.querySelector(`meta[property="${property}"]`);
    if (el) {
      el.setAttribute("content", value);
    }
  }
}
