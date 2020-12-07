import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { IonicModule } from "@ionic/angular";

// components
import { HabitTrackerComponent } from "./components/habit-tracker";
import { ModuleSelectCircleComponent } from "./components/module-select-circle/module-select-circle.component";
import { SlidePanelRightComponent } from "./components/slide-panel-right";
import { SlidePanelBottomComponent } from "./components/slide-panel-bottom";
import { ThingsToDoListComponent } from "./components/things-to-do-list";
import { RouterModule } from "@angular/router";
import { ModuleFocusSkin } from "./module-focus.skin";

const components = [
  HabitTrackerComponent,
  ModuleSelectCircleComponent,
  SlidePanelRightComponent,
  SlidePanelBottomComponent,
  ThingsToDoListComponent,
];

@NgModule({
  imports: [CommonModule, FormsModule, IonicModule, RouterModule],
  exports: [ModuleFocusSkin],
  declarations: [ModuleFocusSkin, ...components],
})
export class ModuleFocusSkinModule {}
