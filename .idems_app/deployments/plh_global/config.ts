import { extendDeploymentConfig } from "scripts";

/** 
 * plh_global is the same as the base plh config, but retained
 * for legacy compatibility (to review in future for removal)  
 **/
const config = extendDeploymentConfig({ name: "plh_global", parent: "plh" });

config.error_logging = {
  dsn: "https://a8b2897d48e84c5fa4398b4eb6158480@app.glitchtip.com/2230",
};
 
export default config;