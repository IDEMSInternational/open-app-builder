import { IActionHandler } from "../../components/template/services/instance/template-action.registry";
import { HttpService } from "./http.service";

// export class HttpActionFactory {
//   constructor(private service: HttpService) {}

//   public http: IActionHandler<IHttpActionParams> = async ({ args, params }) => {
//     const [actionId, url] = args;
//     if (!url) {
//       console.error(`No url provided to request`, { args, params });
//     }
//     // TODO - validate params and merge defaults

//     const childActions = {
//       get: async () => this.service.get(url, params),
//       clear_cache: async () => this.service["cache"],
//       //   TODO - cancel request with given id
//       cancel: async () => null,
//     };
//     if (!(actionId in childActions)) {
//       console.error(`[HTTP] No action, ${actionId}`);
//       return;
//     }
//     return childActions[actionId]();
//   };

//   private clearExpired() {}
// }
