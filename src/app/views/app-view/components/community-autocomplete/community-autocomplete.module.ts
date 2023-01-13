import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CommunityAutocompleteComponent } from './community-autocomplete.component';
import { AutocompleteModule } from '../autocomplete/autocomplete.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [CommunityAutocompleteComponent],
  exports: [CommunityAutocompleteComponent],
  imports: [CommonModule, AutocompleteModule, ReactiveFormsModule, FormsModule],
})
export class CommunityAutocompleteModule {}
