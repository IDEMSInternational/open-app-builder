import { Injectable } from "@angular/core";
import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
  HTTP_INTERCEPTORS,
  HttpHeaders,
} from "@angular/common/http";
import { environment } from "src/environments/environment";
import { Observable } from "rxjs";

let { db_name, endpoint: API_ENDPOINT } = environment.deploymentConfig.api;

// Override development credentials when running locally
if (!environment.production) {
  // Docker endpoint. Replace :3000 with /api if running standalone api
  API_ENDPOINT = "http://localhost:3000";
  db_name = "dev";
}

/** Handle updating urls intended for api server */
@Injectable()
export class ServerAPIInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // assume requests targetting / (e.g. /app_users) is directed to api endpoint
    if (req.url.startsWith("/")) {
      const replacedUrl = `${API_ENDPOINT}${req.url}`;
      // append deployment-specific values (header set/append methods inconsistent so create new)
      const headerValues = { "x-deployment-db-name": db_name };
      for (const key of req.headers.keys()) {
        headerValues[key] = req.headers.get(key);
      }
      const apiReq = req.clone({ url: replacedUrl, headers: new HttpHeaders(headerValues) });
      return next.handle(apiReq);
    }
    return next.handle(req);
  }
}

/** Http interceptor providers in outside-in order */
export const httpInterceptorProviders = [
  { provide: HTTP_INTERCEPTORS, useClass: ServerAPIInterceptor, multi: true },
];
