import { ComponentRef, createComponent, EnvironmentInjector, Type } from "@angular/core";
import { FlowTypes } from "packages/data-models";

export function createReactiveComponentRef<T>(
  componentType: Type<T>,
  injector: EnvironmentInjector,
  row: FlowTypes.TemplateRow,
  namespace: string
): ComponentRef<T> {
  const componentRef = createComponent(componentType, {
    environmentInjector: injector,
  });

  componentRef.setInput("row", row);
  componentRef.setInput("namespace", namespace);

  return componentRef;
}

export function destroyComponentRefs(componentRefs: ComponentRef<any>[]): void {
  componentRefs.forEach((ref) => ref.destroy());
  componentRefs.length = 0;
}
