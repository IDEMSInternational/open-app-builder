import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { AppUpdateService } from "./app-update.service";
import { AppUpdateComponent } from "./app-update.component";

@NgModule({
  declarations: [AppUpdateComponent],
  imports: [CommonModule],
  providers: [AppUpdateService],
})
export class AppUpdateModule {}
