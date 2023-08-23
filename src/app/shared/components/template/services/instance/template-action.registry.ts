import { Injectable } from "@angular/core";
import clone from "clone";
import { FlowTypes } from "data-models";

export type IActionId = FlowTypes.TemplateRowAction["action_id"];
export type IActionHandlers = Record<
  IActionId,
  (action: FlowTypes.TemplateRowAction) => Promise<any>
>;

@Injectable({ providedIn: "root" })
/**
 * The template action registry goes alongside the default template action service
 * to allow external modules to register their own action handlers.
 */
export class TemplateActionRegistry {
  private handlers: Partial<IActionHandlers> = {};

  /** Check if a handler has been registered for a specific action trigger */
  public has(trigger: IActionId) {
    return trigger in this.handlers;
  }

  public list() {
    return clone(this.handlers);
  }

  public trigger(action: FlowTypes.TemplateRowAction) {
    const { action_id } = action;
    const handler = this.handlers[action_id];
    if (!handler) {
      throw new Error("No handler registered for action_id: " + action_id);
    }
    return handler(action);
  }

  public register(handlers: Partial<IActionHandlers> = {}, allowOverride = false) {
    for (const [trigger, handler] of Object.entries(handlers)) {
      if (trigger in this.handlers && !allowOverride) {
        throw new Error("Action handler already exists for trigger: " + trigger);
      } else {
        this.handlers[trigger] = handler;
      }
    }
  }

  public unregister(triggers: IActionId[]) {
    for (const trigger of triggers) {
      if (this.has(trigger)) {
        delete this.handlers[trigger];
      }
    }
  }
}
