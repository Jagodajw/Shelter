import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { UploadAttachmentModule } from './components/upload-attachment/upload-attachment.module';
import { FileUploadComponent } from './components/file-upload.component';
import { TranslateModule } from '@ngx-translate/core';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  declarations: [FileUploadComponent],
  exports: [FileUploadComponent],
  imports: [
    CommonModule,
    MatIconModule,
    UploadAttachmentModule,
    TranslateModule,
    MatButtonModule,
  ],
})
export class FileUploadModule {}
