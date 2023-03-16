import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SettingsSpeciesComponent } from './settings-species.component';
import { MatTableModule } from '@angular/material/table';
import { MatDialogModule } from '@angular/material/dialog';
import { TranslateModule } from '@ngx-translate/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { ButtonItemDeleteModule } from 'src/app/views/app-view/components/button-item-delete/button-item-delete.module';
import { ButtonModule } from 'src/app/views/app-view/components/button/button.module';
@NgModule({
  declarations: [SettingsSpeciesComponent],
  exports: [SettingsSpeciesComponent],
  imports: [CommonModule,    MatTableModule,
    MatDialogModule,
    TranslateModule,
    MatIconModule,
    MatButtonModule,
    MatMenuModule,
    ButtonItemDeleteModule,
    ButtonModule,],
})
export class SettingsSpeciesModule {}
