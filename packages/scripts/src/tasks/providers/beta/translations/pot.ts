import { getPlaceholders } from "./extract";

/** A string written to a gettext file */
export interface IPotEntry {
  /** Written as `msgctxt`, and as a `type=` comment for translators */
  context: string;
  text: string;
}

const POT_HEADER = ['msgid ""', 'msgstr ""', '"Content-Type: text/plain; charset=utf-8\\n"'];

/**
 * Write entries as a gettext template (`.pot`): source strings with empty translations, which
 * translation tools (e.g. Crowdin) use to create a `.po` file of translations per language.
 * Follows the layout of the existing translation files, e.g.
 * ```
 * #. type=data_list
 * #. The string @global.app_name should not be translated.
 * msgctxt "data_list"
 * msgid "Your @global.app_name Code"
 * msgstr ""
 * ```
 */
export function toPot(entries: IPotEntry[]) {
  const blocks = [POT_HEADER.join("\n")];
  for (const { context, text } of entries) {
    const lines = [`#. type=${context}`, ...placeholderComments(text)];
    lines.push(`msgctxt ${quote(context)}`);
    lines.push(...formatMsgid(text));
    lines.push('msgstr ""');
    blocks.push(lines.join("\n"));
  }
  return blocks.join("\n\n") + "\n";
}

/** Comments telling translators which parts of the text to leave unchanged */
function placeholderComments(text: string) {
  const placeholders = getPlaceholders(text).filter((p, i, all) => all.indexOf(p) === i);
  if (placeholders.length === 0) return [];
  if (placeholders.length === 1) {
    return [`#. The string ${placeholders[0]} should not be translated.`];
  }
  return [
    "#. The following strings should not be translated: ",
    ...placeholders.map((p) => `#.      ${p}`),
  ];
}

/** Text with line breaks is split into one quoted line per line, after an empty `msgid ""` */
function formatMsgid(text: string) {
  if (!text.includes("\n")) return [`msgid ${quote(text)}`];
  const lines = text.split(/(?<=\n)/);
  return ['msgid ""', ...lines.map(quote)];
}

function quote(text: string) {
  const escaped = text
    .replace(/\\/g, "\\\\")
    .replace(/"/g, '\\"')
    .replace(/\r/g, "\\r")
    .replace(/\n/g, "\\n")
    .replace(/\t/g, "\\t");
  return `"${escaped}"`;
}
