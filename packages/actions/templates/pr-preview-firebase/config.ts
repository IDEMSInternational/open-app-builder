import { IActionConfig } from "../../models";

export const PRPreviewFirebase: IActionConfig = {
  name: "PR Preview - Firebase",
  description: "Build and deploy PR preview to firebase",
  templatePath: "pr-preview-firebase/template.yml",
  requires: [{ name: "App Build" }],
  inputs: () => [
    {
      name: "PR_LABEL_TRIGGER",
      description: "Specific label that must be manually applied in order to trigger preview",
      defaultValue: "Test - Preview",
    },
    {
      name: "PR_TARGET_BRANCH",
      description: "Branch name or pattern required as target for PR to trigger",
      defaultValue: "main",
    },
    { name: "FIREBASE_PROJECT_ID", description: "ID of firebase project used", required: true },

    {
      name: "FIREBASE_HOSTING_TARGET",
      description: "Optional override target if using multiple hosting sites for firebase project",
      defaultValue: "",
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
    id: "pr_preview_firebase",
    version: "1.0.0",
  },
};
