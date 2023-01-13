import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CityAutocompleteComponent } from './city-autocomplete.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AutocompleteModule } from '../autocomplete/autocomplete.module';

@NgModule({
  declarations: [CityAutocompleteComponent],
  exports: [CityAutocompleteComponent],
  imports: [CommonModule, FormsModule, ReactiveFormsModule, AutocompleteModule],
})
export class CityAutocompleteModule {}
