import { Directory, Filesystem, Encoding } from "@capacitor/filesystem";
import { IPersistenceStrategy, PersistedState } from "./persistence.interface";

/**
 * Persistence strategy to write to json file
 *
 * NOTE - changes to filenames or file data structures should be handled via
 * parent migration services (not within scope of this strategy)
 */
export class FilePersistenceStrategy implements IPersistenceStrategy {
  private readonly FILENAME = `oab-dynamic-data.json`;

  constructor(
    private readonly filesystem = Filesystem,
    private readonly directory = Directory.Data,
    private readonly encoding = Encoding.UTF8
  ) {}

  async init() {
    // No specific initialization needed for Filesystem, but could check permissions here
    return;
  }

  async load(): Promise<PersistedState> {
    try {
      const { data } = await this.filesystem.readFile({
        path: this.FILENAME,
        directory: this.directory,
        encoding: this.encoding,
      });

      const rawState = JSON.parse(data as string);
      return rawState;
    } catch (error) {
      // File doesn't exist or read error - return empty state
      return {};
    }
  }

  async save(state: PersistedState): Promise<void> {
    await this.filesystem.writeFile({
      path: this.FILENAME,
      data: JSON.stringify(state),
      directory: this.directory,
      encoding: this.encoding,
    });
  }

  async clear(): Promise<void> {
    try {
      await this.filesystem.deleteFile({
        path: this.FILENAME,
        directory: this.directory,
      });
    } catch (ignore) {
      // Ignore if file doesn't exist
    }
  }
}
