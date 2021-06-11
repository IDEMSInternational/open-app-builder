import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ExistingCommentsComponent } from "./components/existing-comments/existing-comments.component";
import { IonicModule } from "@ionic/angular";
import { ContextMenuComponent } from "./components/context-menu/context-menu.component";
import { ReviewingComponent } from "./components/reviewing.component";
import { SuggestFormComponent } from "./components/suggest-form/suggest-form.component";

@NgModule({
  imports: [CommonModule, IonicModule],
  declarations: [
    ExistingCommentsComponent,
    SuggestFormComponent,
    ContextMenuComponent,
    ReviewingComponent,
  ],
  exports: [ReviewingComponent],
})
export class ReviewingModule {}
