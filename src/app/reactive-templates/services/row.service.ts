import { FlowTypes } from "packages/data-models/flowTypes";
import { VariableStore } from "../stores/variable-store";
import { Injectable } from "@angular/core";
import { NamespaceService } from "./namespace.service";
import { Subscription } from "rxjs";

@Injectable({ providedIn: "root" })
export class RowService {
  constructor(
    private variableStore: VariableStore,
    private namespaceService: NamespaceService
  ) {}

  // todo: we could amend the template parsing to make this friendlier
  public getDependencies(row: FlowTypes.TemplateRow, type: string, namespace: string): string[] {
    const dynamicDependencies = row._dynamicDependencies;
    if (!dynamicDependencies) return [];

    return Object.keys(dynamicDependencies)
      .filter((reference) => reference.includes(`@${type}.`))
      .map((reference) => {
        const name = reference
          .replace(`@${type}.`, "")
          .replace("parameter_list.", "")
          .replace(/[#!&|,]/g, ""); // Strip out # ! & |

        return this.namespaceService.getFullName(namespace, name);
      });
  }

  public watchDependencies(
    row: FlowTypes.TemplateRow,
    type: string,
    namespace: string,
    fn: (dependencyName) => void
  ): Subscription[] {
    return this.getDependencies(row, type, namespace).map((name) =>
      this.variableStore.watch(name).subscribe(() => fn(name))
    );
  }
}
