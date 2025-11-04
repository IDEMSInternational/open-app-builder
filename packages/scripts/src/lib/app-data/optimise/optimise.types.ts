import ANGULAR_JSON from "../../../../../../angular.json";

export type { IComponentManifest, ICommonComponentName } from "../../../../../components/types";

/** Extracted type of settings found in angular.json projects.app.architect.build.options */
export type IAngularBuildOptions =
  (typeof ANGULAR_JSON)["projects"]["app"]["architect"]["build"]["options"];
