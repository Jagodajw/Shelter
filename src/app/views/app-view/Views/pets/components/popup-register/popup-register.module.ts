import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { PopupRegisterComponent } from './popup-register.component';
import { AutocompleteModule } from 'src/app/views/app-view/components/autocomplete/autocomplete.module';
import { SelectModule } from 'src/app/views/app-view/components/select/select.module';
import { DataPickerModule } from '../data-picker/data-picker.module';

@NgModule({
  declarations: [PopupRegisterComponent],
  exports: [PopupRegisterComponent],
  imports: [
    CommonModule,
    MatSelectModule,
    FormsModule,
    ReactiveFormsModule,
    TranslateModule,
    AutocompleteModule,
    SelectModule,
    DataPickerModule,
  ],
})
export class PopupRegisterModule {}
