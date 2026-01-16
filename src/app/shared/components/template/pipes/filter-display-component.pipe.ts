import { Pipe, PipeTransform } from "@angular/core";
import { FlowTypes } from "data-models";
import { TEMPLATE_COMPONENT_MAPPING } from "../components";

/**
 * When rendering template components in for-loop not all components need to be rendered
 * (e.g. set_variable).
 * Filter out non-rendered components to improve overall performance
 * @example
 * ```
 * @for (row of rows | filterDisplayComponent; track row) {
 *   <plh-template [row]="row"></plh-template>
 * }
 * ```
 */

@Pipe({
  name: "filterDisplayComponent",
  standalone: false,
})
export class FilterDisplayComponentPipe implements PipeTransform {
  transform(value: FlowTypes.TemplateRow[] = []): FlowTypes.TemplateRow[] {
    const filtered = value.filter((v) => v.type && TEMPLATE_COMPONENT_MAPPING[v.type]);
    return filtered;
  }
}
