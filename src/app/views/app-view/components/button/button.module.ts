import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { ButtonComponent } from './button.component';

@NgModule({
  exports: [ButtonComponent],
  declarations: [ButtonComponent],
  imports: [CommonModule, MatButtonModule],
})
export class ButtonModule {}
