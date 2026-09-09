import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { TemplateActionRegistry } from "src/app/shared/components/template/services/instance/template-action.registry";
import { PlhCertificateService } from "./plh-certificate.service";
import { PlhCertificateActionFactory } from "./plh-certificate.actions";

@NgModule({
  imports: [CommonModule],
})
export class PlhCertificateModule {
  constructor(
    templateActionRegistry: TemplateActionRegistry,
    plhCertificateService: PlhCertificateService
  ) {
    const { plh_certificate } = new PlhCertificateActionFactory(plhCertificateService);
    templateActionRegistry.register({ plh_certificate });
  }
}
