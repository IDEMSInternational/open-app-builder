import * as fs from "fs-extra";
import * as path from "path";
import { createChildFileLogger } from "../../utils";
import { ActiveDeployment } from "../../commands/deployment/get";

/**
 * Provider for handling external raw data processing from deployments.json workflows
 */
class ExternalRawDataProvider {
  private logger = createChildFileLogger({ source: "external-raw-data" });

  private getActiveDeployment() {
    return ActiveDeployment.get();
  }

  /**
   * Process external raw data from source folder to deployment app_data sheets
   */
  async processExternalRawData(options: { sourceFolder: string; outputFolder: string }) {
    const { sourceFolder, outputFolder } = options;

    this.logger.info(`Processing external raw data from: ${sourceFolder}`);
    this.logger.info(`Output to: ${outputFolder}`);

    // Ensure source folder exists
    if (!fs.existsSync(sourceFolder)) {
      throw new Error(`Source folder not found: ${sourceFolder}`);
    }

    // Check if this is raw data in the new format (contains folders with JSON files)
    const sourceContents = fs.readdirSync(sourceFolder);

    const hasJsonFiles = sourceContents.some(
      (item) =>
        fs.statSync(path.join(sourceFolder, item)).isDirectory() &&
        fs.readdirSync(path.join(sourceFolder, item)).some((file) => file.endsWith(".json"))
    );

    if (!hasJsonFiles) {
      throw new Error(`No raw JSON data found in source folder: ${sourceFolder}`);
    }

    // Create output structure
    const sheetsOutputPath = path.resolve(outputFolder, "sheets");
    fs.ensureDirSync(sheetsOutputPath);

    // Process each subfolder in the source (representing different Google Drive folders)
    let totalProcessed = 0;
    for (const folderName of sourceContents) {
      const folderPath = path.join(sourceFolder, folderName);
      if (!fs.statSync(folderPath).isDirectory()) continue;

      console.log(`DEBUG: Processing folder: ${folderName}`);
      const processedCount = await this.processRawDataFolder(folderPath, sheetsOutputPath);
      totalProcessed += processedCount;
      console.log(`DEBUG: Processed ${processedCount} files from folder: ${folderName}`);
      this.logger.info(`Processed ${processedCount} files from folder: ${folderName}`);
    }

    this.logger.info(`Successfully processed ${totalProcessed} raw data files`);

    // Process generators to create generated templates
    await this.processGeneratorsWithFlowParser(sheetsOutputPath);

    return sheetsOutputPath;
  }

  /**
   * Process a single folder of raw JSON files
   */
  private async processRawDataFolder(folderPath: string, outputPath: string): Promise<number> {
    const files = fs.readdirSync(folderPath);
    console.log(`DEBUG: All files in ${folderPath}:`, files);

    const jsonFiles = files.filter((file) => file.endsWith(".json") && file !== "_metadata.json");
    console.log(`DEBUG: JSON files found in ${folderPath}:`, jsonFiles);

    let processedCount = 0;

    for (const jsonFile of jsonFiles) {
      const filePath = path.join(folderPath, jsonFile);

      try {
        const rawContent = await fs.readJson(filePath);
        console.log(`DEBUG: Processing file ${jsonFile}`);
        console.log(`DEBUG: File structure keys:`, Object.keys(rawContent));

        // Handle PLH-CW format: { flow_type, flow_name, status, rows: [...] }
        if (rawContent.flow_type && rawContent.flow_name && rawContent.rows) {
          const { flow_type, flow_name, status, flow_subtype, rows } = rawContent;
          console.log(
            `DEBUG: Found PLH-CW format - flow_type: ${flow_type}, flow_name: ${flow_name}, rows: ${rows.length}`
          );

          const data = rows;

          // Create the processed sheet structure with _source metadata
          const processedSheet = {
            flow_type,
            flow_name,
            status,
            flow_subtype,
            ...(rawContent.parameter_list && { parameter_list: rawContent.parameter_list }),
            rows: data,
            _source: {
              name: path.basename(folderPath),
              path: path.relative(path.dirname(folderPath), filePath),
              url: `file://${filePath}`,
            },
          };

          // Determine output path based on flow_type and flow_subtype
          const outputDir = flow_subtype
            ? path.join(outputPath, flow_type, flow_subtype)
            : path.join(outputPath, flow_type);

          fs.ensureDirSync(outputDir);

          const outputFile = path.join(outputDir, `${flow_name}.json`);
          await fs.writeJson(outputFile, processedSheet, { spaces: 2 });
          processedCount++;
        } else {
          console.log(
            `DEBUG: Skipping file ${jsonFile} - expected PLH-CW format: {flow_type, flow_name, status, rows: [...]} but got:`,
            Object.keys(rawContent)
          );
          this.logger.warn(`Skipping malformed raw data file: ${jsonFile}`);
        }
      } catch (error) {
        console.log(`DEBUG: Error processing ${jsonFile}:`, error.message);
        console.log(`DEBUG: Error stack:`, error.stack);
        this.logger.error(`Failed to process ${jsonFile}: ${error.message}`);
      }
    }

    return processedCount;
  }

