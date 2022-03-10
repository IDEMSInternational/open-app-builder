import { parse } from "marked";

/** Programatically parse markdown text as html */
export function parseMarkdown(str: string = "") {
  return parse(str);
}
