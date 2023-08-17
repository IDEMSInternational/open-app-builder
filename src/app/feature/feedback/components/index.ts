import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { IonicModule } from "@ionic/angular";

import { FeedbackToolbarComponent } from "./feedback-toolbar/feedback-toolbar.component";

@NgModule({
  imports: [CommonModule, FormsModule, IonicModule],
  exports: [FeedbackToolbarComponent],
  declarations: [FeedbackToolbarComponent],
  providers: [],
})
export class FeedbackComponentsModule {}
