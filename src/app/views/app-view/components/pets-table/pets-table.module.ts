import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PetsTableComponent } from './pets-table.component';
import { MatTableModule } from '@angular/material/table';
import { MatDialogModule } from '@angular/material/dialog';
import { PetsRoutingModule } from '../../Views/pets/pets-routing.module';
import { TranslateModule } from '@ngx-translate/core';
import { MatIconModule } from '@angular/material/icon';

import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { ButtonItemDeleteModule } from '../button-item-delete/button-item-delete.module';
import { ButtonModule } from '../button/button.module';

@NgModule({
  declarations: [PetsTableComponent],
  exports: [PetsTableComponent],
  imports: [
    CommonModule,
    MatTableModule,
    MatDialogModule,
    PetsRoutingModule,
    TranslateModule,
    MatIconModule,
    MatButtonModule,
    MatMenuModule,
    ButtonItemDeleteModule,
    ButtonModule,
  ],
})
export class PetsTableModule {}
