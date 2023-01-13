import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { AutocompleteModule } from '../autocomplete/autocomplete.module';
import { DataPickerModule } from '../../Views/pets/components/data-picker/data-picker.module';
import { DataPetOutComponent } from './data-pet-out.component';
import { SpeciesAutocompleteModule } from '../species-autocomplete/species-autocomplete.module';

@NgModule({
  declarations: [DataPetOutComponent],
  exports: [DataPetOutComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    TranslateModule,
    MatAutocompleteModule,
    MatSelectModule,
    MatFormFieldModule,
    MatInputModule,
    AutocompleteModule,
    DataPickerModule,
    SpeciesAutocompleteModule,
  ],
})
export class DataPetOutModule {}
