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
  ],
})
export class SearchEngineModule {}
