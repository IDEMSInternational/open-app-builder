import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Blob1Component } from './components/blobs/blob1/blob1.component';
import { BlobComponent } from './components/blobs/blob/blob.component';



@NgModule({
  declarations: [
    BlobComponent,
    Blob1Component
  ],
  imports: [
    CommonModule
  ],
  exports: [
    BlobComponent,
    Blob1Component
  ]
})
export class SharedModule { }
