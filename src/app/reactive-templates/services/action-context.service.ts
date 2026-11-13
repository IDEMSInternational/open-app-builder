import { Injectable } from "@angular/core";
import { FlowTypes } from "packages/data-models";
import { ActionRegistry } from "./action.registry";
import { RowRegistry } from "./row.registry";

@Injectable({ providedIn: "root" })
export class ActionContextService {
  // Keep page context out of the authored action model and allow completed actions to be collected.
  private readonly contexts = new WeakMap<
    FlowTypes.TemplateRowAction,
    { actions: ActionRegistry; rows: RowRegistry }
  >();

  public set(
    action: FlowTypes.TemplateRowAction,
    actions: ActionRegistry,
    rows: RowRegistry
  ): void {
    this.contexts.set(action, { actions, rows });
  }

  public get(action: FlowTypes.TemplateRowAction) {
    return this.contexts.get(action);
  }
}
