import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import {
  MdToolbarModule,
  MdIconModule,
  MdButtonModule,
  MdMenuModule,
  MdInputModule,
  MdCardModule,
  MdListModule,
  MdProgressBarModule
} from '@angular/material';

@NgModule({
  imports: [],
  exports: [
    MdToolbarModule,
    MdIconModule,
    MdButtonModule,
    MdMenuModule,
    MdInputModule,
    MdCardModule,
    MdListModule,
    MdProgressBarModule,
    CommonModule,
    ReactiveFormsModule,
  ]
})
export class SharedModule {}
