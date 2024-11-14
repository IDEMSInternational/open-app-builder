import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { IonicModule } from "@ionic/angular";
import { StackComponent } from "./components/stack/stack.component";
import { TemplateComponentModule } from "../template/pages/component/component.module";
import { TemplateComponentsModule } from "../../shared/components/template/template.module";

@NgModule({
  declarations: [StackComponent],
  imports: [CommonModule, IonicModule, TemplateComponentModule, TemplateComponentsModule],
})
export class StackModule {}
