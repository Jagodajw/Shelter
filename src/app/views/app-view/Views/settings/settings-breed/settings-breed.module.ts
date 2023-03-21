import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SettingsBreedComponent } from './settings-breed.component';
import { MatTableModule } from '@angular/material/table';
import { MatDialogModule } from '@angular/material/dialog';
import { TranslateModule } from '@ngx-translate/core';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { ButtonModule } from '../../../components/button/button.module';
import { ButtonItemDeleteModule } from '../../../components/button-item-delete/button-item-delete.module';
import { MatButtonModule } from '@angular/material/button';
import { SettingsBreedPopupModule } from './settings-breed-popup/settings-breed-popup.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

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
    SettingsBreedPopupModule,
    ReactiveFormsModule,
    FormsModule,
  ],
})
export class SettingsBreedModule {}
