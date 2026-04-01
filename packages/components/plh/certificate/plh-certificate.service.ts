import { Injectable } from "@angular/core";

import { PublicApiService } from "src/app/feature/public-api";
import { DynamicDataService } from "src/app/shared/services/dynamic-data/dynamic-data.service";
import {
  isPlhCertificateSuccessResponse,
  type IPlhCertificateGenerateParams,
  type IPlhCertificateRequestBody,
  type IPlhCertificateResponse,
} from "./plh-certificate.types";

@Injectable({
  providedIn: "root",
})
export class PlhCertificateService {
  constructor(
    private publicApi: PublicApiService,
    private dynamicDataService: DynamicDataService
  ) {}

  /**
   * POST JSON to the given absolute URL (certificate generation endpoint).
   */
  public async generateCertificateAndUpdateLocal(
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
   */
  private async fetchCertificate(options: {
    url: string;
    body?: IPlhCertificateRequestBody;
  }): Promise<unknown> {
    return await this.publicApi.postJson<unknown>(options.url, options.body);
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
