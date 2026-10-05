import { Injectable } from "@angular/core";
import { Capacitor } from "@capacitor/core";

import { DynamicDataService } from "src/app/shared/services/dynamic-data/dynamic-data.service";
import { FileManagerService } from "src/app/shared/services/file-manager/file-manager.service";
import { TemplateAssetService } from "src/app/shared/components/template/services/template-asset.service";
import {
  isPlhCertificateSuccessResponse,
  type IPlhCertificateGenerateParams,
  type IPlhCertificateRequestBody,
  type IPlhCertificateResponse,
} from "./plh-certificate.types";

/** Prevent hung requests when connectivity is poor */
const CERTIFICATE_REQUEST_TIMEOUT_MS = 60_000;
const CORE_ASSET_PACK_NAME = "core_assets";
const CERTIFICATE_ASSET_SUBFOLDER = "certificates";
const CONTENT_TYPE_TO_EXTENSION: Record<string, string> = {
  "image/png": "png",
  "image/jpeg": "jpg",
  "image/jpg": "jpg",
  "image/webp": "webp",
  "application/pdf": "pdf",
};

@Injectable({
  providedIn: "root",
})
export class PlhCertificateService {
  /**
   * One in-flight promise per distinct request (see {@link inFlightKey}) to handle duplicate taps
   */
  private readonly inFlightByKey = new Map<string, Promise<IPlhCertificateResponse>>();

  constructor(
    private dynamicDataService: DynamicDataService,
    private fileManagerService: FileManagerService,
    private templateAssetService: TemplateAssetService
  ) {}

  /**
   * POST JSON to the given absolute URL (certificate generation endpoint).
   */
  public async generateCertificateAndUpdateLocal(
    options: IPlhCertificateGenerateParams
  ): Promise<IPlhCertificateResponse> {
    const key = this.inFlightKey(options);
    const existing = this.inFlightByKey.get(key);
    if (existing) {
      return existing;
    }
    const promise = this.generateCertificateAndUpdateLocalOnce(options).finally(() => {
      this.inFlightByKey.delete(key);
    });
    this.inFlightByKey.set(key, promise);
    return promise;
  }

  private inFlightKey(options: IPlhCertificateGenerateParams): string {
    return [
      options.url?.trim() ?? "",
      options.id?.trim() ?? "",
      options.certificate_template?.trim() ?? "",
      options.name?.trim() ?? "",
      options.certificate_data_list?.trim() ?? "",
    ].join("|");
  }

  private async generateCertificateAndUpdateLocalOnce(
    options: IPlhCertificateGenerateParams
  ): Promise<IPlhCertificateResponse> {
    const body = {
      template: options.certificate_template,
      name: options.name,
    };
    const response = await this.fetchCertificate({
      url: options.url,
      body,
    });
    if (options.certificate_data_list?.trim() && isPlhCertificateSuccessResponse(response)) {
      await this.updateCertificateDataList({
        certificate_data_list: options.certificate_data_list,
        certificate_id: options.id,
        certificate_url: response.url,
        name: options.name,
        certificate_template: options.certificate_template,
      });
    }
    return response as IPlhCertificateResponse;
  }

