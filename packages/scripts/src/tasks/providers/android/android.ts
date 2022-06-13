import { spawnSync } from "child_process";

const add_assets = () => null;
const set_launcher_icon = () => null;
const set_splash_image = () => null;
const set_app_meta = () => null;

const generate_splash_image = () => {
  const cmd = `cordova-res android --type splash --skip-config --copy`;
  spawnSync(cmd, { stdio: "inherit", shell: true });
};
const generate_launcher_icon = () => {
  const cmd = `cordova-res android --type splash --skip-config --copy`;
  spawnSync(cmd, { stdio: "inherit", shell: true });
};

export default {
  // add_assets,
  // set_launcher_icon,
  // set_splash_image,
  // set_app_meta,
};
