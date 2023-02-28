import { firebaseConfig } from "./firebaseConfig";
import deploymentJson from "../../.idems_app/deployments/activeDeployment.json";
import type { IDeploymentConfig } from "packages/data-models";

export const environment = {
  deploymentName: deploymentJson.name,
  // HACK - json config converts functions to strings, not strongly typed
  deploymentConfig: deploymentJson as any as IDeploymentConfig,
  production: false,
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
  /** Local Settings */
  apiEndpoint: "http://localhost:3000",
  analytics: { endpoint: "http://localhost/analytics", siteId: 1 },
  /** Production Settings **/
  // apiEndpoint: "https://apps-server.idems.international/api",
  // analytics: { endpoint: "https://apps-server.idems.international/analytics", siteId: 1 },
};

// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
