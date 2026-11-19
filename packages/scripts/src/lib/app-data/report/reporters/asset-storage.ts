import { kbToMB } from "shared";
import { APP_CODE_KB, summariseBundledAssets } from "../../postProcess/asset-processors";
import type { IAssetPackStorage, IAssetStorageData } from "../load-asset-entries";
import { IReportTable } from "../report.types";

interface IAssetStorageRow {
  item: string;
  download: string;
  on_device: string;
}

/** Shown where a size does not apply or could not be measured */
const NO_VALUE = "-";

const formatKB = (kb: number) => `${kbToMB(kb)} MB`;
const formatBytes = (bytes: number) => formatKB(bytes / 1024);
const sumValues = (values: number[]) => values.reduce((total, value) => total + value, 0);

/** Generate an estimate of the storage used by an installed app and its asset packs */
export class AssetStorageReport {
  constructor(private storageData: IAssetStorageData) {}

  public async process() {
    const { bundled, contentKB, packs } = this.storageData;
    const { totalKB, baseKB, overrides } = summariseBundledAssets(bundled);
    const installedKB = APP_CODE_KB + contentKB + totalKB;

    const data: IAssetStorageRow[] = [
      this.row("App code (estimate)", formatKB(APP_CODE_KB)),
      this.row("App content (sheets and translations)", formatKB(contentKB)),
      this.row("Bundled assets", formatKB(totalKB)),
    ];
    if (overrides.length > 0) {
      data.push(this.row("Bundled assets: base", formatKB(baseKB)));
      for (const { name, sizeKB } of overrides) {
        data.push(this.row(`Bundled assets: ${name}`, formatKB(sizeKB)));
      }
    }

    let description = "Estimated space the app takes up on an Android or iOS device.";
    let footer = "App code is a fixed estimate and excludes native Android and iOS code.";
    if (packs.length === 0) {
      data.push(this.row("Total", formatKB(installedKB)));
    } else {
      data.push(this.row("Total without asset packs", formatKB(installedKB)));
      for (const pack of packs) {
        data.push(this.packRow(pack));
      }
      data.push(this.allPacksRow(packs, installedKB));
      description +=
        " Asset packs are unzipped once downloaded and the zip is not kept, so each pack takes up its unzipped size. Users only have the packs the app has downloaded for them, so the actual size on a device falls between the two totals.";
      footer += " Files that appear in more than one asset pack are stored once and counted once.";
    }

    const app_size_on_device: IReportTable = {
      data,
      display: "collapse_open",
      title: "Estimated App Size on Device",
      description,
      footer,
      type: "table",
      columns: ["item", "download", "on_device"],
    };
    return { app_size_on_device };
  }

  private row(item: string, on_device: string, download = NO_VALUE): IAssetStorageRow {
    return { item, download, on_device };
  }

  private packRow({ packName, archiveBytes, fileSizesKB }: IAssetPackStorage) {
    const download = archiveBytes === undefined ? NO_VALUE : formatBytes(archiveBytes);
    const onDevice = formatKB(sumValues(Object.values(fileSizesKB)));
    return this.row(`Asset pack: ${packName}`, onDevice, download);
  }

  /** Files shared between packs are saved to the same path, so only count once on device */
  private allPacksRow(packs: IAssetPackStorage[], installedKB: number) {
    const archiveSizes = packs.flatMap(({ archiveBytes }) => archiveBytes ?? []);
    const download =
      archiveSizes.length === packs.length ? formatBytes(sumValues(archiveSizes)) : NO_VALUE;
    const uniqueFiles: Record<string, number> = Object.assign(
      {},
      ...packs.map(({ fileSizesKB }) => fileSizesKB)
    );
    const onDevice = formatKB(installedKB + sumValues(Object.values(uniqueFiles)));
    return this.row("Total with all asset packs", onDevice, download);
  }
}
