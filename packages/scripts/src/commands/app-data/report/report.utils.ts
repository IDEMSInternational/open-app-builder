import { IReport } from "./report.types";

/**
 * Convert an array to a basic markdown-formatted table
 * @example
 * ```
 * generateMarkdownTable([{key_1:'value_1', key_2:'value_2'}])
 * // output
 * | key_1 | key_2 |
 * | --- | --- |
 * | value_1 | value_2 |
 * ```
 */
export function generateMarkdownTable(data: Record<string, any>[], columns?: string[]) {
  // infer columns from data if not provided
  if (!columns) {
    columns = Object.keys(data[0] || {});
  }
  const rows: string[][] = [];
  rows.push(columns);
  rows.push(columns.map(() => "---"));
  for (const el of data) {
    rows.push(columns.map((c) => el[c]));
  }
  const rowStrings: string[] = rows.map((r) => `| ${r.join(" | ")} |`);
  return rowStrings.join("\n");
}

/** Generate a full markdown representation for a report */
export function generateReportMarkdown(report: IReport) {
  return new ReportMarkdownGenerator(report).generate();
}

class ReportMarkdownGenerator {
  constructor(private report: IReport) {}

  public generate() {
    const { level } = this.report;
    if (level === "info" || level === "advisory") {
      return this.generateCollapsibleReport();
    } else {
      // add handling for other levels as created
    }
  }

  /** generate markdown text to populate within section content */
  private generateCollapsibleReport() {
    const { level, title } = this.report;
    const sectionOpen = level === "advisory" ? true : false;
    const sectionTitle = `<h2>${title}</h2`;
    const sectionContent = this.generateReportContent();
    return this.collapsibleSection(sectionTitle, sectionContent, sectionOpen);
  }

  /** generate the main content for a report */
  private generateReportContent() {
    const content: string[] = [];
    const { type, description, footer } = this.report;
    const { lineBreak, text } = this;
    if (description) {
      content.push(text(description));
    }
    if (type === "table") {
      const { data, columns } = this.report;
      content.push(lineBreak);
      content.push(generateMarkdownTable(data, columns));
    }
    if (footer) {
      content.push(lineBreak);
      content.push(text(footer));
    }
    return content.join("\n");
  }

  private get lineBreak() {
    return "";
  }
  private h2(text: string) {
    return `## ${text}`;
  }
  private text(text: string) {
    return text;
  }
  private collapsibleSection(title: string, content: string, open = false) {
    return `<details ${open ? "open" : ""}>\n<summary>${title}</summary>\n${content}\n</details>`;
  }
}
