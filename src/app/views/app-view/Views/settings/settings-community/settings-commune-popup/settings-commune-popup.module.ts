import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SettingsCommunePopupComponent } from './settings-commune-popup.component';
import { ButtonModule } from 'src/app/views/app-view/components/button/button.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDialogModule } from '@angular/material/dialog';
import { TranslateModule } from '@ngx-translate/core';



@NgModule({
  declarations: [SettingsCommunePopupComponent],
  exports: [SettingsCommunePopupComponent],
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
export class SettingsCommunePopupModule { }
