import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SettingsAdoptionTypeComponent } from './settings-adoption-type.component';
import { MatTableModule } from '@angular/material/table';
import { MatDialogModule } from '@angular/material/dialog';
import { TranslateModule } from '@ngx-translate/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { ButtonItemDeleteModule } from '../../../components/button-item-delete/button-item-delete.module';
import { ButtonModule } from '../../../components/button/button.module';
import { SettingsAdoptionTypePopupModule } from './settings-adoption-type-popup/settings-adoption-type-popup.module';



@NgModule({
  declarations: [SettingsAdoptionTypeComponent],
  exports: [SettingsAdoptionTypeComponent],
  imports: [
    CommonModule,    MatTableModule,
    MatDialogModule,
    TranslateModule,
    MatIconModule,
    MatButtonModule,
    MatMenuModule,
    ButtonItemDeleteModule,
    ButtonModule,
    SettingsAdoptionTypePopupModule
  ]
})
export class SettingsAdoptionTypeModule { }
