import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SpeciesAutocompleteComponent } from './species-autocomplete.component';
import { AutocompleteModule } from '../autocomplete/autocomplete.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [SpeciesAutocompleteComponent],
  exports: [SpeciesAutocompleteComponent],
  imports: [CommonModule, AutocompleteModule, FormsModule, ReactiveFormsModule],
})
export class SpeciesAutocompleteModule {}
