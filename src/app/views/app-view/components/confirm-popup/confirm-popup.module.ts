import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConfirmPopupComponent } from './confirm-popup.component';
import { MatDialogModule } from '@angular/material/dialog';
import { ButtonModule } from '../button/button.module';
import { TranslateModule } from '@ngx-translate/core';
import { SafeHtmlModule } from 'src/shared/sanitize-html.module';

@NgModule({
  declarations: [ConfirmPopupComponent],
  exports: [ConfirmPopupComponent],
  imports: [
    CommonModule,
    MatDialogModule,
    ButtonModule,
    TranslateModule,
    SafeHtmlModule,
  ],
})
export class ConfirmPopupModule {}
