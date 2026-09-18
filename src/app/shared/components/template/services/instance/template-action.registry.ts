import { Injectable } from "@angular/core";
import clone from "clone";
import { FlowTypes } from "data-models";

export type IActionId = FlowTypes.TemplateRowAction["action_id"];

/**
 * Narrow handle passed to registry handlers when they run inside TemplateActionService.
 * Use `enqueueActions` to schedule `set_local` and other built-in actions;
 */
export interface ITemplateActionServiceHandle {
  enqueueActions(
    actions: FlowTypes.TemplateRowAction[],
    _triggeredBy?: FlowTypes.TemplateRow
  ): void;
}

export type IActionHandler<ParamsType = any> = (
  action: FlowTypes.TemplateRowAction<ParamsType>,
  host?: ITemplateActionServiceHandle
) => Promise<any>;

export type IActionHandlers<ParamsType = any> = Record<IActionId, IActionHandler<ParamsType>>;

/** Decides whether a specific action triggered for an action_id should bypass the action queue */
export type IImmediateActionMatcher = (action: FlowTypes.TemplateRowAction) => boolean;

@Injectable({ providedIn: "root" })
/**
 * The template action registry goes alongside the default template action service
 * to allow external modules to register their own action handlers.
 */
export class TemplateActionRegistry {
  private handlers: Partial<IActionHandlers> = {};
  private immediateMatchers = new Map<IActionId, IImmediateActionMatcher>();

  /** Check if a handler has been registered for a specific action trigger */
  public has(trigger: IActionId) {
    return trigger in this.handlers;
  }

  public list() {
    return clone(this.handlers);
  }

  public trigger(action: FlowTypes.TemplateRowAction, host?: ITemplateActionServiceHandle) {
    const { action_id } = action;
    const handler = this.handlers[action_id];
    if (!handler) {
      throw new Error("No handler registered for action_id: " + action_id);
    }
    return handler(action, host);
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

  /**
   * Dispatch actions for a trigger as soon as they are handled, instead of appending them to the
   * template action queue. Reserved for actions that interrupt work already on that queue: the queue
   * is serial, so a long-running action (e.g. `asset_pack: download`) holds it, and an interrupt
   * queued behind its own target only runs once that target has finished.
   * `matcher` narrows this to specific actions for the trigger, e.g. a single child action:
   * `registerImmediate("asset_pack", (a) => a.args?.[0] === "cancel_download")`
   *
   * An immediate action runs concurrently with whatever the queue is mid-way through, so it must be
   * safe against that interleaving. Two limits to author around: only actions dispatched directly
   * through `handleActions` (i.e. a row trigger) are immediate - `trigger_actions`, `emit` and
   * `enqueueActions` all queue - and immediates run before queued siblings from the same call.
   */
  public registerImmediate(trigger: IActionId, matcher: IImmediateActionMatcher = () => true) {
    this.immediateMatchers.set(trigger, matcher);
  }

  /** Whether an action should bypass the template action queue (see `registerImmediate`) */
  public isImmediate(action: FlowTypes.TemplateRowAction) {
    const matcher = this.immediateMatchers.get(action.action_id);
    return matcher ? matcher(action) : false;
  }

  public unregister(triggers: IActionId[]) {
    for (const trigger of triggers) {
      if (this.has(trigger)) {
        delete this.handlers[trigger];
      }
      this.immediateMatchers.delete(trigger);
    }
  }
}
