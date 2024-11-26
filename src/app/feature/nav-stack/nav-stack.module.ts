import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { IonicModule } from "@ionic/angular";
import { NavStackComponent } from "./components/nav-stack/nav-stack.component";
import { TemplateComponentModule } from "../template/pages/component/component.module";
import { TemplateComponentsModule } from "../../shared/components/template/template.module";

@NgModule({
  declarations: [NavStackComponent],
  imports: [CommonModule, IonicModule, TemplateComponentModule, TemplateComponentsModule],
})
export class NavStackModule {}
