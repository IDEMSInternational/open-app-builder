import { Injectable, computed } from "@angular/core";
import { SyncServiceBase } from "src/app/shared/services/syncService.base";
import { AuthService } from "src/app/shared/services/auth/auth.service";
import { DynamicDataService } from "src/app/shared/services/dynamic-data/dynamic-data.service";
import { SharedDataService } from "src/app/feature/shared-data/shared-data.service";
import { firstValueFrom } from "rxjs";
import { ISharedDataCollection } from "src/app/feature/shared-data/types";

interface IParent {
  group_id: string;
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

/**
 * Service for managing parent groups and sharing them between users
 * Specifically for plh_facilitator_* deployments
 * See https://github.com/IDEMSInternational/open-app-builder/pull/2910
 */
@Injectable({
  providedIn: "root",
})
export class PlhParentGroupService extends SyncServiceBase {
  /** The auth_id of the logged in user */
  private authId = computed(() => this.authService.provider.authUser()?.uid);

  constructor(
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
  }

  /**
   * Push a specified parent group to shared data and add a specified user (co-facilitator) as a member
   */
  public async handleShare(
    parentGroupId: string,
    coFacilitatorAuthId: string,
    parentGroupsDataList: string,
    parentsDataList: string
  ) {
    try {
      const sharedCollectionId = await this.ensureSharedParentGroup(
        parentGroupId,
        parentGroupsDataList,
        parentsDataList
      );
      await this.addCoFacilitator(
        sharedCollectionId,
        coFacilitatorAuthId,
        parentGroupId,
        parentGroupsDataList
      );
    } catch (error) {
      console.error(
        `[PLH PARENT GROUP] - SHARE - Error sharing parent group, id: ${parentGroupId}`,
        error
      );
      return;
    }
  }

  /**
   * Push local state of any shared parent groups to shared database
   * If a parent group id is provided, push only that parent group
   */
  public async handlePush(
    parentGroupsDataList: string,
    parentsDataList: string,
    parentGroupId?: string
  ) {
    try {
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
    } catch (error) {
      console.error("[PLH PARENT GROUP] - PUSH - Error pushing parent group data", error);
      return;
    }
  }

  /**
   * Generate a random parent group for debugging purposes
   */
  public async generateRandomParentGroup(
    parentGroupsDataList: string,
    parentsDataList: string
  ): Promise<void> {
    const randomId = Math.random().toString(36).substring(2, 15);

    const parentGroup: IParentGroup = {
      id: `parent_group_${randomId}`,
      name: `parent_group_${randomId}`,
      text: `Parent Group ${randomId}`,
      parents: [
        {
          group_id: `parent_group_${randomId}`,
          id: `parent_${randomId}`,
          first_name: `Parent ${randomId}`,
          last_name: `Parent ${randomId}`,
          number: "1234567890",
          age: "30",
        },
      ],
    } as IParentGroup;

    await this.updateLocalParentGroupData(parentGroup, parentGroupsDataList, parentsDataList);
  }

