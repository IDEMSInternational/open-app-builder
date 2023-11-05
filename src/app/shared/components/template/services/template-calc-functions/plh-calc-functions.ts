import { IFunctionHashmap } from "packages/shared/src";

/**
 * Temporary functions used for plh sheets
 * Eventually this will be migrated to read from data_list instead (once able to define functions within list)
 */
export const PLH_CALC_FUNCTIONS: IFunctionHashmap = {
  /**
   * Add a new family to the list of all families
   * Family members are identified uniquely by string id, avoiding duplication if already exists
   * @param families Array of all families, e.g. [['Ada','Blaise'],['Charles']]
   * @param members List of members to add to family, e.g. ['Daniel','Eva']
   * @returns Combined list [['Ada','Blaise'],['Charles'],['Daniel','Eva']]
   */
  plh_add_family: (families: any, ...members: string[]) => {
    // Handle case where families is passed as a string representation (assumed to be of string[][])
    if (typeof families === "string") {
      try {
        families = JSON.parse(families) as string[][];
      } catch (error) {
        console.warn(
          "Skip adding family - 'families' input string is not a valid array representation:",
          families
        );
      }
    }
    // Generate a list of all unique family members to ensure duplicates not added
    const memberList: string[] = [].concat.apply([], families);
    if (members.find((member) => memberList.includes(member))) {
      console.warn("Skip adding family as member already exists");
      return families;
    }
    // Combine all listed members into a family and push to list
    const memberArray = ([] as string[]).concat(members);
    families.push(memberArray);
    return families;
  },

  /**
   * Take a list of all families and merge members of two families together, identified
   * by a unique member within each familiy
   * @param families Array of all families
   * @param sourceMemberRef Unique id of source family member, to merge with target
   * @param targetMemberRef Unique id of target family member, to merge with source
   * @returns List of all families including merged entry
   * @example
   * ```ts
   * const families = [["Ada", "Blaise"], ["Charles"], ["Daniel", "Eva"]]
   * plh_merge_families(families, "Charles", "Ada")
   * // Returns
   * [["Ada", "Blaise", "Charles"],["Daniel", "Eva"]]
   * ```
   */
  plh_merge_families: (families: string[][], sourceMemberRef: string, targetMemberRef: string) => {
    // Handle case where families is passed as a string representation (assumed to be of string[][])
    if (typeof families === "string") {
      try {
        families = JSON.parse(families) as string[][];
      } catch (error) {
        console.warn(
          "Skip merging families - 'families' input string is not a valid array representation:",
          families
        );
      }
    }
    let sourceFamily: string[] = [];
    let targetFamily: string[] = [];
    let sourceIndex = -1;
    let targetIndex = -1;
    // extract families to be combined
    const extracted = families.filter((members, i) => {
      if (members.includes(sourceMemberRef)) {
        sourceFamily = members;
        sourceIndex = i;
        return false;
      }
      if (members.includes(targetMemberRef)) {
        targetFamily = members;
        targetIndex = i;
        return false;
      }
      return true;
    });
    if (sourceFamily.length > 0 && targetFamily.length > 0) {
      // combine families and reinsert back into array
      // use target index, adjusting in case where target removed from array ahead of source
      if (targetIndex < sourceIndex) targetIndex--;
      const mergedFamily = ([] as string[]).concat(targetFamily, sourceFamily);
      extracted.splice(targetIndex, 0, mergedFamily);
      return extracted;
    } else {
      console.warn("Skip merging families", sourceFamily, targetFamily);
      return families;
    }
  },

  /**
   * Remove a member from a family. If removing the member leaves a family
   * empty then the family is also removed
   * @param families
   * @param sourceMemberRef
   * @returns
   */
  plh_remove_family_member: (families: string[][], sourceMemberRef: string) => {
    // Handle case where families is passed as a string representation (assumed to be of string[][])
    if (typeof families === "string") {
      try {
        families = JSON.parse(families) as string[][];
      } catch (error) {
        console.warn(
          "Skip removing family member - 'families' input string is not a valid array representation:",
          families
        );
      }
    }
    return families
      .map((members) => members.filter((member) => member !== sourceMemberRef))
      .filter((members) => members.length > 0);
  },
};
