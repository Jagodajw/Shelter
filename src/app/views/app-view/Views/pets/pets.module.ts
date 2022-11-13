import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ButtonFilterModule } from '../../components/button-filter/button-filter.module';
import { SearchModule } from '../../components/search/search.module';
import { SelectModule } from '../../components/select/select.module';
import { DataPickerModule } from './components/data-picker/data-picker.module';
import { PetsRoutingModule } from './pets-routing.module';
import { PetsComponent } from './pets.component';

@NgModule({
  declarations: [PetsComponent],
  imports: [
    CommonModule,
    PetsRoutingModule,
    ButtonFilterModule,
    SelectModule,
    DataPickerModule,
    SearchModule,
  ],
})
export class PetsModule {}
