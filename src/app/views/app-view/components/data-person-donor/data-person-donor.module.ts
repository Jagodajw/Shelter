import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { DataPersonDonorComponent } from './data-person-donor.component';
import { AutocompleteModule } from '../autocomplete/autocomplete.module';
import { ButtonFilterModule } from '../button-filter/button-filter.module';
import { MatTabsModule } from '@angular/material/tabs';

@NgModule({
  declarations: [DataPersonDonorComponent],
  exports: [DataPersonDonorComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    TranslateModule,
    MatAutocompleteModule,
    MatFormFieldModule,
    MatInputModule,
    AutocompleteModule,
    ButtonFilterModule,
    MatTabsModule,
  ],
})
export class DataPersonDonorModule {}