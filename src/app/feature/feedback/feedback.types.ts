import { DeviceInfo } from "@capacitor/device";
import { IDBMeta } from "data-models";
import { IContextMenuType } from "src/app/shared/modules/context-menu/context-menu.types";

/** Fields required to include a button in context menus */
export interface IFeedbackContextMenuButton {
  id: string;
  menuButtonText: string;
  appearInMenus: IContextMenuType[];
  displayedTemplate: string;
}

/** Data passed from feedback system */
export interface IFeedbackEntry {
  metadata: IFeedbackMetadata;
  user_feedback: any; // returned from template, may be string or object
  additional: IFeedbackEntryAdditional; //
}

export interface IFeedbackEntryAdditional {
  templateTarget?: ITemplateTargetEntry[];
  [key: string]: any;
}

/** When sending to DB addtional metadata fields included */
export type IFeedbackEntryDB = IFeedbackEntry & IDBMeta & { id?: number };

/** Metadata included with feedback */
export interface IFeedbackMetadata {
  deviceInfo: DeviceInfo;
  pathname: string; // url of page where feedback generated from
  uuid: string;
  timestamp: string;
  app_version: string;
  app_deployment_name: string; // deployment name
  app_theme: string;
  app_skin: string;
  templateTarget?: ITemplateTargetEntry[];
}

/**
 * Template component or container data-params used to identify path to template
 * component (if used to generate feedback)
 **/
export interface ITemplateTargetEntry {
  el: "container" | "component";
  name?: string;
  type?: string;
  templatename?: string;
}
