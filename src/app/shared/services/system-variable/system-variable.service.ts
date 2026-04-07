import { inject, Injectable } from "@angular/core";
import { VariableStore } from "src/app/reactive-templates/stores/variable-store";
import { LocalStorageService } from "../local-storage/local-storage.service";
import { DeploymentService } from "../deployment/deployment.service";
import { IProtectedFieldName } from "packages/data-models";

/**
 * Service for managing system variables, which are global variables that can be used across the app and are exposed as readonly values to authoring.
 * Implementation is different depending on the deployment configuration useReactiveTemplates:
 * If false: local storage to manage these variables; authors can reference using `@fields._my_protected_field` syntax
 * If true: service uses a reactive store, authors can reference using `@system.my_system_var` syntax
 * System variables are variables that are set in the app (not by authors) and can be used in templates.
 */
@Injectable({
  providedIn: "root",
})
export class SystemVariableService {
  private variableStore = inject(VariableStore);
  private localStorageService = inject(LocalStorageService);
  private deploymentService = inject(DeploymentService);

  private useReactiveTemplates = this.deploymentService.config.useReactiveTemplates ?? false;

  public set(name: IProtectedFieldName, value: string) {
    if (this.useReactiveTemplates) {
      this.variableStore.set({ type: "system", name }, value);
    } else {
      this.localStorageService.setProtected(name, value);
    }
  }

  public get(name: IProtectedFieldName): string {
    if (this.useReactiveTemplates) {
      return this.variableStore.get({ type: "system", name });
    } else {
      return this.localStorageService.getProtected(name);
    }
  }

  public remove(name: IProtectedFieldName) {
    if (this.useReactiveTemplates) {
      this.variableStore.set({ type: "system", name }, undefined);
    } else {
      this.localStorageService.removeProtected(name);
    }
  }
}
