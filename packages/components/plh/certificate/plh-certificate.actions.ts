import type {
  IActionHandler,
  ITemplateActionServiceHandle,
} from "src/app/shared/components/template/services/instance/template-action.registry";
import { PlhCertificateService } from "./plh-certificate.service";
import type {
  IPlhCertificateGenerateParams,
  IPlhCertificateGenerateResponse,
} from "./plh-certificate.types";
import {
  isPlhCertificateErrorResponse,
  isPlhCertificateSuccessResponse,
} from "./plh-certificate.types";

export type { IPlhCertificateGenerateParams };

export class PlhCertificateActionFactory {
  constructor(private service: PlhCertificateService) {}

  public plh_certificate: IActionHandler<IPlhCertificateGenerateParams> = async (
    { args, params, _triggeredBy },
    host?: ITemplateActionServiceHandle
  ) => {
    const [actionId] = args;
    const {
      url,
      name,
      certificate_template,
      result_local_variable_name,
      certificate_data_list,
      id,
    } = params;

    const childActions = {
      generate: async () => {
        if (!url?.trim()) {
          console.error("[PLH CERTIFICATE] - generate requires `url` (full API endpoint)");
          return;
        }
        if (!name?.trim()) {
          console.error("[PLH CERTIFICATE] - generate requires `name`");
          return;
        }
        if (!certificate_template?.trim()) {
          console.error("[PLH CERTIFICATE] - generate requires `certificate_template`");
          return;
        }
        if (certificate_data_list?.trim() && !id?.trim()) {
          console.error(
            "[PLH CERTIFICATE] - generate requires `id` when `certificate_data_list` is set"
          );
          return;
        }
        const result = await this.service.generateCertificateAndUpdateLocal({
          id,
          url: url.trim(),
          name,
          certificate_template,
          certificate_data_list,
        });
        const parsedResult: IPlhCertificateGenerateResponse = {
          success: isPlhCertificateSuccessResponse(result),
          error: !isPlhCertificateSuccessResponse(result) && isPlhCertificateErrorResponse(result),
          data: result,
        };
        if (result_local_variable_name && host) {
          host.enqueueActions(
            [
              {
                action_id: "set_local",
                args: [result_local_variable_name, parsedResult],
                trigger: "click",
              },
            ],
            _triggeredBy
          );
        }
        return parsedResult;
      },
    };

    if (!(actionId in childActions)) {
      console.error(`[PLH CERTIFICATE] - No action, "${actionId}"`);
      return;
    }
    return childActions[actionId as keyof typeof childActions]();
  };
}
