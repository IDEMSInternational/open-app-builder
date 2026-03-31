import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { firstValueFrom } from "rxjs";

export interface IPublicApiRequestOptions {
  /** Query parameters (undefined values are omitted) */
  params?: Record<string, string | undefined>;
}

/**
 * HTTP GET/POST to absolute URLs.
 */
@Injectable({
  providedIn: "root",
})
export class PublicApiService {
  constructor(private http: HttpClient) {}

  public async getJson<T>(url: string, options?: IPublicApiRequestOptions): Promise<T> {
    const filtered = filterQueryParams(options?.params);
    const params = new HttpParams({ fromObject: filtered });
    return firstValueFrom(this.http.get<T>(url, { params }));
  }

  public async postJson<T>(
    url: string,
    body: unknown,
    options?: IPublicApiRequestOptions
  ): Promise<T> {
    const filtered = filterQueryParams(options?.params);
    const params = new HttpParams({ fromObject: filtered });
    return firstValueFrom(this.http.post<T>(url, body, { params }));
  }
}

function filterQueryParams(params?: Record<string, string | undefined>): Record<string, string> {
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
