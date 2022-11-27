import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { PopupRegisterComponent } from './popup-register.component';
import { AutocompleteModule } from 'src/app/views/app-view/components/autocomplete/autocomplete.module';
import { SelectModule } from 'src/app/views/app-view/components/select/select.module';
import { DataPickerModule } from '../data-picker/data-picker.module';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { DataPersonDonorModule } from 'src/app/views/app-view/components/data-person-donor/data-person-donor.module';
import { MatButtonModule } from '@angular/material/button';
import { ButtonModule } from 'src/app/views/app-view/components/button/button.module';
import { MatDialogModule } from '@angular/material/dialog';
import { DataPetRegisterModule } from 'src/app/views/app-view/components/data-pet-register/data-pet-register.module';
import { DataRegisterModule } from 'src/app/views/app-view/components/data-register/data-register.module';

@NgModule({
  declarations: [PopupRegisterComponent],
  exports: [PopupRegisterComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    TranslateModule,
    AutocompleteModule,
    SelectModule,
    DataPickerModule,
    MatFormFieldModule,
    MatInputModule,
    DataPersonDonorModule,
    MatButtonModule,
    ButtonModule,
    MatDialogModule,
    DataPetRegisterModule,
    DataRegisterModule,
  ],
})
export class PopupRegisterModule {}
