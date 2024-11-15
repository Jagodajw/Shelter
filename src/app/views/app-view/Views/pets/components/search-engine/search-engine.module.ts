import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AutocompleteModule } from 'src/app/views/app-view/components/autocomplete/autocomplete.module';
import { SearchEngineComponent } from './search-engine.component';
import { SelectModule } from 'src/app/views/app-view/components/select/select.module';
import { SearchModule } from 'src/app/views/app-view/components/search/search.module';
import { DataPickerModule } from '../data-picker/data-picker.module';
import { MatBadgeModule } from '@angular/material/badge';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { TranslateModule } from '@ngx-translate/core';
import { AreaAutocompleteModule } from 'src/app/views/app-view/components/area-autocomplete/area-autocomplete.module';
import { SpeciesAutocompleteModule } from 'src/app/views/app-view/components/species-autocomplete/species-autocomplete.module';
import { CommunityAutocompleteModule } from 'src/app/views/app-view/components/community-autocomplete/community-autocomplete.module';
import { BreedAutocompleteModule } from 'src/app/views/app-view/components/breed-autocomplete/breed-autocomplete.module';
import { ColorAutocompleteModule } from 'src/app/views/app-view/components/color-autocomplete/color-autocomplete.module';

@NgModule({
  declarations: [SearchEngineComponent],
  exports: [SearchEngineComponent],
  imports: [
    CommonModule,
    AutocompleteModule,
    SearchModule,
    SelectModule,
    DataPickerModule,
    MatBadgeModule,
    ReactiveFormsModule,
    MatCheckboxModule,
    FormsModule,
    MatButtonModule,
    MatIconModule,
    TranslateModule,
    AreaAutocompleteModule,
    SpeciesAutocompleteModule,
    BreedAutocompleteModule,
    CommunityAutocompleteModule,
    ColorAutocompleteModule,
  ],
})
export class SearchEngineModule {}
