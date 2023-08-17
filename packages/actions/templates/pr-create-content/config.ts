import { IActionConfig } from "../../models";

export const PRCreateContent: IActionConfig = {
  name: "PR Create Content",
  description: "Automatically create a PR when content branches updated",
  templatePath: "pr-create-content/template.yml",
  inputs: () => [
    {
      name: "PUSH_TARGET_BRANCH",
      description: "Branch pattern matched for creating PRs from",
      defaultValue: "content/*",
    },
  ],
  secrets: [
    {
      name: "(permissions) see details",
      description:
        "https://github.com/marketplace/actions/create-pull-request#workflow-permissions",
    },
  ],
  metadata: {
    id: "pr_create_content",
    version: "1.0.0",
  },
};
