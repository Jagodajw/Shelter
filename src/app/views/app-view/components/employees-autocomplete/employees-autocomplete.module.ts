import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmployeesAutocompleteComponent } from './employees-autocomplete.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AutocompleteModule } from '../autocomplete/autocomplete.module';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [EmployeesAutocompleteComponent],
  exports: [EmployeesAutocompleteComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    AutocompleteModule,
    TranslateModule,
  ],
})
export class EmployeesAutocompleteModule {}