  /**
   * Download a generated certificate image and register it as an app asset so templates can
   * reference it using plhAsset, e.g. `certificates/my_certificate.png | plhAsset`.
   */
  public async downloadCertificateAssetAndUpdateLocal(options: { url: string; filename: string }) {
    const url = options.url?.trim();
    const filename = options.filename?.trim();
    if (!url) {
      throw new Error("[PLH CERTIFICATE] - downloadCertificateAssetAndUpdateLocal requires `url`");
    }
    if (!filename) {
      throw new Error(
        "[PLH CERTIFICATE] - downloadCertificateAssetAndUpdateLocal requires `filename`"
      );
    }

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), CERTIFICATE_REQUEST_TIMEOUT_MS);
    let response: Response;
    try {
      response = await fetch(url, { signal: controller.signal });
    } catch (err) {
      if (err instanceof Error && err.name === "AbortError") {
        throw new Error(
          `[PLH CERTIFICATE] - Certificate asset download timed out after ${CERTIFICATE_REQUEST_TIMEOUT_MS}ms`,
          { cause: err }
        );
      }
      throw err;
    } finally {
      clearTimeout(timeoutId);
    }

    if (!response.ok) {
      throw new Error(
        `[PLH CERTIFICATE] - Failed to download certificate asset (${response.status})`
      );
    }

    const blob = await response.blob();
    const finalFilename = this.ensureFilenameHasExtension(
      filename,
      response.url || url,
      response.headers.get("content-type") ?? ""
    );
    const assetId = `${CERTIFICATE_ASSET_SUBFOLDER}/${finalFilename}`;

    const filePath = Capacitor.isNativePlatform()
      ? (await this.fileManagerService.saveFile({ data: blob, targetPath: assetId })).src
      : response.url || url;

    await this.dynamicDataService.update(
      "asset_pack",
      CORE_ASSET_PACK_NAME,
      assetId,
      {
        id: assetId,
        filePath,
      },
      { upsert: true }
    );

    this.templateAssetService.assetsContentsList.update((currentAssets) => ({
      ...currentAssets,
      [assetId]: {
        ...(currentAssets[assetId] || {}),
        filePath,
      },
    }));

    return { assetId, filePath };
  }

  /**
   * POST JSON to the certificate generation endpoint.
   * TODO: Work is in progress to add a new service for downloading data from remote endpoints in general
   * For now, include logic for making the request here
   */
  private async fetchCertificate(options: {
    url: string;
    body?: IPlhCertificateRequestBody;
  }): Promise<unknown> {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), CERTIFICATE_REQUEST_TIMEOUT_MS);

    let response: Response;
    try {
      response = await fetch(options.url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: options.body ? JSON.stringify(options.body) : undefined,
        signal: controller.signal,
      });
    } catch (err) {
      if (err instanceof Error && err.name === "AbortError") {
        throw new Error(
          `[PLH CERTIFICATE] - Request timed out after ${CERTIFICATE_REQUEST_TIMEOUT_MS}ms`,
          { cause: err }
        );
      }
      throw err;
    } finally {
      clearTimeout(timeoutId);
    }

    if (!response.ok) {
      const responseText = await response.text().catch(() => "");
      throw new Error(
        `[PLH CERTIFICATE] - Failed to generate certificate (${response.status}): ${responseText.slice(
          0,
          500
        )}`
      );
    }

    const contentType = response.headers.get("content-type") ?? "";
    if (!contentType.includes("application/json")) {
      const responseText = await response.text().catch(() => "");
      throw new Error(
        `[PLH CERTIFICATE] - Expected JSON response but got: ${responseText.slice(0, 500)}`
      );
    }

    try {
      return await response.json();
    } catch {
      throw new Error("[PLH CERTIFICATE] - Could not read the certificate server response.");
    }
  }

  private async updateCertificateDataList(options: {
    certificate_data_list: string;
    certificate_id: string;
    certificate_url: string;
    name: string;
    certificate_template: string;
  }) {
    await this.dynamicDataService.upsert("data_list", options.certificate_data_list, {
      id: options.certificate_id,
      url: options.certificate_url,
      name: options.name,
      certificate_template: options.certificate_template,
    });
  }

  private ensureFilenameHasExtension(
    filename: string,
    sourceUrl: string,
    contentType: string
  ): string {
    const cleanedFilename =
      filename
        .replace(/\\/g, "/")
        .split("/")
        .pop()
        ?.trim()
        .replace(/^\/+|\/+$/g, "") || "certificate";
    if (/\.[a-zA-Z0-9]+$/.test(cleanedFilename)) {
      return cleanedFilename;
    }

    const extensionFromUrl = this.getExtensionFromUrl(sourceUrl);
    if (extensionFromUrl) {
      return `${cleanedFilename}.${extensionFromUrl}`;
    }

    const mimeType = contentType.split(";")[0].trim().toLowerCase();
    const extensionFromMimeType = CONTENT_TYPE_TO_EXTENSION[mimeType];
    if (extensionFromMimeType) {
      return `${cleanedFilename}.${extensionFromMimeType}`;
    }

    return `${cleanedFilename}.png`;
  }

  private getExtensionFromUrl(url: string): string | null {
    try {
      const pathname = new URL(url).pathname;
      const segment = pathname.split("/").pop() || "";
      const extension = segment.split(".").pop() || "";
      return extension && extension !== segment ? extension.toLowerCase() : null;
    } catch {
      return null;
    }
  }
}
