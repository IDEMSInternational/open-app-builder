import { IActionConfig } from "../../models";

export const DeployFirebase: IActionConfig = {
  name: "Deploy to Firebase",
  description: "Build and deploy to firebase hosting",
  templatePath: "deploy-firebase/template.yml",
  requires: [{ name: "App Build" }],
  inputs: () => [
    { name: "FIREBASE_PROJECT_ID", description: "ID of firebase project used", required: true },
    {
      name: "FIREBASE_HOSTING_CHANNEL",
      description:
        "Name of channel to deploy to (default 'live' is main site, any other word, e.g. 'pr' will create random temp preview site)",
      defaultValue: "live",
    },
    {
      name: "FIREBASE_HOSTING_TARGET",
      description: "Optional override target if using multiple hosting sites for firebase project",
      defaultValue: "",
    },
    {
      name: "PUSH_TARGET_BRANCH",
      description: "Name of branch used to trigger action on push",
      defaultValue: "main",
    },
  ],
  secrets: [
    {
      name: "FIREBASE_SERVICE_ACCOUNT",
      description: "JSON export of firebase service account (from console)",
      required: true,
    },
  ],
  metadata: {
    id: "deploy_firebase",
    version: "1.0.0",
  },
};
