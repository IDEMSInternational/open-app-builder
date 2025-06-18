import type { IActionHandler } from "src/app/shared/components/template/services/instance/template-action.registry";
import { PlhParentGroupService } from "./plh-parent-group.service";

interface IPlhParentGroupActionParams {
  /** ID of a co-faciliator to share data with */
  auth_id?: string;
  /** ID of a parent group to target */
  parent_group_id?: string;
  /** Name of the data list of parent groups */
  parent_groups_data_list?: string;
  /** Name of the data list of parents */
  parents_data_list?: string;
  /** Name of the data list that tracks completion of modules by parent group */
  completion_tracking_data_list?: string;
}

export class PlhParentGroupActionFactory {
  constructor(private service: PlhParentGroupService) {}

  public plh_parent_group: IActionHandler<IPlhParentGroupActionParams> = async ({
    args,
    params,
  }) => {
    console.log("[PLH PARENT GROUP] - TEMPLATE ACTION", args, params);
    const [actionId] = args;
    const {
      auth_id,
      parent_group_id,
      parent_groups_data_list,
      parents_data_list,
      completion_tracking_data_list,
    } = params;

    const childActions = {
      /**
       * Push a specified parent group to shared data and add a specified user (co-facilitator) as a member
       */
      add_cofacilitator: async () => {
        const requiredParams = {
          parent_group_id,
          auth_id,
          parent_groups_data_list,
          parents_data_list,
        };

        for (const [param, value] of Object.entries(requiredParams)) {
          if (!value) {
            console.error(`[PLH PARENT GROUP] - SHARE - ${param} must be provided`);
            return;
          }
        }
        await this.service.handleShare(
          parent_group_id,
          auth_id,
          parent_groups_data_list,
          parents_data_list
        );
      },

      /**
       * Remove a specified co-facilitator from a specified parent group
       */
      remove_cofacilitator: async () => {
        const requiredParams = {
          parent_group_id,
          auth_id,
          parent_groups_data_list,
          parents_data_list,
        };
        for (const [param, value] of Object.entries(requiredParams)) {
          if (!value) {
            console.error(`[PLH PARENT GROUP] - REMOVE CO-FACILITATOR - ${param} must be provided`);
            return;
          }
        }
        await this.service.handleRemoveCoFacilitator(
          auth_id,
          parent_group_id,
          parent_groups_data_list
        );
      },

      /**
       * Push local state of any shared parent groups to shared database
       * If a parent group id is provided, push only that parent group
       */
      push: async () => {
        const requiredParams = {
          parent_groups_data_list,
          parents_data_list,
        };
        for (const [param, value] of Object.entries(requiredParams)) {
          if (!value) {
            console.error(`[PLH PARENT GROUP] - PUSH - ${param} must be provided`);
            return;
          }
        }
        await this.service.handlePush(parent_groups_data_list, parents_data_list, parent_group_id);
      },

      /**
       * Pull state from shared database and update local parent groups
       * If a parent group id is provided, pull only that parent group
       */
      pull: async () => {
        const requiredParams = {
          parent_groups_data_list,
          parents_data_list,
        };
        for (const [param, value] of Object.entries(requiredParams)) {
          if (!value) {
            console.error(`[PLH PARENT GROUP] - PULL - ${param} must be provided`);
            return;
          }
        }
        await this.service.handlePull(
          parent_group_id,
          parent_groups_data_list,
          parents_data_list,
          completion_tracking_data_list
        );
      },

      /**
       * Create a local parent group with randomly generated data – used for debugging other functionality
       */
      create_random: async () => {
        const requiredParams = {
          parent_groups_data_list,
          parents_data_list,
        };
        for (const [param, value] of Object.entries(requiredParams)) {
          if (!value) {
            console.error(`[PLH PARENT GROUP] - GENERATE RANDOM - ${param} must be provided`);
            return;
          }
        }
        await this.service.generateRandomParentGroup(parent_groups_data_list, parents_data_list);
      },
    };

    if (!(actionId in childActions)) {
      console.error(`[PLH PARENT GROUP] - No action, "${actionId}"`);
      return;
    }
    return childActions[actionId]();
  };
}
