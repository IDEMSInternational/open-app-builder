import { Injectable, signal, computed } from "@angular/core";
import { TemplateActionRegistry } from "../../components/template/services/instance/template-action.registry";
import { SyncServiceBase } from "../syncService.base";
import { AuthService } from "../auth/auth.service";

interface IPlhParentGroupActionParams {
  /** ID of a co-faciliator to share data with */
  authId?: string;
  /** ID of a parent group to target */
  parentGroupId?: string;
  /** Name of the data list of parent groups */
  parentGroupsDataList?: string;
  /** Name of the data list of parents */
  parentsDataList?: string;
}

interface IParent {
  first_name: string;
  last_name: string;
  text_id: string;
  co_parent_id: string;
  co_parent_name: string;
  archived: string;
  onboarding_day_chat: string;
  day_3_mh_stress: string;
  day_5_final_chat_session_5ux: string;
  before_chat: string;
  week_1_chat: string;
  week_2_chat: string;
  week_3_chat: string;
  week_4_chat: string;
}

interface IParentGroup {
  archived: boolean;
  hidden: boolean;
  id: string;
  name: string;
  parents: IParent[];
  text: string;
  shared?: boolean;
  readonly?: boolean;
}

@Injectable({
  providedIn: "root",
})
export class PlhParentGroupService extends SyncServiceBase {
  authId = computed(() => this.authService.provider.authUser()?.uid);

  constructor(
    private templateActionRegistry: TemplateActionRegistry,
    private authService: AuthService
  ) {
    super("PlhParentGroup");
    this.initialise();
  }

  private initialise() {
    this.registerTemplateActionHandlers();
  }

  private registerTemplateActionHandlers() {
    this.templateActionRegistry.register({
      plh_parent_group: async ({ args, params }) => {
        const [actionId] = args;
        const childActions = {
          /**
           * Share a specified parent group with a specified user (co-facilitator)
           */
          share: async () => {
            console.log("share", params as IPlhParentGroupActionParams);
          },
          /**
           * Push local state of any shared parent groups to shared database
           */
          push: async () => {
            console.log("sync", params as IPlhParentGroupActionParams);
          },
          /**
           * Pull state from shared database and update local parent groups
           */
          pull: async () => {
            console.log("update", params as IPlhParentGroupActionParams);
          },
        };
        if (!(actionId in childActions)) {
          console.error(`[PLH PARENT GROUP] - No action, "${actionId}"`);
          return;
        }
        return childActions[actionId]();
      },
    });
  }

  private handleShare(parentGroupId: string, coFacilitatorAuthId: string) {
    // update local data for parent group, `shared: true`
    // publish parent group to shared data (create new shared data collection for parent group)
    // copy firtebase-generated guid back to local data, e.g. `sharedId: <guid>`?
    // invite specified authId to have access to that data
  }

  private handlePushBulk() {
    // for each local parent group with `shared: true`, update shared data to reflect local state
  }

  private handlePush(parentGroupId: string) {
    // get local data for specified parent group and push changes to shared data
  }

  private handlePullBulk() {
    // fetch data for all parent groups in shared data that user has access to, and use to update local data
    // if user is not creator, set to `readonly: true` or `writeAccess: false`
  }

  private handlePull(parentGroupId: string) {
    // fetch data for specified parent group in shared data, and use to update local data
  }

  /** @returns IParentGroup object for specified parent group */
  private getParentGroup(
    parentGroupId: string,
    parentGroupsDataList: string,
    parentsDataList: string
  ) {
    // for specified parent group, get data from relevant local data lists and combine into IParentGroup object
  }

  private updateLocalParentGroupData(parentGroup: IParentGroup) {
    // update local parent group data across multiple data lists to reflect incoming parentGroup data
  }
}
