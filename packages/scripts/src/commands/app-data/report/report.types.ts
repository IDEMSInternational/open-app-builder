// Use union types to allow strong typing by report display type
export type IReport = IReportTable | IReportText;

interface IReportBase {
  /**
   * Reporting level. Reports designated at different levels will be displayed in different ways
   * Info - collapsible section, collapsed by default
   * Advisory - collapsible section, expanded by default
   * Warning (TODO) -
   *  */
  level: "info" | "advisory";
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
