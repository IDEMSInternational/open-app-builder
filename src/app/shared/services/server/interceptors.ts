import { Injectable } from "@angular/core";
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest } from "@angular/common/http";

import { Observable } from "rxjs";

/** Handle updating urls intended for api server */
@Injectable()
export class ServerAPIInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // assume requests targetting / (e.g. /app_users) is directed to api endpoint
    if (req.url.startsWith("/")) {
      const replacedUrl = `${environment.apiEndpoint}${req.url}`;
      const apiReq = req.clone({ url: replacedUrl });
      return next.handle(apiReq);
    }
    return next.handle(req);
  }
}

/* "Barrel" of Http Interceptors */
import { HTTP_INTERCEPTORS } from "@angular/common/http";
import { environment } from "src/environments/environment";

/** Http interceptor providers in outside-in order */
export const httpInterceptorProviders = [
  { provide: HTTP_INTERCEPTORS, useClass: ServerAPIInterceptor, multi: true },
];
