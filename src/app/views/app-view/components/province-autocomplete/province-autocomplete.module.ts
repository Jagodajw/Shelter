import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProvinceAutocompleteComponent } from './province-autocomplete.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AutocompleteModule } from '../autocomplete/autocomplete.module';

@NgModule({
  declarations: [ProvinceAutocompleteComponent],
  exports: [ProvinceAutocompleteComponent],
  imports: [CommonModule, ReactiveFormsModule, FormsModule, AutocompleteModule],
})
export class ProvinceAutocompleteModule {}
