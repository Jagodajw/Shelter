import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AreaAutocompleteComponent } from './area-autocomplete.component';
import { AutocompleteModule } from '../autocomplete/autocomplete.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [AreaAutocompleteComponent],
  exports: [AreaAutocompleteComponent],
  imports: [CommonModule, AutocompleteModule, FormsModule, ReactiveFormsModule],
})
export class AreaAutocompleteModule {}
