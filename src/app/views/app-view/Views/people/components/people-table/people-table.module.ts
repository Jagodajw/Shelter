import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PeopleTableComponent } from './people-table.component';
import { MatTableModule } from '@angular/material/table';
import { MatDialogModule } from '@angular/material/dialog';
import { TranslateModule } from '@ngx-translate/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { ButtonItemDeleteModule } from 'src/app/views/app-view/components/button-item-delete/button-item-delete.module';
import { ButtonModule } from 'src/app/views/app-view/components/button/button.module';
import { EmptyDataModule } from 'src/app/views/app-view/components/empty-data/empty-data.module';
import { PetsRoutingModule } from '../../../pets/pets-routing.module';
import { PetsTableModule } from '../../../pets/components/pets-table/pets-table.module';
import { SearchEngineTableModule } from 'src/app/views/app-view/components/search-engine-table/search-engine-table.module';

@NgModule({
  declarations: [PeopleTableComponent],
  exports: [PeopleTableComponent],
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
    PetsTableModule,
    SearchEngineTableModule,
  ],
})
export class PeopleTableModule {}
