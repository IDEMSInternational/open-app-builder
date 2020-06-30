import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Blob1Component } from './components/blob1/blob1.component';



@NgModule({
  declarations: [
    Blob1Component
  ],
  imports: [
    CommonModule
  ],
  exports: [
    Blob1Component
  ]
})
export class SharedModule { }
