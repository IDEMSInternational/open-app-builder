import { Injectable, signal, computed } from "@angular/core";
import { TemplateActionRegistry } from "../../components/template/services/instance/template-action.registry";
import { SyncServiceBase } from "../syncService.base";
import { AuthService } from "../auth/auth.service";
import { DynamicDataService } from "../dynamic-data/dynamic-data.service";
import { SharedDataService } from "src/app/feature/shared-data/shared-data.service";
import { firstValueFrom } from "rxjs";
import { ISharedDataCollection } from "src/app/feature/shared-data/types";

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
  /** The auth_id of the logged in user */
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
    this.ensureAsyncServicesReady([
      this.authService,
      this.dynamicDataService,
      this.sharedDataService,
    ]);
    this.registerTemplateActionHandlers();
  }

  private registerTemplateActionHandlers() {
    this.templateActionRegistry.register({
      plh_parent_group: async ({ args, params }) => {
        console.log("[PLH PARENT GROUP] - TEMPLATE ACTION", args, params);
        const [actionId] = args;
        const { auth_id, parent_group_id, parent_groups_data_list, parents_data_list } =
          params as IPlhParentGroupActionParams;
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
            await this.handleRemoveCoFacilitator(auth_id, parent_group_id, parent_groups_data_list);

            // TODO: remove from shared data if there are no other members?
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
            await this.handlePush(parent_groups_data_list, parents_data_list, parent_group_id);
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

  /**
   * Push a specified parent group to shared data and add a specified user (co-facilitator) as a member
   */
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

  /**
   * Push local state of any shared parent groups to shared database
   * If a parent group id is provided, push only that parent group
   */
  private async handlePush(
    parentGroupsDataList: string,
    parentsDataList: string,
    parentGroupId?: string
  ) {
    // if no parent group id is provided, push all local parent groups that have already been shared to shared data
    if (!parentGroupId) {
      await this.handlePushAll(parentGroupsDataList, parentsDataList);
      return;
    }
    // else, get local data for specified parent group and push changes to shared data
    const parentGroup = await this.getLocalParentGroup(
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

  /**
   * Push local state of all shared parent groups to shared database
   */
  private async handlePushAll(parentGroupsDataList: string, parentsDataList: string) {
    // for each local parent group that has already been shared, update shared data to reflect local state
    const sharedParentGroupRefs = await this.getLocalParentGroupRefs(parentGroupsDataList);
    const sharedParentGroups = (await Promise.all(
      sharedParentGroupRefs.map((sharedParentGroupRef) =>
        this.getLocalParentGroup(sharedParentGroupRef.id, parentGroupsDataList, parentsDataList)
      )
    )) as IParentGroup[];
    for (const parentGroup of sharedParentGroups) {
      this.pushParentGroupData(parentGroup);
    }
  }

  /**
   * Push local state of a specified parent group to shared database
   */
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

  /**
   * Pull state from shared database and update local parent groups
   * If a parent group id is provided, pull only that parent group
   */
  private async handlePull(
    parentGroupId: string,
    parentGroupsDataList: string,
    parentsDataList: string
  ) {
    if (!parentGroupId) {
      await this.handlePullAll(parentGroupsDataList, parentsDataList);
      return;
    }

    const sharedId = await this.getSharedIdFromParentGroupId(parentGroupId, parentGroupsDataList);
    await this.pullParentGroupDataBySharedId(parentGroupsDataList, parentsDataList, sharedId);
  }

  /** Pull  */
  private async handlePullAll(parentGroupsDataList: string, parentsDataList: string) {
    // current implementation only queries for parent groups that have already been shared
    // TODO: fetch data for all parent groups in shared data that user has access to, and use to update local data
    const sharedParentGroupsQuery = this.sharedDataService.provider.queryMultiple$({
      since: undefined,
      auth_id: this.authId(),
    });
    const sharedParentGroups = await firstValueFrom(sharedParentGroupsQuery);
    for (const sharedParentGroupDoc of sharedParentGroups) {
      await this.updateLocalParentGroupData(
        sharedParentGroupDoc,
        parentGroupsDataList,
        parentsDataList
      );
    }
  }

  /**
   * Fetch shared data for spectified parent group and use to update local parent group data, including write permissions
   * */
  private async pullParentGroupDataBySharedId(
    parentGroupsDataList: string,
    parentsDataList: string,
    sharedId: string
  ) {
    // Get a snapshot directly from the server
    // TODO: using query$ gives stale data from cache, try to resolve
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

    await this.updateLocalParentGroupData(
      sharedParentGroupDoc,
      parentGroupsDataList,
      parentsDataList
    );
  }

  /**
   * Ensure a parent group is saved in shared data
   * If the parent group is not shared already, create a new entry in shared data
   * @returns the ID of the parent group collection in shared data (shared_id)
   */
  private async ensureSharedParentGroup(
    parentGroupId: string,
    parentGroupsDataList: string,
    parentsDataList: string
  ) {
    // check if parent group is already shared
    const parentGroup = await this.getLocalParentGroup(
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

  /**
   * Create a new shared parent group in shared data
   * @returns the ID of the new parent group collection in shared data (shared_id)
   */
  private async createSharedParentGroup(
    parentGroupId: string,
    parentGroupsDataList: string,
    parentsDataList: string
  ) {
    // publish parent group to shared data (create new shared data collection for parent group)
    const parentGroup = await this.getLocalParentGroup(
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
    // copy firebase-generated guid back to local data, e.g. `shared_id: <guid>`?
    await this.setLocalParentGroupProperty(parentGroupId, parentGroupsDataList, {
      shared_id: sharedCollectionId,
    });
    return sharedCollectionId;
  }

  /**
   * Get partial data (that which is stored in parentGroupsDataList) for all parent groups in local data that have been shared to shared data
   * @returns an array of parent group references
   */
  private async getLocalParentGroupRefs(parentGroupsDataList: string) {
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
    return await firstValueFrom(sharedParentGroupsQuery);
  }

  /**
   * Retrieves a parent group from local data by combining data from parent groups and parents data lists
   * @returns IParentGroup object with parent group data and associated parents
   */
  private async getLocalParentGroup(
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

  /**
   * Adds a co-facilitator as a member to the shared parent group collection
   * */
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
    await this.setLocalParentGroupProperty(parentGroupId, parentGroupsDataList, {
      cofacilitator_id: coFacilitatorAuthId,
    });
  }

  /**
   * Remove a co-facilitator from the shared parent group collection
   */
  private async handleRemoveCoFacilitator(
    coFacilitatorAuthId: string,
    parentGroupId: string,
    parentGroupsDataList: string
  ) {
    const sharedId = await this.getSharedIdFromParentGroupId(parentGroupId, parentGroupsDataList);

    await this.sharedDataService.removeCollectionMember(sharedId, coFacilitatorAuthId, "member");
    await this.setLocalParentGroupProperty(parentGroupId, parentGroupsDataList, {
      cofacilitator_id: undefined,
    });
  }

  /** Get the shared_id for a parent group from local data */
  private async getSharedIdFromParentGroupId(parentGroupId: string, parentGroupsDataList: string) {
    const parentGroupQuery = this.dynamicDataService.query$("data_list", parentGroupsDataList, {
      selector: { id: parentGroupId },
    });
    const [parentGroupData] = await firstValueFrom(parentGroupQuery);
    return parentGroupData.shared_id;
  }

  /**
   * Update local parent group data across multiple data lists to reflect incoming parentGroup data
   */
  private async updateLocalParentGroupData(
    sharedParentGroupDoc: ISharedDataCollection,
    parentGroupsDataList: string,
    parentsDataList: string
  ) {
    // Parent group data is nested inside data key
    const parentGroupData = sharedParentGroupDoc.data.parentGroupData as IParentGroup;
    const userIsAdmin = sharedParentGroupDoc.admins.includes(this.authId());
    parentGroupData.readonly = !userIsAdmin;

    console.log("parentGroupData", parentGroupData);

    await this.dynamicDataService.upsert("data_list", parentGroupsDataList, {
      ...parentGroupData,
      // When saving a shared parent group to local data, use the shared_id of the shared parent group as the parent group id
      // (avoids conflicts with other local parent groups)
      id: sharedParentGroupDoc.id,
    });

    for (const parent of parentGroupData.parents) {
      await this.dynamicDataService.update("data_list", parentsDataList, parent.id, {
        ...parent,
      });
    }
  }

  /**
   * Set a property on a parent group in the local parent groups data list
   */
  private async setLocalParentGroupProperty<T>(
    parentGroupId: string,
    parentGroupsDataList: string,
    update: Partial<T>
  ) {
    console.log("Setting local parent group property", parentGroupId, parentGroupsDataList, update);
    await this.dynamicDataService.update("data_list", parentGroupsDataList, parentGroupId, {
      ...update,
    });
  }
}