  /**
   * Sync app_data from external source (treats JSON files as direct sheet replacements)
   */
  async syncFromExternalAppData(options: { sourceFolder: string; outputFolder: string }) {
    const { sourceFolder, outputFolder } = options;

    console.log(`DEBUG: Syncing app_data from external source: ${sourceFolder}`);
    console.log(`DEBUG: Output to: ${outputFolder}`);
    this.logger.info(`Syncing app_data from external source: ${sourceFolder}`);

    // Ensure source folder exists
    if (!fs.existsSync(sourceFolder)) {
      throw new Error(`Source app_data folder not found: ${sourceFolder}`);
    }

    // Create output structure
    const sheetsOutputPath = path.resolve(outputFolder, "sheets");
    fs.ensureDirSync(sheetsOutputPath);

    // Copy the entire app_data structure from external source
    // This treats the external app_data as the authoritative source (like Google Sheets)
    const sourceContents = fs.readdirSync(sourceFolder);
    let totalCopied = 0;

    for (const item of sourceContents) {
      const sourcePath = path.join(sourceFolder, item);
      const targetPath = path.join(sheetsOutputPath, item);

      if (fs.statSync(sourcePath).isDirectory()) {
        // Copy directories (data_list, data_pipe, etc.) to sheets folder
        fs.copySync(sourcePath, targetPath, { overwrite: true });

        // Count JSON files in this directory
        const jsonFiles = fs.readdirSync(sourcePath).filter((f) => f.endsWith(".json"));
        totalCopied += jsonFiles.length;

        this.logger.info(`Copied ${jsonFiles.length} files from folder: ${item}`);
        console.log(`DEBUG: Copied ${jsonFiles.length} JSON files from ${item}`);
      }
    }

    // Also create a contents.json file for the sheets (similar to standard deployments)
    const contentsJsonPath = path.join(sheetsOutputPath, "contents.json");
    const contentsData = {
      last_updated: new Date().toISOString(),
      source: "external_app_data",
      total_files: totalCopied,
    };
    await fs.writeJson(contentsJsonPath, contentsData, { spaces: 2 });

    this.logger.info(`Successfully synced ${totalCopied} files from external app_data`);
    console.log(`DEBUG: Created contents.json with ${totalCopied} total files`);

    return sheetsOutputPath;
  }

