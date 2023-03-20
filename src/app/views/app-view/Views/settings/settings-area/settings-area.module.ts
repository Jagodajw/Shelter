import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SettingsAreaComponent } from './settings-area.component';
import { MatTableModule } from '@angular/material/table';
import { MatDialogModule } from '@angular/material/dialog';
import { TranslateModule } from '@ngx-translate/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { ButtonItemDeleteModule } from '../../../components/button-item-delete/button-item-delete.module';
import { ButtonModule } from '../../../components/button/button.module';
import { SettingsAreaPopupModule } from './settings-area-popup/settings-area-popup.module';



@NgModule({
  declarations: [SettingsAreaComponent],
  exports: [SettingsAreaComponent],
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
    SettingsAreaPopupModule
  ]
})
export class SettingsAreaModule { }
