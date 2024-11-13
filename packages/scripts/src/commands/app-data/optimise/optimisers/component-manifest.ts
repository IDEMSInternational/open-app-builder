import { ICommonComponentName } from "../optimise.types";

export interface IComponentManifest {
  /** Name of module required by component and imported into template module */
  module?: string;
  /** Name of assets output required by component and included in angular.json */
  assets?: string;
  /** Name of known implicit dependencies of component that must be included with component */
  implicit?: ICommonComponentName[];
}

/**
 * List of components that are known to require specific changes to core build to function.
 * NOTE - this list is not comprehensive (should update as required)
 */
export const COMPONENT_MANIFEST: {
  [name in ICommonComponentName]?: IComponentManifest;
} = {
  carousel: { module: "SwiperModule" },
  display_group: {
    implicit: ["form", "advanced_dashed_box"],
  },
  lottie_animation: { module: "LottieModule" },
  pdf: { module: "NgxExtendedPdfViewerModule", assets: "/assets/comp-pdf" },
  slider: { module: "NouisliderModule" },

  // Additional mappings from component package
  ["parent_point_box" as any]: {
    implicit: ["lottie_animation"],
  },
};
