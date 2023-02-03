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
type IMetaProperty = "og:title" | "og:image" | "og:description" | "og:url";
type IMetaName =
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
    // call after init to apply defaults
    this.updateMeta({});
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
   * Load the default SEO tags for the site as currently hardcoded into the
   * public index.html file or specified in deployment
   */
  private getDefaultSEOTags(): ISEOMeta {
    const PUBLIC_URL = location.origin;
    return {
      title: environment.deploymentConfig.app_config.APP_HEADER_DEFAULTS.title,
      description: "",
      faviconUrl: `${PUBLIC_URL}/assets/icon/favicon.png`,
      imageUrl: ``,
    };
  }

  private setMetaName(name: IMetaName, value: string) {
    const el = document.querySelector(`meta[name="${name}"]`);
    if (el) {
      el.setAttribute("content", value);
    }
  }
  private setMetaProperty(property: IMetaProperty, value: string) {
    const el = document.querySelector(`meta[property="${property}"]`);
    if (el) {
      el.setAttribute("content", value);
    }
  }
}
