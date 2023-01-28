import PQueue from "p-queue";
import path from "path";
import fs from "fs-extra";
import logUpdate from "log-update";

import { IConverterPaths, IGDriveContentsEntry } from "../../types";
import chalk from "chalk";

export class ConversionActionQueue {
  public queue = new PQueue({ concurrency: 1, autoStart: false });

  public processed: any[] = [];

  constructor(
    public paths: IConverterPaths,
    private actions: { CREATE: any[]; IGNORE: any[]; DELETE: any[] }
  ) {}

  public generateActionList() {}

  public async processActions() {
    this.processDeleteActions(this.actions.DELETE);
    this.queueIgnoreActions(this.actions.IGNORE);
    this.queueCreateActions(this.actions.CREATE);
    this.processActionQueue();
  }

  private async processActionQueue() {
    const total = this.queue.size;
    this.queue.on("next", () => {
      logUpdate(chalk.blue(`${total - this.queue.size - this.queue.pending}/${total} processed`));
    });
    this.queue.start();
    await this.queue.onIdle();
  }

  private queueIgnoreActions(entries: IGDriveContentsEntry[]) {
    // this.queue.addAll(
    //   entries.map((entry) => {
    //     const processed = this.loadCachedConversion(entry);
    //     this.processed.push(processed);
    //   }) as any,
    //   { priority: 100 }
    // );
  }

  private queueCreateActions(entries: IGDriveContentsEntry[]) {
    // this.queue.addAll(
    //   entries.map((entry) => {
    //     const processed = new XLSXWorkbookProcessor(this.paths).process(entry);
    //     const cachedConversions = [];
    //     for (const jsonFlow of jsonFlows) {
    //       const processed = this.processSheetConversion(jsonFlow);
    //       cachedConversions.push(processed);
    //       this.processed.push(processed);
    //     }
    //     this.saveCachedConversion(entry, cachedConversions);
    //   }) as any,
    //   {
    //     priority: 10,
    //   }
    // );
  }

  private processDeleteActions(entries: IGDriveContentsEntry[]) {
    const cacheBase = this.paths.SHEETS_CACHE_FOLDER;
    for (const entry of entries) {
      const targetFile = path.resolve(cacheBase, `${entry.relativePath}.json`);
      if (fs.existsSync(targetFile)) {
        fs.removeSync(targetFile);
      }
    }
  }
}