  /**
   * Process generators using FlowParserProcessor to create generated templates
   */
  private async processGeneratorsWithFlowParser(sheetsOutputPath: string) {
    try {
      console.log(`DEBUG: Processing generators with FlowParserProcessor from ${sheetsOutputPath}`);
      this.logger.info(`Processing generators with FlowParserProcessor from ${sheetsOutputPath}`);

      // Import FlowParserProcessor and cache
      const { FlowParserProcessor } = await import(
        "../../lib/app-data/convert/processors/flowParser/flowParser"
      );
      const { JsonFileCache } = await import("../../lib/app-data/convert/cacheStrategy/jsonFile");

      // Set up cache
      const cacheFolder = path.resolve(sheetsOutputPath, "../cache");
      await fs.ensureDir(cacheFolder);
      const cache = new JsonFileCache(cacheFolder);

      // Create processor
      const processor = new FlowParserProcessor({ cache });

      // Read all JSON files from the sheets output path
      const allFlows = [];
      const folders = ["data_list", "data_pipe", "generator", "global", "template"];

      for (const folder of folders) {
        const folderPath = path.join(sheetsOutputPath, folder);
        if (await fs.pathExists(folderPath)) {
          const files = await fs.readdir(folderPath);
          for (const file of files) {
            if (file.endsWith(".json")) {
              const filePath = path.join(folderPath, file);
              const flowData = await fs.readJson(filePath);
              allFlows.push(flowData);
            }
          }
        }
      }

      console.log(`DEBUG: Found ${allFlows.length} flows to process`);

      // Process all flows through the flow parser - this returns the final result
      const result = await processor.process(allFlows);

      console.log(`DEBUG: FlowParser processing completed`);
      console.log(`DEBUG: FlowParser result type:`, typeof result);

      console.log(`DEBUG: FlowParser result structure:`, Object.keys(result || {}));
      if (result && result.template) {
        console.log(`DEBUG: Template keys:`, Object.keys(result.template || {}));
        // Check a few template entries to understand structure
        const templateKeys = Object.keys(result.template);
        for (let i = 0; i < Math.min(3, templateKeys.length); i++) {
          const key = templateKeys[i];
          const template = result.template[key];
          console.log(`DEBUG: Template ${key}:`, {
            flow_name: template.flow_name,
            flow_type: template.flow_type,
            flow_subtype: template.flow_subtype,
          });
        }
      }

      // Find generated templates (those with flow_subtype = 'generated')
      const generatedTemplates = [];
      if (result && result.template) {
        Object.entries(result.template).forEach(([key, template]) => {
          if (template && template.flow_subtype === "generated") {
            generatedTemplates.push(template);
            console.log(
              `DEBUG: Found generated template: ${template.flow_name} (${template.flow_subtype})`
            );
          }
        });
      }

      console.log(`DEBUG: Found ${generatedTemplates.length} generated templates`);

      // Debug the processor's internal state to see if data_lists are available
      console.log(
        `DEBUG: Processor data_list keys:`,
        Object.keys(processor.processedFlowHashmap.data_list || {})
      );
      console.log(
        `DEBUG: First few data_list items:`,
        Object.keys(processor.processedFlowHashmap.data_list || {}).slice(0, 5)
      );

      // Write generated templates to the template/generated folder
      if (generatedTemplates.length > 0) {
        const generatedFolder = path.join(sheetsOutputPath, "template", "generated");
        await fs.ensureDir(generatedFolder);

        for (const template of generatedTemplates) {
          const outputPath = path.join(generatedFolder, `${template.flow_name}.json`);
          await fs.writeJson(outputPath, template, { spaces: 2 });
        }

        console.log(`DEBUG: Created ${generatedTemplates.length} generated templates`);
        this.logger.info(`Created ${generatedTemplates.length} generated templates`);
      } else {
        console.log(`DEBUG: No generated templates found`);
      }

      console.log(`DEBUG: Generator processing completed successfully`);
      this.logger.info(`Generator processing completed successfully`);
    } catch (error) {
      this.logger.error(`Failed to process generators: ${error.message}`);
      console.error("DEBUG: Generator processing error:", error);
      throw error;
    }
  }

  /**
   * Copy processed app data to the running app assets
   */
  async copyToApp(deploymentAppDataPath: string) {
    // This would copy the processed sheets to the running app assets
    // Implementation would be similar to existing appData.copyDeploymentDataToApp()
    this.logger.info(`Copying processed data to app from: ${deploymentAppDataPath}`);

    // For now, just log that this step would happen
    // In a full implementation, this would copy specific folders like sheets/, assets/, etc.
    // to the Angular app's assets folder
  }
}

export default new ExternalRawDataProvider();
