import { IFunctionHashmap } from "src/app/shared/utils";

/**
 * Declare any functions that can be called from within `@calc(....)` statements, e.g.
 * ```
 * @calc(pick_random(@local.list_to_pick_from))
 * ```
 */
export const CORE_CALC_FUNCTIONS: IFunctionHashmap = {
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
