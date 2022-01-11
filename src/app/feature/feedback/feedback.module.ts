import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FeedbackDebugPage } from "./pages/feedback-debug.page";
import { IonicModule } from "@ionic/angular";
import { FormsModule } from "@angular/forms";
import { FeedbackRoutingModule } from "./feedback-routing.module";
import { FeedbackActionsService } from "./feedback.actions";
import { TemplateComponentsModule } from "src/app/shared/components/template/template.module";

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    FormsModule,
    FeedbackRoutingModule,
    TemplateComponentsModule,
  ],
  declarations: [FeedbackDebugPage],
  exports: [],
})
export class FeedbackModule {
  constructor(feedbackActions: FeedbackActionsService) {
    //  register events via constructor when module imported
  }
}
