import { FlowTypes, IAssetEntryHashmap } from "data-models";
import { IReportTable } from "../report.types";
import { isObjectLiteral, sortJsonKeys } from "shared";
import { IParsedWorkbookData } from "../../convert/types";

interface IReportData {
  path: string;
  count: number;
  size_kb?: number;
  missing?: true;
}

interface IAssetsSummary extends IReportTable {
  data: IReportData[];
}

/**
 * TODO
 * - Extract assets from config (e.g. android splash)
 * - Extract assets from app_config defaults (if required)
 * - Separate web and local assets
 * - Include total asset size report (flag too large like in console logs)
 */

/**
 * Generate a list of all assets referenced
 *
 * NOTE - this does not account for asset post-processing where filters and overrides may
 * be applied. Follow-up reports required to identify unused/hanging assets
 * (these reports are generated as part of sync-sheets... TODO - should it be later?)
 * */
export class AssetsSummaryReport {
  /** List of known extensions to search assets for */
  private assetExtensions: string[] = [];

  private reportSummary: Record<string, number> = {};

  constructor(private assetData: IAssetEntryHashmap) {
    this.generateAssetExtensionList(Object.keys(this.assetData));
  }

  public async process(sheetData: IParsedWorkbookData) {
    // HACK - check for assets within all the content of all the flows
    // Could be replaced with more fine-grained checks like example `extractTemplateAssets`
    this.checkForAssets(sheetData);

    const summaryData: IReportData[] = Object.entries(sortJsonKeys(this.reportSummary)).map(
      ([path, count]) => {
        const entry: IReportData = { path, count };
        const assetDataEntry = this.assetData[path];
        if (assetDataEntry) {
          entry.size_kb = assetDataEntry.size_kb;
        } else {
          entry.missing = true;
        }
        return entry;
      }
    );

    // Generate report summarising how many times each asset is referenced, and whether missing
    // from data
    const asset_summary: IAssetsSummary = {
      data: summaryData.filter((v) => !v.missing),
      level: "info",
      title: "Matched Assets",
      description:
        "Assets that are used within sheets and also can be found in the synced asset data",
      type: "table",
      columns: ["path", "size_kb", "count"],
    };

    // Generate report summarising
    const assets_missing: IReportTable = {
      data: summaryData.filter((v) => v.missing),
      level: "info",
      title: "Missing Assets",
      description: "Assets that have references within sheets but do not appear in app-data",
      type: "table",
      columns: ["path", "count"],
    };

    // Generate report summarising
    const assets_unused: IReportTable = {
      data: this.generateUnusedAssetsList(),
      level: "info",
      title: "Unused Assets",
      description: "Assets that appear in app-data but do not have references within sheets",
      type: "table",
      columns: ["path", "size_kb"],
    };
    return { asset_summary, assets_missing, assets_unused };
  }

  /**
   * When trying to identify whether text that appears in a sheet might refer to an asset,
   * the text is compared against a list of known asset extensions to see if the text
   * ends in the same way (e.g. `.pdf`, `jpg` etc.).
   *
   * Use the list of all project assets to generate the list of extensions to watch for
   */
  private generateAssetExtensionList(assetNames: string[]) {
    this.assetExtensions = [...new Set(assetNames.map((v) => v.split(".").pop()))];
  }

  private checkForAssets(v: any, logName = "") {
    if (v) {
      // check if string references an asset
      if (typeof v === "string") {
        if (this.isAssetPath(v)) {
          // Debugging - use logNames to understand where v originated
          // console.log(logName,v)
          this.markAsset(v);
        }
        return;
      }
      // check each array entry for assets
      if (Array.isArray(v)) {
        return v.map((el) => this.checkForAssets(el, logName));
      }
      // check each object literal value for assets
      if (isObjectLiteral(v)) {
        logName += ` ${v.name || v.id || "json"}`;
        return Object.values(v).map((el) => this.checkForAssets(el, logName));
      }
    }
  }

  private generateUnusedAssetsList() {
    return Object.entries(this.assetData)
      .filter(([path]) => !this.reportSummary.hasOwnProperty(path))
      .map(([path, { size_kb }]) => ({ path, size_kb }));
  }

  private markAsset(name: string) {
    this.reportSummary[name] ??= 0;
    this.reportSummary[name]++;
  }

  /**
   * Check if a string value represents a path to an asset
   * This is a simple check that to assert the string ends in a known extension,
   * e.g. `.pdf` or `.jpeg`
   * */
  private isAssetPath(value: string) {
    if (typeof value === "string") {
      const segments = value.split(".");
      // avoid single word, e.g. 'PDF'
      if (segments.length > 1) {
        const extension = segments.pop();
        if (this.assetExtensions.includes(extension.toLowerCase())) {
          return true;
        }
      }
    }
    return false;
  }

  /** Example fine-grained check for assets within templates */
  private extractTemplateAssets(rows: FlowTypes.TemplateRow[]) {
    // check template row values and parameter lists for assets
    for (const { value, parameter_list } of rows) {
      this.checkForAssets(value);
      this.checkForAssets(parameter_list);
    }
  }
}
