// Use union types to allow strong typing by report display type
export type IReport = IReportTable | IReportText;

interface IReportBase {
  /** Reporting level, default "info" (future will include warnings/recommendations). */
  level: "info";
  /** Title to display on top of report */
  title: string;
  /** Optional description to include below title */
  description?: string;
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
