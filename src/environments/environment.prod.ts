import { firebaseConfig } from "./firebaseConfig";
import deploymentJson from "../../.idems_app/deployments/activeDeployment.json";
import type { IDeploymentConfig } from "packages/data-models";

export const environment = {
  deploymentName: deploymentJson.name,
  // HACK - json config converts functions to strings, not strongly typed
  deploymentConfig: deploymentJson as any as IDeploymentConfig,
  production: true,
  rapidPro: {
    receiveUrl:
      "https://rapidpro.idems.international/c/fcm/a459e9bf-6462-41fe-9bde-98dbed64e687/receive",
    contactRegisterUrl:
      "https://rapidpro.idems.international/c/fcm/a459e9bf-6462-41fe-9bde-98dbed64e687/register",
  },
  firebaseConfig,
  domains: ["plh-demo1.idems.international", "plh-demo.idems.international"],
  chatNonNavigatePaths: ["/chat/action", "/chat/msg-info"],
  variableNameFlows: ["character_names"],
  apiEndpoint: "https://apps-server.idems.international/api",
  analytics: { endpoint: "https://apps-server.idems.international/analytics", siteId: 1 },
};
