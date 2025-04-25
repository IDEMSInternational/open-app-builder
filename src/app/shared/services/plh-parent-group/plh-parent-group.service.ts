import { Injectable, signal, computed } from "@angular/core";
import { TemplateActionRegistry } from "../../components/template/services/instance/template-action.registry";
import { SyncServiceBase } from "../syncService.base";
import { AuthService } from "../auth/auth.service";
import { DynamicDataService } from "../dynamic-data/dynamic-data.service";
import { SharedDataService } from "src/app/feature/shared-data/shared-data.service";
import { firstValueFrom } from "rxjs";

interface IPlhParentGroupActionParams {
  /** ID of a co-faciliator to share data with */
  auth_id?: string;
  /** ID of a parent group to target */
  parent_group_id?: string;
  /** Name of the data list of parent groups */
  parent_groups_data_list?: string;
  /** Name of the data list of parents */
  parents_data_list?: string;
}

interface IParent {
  first_name: string;
  last_name: string;
  number: string;
  age: string;
  sex: string;
  child_name: string;
  child_age: string;
  child_sex: string;
  relationship: string;
  members: string;
  childcare: string;
  goal: string;
  other: string;
  consoltation: string;
  archived: boolean;
}

interface IParentGroup {
  archived: boolean;
  hidden: boolean;
  id: string;
  name: string;
  parents: IParent[];
  text: string;
  readonly?: boolean;
  shared?: boolean;
  shared_id?: string;
}

@Injectable({
  providedIn: "root",
})
export class PlhParentGroupService extends SyncServiceBase {
  authId = computed(() => this.authService.provider.authUser()?.uid);

  constructor(
    private templateActionRegistry: TemplateActionRegistry,
    private authService: AuthService,
    private dynamicDataService: DynamicDataService,
    private sharedDataService: SharedDataService
  ) {
    super("PlhParentGroup");
    this.initialise();
  }

  private initialise() {
    this.ensureAsyncServicesReady([this.sharedDataService]);
    this.registerTemplateActionHandlers();
  }

  private registerTemplateActionHandlers() {
    this.templateActionRegistry.register({
      plh_parent_group: async ({ args, params }) => {
        console.log("plh_parent_group", args, params);
        const [actionId] = args;
        const { auth_id, parent_group_id, parent_groups_data_list, parents_data_list } =
          params as IPlhParentGroupActionParams;
        return;
        // const auth_id = "test";
        const childActions = {
          /**
           * Share a specified parent group with a specified user (co-facilitator)
           */
          share: async () => {
            console.log("share", params as IPlhParentGroupActionParams);
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
            await this.handleShare(
              parent_group_id,
              auth_id,
              parent_groups_data_list,
              parents_data_list
            );
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

  private async handleShare(
    parentGroupId: string,
    coFacilitatorAuthId: string,
    parentGroupsDataList: string,
    parentsDataList: string
  ) {
    const sharedCollectionId = await this.ensureSharedParentGroup(
      parentGroupId,
      parentGroupsDataList,
      parentsDataList
    );
    console.log("sharedCollectionId", sharedCollectionId);
    await this.addCoFacilitator(sharedCollectionId, coFacilitatorAuthId);
  }

  /** TODO */
  private handlePushBulk() {
    // for each local parent group with `shared: true`, update shared data to reflect local state
  }

  /** TODO */
  private handlePush(parentGroupId: string) {
    // get local data for specified parent group and push changes to shared data
  }

  /** TODO */
  private handlePullBulk() {
    // fetch data for all parent groups in shared data that user has access to, and use to update local data
    // if user is not creator, set to `readonly: true` or `writeAccess: false`
  }

  /** TODO */
  private handlePull(parentGroupId: string) {
    // fetch data for specified parent group in shared data, and use to update local data
  }

  private async ensureSharedParentGroup(
    parentGroupId: string,
    parentGroupsDataList: string,
    parentsDataList: string
  ) {
    // check if parent group is already shared
    const parentGroup = await this.getParentGroup(
      parentGroupId,
      parentGroupsDataList,
      parentsDataList
    );
    if (parentGroup.shared_id) {
      return parentGroup.shared_id;
    }
    // create new shared parent group
    return await this.createSharedParentGroup(parentGroupId, parentGroupsDataList, parentsDataList);
  }

  private async createSharedParentGroup(
    parentGroupId: string,
    parentGroupsDataList: string,
    parentsDataList: string
  ) {
    // update local data for parent group, `shared: true`
    await this.setSharedStatus(parentGroupId, parentGroupsDataList, true);
    // publish parent group to shared data (create new shared data collection for parent group)
    const parentGroup = await this.getParentGroup(
      parentGroupId,
      parentGroupsDataList,
      parentsDataList
    );
    const { id: sharedCollectionId } = await this.sharedDataService.createSharedCollection();
    await this.sharedDataService.updateSharedData(sharedCollectionId, "type", "parent_group");
    await this.sharedDataService.updateSharedData(
      sharedCollectionId,
      "parentGroupData",
      parentGroup
    );
    // copy firebase-generated guid back to local data, e.g. `sharedId: <guid>`?
    await this.setSharedId(parentGroupId, parentGroupsDataList, sharedCollectionId);
    return sharedCollectionId;
  }

  /**
   * Retrieves a parent group by combining data from parent groups and parents data lists
   * @returns IParentGroup object with parent group data and associated parents
   */
  private async getParentGroup(
    parentGroupId: string,
    parentGroupsDataList: string,
    parentsDataList: string
  ) {
    const parentGroupQuery = this.dynamicDataService.query$("data_list", parentGroupsDataList, {
      selector: { id: parentGroupId },
    });
    const [parentGroupData] = await firstValueFrom(parentGroupQuery);

    const parentsQuery = this.dynamicDataService.query$("data_list", parentsDataList, {
      selector: { group_id: parentGroupId },
    });
    const parentsData = await firstValueFrom(parentsQuery);

    return {
      ...parentGroupData,
      // NB, additional fields may have been added to the parent data at runtime
      parents: parentsData,
    } as IParentGroup;
  }

  /** Adds a co-facilitator as a member to the shared parent group collection */
  private async addCoFacilitator(sharedCollectionId: string, coFacilitatorAuthId: string) {
    await this.sharedDataService.addCollectionMember(
      sharedCollectionId,
      coFacilitatorAuthId,
      "member"
    );
  }

  private updateLocalParentGroupData(parentGroup: IParentGroup) {
    // update local parent group data across multiple data lists to reflect incoming parentGroup data
  }

  /** Sets the `shared` status of a local parent group in the parent groups data list */
  private async setSharedStatus(
    parentGroupId: string,
    parentGroupsDataList: string,
    shared: boolean
  ) {
    await this.dynamicDataService.update("data_list", parentGroupsDataList, parentGroupId, {
      shared,
    });
  }

  private async setSharedId(
    parentGroupId: string,
    parentGroupsDataList: string,
    sharedCollectionId: string
  ) {
    await this.dynamicDataService.update("data_list", parentGroupsDataList, parentGroupId, {
      shared_id: sharedCollectionId,
    });
  }
}
