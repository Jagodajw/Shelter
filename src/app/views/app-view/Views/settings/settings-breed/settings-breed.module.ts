import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatTableModule } from '@angular/material/table';
import { TranslateModule } from '@ngx-translate/core';
import { ButtonItemDeleteModule } from '../../../components/button-item-delete/button-item-delete.module';
import { ButtonModule } from '../../../components/button/button.module';
import { SearchEngineTableModule } from '../../../components/search-engine-table/search-engine-table.module';
import { SettingsBreedPopupModule } from './settings-breed-popup/settings-breed-popup.module';
import { SettingsBreedComponent } from './settings-breed.component';

@NgModule({
  declarations: [SettingsBreedComponent],
  exports: [SettingsBreedComponent],
  imports: [
    CommonModule,
    MatTableModule,
    MatDialogModule,
    TranslateModule,
    MatIconModule,
    MatButtonModule,
    MatMenuModule,
    ButtonItemDeleteModule,
    ButtonModule,
    ReactiveFormsModule,
    FormsModule,
    SearchEngineTableModule,
    SettingsBreedPopupModule,
  ],
})
export class SettingsBreedModule {}
