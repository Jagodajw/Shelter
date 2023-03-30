import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchEngineTableComponent } from './search-engine-table.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [SearchEngineTableComponent],
  exports: [SearchEngineTableComponent],
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    TranslateModule,
  ],
})
export class SearchEngineTableModule {}
