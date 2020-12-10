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
import { HabitAddComponent } from "./components/habit-add";
import { GoalsPageModule } from 'src/app/feature/goals/goals.module';

const components = [
  HabitTrackerComponent,
  HabitAddComponent,
  ModuleSelectCircleComponent,
  SlidePanelRightComponent,
  SlidePanelBottomComponent,
  ThingsToDoListComponent,
];

@NgModule({
  imports: [CommonModule, FormsModule, IonicModule, RouterModule, GoalsPageModule],
  exports: [ModuleFocusSkin],
  declarations: [ModuleFocusSkin, ...components],
})
export class ModuleFocusSkinModule {}
