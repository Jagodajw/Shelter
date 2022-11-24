import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { AutocompleteModule } from 'src/app/views/app-view/components/autocomplete/autocomplete.module';
import { SelectModule } from 'src/app/views/app-view/components/select/select.module';
import { DataPickerModule } from '../data-picker/data-picker.module';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { DataPersonDonorModule } from 'src/app/views/app-view/components/data-person-donor/data-person-donor.module';
import { MatButtonModule } from '@angular/material/button';
import { ButtonModule } from 'src/app/views/app-view/components/button/button.module';
import { MatDialogModule } from '@angular/material/dialog';
import { PopupOutAnimalComponent } from './popup-out-animal.component';

@NgModule({
  declarations: [PopupOutAnimalComponent],
  exports: [PopupOutAnimalComponent],
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
  ],
})
export class PopupOutAnimalModule {}
