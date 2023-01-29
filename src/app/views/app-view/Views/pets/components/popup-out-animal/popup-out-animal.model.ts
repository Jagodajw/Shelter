import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { AutocompleteModule } from 'src/app/views/app-view/components/autocomplete/autocomplete.module';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { ButtonModule } from 'src/app/views/app-view/components/button/button.module';
import { MatDialogModule } from '@angular/material/dialog';
import { PopupOutAnimalComponent } from './popup-out-animal.component';
import { DataPetOutModule } from 'src/app/views/app-view/components/data-pet-out/date-pet-out.module';
import { DataPersonTakeAwayModule } from 'src/app/views/app-view/components/data-person-take-away/data-person-take-away.module';
import { TypeAdoptionAutocompleteModule } from 'src/app/views/app-view/components/type-adoption-autocomplete/type-adoption-autocomplete.module';

@NgModule({
  declarations: [PopupOutAnimalComponent],
  exports: [PopupOutAnimalComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    TranslateModule,
    AutocompleteModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    ButtonModule,
    MatDialogModule,
    DataPetOutModule,
    DataPersonTakeAwayModule,
    TypeAdoptionAutocompleteModule,
  ],
})
export class PopupOutAnimalModule {}
