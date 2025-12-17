import * as fs from "fs-extra";
import * as path from "path";

/**
 * Get external source path for a deployment from deployments.json
 */
function getExternalSourcePath(deploymentName: string, workspacePath: string): string {
  const deploymentsJsonPath = path.resolve(workspacePath, "..", "deployments.json");

  if (!fs.existsSync(deploymentsJsonPath)) {
    throw new Error(`deployments.json not found at: ${deploymentsJsonPath}`);
  }

  try {
    const deploymentsConfig = fs.readJsonSync(deploymentsJsonPath);
    const deployment = deploymentsConfig.deployments?.find((d: any) => d.id === deploymentName);

    if (!deployment) {
      throw new Error(`Deployment "${deploymentName}" not found in deployments.json`);
    }

    return deployment.file_location;
  } catch (error) {
    throw new Error(`Failed to read deployments.json: ${error.message}`);
  }
}

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
  getExternalSourcePath,
  /**
   * Create a Google Sheet from JSON files in the external deployment
   */
  async createSheetFromJson(pathParam: string, gdriveTask: any): Promise<ISheetInfo> {
    // Import WorkflowRunner to access config
    const { WorkflowRunner } = await import("../../commands/workflow/run");
    const config = WorkflowRunner.config;

    // Get the external deployment path from deployments.json
    const externalSourcePath = this.getExternalSourcePath(config.name, config._workspace_path);
    const baseAppDataPath = path.resolve(externalSourcePath, "app_data");
    const targetPath = path.resolve(baseAppDataPath, pathParam);

    // Check if path exists
    if (!fs.existsSync(targetPath)) {
      throw new Error(`Path not found: ${targetPath}`);
    }

    const stat = fs.statSync(targetPath);
    let jsonFiles: string[] = [];

    if (stat.isDirectory()) {
      // Get all JSON files in the directory
      jsonFiles = fs
        .readdirSync(targetPath)
        .filter((file) => file.endsWith(".json"))
        .map((file) => path.join(targetPath, file));
    } else if (targetPath.endsWith(".json")) {
      // Single file
      jsonFiles = [targetPath];
    } else {
      throw new Error("Path must be a directory or a .json file");
    }

    if (jsonFiles.length === 0) {
      throw new Error("No JSON files found in the specified path");
    }

    // Read and parse JSON files
    const flowData: IJsonFlow[] = [];
    for (const filePath of jsonFiles) {
      try {
        const content = fs.readJsonSync(filePath);
        flowData.push(content);
      } catch (error) {
        console.warn(`Failed to parse JSON file: ${filePath}`, error);
      }
    }

    // Create Google Sheet directly
    const sheetName = stat.isDirectory()
      ? path.basename(targetPath)
      : path.basename(targetPath, ".json");
    const timestamp = new Date().toISOString().slice(0, 19).replace(/:/g, "-");
    const sheetTitle = `${sheetName}_edited_${timestamp}`;

    // Prepare data for Google Sheets
    const sheetData: { [sheetName: string]: string[][] } = {};

    // Create content_list sheet
    const contentListData = this.createContentListData(flowData);
    sheetData["==content_list=="] = contentListData;

    // Create sheets directly from the rows data in each JSON file
    for (const flow of flowData) {
      const flowName = flow.flow_name || path.basename(jsonFiles[flowData.indexOf(flow)], ".json");
      if (flow.rows && Array.isArray(flow.rows) && flow.rows.length > 0) {
        sheetData[flowName] = this.createRowsData(flow.rows);
      }
    } // Create Google Sheet using gdrive task
    const { sheetId, sheetUrl } = await gdriveTask.createSheet({
      title: sheetTitle,
      data: sheetData,
    });

    // Store sheet info for later updates
    const sheetInfo: ISheetInfo = {
      sheetId,
      sheetUrl,
      pathParam,
      createdAt: new Date().toISOString(),
    };

    await this.saveSheetInfo(pathParam, sheetInfo, config);

    console.log(`\nGoogle Sheet created: ${sheetUrl}`);
    console.log("\nYou can now:");
    console.log("1. Edit the data directly in Google Sheets");
    console.log("2. Update your JSON files by running:");
    console.log(`   yarn workflow edit_sheet update ${pathParam}`);

    return sheetInfo;
  },

  /**
   * Update JSON files from Google Sheets changes
   */
  async updateJsonFromSheet(pathParam: string, gdriveTask: any): Promise<void> {
    // Import WorkflowRunner to access config
    const { WorkflowRunner } = await import("../../commands/workflow/run");
    const config = WorkflowRunner.config;

    const sheetInfo = await this.loadSheetInfo(pathParam, config);
    if (!sheetInfo || !sheetInfo.sheetId) {
      throw new Error(
        `No Google Sheet found for path: ${pathParam}. Please create the sheet first.`
      );
    }

    // Get the external deployment path from deployments.json
    const externalSourcePath = this.getExternalSourcePath(config.name, config._workspace_path);

    await this.updateJsonFromSheetId(sheetInfo.sheetId, gdriveTask, externalSourcePath, pathParam);

    console.log(`JSON files updated from Google Sheet: ${sheetInfo.sheetUrl}`);
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

  /**
   * Update JSON files from a specific Google Sheet ID
   */
  async updateJsonFromSheetId(
    sheetId: string,
    gdriveTask: any,
    externalSourcePath: string,
    sheetName?: string
  ): Promise<void> {
    // Read data from Google Sheet
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
    // Parse content_list data first
    const contentListArray = sheetData["==content_list=="] || [];
    const contentListData = this.parseContentListData(contentListArray);

    // Process each sheet (excluding content_list)
    for (const [tabName, sheetValues] of Object.entries(sheetData)) {
      if (tabName === "==content_list==") continue;

      // Parse rows data from sheet
      const rowsData = this.parseRowsData(sheetValues);

      // Find corresponding content list entry
      const contentEntry = contentListData.find((entry) => entry.flow_name === tabName);

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

      // Read existing JSON file to preserve other properties
      let existingData: IJsonFlow = {};
      if (fs.existsSync(outputPath)) {
        existingData = fs.readJsonSync(outputPath);
      }

      // Prepare data from content list
      const contentData = { ...contentEntry };
      delete contentData.file; // Remove internal file property

      // Remove empty fields from contentData
      Object.keys(contentData).forEach((key) => {
        if (
          contentData[key] === "" ||
          contentData[key] === null ||
          contentData[key] === undefined
        ) {
          delete contentData[key];
        }
      });

      // Update only the rows while preserving other fields
      // Ensure rows is the last property
      const updatedData = {
        ...existingData,
        ...contentData,
      };

      // Force rows to be at the end
      delete updatedData.rows;
      updatedData.rows = rowsData;

      fs.writeJsonSync(outputPath, updatedData, { spaces: 2 });

      console.log(`Updated JSON file: ${outputPath}`);
    }
  },

  /**
   * Create rows data as 2D array for Google Sheets (simplified format)
   */
  createRowsData(rows: any[]): string[][] {
    if (!rows || rows.length === 0) {
      return [["No data"]];
    }

    // Get all unique keys from all rows
    const allKeys = new Set<string>();
    rows.forEach((row) => {
      Object.keys(row).forEach((key) => allKeys.add(key));
    });

    const headers = Array.from(allKeys);
    const data: string[][] = [headers];

    rows.forEach((row) => {
      const rowData = headers.map((header) => {
        const value = row[header];
        return typeof value === "object" ? JSON.stringify(value) : String(value || "");
      });
      data.push(rowData);
    });

    return data;
  },

  /**
   * Create flow data as 2D array for Google Sheets
   */
  createFlowData(flow: IJsonFlow): string[][] {
    // Prepare flow data
    const flowHeaders = ["flow_type", "flow_name", "status", "activated", "priority"];
    const flowRow = [
      flow.flow_type || "",
      flow.flow_name || "",
      flow.status || "",
      flow.activated ? "TRUE" : "FALSE",
      flow.priority?.toString() || "",
    ];

    const data: string[][] = [flowHeaders, flowRow];

    // Add rows section
    if (flow.rows && flow.rows.length > 0) {
      data.push([]); // Empty row
      data.push(["=== ROWS ==="]);

      // Get all unique keys from all rows
      const allKeys = new Set<string>();
      flow.rows.forEach((row) => {
        Object.keys(row).forEach((key) => allKeys.add(key));
      });

      const rowHeaders = Array.from(allKeys);
      data.push(rowHeaders);

      flow.rows.forEach((row) => {
        const rowData = rowHeaders.map((header) => {
          const value = row[header];
          return typeof value === "object" ? JSON.stringify(value) : String(value || "");
        });
        data.push(rowData);
      });
    }

    return data;
  },

  /**
   * Create content_list sheet data from flow data
   */
  createContentListData(flows: IJsonFlow[]): string[][] {
    const headers = ["flow_type", "flow_subtype", "flow_name", "status", "parameter_list", "file"];
    const rows: string[][] = [headers];

    flows.forEach((flow) => {
      const row = [
        flow.flow_type || "",
        flow.flow_subtype || "",
        flow.flow_name || "",
        flow.status || "",
        flow.parameter_list ? JSON.stringify(flow.parameter_list) : "",
        `${flow.flow_name}.json`, // Add file column for easier tracking
      ];
      rows.push(row);
    });

    return rows;
  },

  /**
   * Parse content_list data from array format
   */
  parseContentListData(data: string[][]): any[] {
    if (data.length < 2) return [];

    const headers = data[0];
    const results: any[] = [];

    for (let i = 1; i < data.length; i++) {
      const row = data[i];
      const entry: any = {};

      headers.forEach((header, index) => {
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

  /**
   * Parse rows data from sheet array format (simplified)
   */
  parseRowsData(data: string[][]): any[] {
    if (data.length < 2) return [];

    const headers = data[0];
    const rows: any[] = [];

    for (let i = 1; i < data.length; i++) {
      const rowData = data[i];
      const row: any = {};
      let hasData = false;

      headers.forEach((header, index) => {
        const value = rowData[index] || "";
        if (value === "") return; // Skip empty values

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

  /**
   * Parse flow data from CSV array format
   */
  parseFlowData(data: string[][]): IJsonFlow {
    if (data.length < 2) return {};

    // Parse flow properties
    const flowHeaders = data[0];
    const flowRow = data[1];
    const flow: IJsonFlow = {};

    flowHeaders.forEach((header, index) => {
      const value = flowRow[index] || "";
      if (header === "activated") {
        flow[header] = value.toLowerCase() === "true";
      } else if (header === "priority" && value) {
        flow[header] = parseInt(value, 10);
      } else {
        flow[header] = value;
      }
    });

    // Find rows section
    let rowsStartIndex = -1;
    for (let i = 0; i < data.length; i++) {
      if (data[i][0] === "=== ROWS ===") {
        rowsStartIndex = i + 1;
        break;
      }
    }

    if (rowsStartIndex > 0 && rowsStartIndex < data.length) {
      const rowHeaders = data[rowsStartIndex];
      const rows: any[] = [];

      for (let i = rowsStartIndex + 1; i < data.length; i++) {
        const rowData = data[i];
        if (rowData.length === 0) continue;

        const row: any = {};
        rowHeaders.forEach((header, index) => {
          const value = rowData[index] || "";
          if (value.startsWith("{") || value.startsWith("[")) {
            try {
              row[header] = JSON.parse(value);
            } catch {
              row[header] = value;
            }
          } else {
            row[header] = value;
          }
        });

        rows.push(row);
      }

      flow.rows = rows;
    }

    return flow;
  },

  /**
   * Save sheet info to file
   */
  async saveSheetInfo(pathParam: string, sheetInfo: ISheetInfo, config: any): Promise<void> {
    const infoDir = path.resolve(config._workspace_path, ".sheet_editor_info");
    fs.ensureDirSync(infoDir);

    const infoFile = path.join(infoDir, `${path.basename(pathParam)}.json`);
    fs.writeJsonSync(infoFile, sheetInfo, { spaces: 2 });
  },

  /**
   * Load sheet info from file
   */
  async loadSheetInfo(pathParam: string, config: any): Promise<ISheetInfo | null> {
    const infoDir = path.resolve(config._workspace_path, ".sheet_editor_info");
    const infoFile = path.join(infoDir, `${path.basename(pathParam)}.json`);

    if (!fs.existsSync(infoFile)) {
      return null;
    }

    return fs.readJsonSync(infoFile);
  },
};
