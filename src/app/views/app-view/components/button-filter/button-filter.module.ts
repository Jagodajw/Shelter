import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ButtonFilterComponent } from './button-filter.component';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [ButtonFilterComponent],
  exports: [ButtonFilterComponent],
  imports: [CommonModule, MatButtonToggleModule, TranslateModule],
})
export class ButtonFilterModule {}
