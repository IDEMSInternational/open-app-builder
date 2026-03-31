import { Injectable } from "@angular/core";

import { PublicApiService } from "src/app/feature/public-api";

@Injectable({
  providedIn: "root",
})
export class PlhCertificateService {
  constructor(private publicApi: PublicApiService) {}

  /**
   * POST JSON to the given absolute URL (certificate generation endpoint).
   */
  public async fetchCertificate(options: {
    url: string;
    body?: Record<string, string | undefined>;
  }): Promise<unknown> {
    const body = filterBody(options.body);
    return this.publicApi.postJson<unknown>(options.url, body);
  }
}

function filterBody(params?: Record<string, string | undefined>): Record<string, string> {
  const out: Record<string, string> = {};
  if (!params) {
    return out;
  }
  for (const [key, value] of Object.entries(params)) {
    if (value !== undefined && value !== "") {
      out[key] = value;
    }
  }
  return out;
}
