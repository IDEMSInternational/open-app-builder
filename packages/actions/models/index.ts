import type { IDeploymentConfig } from "data-models";

export interface IActionConfig {
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
  /** Additional metadata populated to templates for use in debugging */
  metadata: {
    /** unique id of action template (used for updating) */
    id: string;
    /** template version, using semantic versioning, e.g. "1.0.0" */
    version: string;
  };
}
