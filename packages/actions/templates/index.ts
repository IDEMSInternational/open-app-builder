import { readFileSync } from "fs";
import { resolve } from "path";

export interface ITemplateMeta {
  name: string;
  description: string;
  /** string representation of template yaml */
  yaml: string;
  /** name of any additional templates required */
  requires?: string[];
  /** user inputs replaced within template yaml */
  inputs: {
    name: string;
    description: string;
    required?: boolean;
    defaultValue?: any;
  }[];
  /** github secrets required on server */
  secrets: {
    name: string;
    description: string;
    required?: boolean;
  }[];
}

export const TEMPLATES: ITemplateMeta[] = [
  {
    name: "Deploy to Firebase",
    description:
      "Build and deploy to firebase hosting\nSupports both live and preview deployments, and per-branch triggers",
    yaml: loadTemplateYml("./deploy-firebase.yml"),
    requires: ["./app-build.yml"],
    inputs: [
      { name: "FIREBASE_PROJECT_ID", description: "ID of firebase project used", required: true },
      {
        name: "FIREBASE_HOSTING_CHANNEL",
        description:
          "Name of channel to deploy to (default 'live' is main site, any other word, e.g. 'pr' will create random temp preview site)",
        defaultValue: "live",
      },
      {
        name: "FIREBASE_HOSTING_TARGET",
        description:
          "Optional override target if using multiple hosting sites for firebase project",
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
        description: "JSON export of service account (exported from firebase console)",
        required: true,
      },
    ],
  },
];

function loadTemplateYml(relativePath: string) {
  return readFileSync(resolve(__dirname, relativePath), "utf-8");
}
