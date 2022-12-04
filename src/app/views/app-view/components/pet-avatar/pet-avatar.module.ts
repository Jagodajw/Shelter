import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PetAvatarComponent } from './pet-avatar.component';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [PetAvatarComponent],
  exports: [PetAvatarComponent],
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule,
    ReactiveFormsModule,
    FormsModule,
  ],
})
export class PetAvatarModule {}
