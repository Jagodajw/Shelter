import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { TranslateModule } from '@ngx-translate/core';
import { PdfViewerModule } from 'ng2-pdf-viewer';
import { SanitizerModule } from 'src/app/pipes/sanitizer/sanitizer.module';

import { FileReaderDialogComponent } from './file-reader-dialog.component';

@NgModule({
  exports: [FileReaderDialogComponent],
  declarations: [FileReaderDialogComponent],
  imports: [
    CommonModule,
    MatDialogModule,
    MatIconModule,
    MatButtonModule,
    PdfViewerModule,
    SanitizerModule,
    TranslateModule,
  ],
})
export class FileReaderDialogModule {}
