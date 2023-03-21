import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SettingsBreedPopupComponent } from './settings-breed-popup.component';
import { ButtonModule } from 'src/app/views/app-view/components/button/button.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { TranslateModule } from '@ngx-translate/core';
import { MatDialogModule } from '@angular/material/dialog';
import { SpeciesAutocompleteModule } from 'src/app/views/app-view/components/species-autocomplete/species-autocomplete.module';

@NgModule({
  declarations: [SettingsBreedPopupComponent],
  exports: [SettingsBreedPopupComponent],
  imports: [
    CommonModule,
    ButtonModule,
    ReactiveFormsModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    TranslateModule,
    MatDialogModule,
    SpeciesAutocompleteModule,
    
  ],
})
export class SettingsBreedPopupModule {}
