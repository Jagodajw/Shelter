import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BreedAutocompleteComponent } from './breed-autocomplete.component';
import { AutocompleteModule } from '../autocomplete/autocomplete.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [BreedAutocompleteComponent],
  exports: [BreedAutocompleteComponent],
  imports: [CommonModule, AutocompleteModule, ReactiveFormsModule, FormsModule],
})
export class BreedAutocompleteModule {}
