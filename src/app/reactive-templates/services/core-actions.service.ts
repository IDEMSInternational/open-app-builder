import { Injectable } from "@angular/core";
import { TemplateActionRegistry } from "src/app/shared/components/template/services/instance/template-action.registry";
import { SettingsService } from "src/app/shared/services/settings.service";
import { TemplateNavService } from "src/app/shared/components/template/services/template-nav.service";
import { AnalyticsService } from "src/app/shared/services/analytics";
import { RowRegistry } from "./row.registry";
import { FlowTypes } from "src/app/shared/components/template/models";

class ActionNotImplementedError extends Error {
  constructor(action: string) {
    super(`Action not implemented: ${action}`);
  }
}

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
    private templateNavService: TemplateNavService,
    private analyticsService: AnalyticsService,
    private templateRegistry: RowRegistry
  ) {
    this.registerHandlers();
  }

  private registerHandlers() {
    this.templateActionRegistry.register({
      reset_app: async () => {
        this.settingsService.resetApp();
      },
      set_local: async (action) => {
        this.setVariable(action);
      },
      set_self: async (action) => {
        this.setVariable(action);
      },
      pop_up: async (action) => {
        // todo: Implement with reactive templates
        throw new ActionNotImplementedError("pop_up");
      },
      track_event: async (action) => {
        const [key] = action.args;

        this.analyticsService.trackEvent(key);
      },
      trigger_actions: async (action) => {
        // todo: implement this?
        throw new ActionNotImplementedError("trigger_actions");
      },
      emit: async (action) => {
        // todo: Find out what this is and then implement it using reactive templates.

        throw new ActionNotImplementedError("emit");
      },
    });
  }

  private setVariable(action: FlowTypes.TemplateRowAction<any>) {
    const [key, value] = action.args;
    const expression = action.rawArgs[1];
    const row = this.templateRegistry.get(key);

    if (!row) {
      console.warn(`set_local: no row found with name '${key}'`);
      return;
    }

    row.setExpression(expression);
  }
}
