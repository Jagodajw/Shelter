import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { NativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { DatePickerRangeComponent } from './date-picker-range.component';
import { MatIconModule } from '@angular/material/icon';
import { ButtonModule } from 'src/app/views/app-view/components/button/button.module';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  declarations: [DatePickerRangeComponent],
  exports: [DatePickerRangeComponent],
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatDatepickerModule,
    NativeDateModule,
    TranslateModule,
    ReactiveFormsModule,
    FormsModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule
  ],
})
export class DatePickerRangeModule {}
