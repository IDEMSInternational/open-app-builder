import * as fs from "fs-extra";
import * as path from "path";
import { createChildFileLogger } from "../../../utils";
import { ActiveDeployment } from "../../../commands/deployment/get";

/**
 * Provider for handling external raw data processing from deployment workflows
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

    if (!fs.existsSync(sourceFolder)) {
      throw new Error(`Source folder not found: ${sourceFolder}`);
    }

    const sourceContents = fs.readdirSync(sourceFolder);

    const hasJsonFiles =
      sourceContents.some((item) => item.endsWith(".json")) ||
      sourceContents.some(
        (item) =>
          fs.statSync(path.join(sourceFolder, item)).isDirectory() &&
          fs.readdirSync(path.join(sourceFolder, item)).some((file) => file.endsWith(".json"))
      );

    if (!hasJsonFiles) {
      throw new Error(`No raw JSON data found in source folder: ${sourceFolder}`);
    }

    const sheetsOutputPath = path.resolve(outputFolder, "sheets");
    fs.ensureDirSync(sheetsOutputPath);

    let totalProcessed = 0;

    // Process JSON files directly in the source folder
    const topLevelJsonFiles = sourceContents.filter((item) => item.endsWith(".json"));
    if (topLevelJsonFiles.length > 0) {
      const processedCount = await this.processRawDataFolder(sourceFolder, sheetsOutputPath);
      totalProcessed += processedCount;
      this.logger.info(`Processed ${processedCount} files from source folder`);
    }

    // Process subdirectories containing JSON files
    for (const folderName of sourceContents) {
      const folderPath = path.join(sourceFolder, folderName);
      if (!fs.statSync(folderPath).isDirectory()) continue;

      const processedCount = await this.processRawDataFolder(folderPath, sheetsOutputPath);
      totalProcessed += processedCount;
      this.logger.info(`Processed ${processedCount} files from folder: ${folderName}`);
    }

    this.logger.info(`Successfully processed ${totalProcessed} raw data files`);

    await this.processGeneratorsWithFlowParser(sheetsOutputPath);

    return sheetsOutputPath;
  }

  /**
   * Process a single folder of raw JSON files
   */
  private async processRawDataFolder(folderPath: string, outputPath: string): Promise<number> {
    const files = fs.readdirSync(folderPath);
    const jsonFiles = files.filter((file) => file.endsWith(".json") && file !== "_metadata.json");

    let processedCount = 0;

    for (const jsonFile of jsonFiles) {
      const filePath = path.join(folderPath, jsonFile);

      try {
        const rawContent = await fs.readJson(filePath);

        if (rawContent.flow_type && rawContent.flow_name && rawContent.rows) {
          const { flow_type, flow_name, status, flow_subtype, rows } = rawContent;

          const processedSheet = {
            flow_type,
            flow_name,
            status,
            flow_subtype,
            ...(rawContent.parameter_list && { parameter_list: rawContent.parameter_list }),
            rows,
            _source: {
              name: path.basename(folderPath),
              path: path.relative(path.dirname(folderPath), filePath),
              url: `file://${filePath}`,
            },
          };

          const outputDir = flow_subtype
            ? path.join(outputPath, flow_type, flow_subtype)
            : path.join(outputPath, flow_type);

          fs.ensureDirSync(outputDir);

          const outputFile = path.join(outputDir, `${flow_name}.json`);
          await fs.writeJson(outputFile, processedSheet, { spaces: 2 });
          processedCount++;
        } else {
          this.logger.warn(`Skipping malformed raw data file: ${jsonFile}`);
        }
      } catch (error) {
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

    this.logger.info(`Syncing app_data from external source: ${sourceFolder}`);

    if (!fs.existsSync(sourceFolder)) {
      throw new Error(`Source app_data folder not found: ${sourceFolder}`);
    }

    const sheetsOutputPath = path.resolve(outputFolder, "sheets");
    fs.ensureDirSync(sheetsOutputPath);

    const sourceContents = fs.readdirSync(sourceFolder);
    let totalCopied = 0;

    for (const item of sourceContents) {
      const sourcePath = path.join(sourceFolder, item);
      const targetPath = path.join(sheetsOutputPath, item);

      if (fs.statSync(sourcePath).isDirectory()) {
        fs.copySync(sourcePath, targetPath, { overwrite: true });

        const jsonFiles = fs.readdirSync(sourcePath).filter((f) => f.endsWith(".json"));
        totalCopied += jsonFiles.length;

        this.logger.info(`Copied ${jsonFiles.length} files from folder: ${item}`);
      }
    }

    const contentsJsonPath = path.join(sheetsOutputPath, "contents.json");
    const contentsData = {
      last_updated: new Date().toISOString(),
      source: "external_app_data",
      total_files: totalCopied,
    };
    await fs.writeJson(contentsJsonPath, contentsData, { spaces: 2 });

    this.logger.info(`Successfully synced ${totalCopied} files from external app_data`);

    return sheetsOutputPath;
  }

  /**
   * Process generators using FlowParserProcessor to create generated templates
   */
  private async processGeneratorsWithFlowParser(sheetsOutputPath: string) {
    try {
      this.logger.info(`Processing generators with FlowParserProcessor from ${sheetsOutputPath}`);

      const { FlowParserProcessor } =
        await import("../../../lib/app-data/convert/processors/flowParser/flowParser");
      const { JsonFileCache } =
        await import("../../../lib/app-data/convert/cacheStrategy/jsonFile");

      const cacheFolder = path.resolve(sheetsOutputPath, "../cache");
      await fs.ensureDir(cacheFolder);
      const cache = new JsonFileCache(cacheFolder);

      const processor = new FlowParserProcessor({ cache });

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

      const result: any = await processor.process(allFlows);

      const generatedTemplates = [];
      if (result && result.template) {
        Object.entries(result.template).forEach(([, template]: [string, any]) => {
          if (template && template.flow_subtype === "generated") {
            generatedTemplates.push(template);
          }
        });
      }

      if (generatedTemplates.length > 0) {
        const generatedFolder = path.join(sheetsOutputPath, "template", "generated");
        await fs.ensureDir(generatedFolder);

        for (const template of generatedTemplates) {
          const outputPath = path.join(generatedFolder, `${template.flow_name}.json`);
          await fs.writeJson(outputPath, template, { spaces: 2 });
        }

        this.logger.info(`Created ${generatedTemplates.length} generated templates`);
      }

      this.logger.info(`Generator processing completed successfully`);
    } catch (error) {
      this.logger.error(`Failed to process generators: ${error.message}`);
      throw error;
    }
  }

  /**
   * Copy processed app data to the running app assets
   */
  async copyToApp(deploymentAppDataPath: string) {
    this.logger.info(`Copying processed data to app from: ${deploymentAppDataPath}`);
  }
}

export default new ExternalRawDataProvider();
