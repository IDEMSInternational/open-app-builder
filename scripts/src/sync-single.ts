import { main as download } from "./gdrive-download";
import { main as convert } from "./plh-data-convert";
import { main as copy } from "./plh-copy-app-data";

async function main() {
  await download(process.argv[2]);
  await convert();
  copy(false);
}

if (process.argv.length > 2) {
  main();
} else {
  console.warn("Incorrect usage");
  console.log("Usage is either");
  console.log("npm run scripts sync-single -- sheet-name");
  console.log("npm run sync-single -- sheet-name");
  process.exit(0);
}
