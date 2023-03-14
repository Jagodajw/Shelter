import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SettingsSpeciesPopupComponent } from './settings-species-popup.component';
import { ButtonModule } from 'src/app/views/app-view/components/button/button.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { TranslateModule } from '@ngx-translate/core';
import { MatDialogModule } from '@angular/material/dialog';

@NgModule({
  declarations: [SettingsSpeciesPopupComponent],
  exports: [SettingsSpeciesPopupComponent],
  imports: [
    CommonModule,
    ButtonModule,
    ReactiveFormsModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    TranslateModule,
    MatDialogModule,
  ],
})
export class SettingsSpeciesPopupModule {}
