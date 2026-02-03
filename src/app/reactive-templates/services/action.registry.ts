import { Injectable } from "@angular/core";
import { IRow } from "./row.registry";

export interface IAction extends IRow {
  name(): string;
  execute(params?: IActionParameter[]): Promise<void>;
}

export interface IActionParameter {
  name: string;
  value: any;
}

export function isAction(obj: any): obj is IAction {
  return obj && typeof obj.name === "function" && typeof obj.execute === "function";
}

@Injectable({
  providedIn: "root",
})
export class ActionRegistry {
  private readonly actions = new Map<string, IAction>();

  register(action: IAction) {
    const name = action.name();

    if (!name) {
      throw new Error("ActionRegistry.register: action.name() is empty");
    }

    const existing = this.actions.get(name);
    if (existing && existing !== action) {
      console.warn(`ActionRegistry.register: replacing existing action '${name}'`);
    }

    this.actions.set(name, action);
  }

  get(name: string): IAction {
    const action = this.actions.get(name);
    if (!action) {
      throw new Error(`ActionRegistry.get: no action registered with name '${name}'`);
    }
    return action;
  }

  has(name: string): boolean {
    return this.actions.has(name);
  }

  unregister(name: string) {
    this.actions.delete(name);
  }
}
