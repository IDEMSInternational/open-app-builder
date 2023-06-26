import { AppBuild } from "./app-build/config";
import { DeployFirebase } from "./deploy-firebase/config";
import { PRCreateContent } from "./pr-create-content/config";
import { PRPreviewFirebase } from "./pr-preview-firebase/config";

export const ACTION_TEMPLATES = { AppBuild, DeployFirebase, PRCreateContent, PRPreviewFirebase };
