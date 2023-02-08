import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { UploadAttachmentComponent } from './components/upload-attachment.component';

@NgModule({
  declarations: [UploadAttachmentComponent],
  exports: [UploadAttachmentComponent],
  imports: [CommonModule, MatIconModule, MatButtonModule],
})
export class UploadAttachmentModule {}
