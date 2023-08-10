import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FeedbackDebugPage } from "./pages/feedback-debug.page";
import { IonicModule } from "@ionic/angular";
import { FormsModule } from "@angular/forms";
import { FeedbackRoutingModule } from "./feedback-routing.module";
import { TemplateComponentsModule } from "src/app/shared/components/template/template.module";
import { FeedbackComponentsModule } from "./components";

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    FormsModule,
    FeedbackRoutingModule,
    TemplateComponentsModule,
    FeedbackComponentsModule,
  ],
  declarations: [FeedbackDebugPage],
  exports: [],
})
export class FeedbackModule {}
