import { extendDeploymentConfig } from "scripts";

/** 
 * plh_global is the same as the base plh config, but retained
 * for legacy compatibility (to review in future for removal)  
 **/
const config = extendDeploymentConfig({ name: "plh_global", parent: "plh" });
 
export default config;