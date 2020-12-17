import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DueDatePipe } from './due-date.pipe';



@NgModule({
  declarations: [
    DueDatePipe
  ],
  imports: [
    CommonModule
  ],
  exports: [
    DueDatePipe
  ]
})
export class PipesModule { }
