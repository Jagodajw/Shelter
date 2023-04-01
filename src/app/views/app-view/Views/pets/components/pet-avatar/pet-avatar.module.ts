import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PetAvatarComponent } from './pet-avatar.component';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SanitizerModule } from 'src/app/pipes/sanitizer/sanitizer.module';

@NgModule({
  declarations: [PetAvatarComponent],
  exports: [PetAvatarComponent],
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule,
    ReactiveFormsModule,
    FormsModule,
    SanitizerModule,
  ],
})
export class PetAvatarModule {}
