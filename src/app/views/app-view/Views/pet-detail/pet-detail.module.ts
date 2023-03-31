import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatTabsModule } from '@angular/material/tabs';
import { TranslateModule } from '@ngx-translate/core';
import { ButtonModule } from '../../components/button/button.module';
import { DataPersonDonorModule } from '../../components/data-person-donor/data-person-donor.module';
import { DataPersonTakeAwayModule } from '../../components/data-person-take-away/data-person-take-away.module';
import { DataPetOutModule } from '../../components/data-pet-out/date-pet-out.module';
import { DataPetRegisterModule } from '../../components/data-pet-register/data-pet-register.module';
import { DataRegisterModule } from '../../components/data-register/data-register.module';
import { FileUploadModule } from '../file-upload/file-upload.module';
import { PetBasicDataModule } from './components/pet-basic-data/pet-basic-data.module';
import { PetDetailRoutingModule } from './pet-detail-routing.module';
import { PetDetailComponent } from './pet-detail.component';

import { EmptyDataModule } from '../../components/empty-data/empty-data.module';
import { FileReaderDialogModule } from '../../components/file-reader-dialog/component/file-reader-dialog.module';
import { UploadAttachmentModule } from '../file-upload/components/upload-attachment/upload-attachment.module';
import { PetOutDataModule } from './components/pet-out-data/pet-out-data.module';

@NgModule({
  declarations: [PetDetailComponent],
  imports: [
    CommonModule,
    PetDetailRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    TranslateModule,
    MatTabsModule,
    MatDialogModule,
    DataPersonDonorModule,
    DataPetRegisterModule,
    DataRegisterModule,
    DataPetOutModule,
    DataPersonTakeAwayModule,
    MatIconModule,
    MatButtonModule,
    ButtonModule,
    FileUploadModule,
    PetBasicDataModule,
    PetOutDataModule,
    EmptyDataModule,
    UploadAttachmentModule,
    FileReaderDialogModule,
  ],
})
export class PetDetailModule {}
