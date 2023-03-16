import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PetBasicDataComponent } from './pet-basic-data.component';
import { DataPetRegisterModule } from 'src/app/views/app-view/components/data-pet-register/data-pet-register.module';
import { DataPersonDonorModule } from 'src/app/views/app-view/components/data-person-donor/data-person-donor.module';
import { DataRegisterModule } from 'src/app/views/app-view/components/data-register/data-register.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [PetBasicDataComponent],
  exports: [PetBasicDataComponent],
  imports: [
    CommonModule,
    DataPetRegisterModule,
    DataPersonDonorModule,
    DataRegisterModule,
    ReactiveFormsModule,
    FormsModule,
  ],
})
export class PetBasicDataModule {}
