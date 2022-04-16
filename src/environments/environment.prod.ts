import { firebaseConfig } from "./firebaseConfig";
import packageJson from "../../package.json";
import deploymentJson from "../../.idems_app/deployments/default.json";

export const environment = {
  version: packageJson.version,
  deploymentName: deploymentJson.name,
  deploymentConfig: deploymentJson,
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
