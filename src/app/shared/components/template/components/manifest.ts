import type { ICommonComponentName, IComponentManifest } from "packages/components/types";

import { PLH_COMPONENT_MANIFEST } from "components/plh/manifest";

/** Manifest declaration of component dependencies (for use in optimisation) */
const COMMON_COMPONENT_MANIFEST: IComponentManifest<ICommonComponentName> = {
  carousel: { module: "SwiperModule" },
  display_group: {
    implicit: ["form", "advanced_dashed_box"],
  },
  lottie_animation: { module: "LottieModule" },
  pdf: { assets: "/assets/comp-pdf", module: "NgxExtendedPdfViewerModule" },
  slider: { module: "NouisliderModule" },
};

/**
 * List of components that are known to require specific changes to core build to function.
 * NOTE - this list is not comprehensive (should update as required)
 */
export const TEMPLATE_COMPONENT_MANIFEST = {
  ...COMMON_COMPONENT_MANIFEST,
  ...PLH_COMPONENT_MANIFEST,
};
