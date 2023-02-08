import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmptyDataComponent } from './components/empty-data.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [EmptyDataComponent],
  exports: [EmptyDataComponent],
  imports: [CommonModule, MatProgressSpinnerModule, TranslateModule],
})
export class EmptyDataModule {}
