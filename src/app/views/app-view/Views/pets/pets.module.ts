import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { PetsRoutingModule } from './pets-routing.module';
import { PetsComponent } from './pets.component';

@NgModule({
  declarations: [PetsComponent],
  imports: [CommonModule, PetsRoutingModule],
})
export class PetsModule {}
