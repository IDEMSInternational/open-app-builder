import { Inject, Injectable } from "@angular/core";
import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
  HttpHeaders,
} from "@angular/common/http";
import { Observable } from "rxjs";
import { DEPLOYMENT_CONFIG } from "../deployment/deployment.service";
import { IDeploymentRuntimeConfig } from "packages/data-models";

/** Handle updating urls intended for api server */
@Injectable()
export class ServerAPIInterceptor implements HttpInterceptor {
  // Inject the global deployment config to use with requests
  constructor(@Inject(DEPLOYMENT_CONFIG) private deploymentConfig: IDeploymentRuntimeConfig) {}

  /**
   * Intercept all http requests to rewrite including database api endpoint and
   * deployment-db-name headers, as read from deployment config
   */
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // assume requests targetting / (e.g. /app_users) is directed to api endpoint
    if (req.url.startsWith("/")) {
      const { db_name, endpoint, enabled } = this.deploymentConfig.api;
      // If not using api silently cancel any requests to the api
      // TODO - better to disable in service (could also replace interceptor with service more generally)
      if (!enabled) return;
      if (!db_name || !endpoint) {
        console.warn("api endpoint not configured, ignoring request", req.url);
        return;
      }

      const replacedUrl = `${endpoint}${req.url}`;
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
