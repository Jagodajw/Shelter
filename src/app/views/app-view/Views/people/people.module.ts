import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { TranslateModule } from '@ngx-translate/core';
import { ButtonFilterModule } from '../../components/button-filter/button-filter.module';
import { ButtonModule } from '../../components/button/button.module';
import { SearchModule } from '../../components/search/search.module';
import { PeopleRoutingModule } from './people-routing.module';
import { PeopleComponent } from './people.component';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatTableModule } from '@angular/material/table';
import { MatMenuModule } from '@angular/material/menu';
import { ButtonItemDeleteModule } from '../../components/button-item-delete/button-item-delete.module';
import { ConfirmPopupModule } from '../../components/confirm-popup/confirm-popup.module';
import { DataPersonTakeAwayModule } from '../../components/data-person-take-away/data-person-take-away.module';
import { DataPersonDonorModule } from '../../components/data-person-donor/data-person-donor.module';
import { DataPersonActionPopupModule } from '../../components/data-person-action-popup/data-person-action-popup.module';
import { PetsTableModule } from '../pets/components/pets-table/pets-table.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EmptyDataModule } from '../../components/empty-data/empty-data.module';
import { PeopleTableModule } from './components/people-table/people-table.module';
@NgModule({
  declarations: [PeopleComponent],
  imports: [
    CommonModule,
    PeopleRoutingModule,
    ButtonFilterModule,
    TranslateModule,
    MatIconModule,
    MatButtonModule,
    ButtonModule,
    SearchModule,
    MatSlideToggleModule,
    MatTableModule,
    MatMenuModule,
    ButtonItemDeleteModule,
    ConfirmPopupModule,
    DataPersonTakeAwayModule,
    DataPersonDonorModule,
    DataPersonActionPopupModule,
    PetsTableModule,
    ReactiveFormsModule,
    FormsModule,
    EmptyDataModule,
    PeopleTableModule,
  ],
})
export class PeopleModule {}
