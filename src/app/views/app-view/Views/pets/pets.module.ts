import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ButtonFilterModule } from '../../components/button-filter/button-filter.module';
import { PetsRoutingModule } from './pets-routing.module';
import { PetsComponent } from './pets.component';
import { TranslateModule } from '@ngx-translate/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { PopupRegisterModule } from './components/popup-register/popup-register.module';
import { MatDialogModule } from '@angular/material/dialog';
import { PopupOutAnimalModule } from './components/popup-out-animal/popup-out-animal.model';
import { PetsTableModule } from '../../components/pets-table/pets-table.module';
import { SearchEngineModule } from './components/search-engine/search-engine.module';

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
  ],
})
export class PetsModule {}
