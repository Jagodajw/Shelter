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
  ],
})
export class PetsModule {}
