import { Injectable } from "@angular/core";
import { TemplateActionRegistry } from "src/app/shared/components/template/services/instance/template-action.registry";
import { VariableStore } from "../stores/variable-store";
import { SettingsService } from "src/app/shared/services/settings.service";
import { TemplateNavService } from "src/app/shared/components/template/services/template-nav.service";
import { AnalyticsService } from "src/app/shared/services/analytics";

/*
 * Temporary holding place for existing actions.
/**
 * CoreActionsService acts as a temporary registry for core template actions.
 * 
 * This service provides a centralized location for registering and handling
 * actions used by reactive templates. It is intended as a transitional solution
 * while actions are being migrated or refactored. In the future, actions may be
 * relocated to more appropriate modules or services as the codebase evolves.
 *
 * @remarks
 * Provided in the root injector; instantiated once for the application lifecycle.
 */
@Injectable({
  providedIn: "root",
})
export class CoreActionsService {
  constructor(
    private templateActionRegistry: TemplateActionRegistry,
    private settingsService: SettingsService,
    private variableStore: VariableStore,
    private templateNavService: TemplateNavService,
    private analyticsService: AnalyticsService
  ) {
    this.registerHandlers();
  }

  private registerHandlers() {
    this.templateActionRegistry.register({
      reset_app: async () => {
        this.settingsService.resetApp();
      },
      set_local: async (action) => {
        const [key, value] = action.args;

        this.variableStore.set(key, value);
      },
      set_self: async (action) => {
        const [key, value] = action.args;

        this.variableStore.set(key, value);
      },
      go_to: async (action) => {
        return this.templateNavService.handleNavAction(action);
      },
      go_to_url: async (action) => {
        let [key, value] = action.args;

        // because a normal url starts with https://, the ':' separates it into a key and a value and the value
        // is sufficient for the url to launch.
        console.log("[GO TO URL]", { key, value });
        // if there is no http or https then there is no : to separate and we only have a key in the url. This
        // case then adds '//' to the key so it recognises it as external and not local
        // This removes the need to have http or https in the url.
        if (!value) {
          value = "//" + key;
        }
        return this.templateNavService.handleNavActionExternal(value);
      },
      pop_up: async (action) => {
        // todo: Implement with reactive templates
        throw new Error("Not Implemented");
      },
      track_event: async (action) => {
        const [key] = action.args;

        this.analyticsService.trackEvent(key);
      },
      trigger_actions: async (action) => {
        // todo: implement this?
        throw new Error("Not Implemented");
      },
      emit: async (action) => {
        // todo: Find out what this is and then implement it using reactive templates.

        throw new Error("Not Implemented");
      },
    });
  }
}
