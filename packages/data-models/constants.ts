/*********************************************************************************************
 *  Constants used to generate types
 *
 * These are usually best-kept independent of types files to allow direct import
 * (typings can get confused depending on compiler if exported multiple times)
 ********************************************************************************************/

export const DYNAMIC_PREFIXES = [
  "local",
  "field",
  "fields",
  "global",
  "data",
  "campaign",
  "calc",
  "item",
] as const;
