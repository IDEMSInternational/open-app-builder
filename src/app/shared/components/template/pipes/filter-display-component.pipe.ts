import { Pipe, PipeTransform } from "@angular/core";
import { FlowTypes } from "data-models";
import { TEMPLATE_COMPONENT_MAPPING } from "../components";

/**
 * When rendering template components in ngFor not all components need to be rendered
 * (e.g. set_variable).
 * Filter out non-rendered components to improve overall performance
 * @example
 * ```
 * <plh-template *ngFor="let row of rows | filterDisplayComponent" [row]="row"></plh-template>
 * ```
 */

@Pipe({ name: "filterDisplayComponent" })
export class FilterDisplayComponentPipe implements PipeTransform {
  transform(value: FlowTypes.TemplateRow[] = []): FlowTypes.TemplateRow[] {
    const filtered = value.filter((v) => v.type && TEMPLATE_COMPONENT_MAPPING[v.type]);
    return filtered;
  }
}
