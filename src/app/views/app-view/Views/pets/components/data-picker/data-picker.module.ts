import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { DataPickerComponent } from './data-picker.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { NativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';

@NgModule({
  declarations: [DataPickerComponent],
  exports: [DataPickerComponent],
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatDatepickerModule,
    NativeDateModule,
  ],
})
export class DataPickerModule {}
