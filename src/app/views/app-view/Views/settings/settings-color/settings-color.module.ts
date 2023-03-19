import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SettingsColorComponent } from './settings-color.component';
import { MatTableModule } from '@angular/material/table';
import { MatDialogModule } from '@angular/material/dialog';
import { TranslateModule } from '@ngx-translate/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { ButtonModule } from '../../../components/button/button.module';
import { ButtonItemDeleteModule } from '../../../components/button-item-delete/button-item-delete.module';
import { SettingsColorPopupModule } from './settings-color-popup/settings-color-popup.module';

@NgModule({
  declarations: [SettingsColorComponent],
  exports: [SettingsColorComponent],
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
    SettingsColorPopupModule,
  ],
})
export class SettingsColorModule {}
