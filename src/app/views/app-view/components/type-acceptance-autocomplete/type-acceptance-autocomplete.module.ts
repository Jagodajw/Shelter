import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TypeAcceptanceAutocompleteComponent } from './type-acceptance-autocomplete.component';
import { AutocompleteModule } from '../autocomplete/autocomplete.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [TypeAcceptanceAutocompleteComponent],
  exports: [TypeAcceptanceAutocompleteComponent],
  imports: [CommonModule, AutocompleteModule, FormsModule, ReactiveFormsModule],
})
export class TypeAcceptanceAutocompleteModule {}
