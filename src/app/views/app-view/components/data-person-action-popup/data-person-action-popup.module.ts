import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataPersonTakeAwayModule } from '../data-person-take-away/data-person-take-away.module';
import { DataPersonActionPopupComponent } from './data-person-action-popup.component';
import { TranslateModule } from '@ngx-translate/core';
import { ButtonModule } from '../button/button.module';
import { MatDialogModule } from '@angular/material/dialog';

@NgModule({
  declarations: [DataPersonActionPopupComponent],
  exports: [DataPersonActionPopupComponent],
  imports: [
    CommonModule,
    DataPersonTakeAwayModule,
    TranslateModule,
    ButtonModule,
    MatDialogModule,
  ],
})
export class DataPersonActionPopupModule {}
