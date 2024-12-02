import { Injectable, Injector } from "@angular/core";
import { FlowTypes } from "data-models";
import { AppDataService } from "src/app/shared/services/data/app-data.service";
import { getGlobalService } from "src/app/shared/services/global.service";
import { SyncServiceBase } from "src/app/shared/services/syncService.base";
import { TemplateContainerComponent } from "../../template-container.component";
import { TemplateNavService } from "../template-nav.service";
import { TemplateService } from "../template.service";
import { CampaignService } from "src/app/feature/campaign/campaign.service";

/**
 * The template process service is a slightly hacky wrapper around the template container component so that
 * we can process templates programatically (i.e. without rendering a template component)
 *
 * TODO - Ideally all core processing lobic should move into the template process service and the container
 * component extending it (instead of vice-versa)
 */
@Injectable({ providedIn: "root" })
export class TemplateProcessService extends SyncServiceBase {
  container: TemplateContainerComponent;
  constructor(private injector: Injector) {
    super("TemplateProcess");
    /**
     * Avoid initialisation logic and prefer to ensure services ready
     * on demand to avoid cyclic issues
     * Instead services are checked before public method calls
     * */
  }

  private get templateService() {
    return getGlobalService(this.injector, TemplateService);
  }
  private get templateNavService() {
    return getGlobalService(this.injector, TemplateNavService);
  }
  private get appDataService() {
    return getGlobalService(this.injector, AppDataService);
  }
  private get campaignService() {
    return getGlobalService(this.injector, CampaignService);
  }

  /** Ensure services are intialised before being called from public methods  */
  private async ensurePublicMethodServices() {
    await this.ensureAsyncServicesReady([]); // currently all child deps synchronous
    this.ensureSyncServicesReady([
      this.templateNavService,
      this.appDataService,
      this.templateService,
    ]);
  }

  public async processTemplateWithoutRender(template: FlowTypes.Template) {
    console.log("[Template Process]", template.flow_name);
    this.ensurePublicMethodServices();
    // Create mock template container component
    this.container = new TemplateContainerComponent(
      this.templateService,
      this.templateNavService,
      this.injector,
      undefined,
      undefined,
      true
    );
    // this.container.name = this.container.name || this.templatename;
    // this.templateBreadcrumbs = [...(this.parent?.templateBreadcrumbs || []), this.name];
    this.container.template = template;
    // reset any existing templateRowMap data
    this.container.templateRowService.templateRowMap = {};
    // process the template as if it were rendered
    // TODO - should filter out template rows to only include those used programatically (e.g. set_variable, set_field etc.)
    await this.container.templateRowService.processContainerTemplateRows();
  }

  public async initialiseStartupTemplates() {
    console.log("[Startup Templates]");
    await this.ensurePublicMethodServices();
    const startupTemplates = await this.appDataService.getSheetsWithData<FlowTypes.Template>(
      "template",
      (t) => (t.process_on_start ? true : false)
    );
    const sortedTempaltes = startupTemplates.sort(
      (a, b) => a.process_on_start - b.process_on_start
    );
    for (const template of sortedTempaltes) {
      // create a deep clone of the object to prevent accidental reference changes
      // assign a name (in case top-level template) and store breadcrumb path for nested
      // (NOTE - would no longer be required if reading in json objects instead of ts import)
      const templateCopy = JSON.parse(JSON.stringify(template));
      await this.processTemplateWithoutRender(templateCopy);
    }
    this.hackReinitialiseCampaignService();
  }

  /** Campaign notifications may have changed based on startup templates,
   * so reinitialise after processing to schedule up-to-date notifications
   */
  private hackReinitialiseCampaignService() {
    setTimeout(() => this.campaignService.reInitialise(), 5000);
  }
}
