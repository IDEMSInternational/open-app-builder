import { Injectable, Injector } from "@angular/core";
import { FlowTypes } from "data-models";
import { TEMPLATE } from "src/app/shared/services/data/data.service";
import { TemplateContainerComponent } from "../template-container.component";
import { TemplateNavService } from "./template-nav.service";
import { TemplateService } from "./template.service";

/**
 * The template process service is a slightly hacky wrapper around the template container component so that
 * we can process templates programatically (i.e. without rendering a template component)
 *
 * TODO - Ideally all core processing lobic should move into the template process service and the container
 * component extending it (instead of vice-versa)
 */
@Injectable({ providedIn: "root" })
export class TemplateProcessService {
  container: TemplateContainerComponent;
  constructor(
    templateService: TemplateService,
    templateNavService: TemplateNavService,
    injector: Injector
  ) {
    // Create mock template container component
    this.container = new TemplateContainerComponent(templateService, templateNavService, injector);
  }

  public async init() {
    await this.initialiseStartupTemplates();
  }

  public async processTemplateWithoutRender(template: FlowTypes.Template) {
    console.log("[Template Process]", template.flow_name);
    // this.container.name = this.container.name || this.templatename;
    // this.templateBreadcrumbs = [...(this.parent?.templateBreadcrumbs || []), this.name];
    this.container.template = template;
    // reset any existing templateRowMap data
    this.container.templateRowService.templateRowMap = {};
    // process the template as if it were rendered
    // TODO - should filter out template rows to only include those used programatically (e.g. set_variable, set_field etc.)
    await this.container.templateRowService.processContainerTemplateRows();
  }

  private async initialiseStartupTemplates() {
    const startupTemplates = TEMPLATE.filter((t) => t.process_on_start).sort(
      (a, b) => a.process_on_start - b.process_on_start
    );
    for (const template of startupTemplates) {
      // create a deep clone of the object to prevent accidental reference changes
      // assign a name (in case top-level template) and store breadcrumb path for nested
      // (NOTE - would no longer be required if reading in json objects instead of ts import)
      const templateCopy = JSON.parse(JSON.stringify(template));
      await this.processTemplateWithoutRender(templateCopy);
    }
  }
}
