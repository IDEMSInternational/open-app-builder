import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { IonicModule } from "@ionic/angular";

import { ModuleFocusSkin } from "./module-focus.skin";
// components
import { HabitTrackerComponent } from "./components/habit-tracker";
import { ModuleSelectCircleComponent } from "./components/module-select-circle";
import { SlideLeftPanelComponent } from "./components/slide-left-panel";
import { SlideUpPanelComponent } from "./components/slide-up-panel";
import { ThingsToDoListComponent } from "./components/things-to-do-list";
import { ModulePageFlowComponentsModule } from "../../flow-components/flow-component";

const components = [
  HabitTrackerComponent,
  ModuleSelectCircleComponent,
  SlideLeftPanelComponent,
  SlideUpPanelComponent,
  ThingsToDoListComponent,
];

@NgModule({
  imports: [CommonModule, FormsModule, IonicModule, ModulePageFlowComponentsModule],
  exports: [ModuleFocusSkin],
  declarations: [ModuleFocusSkin, ...components],
})
export class ModuleFocusSkinModule {}
