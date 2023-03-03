import { generateDeploymentConfig } from "scripts";
const config = generateDeploymentConfig("local");

 // NOTE - sheets will be copied directly to app only and ignored from git
config!.app_data!.output_path= "src/assets/app_data"
export default config;
