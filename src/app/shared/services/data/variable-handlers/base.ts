import { BehaviorSubject } from "rxjs";
import type { IVariableContext } from "../app-data-variable.service";

/**
 * Base method for interacting with context expression evaluation
 * Context expressions are defined by `@context_name.property_name` syntax,
 * e.g. `@fields.some_field`
 *
 * TODO
 * Ideally all evaluators should keep a cache of responses in memory,
 * and methods to populate, update and invalidate
 *
 * This could also be linked to rxdb to provide better methods to subscribe
 * to changes, query etc.
 */
export class AppDataHandlerBase {
  /** In-memory store of values */
  private values: Record<string, any> = {};

  /**
   * @param contextNamespace Name of context prefix, e.g. 'field' for '@field'
   */
  protected constructor(private contextNamespace: IVariableContext) {}

  public async get(key: any): Promise<any> {
    return this.values[key];
  }
  public async set(key: string, value: any) {
    this.values[key] = value;
  }

  /**
   * WiP - future methods to allow observance of any dynamic variables
   * TODO - will want list of existing subscriptions to add subscriber to
   * and some means of closing subscription when no subscribers
   * to avoid memory leaks
   */
  public get$(key: string) {
    console.warn("[AppDataEvaulator] get$ method not defined for child");
    return new BehaviorSubject(undefined);
  }
}
