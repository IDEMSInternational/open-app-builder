import { Injectable } from "@angular/core";

import { DynamicDataService } from "src/app/shared/services/dynamic-data/dynamic-data.service";
import {
  isPlhCertificateSuccessResponse,
  type IPlhCertificateGenerateParams,
  type IPlhCertificateRequestBody,
  type IPlhCertificateResponse,
} from "./plh-certificate.types";

/** Prevent hung requests when connectivity is poor */
const CERTIFICATE_REQUEST_TIMEOUT_MS = 60_000;

@Injectable({
  providedIn: "root",
})
export class PlhCertificateService {
  /** At most one generation runs at a time; overlapping calls await the same in-flight promise. */
  private inFlight: Promise<IPlhCertificateResponse> | null = null;

  constructor(private dynamicDataService: DynamicDataService) {}

  /**
   * POST JSON to the given absolute URL (certificate generation endpoint).
   * While a request is in progress, further calls return that same promise (duplicate taps do not start parallel requests).
   */
  public async generateCertificateAndUpdateLocal(
    options: IPlhCertificateGenerateParams
  ): Promise<IPlhCertificateResponse> {
    if (this.inFlight) {
      return this.inFlight;
    }
    this.inFlight = this.generateCertificateAndUpdateLocalOnce(options).finally(() => {
      this.inFlight = null;
    });
    return this.inFlight;
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
}
