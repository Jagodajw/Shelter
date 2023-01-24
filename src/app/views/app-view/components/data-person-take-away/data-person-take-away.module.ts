import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { AutocompleteModule } from '../autocomplete/autocomplete.module';
import { ButtonFilterModule } from '../button-filter/button-filter.module';
import { MatTabsModule } from '@angular/material/tabs';
import { DataPersonTakeAwayComponent } from './data-person-take-away.component';
import { CityAutocompleteModule } from '../city-autocomplete/city-autocomplete.module';
import { ProvinceAutocompleteModule } from '../province-autocomplete/province-autocomplete.module';
import { CommunityAutocompleteModule } from '../community-autocomplete/community-autocomplete.module';

@NgModule({
  declarations: [DataPersonTakeAwayComponent],
  exports: [DataPersonTakeAwayComponent],
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
    CityAutocompleteModule,
    ProvinceAutocompleteModule,
    CommunityAutocompleteModule,
  ],
})
export class DataPersonTakeAwayModule {}
