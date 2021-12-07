import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { IonicModule } from "@ionic/angular";
import { PLHMainHeaderComponent } from "./components/plh-main-header";
import { PLHMainTabsComponent } from "./components/plh-main-tabs";
import { RouterModule } from "@angular/router";
import { TemplateComponentsModule } from "./components/template/template.module";
import { ReactiveFormsModule } from "@angular/forms";
import { PLHDebugToggleComponent } from "./components/debug-toggle";

const Components = [PLHMainHeaderComponent, PLHMainTabsComponent, PLHDebugToggleComponent];

@NgModule({
  declarations: [Components],
  imports: [CommonModule, IonicModule, RouterModule, TemplateComponentsModule, ReactiveFormsModule],
  exports: Components,
})
export class SharedModule {}
