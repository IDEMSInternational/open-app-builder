export function getAccordionMultiple(
  parameterList: Record<string, string> | undefined,
  multiple: boolean,
  openMultiple: boolean
): boolean {
  return Object.prototype.hasOwnProperty.call(parameterList ?? {}, "open_multiple")
    ? openMultiple
    : multiple;
}
