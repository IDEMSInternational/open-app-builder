import type { IDeploymentConfig } from "data-models";

export interface ITemplateConfig {
  name: string;
  description: string;
  /** relative path to template.yml */
  templatePath: string;
  /** name of any additional templates required */
  requires?: { name: string }[];
  /** user inputs replaced within template yaml */
  inputs: (deployment: IDeploymentConfig) => {
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
