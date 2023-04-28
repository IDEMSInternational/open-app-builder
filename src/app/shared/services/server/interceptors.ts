import { Injectable } from "@angular/core";
import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
  HTTP_INTERCEPTORS,
} from "@angular/common/http";
import { environment } from "src/environments/environment";
import { Observable } from "rxjs";

let { db_name, endpoint: API_ENDPOINT } = environment.deploymentConfig.api;

// Override development credentials when running locally
if (!environment.production) {
  API_ENDPOINT = "http://localhost:3000";
}

/** Handle updating urls intended for api server */
@Injectable()
export class ServerAPIInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // assume requests targetting / (e.g. /app_users) is directed to api endpoint
    if (req.url.startsWith("/")) {
      const headers = req.headers;
      headers.set("db_name", db_name);
      const replacedUrl = `${API_ENDPOINT}${req.url}`;
      const apiReq = req.clone({ url: replacedUrl });
      return next.handle(apiReq);
    }
    return next.handle(req);
  }
}

/** Http interceptor providers in outside-in order */
export const httpInterceptorProviders = [
  { provide: HTTP_INTERCEPTORS, useClass: ServerAPIInterceptor, multi: true },
];
