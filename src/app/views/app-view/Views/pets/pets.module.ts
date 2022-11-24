import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ButtonFilterModule } from '../../components/button-filter/button-filter.module';
import { SearchModule } from '../../components/search/search.module';
import { SelectModule } from '../../components/select/select.module';
import { DataPickerModule } from './components/data-picker/data-picker.module';
import { PetsRoutingModule } from './pets-routing.module';
import { PetsComponent } from './pets.component';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatBadgeModule } from '@angular/material/badge';
import { MatTableModule } from '@angular/material/table';
import { MatMenuModule } from '@angular/material/menu';
import { PopupRegisterModule } from './components/popup-register/popup-register.module';
import { AutocompleteModule } from '../../components/autocomplete/autocomplete.module';
import { MatDialogModule } from '@angular/material/dialog';
import { PopupOutAnimalModule } from './components/popup-out-animal/popup-out-animal.model';

@NgModule({
  declarations: [PetsComponent],
  imports: [
    CommonModule,
    PetsRoutingModule,
    ButtonFilterModule,
    SelectModule,
    DataPickerModule,
    SearchModule,
    MatCheckboxModule,
    ReactiveFormsModule,
    FormsModule,
    TranslateModule,
    MatButtonModule,
    MatIconModule,
    MatBadgeModule,
    MatTableModule,
    MatMenuModule,
    MatDialogModule,
    PopupRegisterModule,
    AutocompleteModule,
    PopupOutAnimalModule,
    PopupRegisterModule,
  ],
})
export class PetsModule {}
