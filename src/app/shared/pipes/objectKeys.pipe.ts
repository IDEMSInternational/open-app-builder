import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: "objectKeys",
})

/**
 * Simple pipe so that an object's keys can be passed to a component
 * @example
 * ```
 * const someObject = {a:{key:'someKey',value:1}, b:{key:'anotherKey',value:1}}
 * ```
 * ```
 * <div *ngFor="let key of someObject | objectKeys">
 *  <div>{{key}}</div>
 * </div>
 * ```
 */
export class ObjectKeysPipe implements PipeTransform {
  transform(value: { [key: string]: any }): string[] {
    return Object.keys(value);
  }
}
