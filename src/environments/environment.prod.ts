import { firebaseConfig } from "./firebaseConfig";
import packageJson from "../../package.json";
import { ENV_NAME } from "./env_name";

export const environment = {
  version: packageJson.version,
  production: true,
  rapidPro: {
    receiveUrl:
      "https://rapidpro.idems.international/c/fcm/a459e9bf-6462-41fe-9bde-98dbed64e687/receive",
    contactRegisterUrl:
      "https://rapidpro.idems.international/c/fcm/a459e9bf-6462-41fe-9bde-98dbed64e687/register",
  },
  firebaseConfig,
  envName: ENV_NAME,
  domains: ["plh-demo1.idems.international", "plh-demo.idems.international"],
  chatNonNavigatePaths: ["/chat/action", "/chat/msg-info"],
  variableNameFlows: ["character_names"],
  apiEndpoint: "https://apps-server.idems.international/api",
  analytics: { endpoint: "https://apps-server.idems.international/analytics", siteId: 1 },
};
