import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ExistingCommentsComponent } from "./components/existing-comments/existing-comments.component";
import { IonicModule } from "@ionic/angular";
import { FormsModule } from "@angular/forms";
import { ContentReviewRoutingModule } from "./content-review-routing.module";

@NgModule({
  imports: [CommonModule, IonicModule, FormsModule, ContentReviewRoutingModule],
  declarations: [ExistingCommentsComponent],
  exports: [],
})
export class ContentReviewModule {}
