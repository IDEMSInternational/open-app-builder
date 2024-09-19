// Use union types to allow strong typing by report display type
export type IReport = IReportTable | IReportText;

interface IReportBase {
  /** Reporting level, default "info" (future will include warnings/recommendations). */
  level: "info";
  /** Title to display on top of report */
  title: string;
}

export interface IReportTable extends IReportBase {
  data: Record<string, any>[];
  type: "table";
}

interface IReportText extends IReportBase {
  data: string;
  type: "text";
}
