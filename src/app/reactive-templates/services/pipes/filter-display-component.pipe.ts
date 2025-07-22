import { Pipe, PipeTransform } from "@angular/core";
import { FlowTypes } from "data-models";
import { REACTIVE_COMPONENT_MAP } from "../../reactive-components/components";

/**
 * When rendering template components in ngFor not all components need to be rendered
 * (e.g. set_variable).
 * Filter out non-rendered components to improve overall performance
 * @example
 * ```
 * @for (row of rows() | filterDisplayComponent; track row.name) {
 *   <ng-container *ngComponentOutlet="getComponent(row); inputs: { row }" />
 * }
 * ```
 */

@Pipe({ name: "filterDisplayComponent", standalone: true })
export class FilterDisplayComponentPipe implements PipeTransform {
  transform(value: FlowTypes.TemplateRow[] = []): FlowTypes.TemplateRow[] {
    const filtered = value.filter((v) => v.type && REACTIVE_COMPONENT_MAP[v.type]);
    return filtered;
  }
}
