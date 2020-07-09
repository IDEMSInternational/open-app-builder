import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Blob1Component } from './components/blobs/blob1/blob1.component';
import { BlobComponent } from './components/blobs/blob/blob.component';
import { ReflectAnimationComponent } from './components/reflect-animation/reflect-animation.component';
import { IonicModule } from '@ionic/angular';



@NgModule({
  declarations: [
    BlobComponent,
    Blob1Component,
    ReflectAnimationComponent
  ],
  imports: [
    CommonModule,
    IonicModule
  ],
  exports: [
    BlobComponent,
    Blob1Component,
    ReflectAnimationComponent
  ]
})
export class SharedModule { }
