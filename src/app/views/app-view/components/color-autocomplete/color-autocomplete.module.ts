import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ColorAutocompleteComponent } from './color-autocomplete.component';
import { AutocompleteModule } from '../autocomplete/autocomplete.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [ColorAutocompleteComponent],
  exports: [ColorAutocompleteComponent],
  imports: [CommonModule, AutocompleteModule, ReactiveFormsModule, FormsModule],
})
export class ColorAutocompleteModule {}
