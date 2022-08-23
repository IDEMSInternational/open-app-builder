import { DataFrame } from "danfojs";

/**
 * Replace NaN values with replacement value. Similar to danfo.js replace method except
 * also allows for undefined and null values
 */
export function replaceNaN(df: DataFrame, replaceValue: any) {
  df.applyMap((v: any) => (Number.isNaN(v) ? replaceValue : v), { inplace: true });
}
