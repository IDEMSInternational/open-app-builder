export interface IContextMenuAction {
  id: string;
  menuButtonText: string;
  actionHandler: (ev: PointerEvent) => void;
}
export interface IContextMenuActionHashmap {
  [id: string]: IContextMenuAction;
}
export type IContextMenuType = "rightClick" | "textSelect" | "longPress";
