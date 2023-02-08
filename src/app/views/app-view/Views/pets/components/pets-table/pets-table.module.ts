import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PetsTableComponent } from './pets-table.component';
import { MatTableModule } from '@angular/material/table';
import { MatDialogModule } from '@angular/material/dialog';
import { PetsRoutingModule } from '../../pets-routing.module';
import { TranslateModule } from '@ngx-translate/core';
import { MatIconModule } from '@angular/material/icon';

import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { ButtonItemDeleteModule } from '../../../../components/button-item-delete/button-item-delete.module';
import { ButtonModule } from '../../../../components/button/button.module';
import { EnumGenderPipe } from './enutm-transleted.pipe';
import { EmptyDataModule } from 'src/app/views/app-view/components/empty-data/empty-data.module';

@NgModule({
  declarations: [PetsTableComponent, EnumGenderPipe],
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
    EmptyDataModule,
  ],
})
export class PetsTableModule {}
