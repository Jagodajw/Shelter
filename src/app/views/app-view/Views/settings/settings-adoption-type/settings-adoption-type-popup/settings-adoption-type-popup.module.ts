import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SettingsAdoptionTypePopupComponent } from './settings-adoption-type-popup.component';
import { ButtonModule } from 'src/app/views/app-view/components/button/button.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { TranslateModule } from '@ngx-translate/core';
import { MatDialogModule } from '@angular/material/dialog';



@NgModule({
  declarations: [SettingsAdoptionTypePopupComponent],
  exports: [SettingsAdoptionTypePopupComponent],
  imports: [
    CommonModule,
    ButtonModule,
    ReactiveFormsModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    TranslateModule,
    MatDialogModule,
  ]
})
export class SettingsAdoptionTypePopupModule { }
