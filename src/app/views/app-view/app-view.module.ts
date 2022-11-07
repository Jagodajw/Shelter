import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AppViewRoutingModule } from './app-view-routing.module';
import { AppViewComponent } from './app-view.component';
import { HeaderComponent } from './components/header/header.component';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatMenuModule} from '@angular/material/menu';


@NgModule({
  declarations: [
    AppViewComponent,
    HeaderComponent
  ],
  imports: [CommonModule, AppViewRoutingModule, MatToolbarModule, MatIconModule,MatMenuModule],
})
export class AppViewModule {}
