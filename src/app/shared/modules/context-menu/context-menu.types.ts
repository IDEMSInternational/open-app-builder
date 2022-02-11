export interface IContextMenuAction {
  id: string;
  menuButtonText: string;
  actionHandler: (ev: PointerEvent, data?: IContextMenuActionData) => void;
}
export interface IContextMenuActionHashmap {
  [id: string]: IContextMenuAction;
}
export type IContextMenuType = "rightClick" | "textSelect" | "longPress";

export interface IContextMenuActionData {
  selectedText?: string;
}
