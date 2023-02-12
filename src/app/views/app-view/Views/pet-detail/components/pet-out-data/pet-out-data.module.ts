import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataPetOutModule } from 'src/app/views/app-view/components/data-pet-out/date-pet-out.module';
import { DataPersonTakeAwayModule } from 'src/app/views/app-view/components/data-person-take-away/data-person-take-away.module';
import { PetOutDataComponent } from './pet-out-data.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [PetOutDataComponent],
  exports: [PetOutDataComponent],
  imports: [
    CommonModule,
    DataPetOutModule,
    DataPersonTakeAwayModule,
    ReactiveFormsModule,
    FormsModule,
  ],
})
export class PetOutDataModule {}
