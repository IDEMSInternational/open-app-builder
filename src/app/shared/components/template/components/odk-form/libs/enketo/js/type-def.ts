export type ExternalInstance = {
  id: string;
  src: string;
  xml: string | Document;
};
export type FormDataObj = {
  /**
   * -  XML Model as string
   */
  modelStr: string;
  /**
   * - (partial) XML instance to load
   */
  instanceStr?: string | undefined;
  /**
   * - Flag to indicate whether data was submitted before
   */
  submitted?: boolean | undefined;
  /**
   * - Array of external data objects, required for each external data instance in the XForm
   */
  external?: (ExternalInstance | null | undefined)[] | undefined;
  /**
   * - ID of external instance
   */
  id?: string | undefined;
  /**
   * - XML string of external instance content
   */
  xmlStr?: string | undefined;
};
export type UpdatedDataNodes = any;
export type jQuery = object;
