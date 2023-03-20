import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SettingsColorPopupComponent } from './settings-color-popup.component';
import { ButtonModule } from 'src/app/views/app-view/components/button/button.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [SettingsColorPopupComponent],
  exports: [SettingsColorPopupComponent],
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
export class SettingsColorPopupModule {}
