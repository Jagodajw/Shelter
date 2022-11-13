import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ButtonFilterComponent } from './button-filter.component';
import {MatButtonToggleModule} from '@angular/material/button-toggle';

@NgModule({
  declarations: [ButtonFilterComponent],
  exports: [ButtonFilterComponent],
  imports: [CommonModule, MatButtonToggleModule],
})
export class ButtonFilterModule {}
