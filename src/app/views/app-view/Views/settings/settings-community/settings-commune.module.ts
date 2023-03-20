import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SettingsCommuneComponent } from './settings-commune.component';
import { SettingsCommunePopupModule } from './settings-commune-popup/settings-commune-popup.module';
import { MatTableModule } from '@angular/material/table';
import { MatDialogModule } from '@angular/material/dialog';
import { TranslateModule } from '@ngx-translate/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { ButtonModule } from '../../../components/button/button.module';
import { ButtonItemDeleteModule } from '../../../components/button-item-delete/button-item-delete.module';



@NgModule({
  declarations: [SettingsCommuneComponent],
  exports: [SettingsCommuneComponent],
  imports: [
    CommonModule,
    SettingsCommunePopupModule,
    MatTableModule,
    MatDialogModule,
    TranslateModule,
    MatIconModule,
    MatButtonModule,
    MatMenuModule,
    ButtonItemDeleteModule,
    ButtonModule,
  ]
})
export class SettingsCommuneModule { }
