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
  id: string;
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
  cofacilitator_id?: string;
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
        const childActions = {
          /**
           * Share a specified parent group with a specified user (co-facilitator)
           */
          add_cofacilitator: async () => {
            console.log("add_cofacilitator", params as IPlhParentGroupActionParams);
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
           * Remove a specified co-facilitator from a specified parent group
           */
          remove_cofacilitator: async () => {
            console.log("remove_cofacilitator", params as IPlhParentGroupActionParams);
            const requiredParams = {
              parent_group_id,
              auth_id,
              parent_groups_data_list,
              parents_data_list,
            };
            for (const [param, value] of Object.entries(requiredParams)) {
              if (!value) {
                console.error(
                  `[PLH PARENT GROUP] - REMOVE CO-FACILITATOR - ${param} must be provided`
                );
                return;
              }
            }
            await this.handleRemoveCoFacilitator(
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
            console.log("push", params as IPlhParentGroupActionParams);
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
            await this.handlePush(parent_groups_data_list, parents_data_list, parent_group_id);
          },
          /**
           * Pull state from shared database and update local parent groups
           */
          pull: async () => {
            console.log("update", params as IPlhParentGroupActionParams);
            console.log("this.authId()", this.authId());
            await this.handlePull(parent_group_id, parent_groups_data_list, parents_data_list);
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
    await this.addCoFacilitator(
      sharedCollectionId,
      coFacilitatorAuthId,
      parentGroupId,
      parentGroupsDataList
    );
  }

  /** TODO */
  private async handlePush(
    parentGroupsDataList: string,
    parentsDataList: string,
    parentGroupId?: string
  ) {
    // if no parent group id is provided, push all local parent groups to shared data
    if (!parentGroupId) {
      await this.handlePushBulk(parentGroupsDataList, parentsDataList);
      return;
    }
    // else, get local data for specified parent group and push changes to shared data
    const parentGroup = await this.getParentGroup(
      parentGroupId,
      parentGroupsDataList,
      parentsDataList
    );
    if (!parentGroup.shared_id) {
      await this.ensureSharedParentGroup(parentGroup.id, parentGroupsDataList, parentsDataList);
    } else {
      await this.pushParentGroupData(parentGroup);
    }
  }

  private async handlePushBulk(parentGroupsDataList: string, parentsDataList: string) {
    // for each local parent group that has already been shared, update shared data to reflect local state
    const sharedParentGroupsQuery = this.dynamicDataService.query$(
      "data_list",
      parentGroupsDataList,
      {
        selector: {
          $and: [
            { shared_id: { $exists: true } },
            { shared_id: { $ne: null } },
            { shared_id: { $ne: "" } },
          ],
        },
      }
    );
    const sharedParentGroupRefs = await firstValueFrom(sharedParentGroupsQuery);
    const sharedParentGroups = await Promise.all(
      sharedParentGroupRefs.map((sharedParentGroupRef) =>
        this.getParentGroup(sharedParentGroupRef.id, parentGroupsDataList, parentsDataList)
      )
    );
    for (const parentGroup of sharedParentGroups) {
      this.pushParentGroupData(parentGroup);
    }
  }

  private async pushParentGroupData(parentGroup: IParentGroup) {
    if (!parentGroup.shared_id) {
      console.error(
        `[PLH PARENT GROUP] - PUSH - Parent group is not shared, id: ${parentGroup.id}`
      );
      return;
    }
    await this.sharedDataService.updateSharedData(
      parentGroup.shared_id,
      "parentGroupData",
      parentGroup
    );
  }

  /** TODO */
  private handlePullBulk() {
    // fetch data for all parent groups in shared data that user has access to, and use to update local data
    // if user is not creator, set to `readonly: true` or `writeAccess: false`
  }

  /** TODO */
  private async handlePull(
    parentGroupId: string,
    parentGroupsDataList: string,
    parentsDataList: string
  ) {
    // get shared_id from local data
    const parentGroupQuery = this.dynamicDataService.query$("data_list", parentGroupsDataList, {
      selector: { id: parentGroupId },
    });
    const [parentGroupData] = await firstValueFrom(parentGroupQuery);
    const sharedId = parentGroupData.shared_id;

    console.log("sharedId", sharedId);

    // Get a snapshot directly from the server
    // TODO: using query$ gave stale data from cache, try to resolve
    const sharedParentGroupDoc = await firstValueFrom(
      this.sharedDataService.provider.querySingle$({
        id: sharedId,
        auth_id: this.authId(),
        since: undefined,
      })
    );

    if (!sharedParentGroupDoc) {
      console.error(`[PLH PARENT GROUP] - PULL - Shared parent group not found, id: ${sharedId}`);
      return;
    }

    const sharedParentGroupData = sharedParentGroupDoc.data.parentGroupData;

    console.log("sharedParentGroupDoc", sharedParentGroupDoc);
    console.log("sharedParentGroupData", sharedParentGroupData);
    await this.updateLocalParentGroupData(
      sharedParentGroupData,
      parentGroupsDataList,
      parentsDataList
    );
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
  private async addCoFacilitator(
    sharedCollectionId: string,
    coFacilitatorAuthId: string,
    parentGroupId: string,
    parentGroupsDataList: string
  ) {
    await this.sharedDataService.addCollectionMember(
      sharedCollectionId,
      coFacilitatorAuthId,
      "member"
    );
    await this.setCofacilitatorId(parentGroupId, parentGroupsDataList, coFacilitatorAuthId);
  }

  private async handleRemoveCoFacilitator(
    sharedCollectionId: string,
    coFacilitatorAuthId: string,
    parentGroupId: string,
    parentGroupsDataList: string
  ) {
    await this.sharedDataService.removeCollectionMember(
      sharedCollectionId,
      coFacilitatorAuthId,
      "member"
    );
    await this.setCofacilitatorId(parentGroupId, parentGroupsDataList, undefined);
  }

  private async updateLocalParentGroupData(
    parentGroupData: IParentGroup,
    parentGroupsDataList: string,
    parentsDataList: string
  ) {
    console.log("parentGroupData", parentGroupData);

    // update local parent group data across multiple data lists to reflect incoming parentGroup data
    await this.dynamicDataService.update("data_list", parentGroupsDataList, parentGroupData.id, {
      ...parentGroupData,
    });

    for (const parent of parentGroupData.parents) {
      await this.dynamicDataService.update("data_list", parentsDataList, parent.id, {
        ...parent,
      });
    }
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

  private async setCofacilitatorId(
    parentGroupId: string,
    parentGroupsDataList: string,
    cofacilitatorId: string
  ) {
    await this.dynamicDataService.update("data_list", parentGroupsDataList, parentGroupId, {
      cofacilitator_id: cofacilitatorId,
    });
  }
}
