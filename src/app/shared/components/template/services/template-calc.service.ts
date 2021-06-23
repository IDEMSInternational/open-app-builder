import { IFunctionHashmap } from "src/app/shared/utils";

/**
 * Declare any functions that can be called from within `@calc(....)` statements, e.g.
 * ```
 * @calc(pick_random(@local.list_to_pick_from))
 * ```
 */
const CALC_FUNCTIONS: IFunctionHashmap = {
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
    try {
      const foundItem = items.find((el) => el.name === name);
      return foundItem ? foundItem[returnField] : name;
    } catch (error) {
      return name;
    }
  },
};

/**
 * Main export for use in evaluation statements. Includes all above functions
 * alongside additional a base for variables found at `this.`
 *
 * NOTE - if useful entire libraries can also be included in functions or thisCtxt, e.g. lodash, date-fns or mathjs
 */
export const CALC_CONTEXT: ICalcContext = {
  thisCtxt: {
    calc: (v: any) => v, // include simple function so @calc(...) returns the value already parsed inside
  },
  globalFunctions: CALC_FUNCTIONS,
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
}
