import { IActionConfig } from "../../models";

export const AppBuild: IActionConfig = {
  name: "App Build",
  description: "Create main app build for use in deployments",
  templatePath: "app-build/template.yml",
  inputs: (deployment) => [
    {
      name: "DEPLOYMENT_NAME",
      description: "name of deployment used",
      required: true,
      defaultValue: deployment.name,
    },
  ],
  secrets: [
    {
      name: "FIREBASE_CONFIG",
      description: "JSON export of firebase config (exported from firebase console)",
      required: true,
    },
  ],
};
