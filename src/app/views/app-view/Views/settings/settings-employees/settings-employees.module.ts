import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SettingsEmployeesComponent } from './settings-employees.component';
import { ButtonModule } from '../../../components/button/button.module';
import { TranslateModule } from '@ngx-translate/core';
import { MatTableModule } from '@angular/material/table';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { ButtonItemDeleteModule } from '../../../components/button-item-delete/button-item-delete.module';
import { SettingsEmployeesPopupModule } from './settings-employees-popup/settings-employees-popup.module';

@NgModule({
  declarations: [SettingsEmployeesComponent],
  exports: [SettingsEmployeesComponent],
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
    SettingsEmployeesPopupModule
  ],
})
export class SettingsEmployeesModule {}
