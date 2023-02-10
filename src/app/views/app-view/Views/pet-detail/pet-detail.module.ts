import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { PetDetailRoutingModule } from './pet-detail-routing.module';
import { PetDetailComponent } from './pet-detail.component';
import { MatTabsModule } from '@angular/material/tabs';
import { MatDialogModule } from '@angular/material/dialog';
import { DataPersonDonorModule } from '../../components/data-person-donor/data-person-donor.module';
import { DataPetRegisterModule } from '../../components/data-pet-register/data-pet-register.module';
import { DataRegisterModule } from '../../components/data-register/data-register.module';
import { DataPetOutModule } from '../../components/data-pet-out/date-pet-out.module';
import { DataPersonTakeAwayModule } from '../../components/data-person-take-away/data-person-take-away.module';
import { MatIconModule } from '@angular/material/icon';
import { ButtonModule } from '../../components/button/button.module';
import { MatButtonModule } from '@angular/material/button';
import { FileUploadModule } from '../file-upload/file-upload.module';
import { PetBasicDataModule } from './components/pet-basic-data/pet-basic-data.module';

import { PetOutDataModule } from './components/pet-out-data/pet-out-data.module';
import { EmptyDataModule } from '../../components/empty-data/empty-data.module';

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
    EmptyDataModule
  ],
})
export class PetDetailModule {}
