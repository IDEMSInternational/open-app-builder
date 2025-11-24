import { Storage } from "@google-cloud/storage";
import * as fs from "fs-extra";
import * as path from "path";
import { WorkflowRunner } from "../../commands/workflow/run";

interface IGCSOptions {
  projectId: string;
  keyFilename: string;
}

interface IUploadOptions {
  bucketName?: string;
  bucketUrl?: string;
  localFolderPath: string;
  destinationPrefix?: string;
  serviceAccountKeyPath?: string;
  version?: string;
}

interface IDownloadOptions {
  bucketName?: string;
  bucketUrl?: string;
  localFolderPath: string;
  sourcePrefix?: string;
  serviceAccountKeyPath?: string;
  version?: string;
}

class GCSProvider {
  /**
   * Create a Storage instance with the appropriate authentication
   */
  private getStorage(serviceAccountKeyPath?: string): Storage {
    const config = WorkflowRunner.config;

    // Use per-operation service account key if provided
    if (serviceAccountKeyPath) {
      const keyFilePath = path.resolve(config._workspace_path, serviceAccountKeyPath);

      if (!fs.existsSync(keyFilePath)) {
        throw new Error(`Service account key file not found: ${keyFilePath}`);
      }

      return new Storage({
        keyFilename: keyFilePath,
      });
    }

    // Fallback to global GCS config
    const gcsConfig = config.gcs;
    if (gcsConfig?.project_id) {
      const keyFilePath = gcsConfig.service_account_key_path
        ? path.resolve(config._workspace_path, gcsConfig.service_account_key_path)
        : path.resolve(config._workspace_path, "packages/scripts/config/gcs-key.json");

      if (fs.existsSync(keyFilePath)) {
        return new Storage({
          projectId: gcsConfig.project_id,
          keyFilename: keyFilePath,
        });
      } else {
        // Try application default credentials
        return new Storage({
          projectId: gcsConfig.project_id,
        });
      }
    }

    // Try default authentication
    try {
      return new Storage();
    } catch (error) {
      throw new Error(
        `GCS authentication failed. Please either:\n1. Provide serviceAccountKeyPath in assets_folder config\n2. Set up global gcs.project_id and service account key\n3. Run 'gcloud auth application-default login'\n\nOriginal error: ${error.message}`
      );
    }
  }

  /**
   * Resolve bucket name from either bucketName or bucketUrl
   */
  private resolveBucketName(bucketName?: string, bucketUrl?: string): string {
    if (bucketName) {
      return bucketName;
    }
    if (bucketUrl) {
      // Extract bucket name from gs:// URL or https:// URL
      if (bucketUrl.startsWith("gs://")) {
        return bucketUrl.replace("gs://", "").split("/")[0];
      }
      if (bucketUrl.includes("storage.googleapis.com/")) {
        const match = bucketUrl.match(/storage\.googleapis\.com\/([^/]+)/);
        return match ? match[1] : bucketUrl;
      }
      // Assume it's just a bucket name if no protocol
      return bucketUrl;
    }
    throw new Error("Either bucketName or bucketUrl must be provided");
  }

  /**
   * Upload all files from a local folder to a GCS bucket
   */
  async uploadFolder(options: IUploadOptions): Promise<void> {
    const {
      bucketName,
      bucketUrl,
      localFolderPath,
      destinationPrefix = "",
      serviceAccountKeyPath,
      version,
    } = options;
    const resolvedBucketName = this.resolveBucketName(bucketName, bucketUrl);

    if (!fs.existsSync(localFolderPath)) {
      throw new Error(`Local folder not found: ${localFolderPath}`);
    }

    const storage = this.getStorage(serviceAccountKeyPath);
    const bucket = storage.bucket(resolvedBucketName);

    console.log(`Uploading files from ${localFolderPath} to bucket ${resolvedBucketName}...`);

    // Clear existing files in the current version path only (not the whole bucket)
    const versionPrefix = version ? `${version}/` : "";
    if (version) {
      console.log(`Clearing existing files in version ${version}...`);
      const [existingFiles] = await bucket.getFiles({ prefix: versionPrefix });
      if (existingFiles.length > 0) {
        console.log(`Deleting ${existingFiles.length} existing files...`);
        await Promise.all(existingFiles.map((file) => file.delete()));
      }
    } else {
      console.log("Clearing existing files in bucket...");
      const [existingFiles] = await bucket.getFiles();
      if (existingFiles.length > 0) {
        console.log(`Deleting ${existingFiles.length} existing files...`);
        await Promise.all(existingFiles.map((file) => file.delete()));
      }
    }

    // Get all files recursively
    const files = await this.getAllFiles(localFolderPath);

    for (const filePath of files) {
      const relativePath = path.relative(localFolderPath, filePath);
      let destinationPath = relativePath.replace(/\\/g, "/");

      // Add version prefix if specified
      if (version) {
        destinationPath = `${version}/${destinationPath}`;
      }

      // Add additional prefix if specified
      if (destinationPrefix) {
        destinationPath = `${destinationPrefix}/${destinationPath}`;
      }

      console.log(`Uploading: ${relativePath} -> ${destinationPath}`);

      await bucket.upload(filePath, {
        destination: destinationPath,
        metadata: {
          cacheControl: "public, max-age=31536000", // Cache for 1 year
        },
      });
    }

    console.log(`Upload complete. ${files.length} files uploaded to ${resolvedBucketName}`);
  }

