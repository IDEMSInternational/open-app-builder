// Use union types to allow strong typing by manifest display type
export type IManifestReport = IManifestReportTable | IManifestReportText;

interface IManifestReportTypeBase {
  /** Reporting level, default "info" (future will include warnings/recommendations). */
  level: "info";
  /** Title to display on top of report */
  title: string;
}

interface IManifestReportTable extends IManifestReportTypeBase {
  data: Record<string, any>[];
  type: "table";
}

interface IManifestReportText extends IManifestReportTypeBase {
  data: string;
  type: "text";
}
