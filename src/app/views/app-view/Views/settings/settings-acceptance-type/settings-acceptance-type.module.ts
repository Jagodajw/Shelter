import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SettingsAcceptanceTypeComponent } from './settings-acceptance-type.component';
import { MatTableModule } from '@angular/material/table';
import { MatDialogModule } from '@angular/material/dialog';
import { TranslateModule } from '@ngx-translate/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { ButtonItemDeleteModule } from '../../../components/button-item-delete/button-item-delete.module';
import { MatMenuModule } from '@angular/material/menu';
import { ButtonModule } from '../../../components/button/button.module';
import { SettingsAcceptanceTypePopupModule } from './settings-acceptance-type-popup/settings-acceptance-type-popup.module';



@NgModule({
  declarations: [SettingsAcceptanceTypeComponent],
  exports: [SettingsAcceptanceTypeComponent],
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
    SettingsAcceptanceTypePopupModule
  ]
})
export class SettingsAcceptanceTypeModule { }
