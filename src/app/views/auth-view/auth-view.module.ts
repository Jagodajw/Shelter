import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AuthViewRoutingModule } from './auth-view-routing.module';
import { AuthViewComponent } from './auth-view.component';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatSliderModule } from '@angular/material/slider';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatButtonModule} from '@angular/material/button';


@NgModule({
  declarations: [AuthViewComponent],
  imports: [CommonModule, AuthViewRoutingModule,MatFormFieldModule,    MatSliderModule,MatIconModule,MatInputModule, ReactiveFormsModule,FormsModule,MatButtonModule
  ],
})
export class AuthViewModule {}
