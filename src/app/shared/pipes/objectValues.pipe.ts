import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: "objectValues",
})

/**
 * Simple pipe so that an object's values can be passed to a component
 * @example
 * ```
 * const someObject = {a:{key:'someKey',value:1}, b:{key:'anotherKey',value:1}}
 * ```
 * ```
 * <div *ngFor="let item of someObject | objectValues">
 *  <div>{{key: item.key}}</div>
 *  <div>{{value: item.value}}</div>
 * </div>
 * ```
 */
export class ObjectValuesPipe implements PipeTransform {
  transform<T>(value: { [key: string]: T }): any {
    return Object.values(value) as T[];
  }
}
