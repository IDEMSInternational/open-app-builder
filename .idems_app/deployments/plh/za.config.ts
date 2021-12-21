import DEFAULT_CONFIG from "./default.config";

/** ZA config extends the default config **/

const config = DEFAULT_CONFIG;
config.app_data.sheets_filter_function = (flow) => !["debug"].includes(flow.flow_subtype);

export default config;
