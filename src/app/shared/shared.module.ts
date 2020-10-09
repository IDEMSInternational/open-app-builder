import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { Blob1Component } from "./components/blobs/blob1/blob1.component";
import { BlobComponent } from "./components/blobs/blob/blob.component";
import { ReflectAnimationComponent } from "./components/reflect-animation/reflect-animation.component";
import { IonicModule } from "@ionic/angular";
import { StressedMultiHandAnimComponent } from "./components/stressed-multi-hand-anim/stressed-multi-hand-anim.component";
import { PLHMainHeaderComponent } from "./components/plh-main-header";

@NgModule({
  declarations: [
    BlobComponent,
    Blob1Component,
    ReflectAnimationComponent,
    StressedMultiHandAnimComponent,
    PLHMainHeaderComponent,
  ],
  imports: [CommonModule, IonicModule],
  exports: [
    BlobComponent,
    Blob1Component,
    ReflectAnimationComponent,
    StressedMultiHandAnimComponent,
    PLHMainHeaderComponent,
  ],
})
export class SharedModule {}
