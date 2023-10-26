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
      name: "DEPLOYMENT_PRIVATE_KEY",
      description: "(optional) Private key if using encrypted deployments",
    },
    {
      name: "FIREBASE_CONFIG",
      description: "(optional) JSON export from firebase console if using firebase",
    },
  ],
  metadata: {
    id: "app_build",
    version: "1.0.1",
  },
};
