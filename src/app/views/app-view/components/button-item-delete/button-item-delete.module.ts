import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonItemDeleteComponent } from './button-item-delete.component';
import { ButtonModule } from '../button/button.module';
import { MatMenuModule } from '@angular/material/menu';

@NgModule({
  declarations: [ButtonItemDeleteComponent],
  exports: [ButtonItemDeleteComponent],
  imports: [CommonModule, MatMenuModule, ButtonModule],
})
export class ButtonItemDeleteModule {}
