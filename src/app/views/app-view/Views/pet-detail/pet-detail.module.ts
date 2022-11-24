import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ButtonFilterModule } from '../../components/button-filter/button-filter.module';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatBadgeModule } from '@angular/material/badge';
import { MatTableModule } from '@angular/material/table';
import { MatMenuModule } from '@angular/material/menu';
import { PetDetailRoutingModule } from './pet-detail-routing.module';
import { PetDetailComponent } from './pet-detail.component';

@NgModule({
  declarations: [PetDetailComponent],
  imports: [
    CommonModule,
    PetDetailRoutingModule,
    ButtonFilterModule,
    MatCheckboxModule,
    ReactiveFormsModule,
    FormsModule,
    TranslateModule,
    MatButtonModule,
    MatIconModule,
    MatBadgeModule,
    MatTableModule,
    MatMenuModule,
  ],
})
export class PetDetailModule {}
