import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AuthViewRoutingModule } from './auth-view-routing.module';
import { AuthViewComponent } from './auth-view.component';

@NgModule({
  declarations: [AuthViewComponent],
  imports: [CommonModule, AuthViewRoutingModule],
})
export class AuthViewModule {}
