import deploymentJson from "../../.idems_app/deployments/activeDeployment.json";
import type { IDeploymentConfig } from "data-models";

export const environment = {
  // HACK - json config converts functions to strings, not strongly typed
  deploymentConfig: deploymentJson as any as IDeploymentConfig,
  production: true,
  rapidPro: {
    receiveUrl:
      "https://rapidpro.idems.international/c/fcm/a459e9bf-6462-41fe-9bde-98dbed64e687/receive",
    contactRegisterUrl:
      "https://rapidpro.idems.international/c/fcm/a459e9bf-6462-41fe-9bde-98dbed64e687/register",
  },
  domains: ["plh-demo1.idems.international", "plh-demo.idems.international"],
  chatNonNavigatePaths: ["/chat/action", "/chat/msg-info"],
  variableNameFlows: ["character_names"],
};
