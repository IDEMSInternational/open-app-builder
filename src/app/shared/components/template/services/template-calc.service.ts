import { IFunctionHashmap, IConstantHashmap } from "src/app/shared/utils";

import { Injectable } from "@angular/core";
import * as date_fns from "date-fns";
import { ServerService } from "src/app/shared/services/server/server.service";
import { DataEvaluationService } from "src/app/shared/services/data/data-evaluation.service";

@Injectable({ providedIn: "root" })
export class TemplateCalcService {
  /** list of all variables accessible directly within calculations */
  private calcContext: ICalcContext;

  constructor(
    private serverService: ServerService,
    private dataEvaluationService: DataEvaluationService
  ) {}

  /** Provide calc context, initialising only once */
  public getCalcContext() {
    if (!this.calcContext) {
      this.addWindowCalcFunctions();
      this.calcContext = this.generateCalcContext();
    }
    return this.calcContext;
  }

  /**
   * Main export for use in evaluation statements. Includes all functions listed below
   * alongside additional a base for variables found at `this.`
   */
  private generateCalcContext(): ICalcContext {
    const globalConstants = this.generateGlobalConstants();
    const globalFunctions = { ...CALC_FUNCTIONS };
    const thisCtxt = this.generateThisCtxt();
    return { globalConstants, globalFunctions, thisCtxt };
  }

  private generateThisCtxt() {
    return {
      calc: (v: any) => v, // include simple function so @calc(...) returns the value already parsed inside
      app_day: this.dataEvaluationService.data.app_day,
      app_first_launch: this.dataEvaluationService.data.first_app_launch,
      app_user_id: this.serverService.app_user_id,
      device_info: this.serverService.device_info,
    };
  }

  /**
   * Provide a list of variables that can be accessed directly within calculations
   *
   * NOTE - as they will be hardcoded into the function string execution statement the only
   * datatypes naturally supported are number and boolean, and custom method adds support
   * for strings also (adds quotation marks). More complex datatypes should instead be included
   * in the `this` context, or added to the global window object
   *
   * @example
   * ```
   * calc(test_var)
   *
   * // returns "hello"
   * ```
   */
  private generateGlobalConstants() {
    const globalConstants: IConstantHashmap = {
      test_var: "hello",
    };
    return globalConstants;
  }

  /**
   * 3rd party imports cannot be easily inlined, so instead add them to the window object to access from calculations
   * @example
   * ```
   * calc(window.date_fns.differenceInWeeks(new Date(), new Date("2021-08-01"))
   * ```
   */
  private addWindowCalcFunctions() {
    (window as any).date_fns = date_fns;
  }
}

/**
 * Declare any functions that can be called from within `@calc(....)` statements, e.g.
 * ```
 * @calc(pick_random(@local.list_to_pick_from))
 * ```
 */
const CALC_FUNCTIONS: IFunctionHashmap = {
  /** Shortcut method to generate current datetime as Date object */
  now: () => new Date(),

  /**
   * Same code used in app generateTimestamp method to generate a string representation
   * of a given date (or current date if no input specified)
   */
  timestamp: (value?: string | Date) => {
    const date = value ? new Date(value) : new Date();
    return (window as any).date_fns.format(date, "yyyy-MM-dd'T'HH:mm:ss");
  },
  /**
   * Pick a random item from a list
   * @param arr array of items to pick from
   */
  pick_random: (items: any[] = []) => {
    try {
      const randomItem = items[Math.floor(Math.random() * items.length)];
      return randomItem;
    } catch (error) {
      console.error("[pick_random] error", { items, error });
      return items;
    }
  },

  /**
   * Most input elements display a 'text' (label) property but store a 'name' (value) property
   * Lookup a list of items by name, and return the text)
   * @param list string array containing answer options, e.g.
   * ```[name:name_var_1 | text:Option 1, name:name_var_2 | text: Option 2]```
   * @param name the name to lookup from the list of items
   * @param returnField specify a single field from the item to return, default: 'text'
   */
  lookup_answer_list: (list: string[] = [], name: string, returnField: string = "text") => {
    // Convert the list key-value pairs. Note - whilst this function is shared in template-utils
    // we cannot import into this function as it is created dynamically
    try {
      const items = list.map((item) => {
        const props: any = {};
        item
          .split("|")
          .map((i) => i.trim())
          .forEach((i) => {
            const [key, value] = i.split(":").map((v) => v.trim());
            props[key] = value;
          });
        return props;
      });
      const foundItem = items.find((el) => el.name === name);
      return foundItem ? foundItem[returnField] : name;
    } catch (error) {
      return name;
    }
  },
};

/**
 * When evaluating functions we have a custom context, so that variables can be specified to both 'this',
 * as in `this.local.some_value` as well as global functions which can be accessed directly, e.g.
 * `pick_random(this.local.some_list)`
 */
export interface ICalcContext {
  thisCtxt: {
    [name: string]: any;
  };
  globalFunctions: IFunctionHashmap;
  globalConstants: IConstantHashmap;
}
