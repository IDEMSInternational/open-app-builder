/**
 * Declare any functions that can be called from within `@calc(....)` statements, e.g.
 * ```
 * @calc(pick_random(@local.list_to_pick_from))
 * ```
 */
const CALC_FUNCTIONS: ((...args: any) => any)[] = [
  function parse_value_list() {},
  /**
   * Pick a random item from a list
   * @param arr array of items to pick from
   */
  function pick_random(items: any[] = []) {
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
  function lookup_answer_list(list: string[] = [], name: string, returnField: string = "text") {
    // Note - whilst this function is shared in template-utils we cannot import into this function
    // as it is created dynamically
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
];

/**
 * Main export for use in evaluation statements. Includes all above functions
 * alongside additional a base for variables found at `this.`
 *
 * NOTE - if useful entire libraries can also be included in functions or thisCtxt, e.g. lodash, date-fns or mathjs
 */
export const CALC_CONTEXT = {
  thisCtxt: {
    calc: (v: any) => v, // include simple function so @calc(...) returns the calculated value
  },
  globalFunctions: CALC_FUNCTIONS, // include all calculations as above
};
