import type {
  IActionHandler,
  ITemplateActionServiceHandle,
} from "src/app/shared/components/template/services/instance/template-action.registry";
import { PlhCertificateService } from "./plh-certificate.service";

/** Params reserved for the action; any other string params are sent as the JSON POST body */
interface IPlhCertificateActionParams {
  /** Full URL of the certificate API (must be absolute, e.g. https://...) */
  url: string;
  /** Store the JSON response in a local template variable via `set_local` */
  result_local_variable_name?: string;
  [key: string]: string | undefined;
}

const RESERVED_PARAM_KEYS = new Set(["url", "result_local_variable_name"]);

export class PlhCertificateActionFactory {
  constructor(private service: PlhCertificateService) {}

  public plh_certificate: IActionHandler<IPlhCertificateActionParams> = async (
    { args, params, _triggeredBy },
    host?: ITemplateActionServiceHandle
  ) => {
    const [actionId] = args;
    const { url, result_local_variable_name, ...rest } = params;

    const body: Record<string, string | undefined> = {};
    for (const [key, value] of Object.entries(rest)) {
      if (!RESERVED_PARAM_KEYS.has(key) && value !== undefined) {
        body[key] = value;
      }
    }

    const childActions = {
      /** POST JSON to the URL in `url` */
      fetch: async () => {
        if (!url?.trim()) {
          console.error("[PLH CERTIFICATE] - fetch requires `url` (full API endpoint)");
          return;
        }
        const result = await this.service.fetchCertificate({ url: url.trim(), body });
        if (result_local_variable_name && host) {
          host.enqueueActions(
            [
              {
                action_id: "set_local",
                args: [result_local_variable_name, result],
                trigger: "click",
              },
            ],
            _triggeredBy
          );
        }
        return result;
      },
    };

    if (!(actionId in childActions)) {
      console.error(`[PLH CERTIFICATE] - No action, "${actionId}"`);
      return;
    }
    return childActions[actionId]();
  };
}
