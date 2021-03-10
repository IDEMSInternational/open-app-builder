import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { IonicModule } from "@ionic/angular";

import { RemindersPageRoutingModule } from "./reminders-page-routing.module";
import { RemindersPageComponent } from "./pages/reminders-page.component";

@NgModule({
  imports: [CommonModule, FormsModule, IonicModule, RemindersPageRoutingModule],
  declarations: [RemindersPageComponent],
})
export class RemindersModule {}
