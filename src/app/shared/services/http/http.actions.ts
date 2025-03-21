import { IActionHandler } from "../../components/template/services/instance/template-action.registry";
import { HttpService } from "./http.service";

export interface IHttpActionParams {
  /**
   * Responses be available via @data._http table via id
   * TODO - maybe store status, progress, source, value, etc.
   * TODO - probably move into external-data component/feature
   *
   * Likely generated from request url + params (or compound method + url)
   */
  _id?: string;

  /**
   * Specify strategy.
   * Default uses browser own defaults, typically relying on response headers
   **/
  strategy?: "cache-first" | "cache-only" | "network-first" | "network-only";
  /** Shorthand ttl, e.g. 1m (60000) 1h (3600000) 1d (86400000). Default 1m */
  expiry: string;

  /** Maximum number of times to re-attempt failed request. Default 2*/
  max_retries: number;
}

export class HttpActionFactory {
  constructor(private service: HttpService) {}

  public http: IActionHandler<IHttpActionParams> = async ({ args, params }) => {
    const [actionId, url] = args;
    if (!url) {
      console.error(`No url provided to request`, { args, params });
    }
    // TODO - validate params and merge defaults

    const childActions = {
      get: async () => this.service.get(url, params),
      clear_cache: async () => this.service["cache"],
      //   TODO - cancel request with given id
      cancel: async () => null,
    };
    if (!(actionId in childActions)) {
      console.error(`[HTTP] No action, ${actionId}`);
      return;
    }
    return childActions[actionId]();
  };

  private clearExpired() {}
}
