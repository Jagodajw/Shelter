import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { AutocompleteModule } from '../autocomplete/autocomplete.module';
import { SelectModule } from '../select/select.module';
import { DataPickerModule } from '../../Views/pets/components/data-picker/data-picker.module';
import { DataRegisterComponent } from './data-register.component';
import { EmployeesAutocompleteModule } from '../employees-autocomplete/employees-autocomplete.module';
import { MatCheckboxModule } from '@angular/material/checkbox';

@NgModule({
  declarations: [DataRegisterComponent],
  exports: [DataRegisterComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    TranslateModule,
    MatAutocompleteModule,
    MatSelectModule,
    MatFormFieldModule,
    MatInputModule,
    AutocompleteModule,
    SelectModule,
    DataPickerModule,
    EmployeesAutocompleteModule,
    MatCheckboxModule,
  ],
})
export class DataRegisterModule {}
