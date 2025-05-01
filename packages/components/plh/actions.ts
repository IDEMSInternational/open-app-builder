import { PLH_PARENT_GROUP_ACTIONS } from "./parent-group/plh-parent-group.actions";

// Export actions from here to avoid circular dependency
export const PLH_ACTIONS_LIST = [...PLH_PARENT_GROUP_ACTIONS] as const;
