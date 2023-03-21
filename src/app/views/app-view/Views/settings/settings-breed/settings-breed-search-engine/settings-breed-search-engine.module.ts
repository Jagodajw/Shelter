import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SettingsBreedSearchEngineComponent } from './settings-breed-search-engine.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [SettingsBreedSearchEngineComponent],
  exports: [SettingsBreedSearchEngineComponent],
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    TranslateModule,
  ],
})
export class SettingsBreedSearchEngineModule {}