  /**
   * Push local state of all shared parent groups to shared database
   */
  private async handlePushAll(parentGroupsDataList: string, parentsDataList: string) {
    // for each local parent group that has already been shared, update shared data to reflect local state
    const sharedParentGroupRefs = await this.getLocalParentGroupRefs(parentGroupsDataList);
    const filteredSharedParentGroupRefs = sharedParentGroupRefs.filter((ref) => !ref.readonly);
    const sharedParentGroups = (await Promise.all(
      filteredSharedParentGroupRefs.map((ref) =>
        this.getLocalParentGroup(ref.id, parentGroupsDataList, parentsDataList)
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
  public async handlePull(
    parentGroupId: string,
    parentGroupsDataList: string,
    parentsDataList: string,
    completionTrackingDataList?: string
  ) {
    try {
      if (!parentGroupId) {
        await this.handlePullAll(parentGroupsDataList, parentsDataList, completionTrackingDataList);
        return;
      }

      const sharedId = await this.getSharedIdFromParentGroupId(parentGroupId, parentGroupsDataList);
      await this.pullParentGroupDataBySharedId(
        parentGroupsDataList,
        parentsDataList,
        sharedId,
        completionTrackingDataList
      );
    } catch (error) {
      console.error("[PLH PARENT GROUP] - PULL - Error pulling parent group data", error);
      return;
    }
  }

  /** Pull  */
  private async handlePullAll(
    parentGroupsDataList: string,
    parentsDataList: string,
    completionTrackingDataList?: string
  ) {
    if (!this.authId()) {
      console.error("[PLH PARENT GROUP] - PULL - Current user not logged in");
      return;
    }
    // Directly query the server provider: the main service query methods aren't suited to providing a snapshot,
    // since they are optimised to return a stream from the server and cache combined.
    const sharedDataQuery = this.sharedDataService.provider.queryMultiple$({
      id: "",
      since: undefined,
      auth_id: this.authId(),
    });
    const sharedData = await firstValueFrom(sharedDataQuery);
    const sharedParentGroups = sharedData.filter((doc) => doc.data.type === "parent_group");
    console.log("[PLH PARENT GROUP] - PULL - Shared parent groups", sharedParentGroups);

    const incomingParentGroupIds = [];
    for (const sharedParentGroupDoc of sharedParentGroups) {
      const parentGroupId = await this.updateLocalParentGroupDataFromSharedDoc(
        sharedParentGroupDoc,
        parentGroupsDataList,
        parentsDataList,
        completionTrackingDataList
      );
      incomingParentGroupIds.push(parentGroupId);
    }
    await this.cleanupUnsharedParentGroups(parentGroupsDataList, incomingParentGroupIds);
  }

  /**
   * Remove any parent groups from local data that were previously shared with current user not present in the incoming parent group ids
   */
  private async cleanupUnsharedParentGroups(
    parentGroupsDataList: string,
    incomingParentGroupIds: string[]
  ) {
    const localParentGroupRefs = await this.getLocalParentGroupRefs(parentGroupsDataList);
    const previouslySharedParentGroups = localParentGroupRefs.filter(
      (group) => group.shared_id && group.readonly
    );
    const unsharedParentGroups = previouslySharedParentGroups.filter(
      (group) => !incomingParentGroupIds.includes(group.id)
    );
    const unsharedParentGroupIds = unsharedParentGroups.map((group) => group.id);

    await this.dynamicDataService.remove("data_list", parentGroupsDataList, unsharedParentGroupIds);
  }

  /**
   * Fetch shared data for spectified parent group and use to update local parent group data, including write permissions
   * */
  private async pullParentGroupDataBySharedId(
    parentGroupsDataList: string,
    parentsDataList: string,
    sharedId: string,
    completionTrackingDataList?: string
  ) {
    if (!this.authId()) {
      console.error("[PLH PARENT GROUP] - PULL - Current user not logged in");
      return;
    }
    try {
      // Directly query the server provider: the main service query methods aren't suited to providing a snapshot,
      // since they are optimised to return a stream from the server and cache combined.
      const sharedParentGroupDoc = await firstValueFrom(
        this.sharedDataService.provider.querySingle$({
          id: sharedId,
          auth_id: this.authId(),
          since: undefined,
        })
      );

      if (!sharedParentGroupDoc) {
        console.error(`[PLH PARENT GROUP] - PULL - Shared parent group not found, id: ${sharedId}`);
        // TODO: remove parent group from local data?
        return;
      }

      await this.updateLocalParentGroupDataFromSharedDoc(
        sharedParentGroupDoc,
        parentGroupsDataList,
        parentsDataList,
        completionTrackingDataList
      );
    } catch (error) {
      console.error(
        `[PLH PARENT GROUP] - PULL - Error pulling parent group data, id: ${sharedId}`,
        error
      );
      // TODO: remove parent group from local data?
      return;
    }
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

    return (
      parentGroup.shared_id ||
      (await this.createSharedParentGroup(parentGroupId, parentGroupsDataList, parentsDataList))
    );
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

    // HACK: currently the parent group name is used as the ID assigned to parents, so use this for the query
    const parentGroupName = parentGroupData.name;

    const parentsQuery = this.dynamicDataService.query$("data_list", parentsDataList, {
      selector: { group_id: parentGroupName },
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
  public async handleRemoveCoFacilitator(
    coFacilitatorAuthId: string,
    parentGroupId: string,
    parentGroupsDataList: string
  ) {
    try {
      const sharedId = await this.getSharedIdFromParentGroupId(parentGroupId, parentGroupsDataList);

      await this.sharedDataService.removeCollectionMember(sharedId, coFacilitatorAuthId, "member");
      await this.setLocalParentGroupProperty(parentGroupId, parentGroupsDataList, {
        cofacilitator_id: undefined,
      });
    } catch (error) {
      console.error(
        "[PLH PARENT GROUP] - REMOVE CO-FACILITATOR - Error removing co-facilitator",
        error
      );
    }
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
  private async updateLocalParentGroupDataFromSharedDoc(
    sharedParentGroupDoc: ISharedDataCollection,
    parentGroupsDataList: string,
    parentsDataList: string,
    completionTrackingDataList?: string
  ) {
    if (!sharedParentGroupDoc.data.parentGroupData) {
      console.error(
        `[PLH PARENT GROUP] - PULL - Parent group data not found in shared data, id: ${sharedParentGroupDoc.id}`
      );
      return;
    }
    // Parent group data is nested inside data key
    let parentGroupData = sharedParentGroupDoc.data.parentGroupData as IParentGroup;
    const userIsAdmin = sharedParentGroupDoc.admins.includes(this.authId());
    parentGroupData.readonly = !userIsAdmin;
    const sharedId = sharedParentGroupDoc.id;
    parentGroupData.shared_id = sharedId;
    if (sharedParentGroupDoc._created_by !== this.authId()) {
      parentGroupData = this.hackTransformReadonlyParentGroupData(parentGroupData, sharedId);
    }

    if (completionTrackingDataList) {
      await this.hackUpdateCompletionTrackingDataList(
        sharedId,
        parentGroupsDataList,
        completionTrackingDataList
      );
    }

    return await this.updateLocalParentGroupData(
      parentGroupData,
      parentGroupsDataList,
      parentsDataList
    );
  }

  /**
   * Update the completion tracking data list with new field to track completion of a parent group.
   * Replicates custom functionality previously authored manually
   */
  private async hackUpdateCompletionTrackingDataList(
    parentGroupId: string,
    parentGroupsDataList: string,
    completionTrackingDataList: string
  ) {
    // If parent group is new, update completionTrackingDataList with a new field to track completion for this parent group
    const localDocQuery = this.dynamicDataService.query$("data_list", parentGroupsDataList, {
      selector: { id: parentGroupId },
    });
    const queryResult = await firstValueFrom(localDocQuery);
    if (!queryResult || queryResult.length === 0) {
      // HACK: no method to bulk update, so get ids for all rows and update sequentially
      const completionTrackingQuery = this.dynamicDataService.query$(
        "data_list",
        completionTrackingDataList
      );
      const completionTrackingData = await firstValueFrom(completionTrackingQuery);
      const completionTrackingRowIds = completionTrackingData.map((doc) => doc.id);
      for (const rowId of completionTrackingRowIds) {
        await this.dynamicDataService.update("data_list", completionTrackingDataList, rowId, {
          [`completed_${parentGroupId}`]: false,
        });
      }
    }
  }

  /**
   * Update local parent group data across multiple data lists to reflect incoming parentGroup data
   */
  private async updateLocalParentGroupData(
    parentGroupData: IParentGroup,
    parentGroupsDataList: string,
    parentsDataList: string
  ) {
    // Save data from parent group to respective data lists
    const { parents, ...parentGroup } = parentGroupData;

    for (const parent of parents) {
      await this.dynamicDataService.upsert("data_list", parentsDataList, {
        ...parent,
      });
    }

    await this.dynamicDataService.upsert("data_list", parentGroupsDataList, {
      ...parentGroup,
    });

    return parentGroupData.id;
  }

  /**
   * Set a property on a parent group in the local parent groups data list
   */
  private async setLocalParentGroupProperty<T>(
    parentGroupId: string,
    parentGroupsDataList: string,
    update: Partial<T>
  ) {
    await this.dynamicDataService.update("data_list", parentGroupsDataList, parentGroupId, {
      ...update,
    });
  }

  /**
   * When saving a shared parent group to local data that was created by another user,
   * modify the data to avoid conflicts with other local parent groups
   * */
  private hackTransformReadonlyParentGroupData(parentGroup: IParentGroup, sharedId: string) {
    // use the shared_id of the shared parent group as the parent group id AND the parent group "name" (effectively another ID)
    // (avoids conflicts with other local parent groups)
    parentGroup.id = sharedId;
    parentGroup.name = sharedId;

    // include the parent group id as the parents' group_id
    parentGroup.parents = parentGroup.parents.map((parent) => ({
      ...parent,
      group_id: sharedId,
    }));

    return parentGroup;
  }
}
