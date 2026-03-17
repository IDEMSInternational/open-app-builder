import * as fs from "fs-extra";
import * as path from "path";

interface IJsonFlow {
  flow_type?: string;
  flow_subtype?: string;
  flow_name?: string;
  status?: string;
  activated?: boolean;
  priority?: number;
  parameter_list?: any;
  rows?: any[];
}

interface ISheetInfo {
  sheetId: string;
  sheetUrl: string;
  pathParam: string;
  createdAt: string;
}

export default {
  /**
   * Update JSON files from a specific Google Sheet ID
   */
  async updateJsonFromSheetId(
    sheetId: string,
    gdriveTask: any,
    externalSourcePath: string,
    sheetName?: string
  ): Promise<void> {
    const sheetData = await gdriveTask.readSheet({
      spreadsheetId: sheetId,
    });

    const baseAppDataPath = path.resolve(externalSourcePath, "app_data");
    await this.updateJsonFromSheetData(sheetData, baseAppDataPath, sheetName || sheetId);
  },

  /**
   * Core logic to update JSON files from sheet data
   */
  async updateJsonFromSheetData(
    sheetData: any,
    baseAppDataPath: string,
    sheetName: string
  ): Promise<void> {
    const contentListArray = sheetData["==content_list=="] || [];
    const contentListData = this.parseContentListData(contentListArray);

    for (const [tabName, sheetValues] of Object.entries(sheetData)) {
      if (tabName === "==content_list==") continue;

      const rowsData = this.parseRowsData(sheetValues as string[][]);

      const contentEntry = contentListData.find((entry: any) => entry.flow_name === tabName);

      let targetFilename: string;
      if (contentEntry && contentEntry.file) {
        targetFilename = contentEntry.file;
      } else if (contentEntry && contentEntry.flow_name) {
        targetFilename = `${contentEntry.flow_name}.json`;
      } else {
        targetFilename = sheetName.endsWith(".json") ? sheetName : `${sheetName}.json`;
      }

      let outputPath = this.findJsonFile(baseAppDataPath, targetFilename);
      if (!outputPath) {
        outputPath = path.join(baseAppDataPath, targetFilename);
      }

      let existingData: IJsonFlow = {};
      if (fs.existsSync(outputPath)) {
        existingData = fs.readJsonSync(outputPath);
      }

      const contentData = { ...contentEntry };
      delete contentData.file;

      Object.keys(contentData).forEach((key) => {
        if (
          contentData[key] === "" ||
          contentData[key] === null ||
          contentData[key] === undefined
        ) {
          delete contentData[key];
        }
      });

      const updatedData: any = {
        ...existingData,
        ...contentData,
      };

      delete updatedData.rows;
      updatedData.rows = rowsData;

      fs.writeJsonSync(outputPath, updatedData, { spaces: 2 });
      console.log(`Updated JSON file: ${outputPath}`);
    }
  },

  findJsonFile(baseDir: string, filename: string): string | null {
    if (!fs.existsSync(baseDir)) return null;
    const files = fs.readdirSync(baseDir);
    for (const file of files) {
      const fullPath = path.join(baseDir, file);
      const stat = fs.statSync(fullPath);
      if (stat.isDirectory()) {
        const found = this.findJsonFile(fullPath, filename);
        if (found) return found;
      } else if (file === filename) {
        return fullPath;
      }
    }
    return null;
  },

  parseContentListData(data: string[][]): any[] {
    if (data.length < 2) return [];

    const headers = data[0];
    const results: any[] = [];

    for (let i = 1; i < data.length; i++) {
      const row = data[i];
      const entry: any = {};

      headers.forEach((header: string, index: number) => {
        const value = row[index] || "";
        if (header === "parameter_list" && value) {
          try {
            entry[header] = JSON.parse(value);
          } catch {
            entry[header] = value;
          }
        } else {
          entry[header] = value;
        }
      });

      results.push(entry);
    }

    return results;
  },

  parseRowsData(data: string[][]): any[] {
    if (data.length < 2) return [];

    const headers = data[0];
    const rows: any[] = [];

    for (let i = 1; i < data.length; i++) {
      const rowData = data[i];
      const row: any = {};
      let hasData = false;

      headers.forEach((header: string, index: number) => {
        const value = rowData[index] || "";
        if (value === "") return;

        hasData = true;
        if (value.startsWith("{") || value.startsWith("[")) {
          try {
            row[header] = JSON.parse(value);
          } catch {
            row[header] = value;
          }
        } else if (value === "TRUE") {
          row[header] = true;
        } else if (value === "FALSE") {
          row[header] = false;
        } else {
          row[header] = value;
        }
      });

      if (hasData) {
        rows.push(row);
      }
    }

    return rows;
  },

  async saveSheetInfo(pathParam: string, sheetInfo: ISheetInfo, config: any): Promise<void> {
    const infoDir = path.resolve(config._workspace_path, ".sheet_editor_info");
    fs.ensureDirSync(infoDir);

    const infoFile = path.join(infoDir, `${path.basename(pathParam)}.json`);
    fs.writeJsonSync(infoFile, sheetInfo, { spaces: 2 });
  },

  async loadSheetInfo(pathParam: string, config: any): Promise<ISheetInfo | null> {
    const infoDir = path.resolve(config._workspace_path, ".sheet_editor_info");
    const infoFile = path.join(infoDir, `${path.basename(pathParam)}.json`);

    if (!fs.existsSync(infoFile)) {
      return null;
    }

    return fs.readJsonSync(infoFile);
  },
};
