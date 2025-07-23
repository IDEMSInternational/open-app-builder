// Parent in local data. May have data merged from RapidPro
export interface IParent {
  group_id: string;
  id: string;
  first_name?: string;
  last_name?: string;
  number?: string;
  age?: string;
  sex?: string;
  child_name?: string;
  child_age?: string;
  child_sex?: string;
  relationship?: string;
  members?: string;
  childcare?: string;
  goal?: string;
  other?: string;
  consoltation?: string;
  archived?: boolean;
  // Allow for fields added from RapidPro, which will be prefixed with `rp_`
  [key: string]: any;
  rapidpro_uuid?: string;
}

// Parent from RapidPro added directly to shared data
export interface IParentFromRapidPro {
  rapidpro_uuid: string;
  rapidpro_fields: any;
}

// Parent in shared data. May have been pushed from local data, or added directly from RapidPro, or merged from both
export type IParentInSharedData = IParent | IParentFromRapidPro | (IParent & IParentFromRapidPro);
