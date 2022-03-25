import { FlowTypes } from "data-models";
import global_debug from "./global.debug";
import global_debug_override from "./global.debug_override";
import global_2 from "./global";
export const global: FlowTypes.Global[] = [].concat(global_debug, global_debug_override, global_2);
