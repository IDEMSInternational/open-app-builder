import ANGULAR_JSON from "../../../../../../angular.base.json";

export type { ICommonComponentName } from "../../../../../../src/app/shared/components/template/components";

/** Extracted type of settings found in angular.json projects.app.architect.build.options */
export type IAngularBuildOptions =
  (typeof ANGULAR_JSON)["projects"]["app"]["architect"]["build"]["options"];
