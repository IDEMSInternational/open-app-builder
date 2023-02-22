import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";

import { IonicModule } from "@ionic/angular";

import { AppUpdatePageRoutingModule } from "./app-update-routing.module";

import { AppUpdatePage } from "./app-update.page";
import { AppUpdateService } from "./services/app-update.service";

@NgModule({
  imports: [CommonModule, FormsModule, IonicModule, AppUpdatePageRoutingModule],
  declarations: [AppUpdatePage],
  providers: [AppUpdateService],
})
export class AppUpdateModule {}
