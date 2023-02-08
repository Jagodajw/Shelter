import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { TranslateModule } from '@ngx-translate/core';
import { ButtonFilterModule } from '../../components/button-filter/button-filter.module';
import { EmptyDataModule } from '../../components/empty-data/empty-data.module';
import { PetsTableModule } from './components/pets-table/pets-table.module';
import { PopupOutAnimalModule } from './components/popup-out-animal/popup-out-animal.model';
import { PopupRegisterModule } from './components/popup-register/popup-register.module';
import { SearchEngineModule } from './components/search-engine/search-engine.module';
import { PetsRoutingModule } from './pets-routing.module';
import { PetsComponent } from './pets.component';

@NgModule({
  declarations: [PetsComponent],
  imports: [
    CommonModule,
    PetsRoutingModule,
    ButtonFilterModule,
    TranslateModule,
    MatButtonModule,
    MatIconModule,
    MatDialogModule,
    PopupRegisterModule,
    PopupOutAnimalModule,
    PetsTableModule,
    SearchEngineModule,
    EmptyDataModule
  ],
})
export class PetsModule {}
