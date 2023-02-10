import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataPetOutModule } from 'src/app/views/app-view/components/data-pet-out/date-pet-out.module';
import { DataPersonTakeAwayModule } from 'src/app/views/app-view/components/data-person-take-away/data-person-take-away.module';
import { PetOutDataComponent } from './pet-out-data.component';

@NgModule({
  declarations: [PetOutDataComponent],
  exports: [PetOutDataComponent],
  imports: [CommonModule, DataPetOutModule, DataPersonTakeAwayModule],
})
export class PetOutDataModule {}
