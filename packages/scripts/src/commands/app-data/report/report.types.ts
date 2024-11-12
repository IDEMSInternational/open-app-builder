// Use union types to allow strong typing by report display type
export type IReport = IReportTable | IReportText;

interface IReportBase {
  /** Markdown structure to use when generating display content **/
  display: "collapse_open" | "collapse_closed";
  /** Title to display on top of report */
  title: string;
  /** Optional description to include below title */
  description?: string;
  /** Optional footer content to appear at bottom */
  footer?: string;
}

export interface IReportTable extends IReportBase {
  data: Record<string, any>[];
  type: "table";
  /** Names of columns provided in data. Will be inferred from first row if not provided */
  columns?: string[];
}

interface IReportText extends IReportBase {
  data: string;
  type: "text";
}
