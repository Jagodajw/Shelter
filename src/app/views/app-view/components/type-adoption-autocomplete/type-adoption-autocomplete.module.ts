import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TypeAdoptionAutocompleteComponent } from './type-adoption-autocomplete.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AutocompleteModule } from '../autocomplete/autocomplete.module';

@NgModule({
  declarations: [TypeAdoptionAutocompleteComponent],
  exports: [TypeAdoptionAutocompleteComponent],
  imports: [CommonModule, AutocompleteModule, FormsModule, ReactiveFormsModule],
})
export class TypeAdoptionAutocompleteModule {}
