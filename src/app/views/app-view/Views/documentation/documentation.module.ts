import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { TranslateModule } from '@ngx-translate/core';
import { ButtonModule } from '../../components/button/button.module';
import { EmptyDataModule } from '../../components/empty-data/empty-data.module';
import { FileReaderDialogModule } from '../../components/file-reader-dialog/component/file-reader-dialog.module';
import { UploadAttachmentModule } from '../file-upload/components/upload-attachment/upload-attachment.module';
import { FileUploadModule } from '../file-upload/file-upload.module';
import { DocumentationRoutingModule } from './documentation-routing.module';
import { DocumentationComponent } from './documentation.component';

@NgModule({
  declarations: [DocumentationComponent],
  imports: [
    CommonModule,
    DocumentationRoutingModule,
    TranslateModule,
    ButtonModule,
    MatIconModule,
    MatExpansionModule,
    MatIconModule,
    MatInputModule,
    ReactiveFormsModule,
    EmptyDataModule,
    FileUploadModule,
    UploadAttachmentModule,
    MatDialogModule,
    FileReaderDialogModule,
  ],
})
export class DocumentationModule {}
