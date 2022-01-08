import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ContentReviewDebugPage } from "./pages/content-review-debug.page";
import { IonicModule } from "@ionic/angular";
import { FormsModule } from "@angular/forms";
import { ContentReviewRoutingModule } from "./content-review-routing.module";

@NgModule({
  imports: [CommonModule, IonicModule, FormsModule, ContentReviewRoutingModule],
  declarations: [ContentReviewDebugPage],
  exports: [],
})
export class ContentReviewModule {}
