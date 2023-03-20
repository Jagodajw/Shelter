import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SettingsCityComponent } from './settings-city.component';
import { SettingsCityPopupModule } from './settings-city-popup/settings-city-popup.module';
import { MatTableModule } from '@angular/material/table';
import { MatDialogModule } from '@angular/material/dialog';
import { TranslateModule } from '@ngx-translate/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { ButtonItemDeleteModule } from '../../../components/button-item-delete/button-item-delete.module';
import { ButtonModule } from '../../../components/button/button.module';

@NgModule({
  declarations: [SettingsCityComponent],
  exports: [SettingsCityComponent],
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
    SettingsCityPopupModule,
  ],
})
export class SettingsCityModule {}
