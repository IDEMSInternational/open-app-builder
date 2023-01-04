import { Injectable } from "@angular/core";
import { FlowTypes } from "packages/data-models";

type IActionId = FlowTypes.TemplateRowAction["action_id"];
type IHandlers = Record<IActionId, (action: FlowTypes.TemplateRowAction) => Promise<any>>;

@Injectable({ providedIn: "root" })
/**
 * The template action registry goes alongside the default template action service
 * to allow external modules to register their own action handlers.
 *
 * TODO - Refactor all global handlers to use registry instead of direct import in service
 * NOTE - specific instance handlers will need to remain in service (e.g. set_local)
 */
export class TemplateActionRegistry {
  private handlers: Partial<IHandlers> = {};

  /** Check if a handler has been registered for a specific action trigger */
  public has(trigger: IActionId) {
    return trigger in this.handlers;
  }

  public trigger(action: FlowTypes.TemplateRowAction) {
    const { action_id } = action;
    const handler = this.handlers[action_id];
    if (!handler) {
      throw new Error("No handler registered for action_id: " + action_id);
    }
    return handler(action);
  }

  public register(handlers: Partial<IHandlers> = {}) {
    for (const [trigger, handler] of Object.entries(handlers)) {
      if (trigger in this.handlers) {
        throw new Error("Action handler already exists for trigger: " + trigger);
      } else {
        this.handlers[trigger] = handler;
      }
    }
  }
}
