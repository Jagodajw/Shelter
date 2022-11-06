import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AppViewRoutingModule } from './app-view-routing.module';
import { AppViewComponent } from './app-view.component';
import { HeaderComponent } from './components/header/header.component';

@NgModule({
  declarations: [
    AppViewComponent,
    HeaderComponent
  ],
  imports: [CommonModule, AppViewRoutingModule],
})
export class AppViewModule {}