  /**
   * Download all files from a GCS bucket to a local folder
   */
  async downloadFolder(options: IDownloadOptions): Promise<void> {
    const {
      bucketName,
      bucketUrl,
      localFolderPath,
      sourcePrefix = "",
      serviceAccountKeyPath,
      version,
    } = options;
    const resolvedBucketName = this.resolveBucketName(bucketName, bucketUrl);

    const storage = this.getStorage(serviceAccountKeyPath);
    const bucket = storage.bucket(resolvedBucketName);

    console.log(`Downloading files from bucket ${resolvedBucketName} to ${localFolderPath}...`);

    // Clear existing local directory first
    if (fs.existsSync(localFolderPath)) {
      console.log("Clearing existing local files...");
      fs.removeSync(localFolderPath);
    }

    // Ensure local directory exists
    fs.ensureDirSync(localFolderPath);

    // Construct the full prefix including version
    let fullPrefix = sourcePrefix;
    if (version) {
      fullPrefix = version + (sourcePrefix ? `/${sourcePrefix}` : "");
    }

    // List all files in bucket with version prefix
    const [files] = await bucket.getFiles({
      prefix: fullPrefix,
    });

    if (files.length === 0) {
      console.log(`No files found in bucket ${resolvedBucketName} with prefix "${fullPrefix}"`);
      return;
    }

    for (const file of files) {
      // Skip directories (files ending with /)
      if (file.name.endsWith("/")) continue;

      let localPath = file.name;

      // Remove version prefix from local path if it exists
      if (version && file.name.startsWith(`${version}/`)) {
        localPath = file.name.substring(`${version}/`.length);
      }

      // Remove source prefix from local path if it exists
      if (sourcePrefix && localPath.startsWith(sourcePrefix)) {
        localPath = localPath.substring(sourcePrefix.length);
        if (localPath.startsWith("/")) {
          localPath = localPath.substring(1);
        }
      }

      const fullLocalPath = path.join(localFolderPath, localPath);

      console.log(`Downloading: ${file.name} -> ${localPath}`);

      // Ensure directory exists
      fs.ensureDirSync(path.dirname(fullLocalPath));

      // Download file
      await file.download({ destination: fullLocalPath });
    }

    console.log(`Download complete. ${files.length} files downloaded from ${resolvedBucketName}`);
  }

  /**
   * List all available versions in a bucket
   */
  async listVersions(
    bucketName?: string,
    bucketUrl?: string,
    serviceAccountKeyPath?: string
  ): Promise<string[]> {
    const resolvedBucketName = this.resolveBucketName(bucketName, bucketUrl);
    const storage = this.getStorage(serviceAccountKeyPath);
    const bucket = storage.bucket(resolvedBucketName);

    const [files] = await bucket.getFiles();

    // Extract version prefixes from file paths
    const versions = new Set<string>();
    files.forEach((file) => {
      const pathParts = file.name.split("/");
      if (pathParts.length > 1 && pathParts[0].match(/^v\d+$/)) {
        versions.add(pathParts[0]);
      }
    });

    // Sort versions naturally (v1, v2, v10, etc.)
    return Array.from(versions).sort((a, b) => {
      const aNum = parseInt(a.substring(1), 10);
      const bNum = parseInt(b.substring(1), 10);
      return aNum - bNum;
    });
  }

  /**
   * Get the next version number for a bucket
   */
  async getNextVersion(
    bucketName?: string,
    bucketUrl?: string,
    serviceAccountKeyPath?: string
  ): Promise<string> {
    const versions = await this.listVersions(bucketName, bucketUrl, serviceAccountKeyPath);

    if (versions.length === 0) {
      return "v1";
    }

    // Get the highest version number and increment
    const lastVersion = versions[versions.length - 1];
    const lastNumber = parseInt(lastVersion.substring(1), 10);
    return `v${lastNumber + 1}`;
  }

  /**
   * Recursively get all file paths in a directory
   */
  private async getAllFiles(dirPath: string): Promise<string[]> {
    const files: string[] = [];

    const items = await fs.readdir(dirPath);

    for (const item of items) {
      const fullPath = path.join(dirPath, item);
      const stats = await fs.stat(fullPath);

      if (stats.isDirectory()) {
        const subFiles = await this.getAllFiles(fullPath);
        files.push(...subFiles);
      } else {
        files.push(fullPath);
      }
    }

    return files;
  }
}

export default new GCSProvider();
