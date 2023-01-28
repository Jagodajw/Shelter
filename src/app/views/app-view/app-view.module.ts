import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatTabsModule } from '@angular/material/tabs';
import { MatToolbarModule } from '@angular/material/toolbar';
import { TranslateModule } from '@ngx-translate/core';
import { AppViewRoutingModule } from './app-view-routing.module';
import { AppViewComponent } from './app-view.component';
import { HeaderComponent } from './components/header/header.component';
import { PetAvatarModule } from './components/pet-avatar/pet-avatar.module';
import { SearchModule } from './components/search/search.module';
import { DictionaryService } from './services/api/dictionary.service';
import { EmployeeService } from './services/api/employee.service';
import { PetService } from './services/api/pet.service';
import { ShelterService } from './services/shelter.service';

@NgModule({
  declarations: [AppViewComponent, HeaderComponent ],
  providers: [PetService, DictionaryService, EmployeeService, ShelterService],
  imports: [
    CommonModule,
    AppViewRoutingModule,
    MatToolbarModule,
    MatIconModule,
    MatMenuModule,
    MatTabsModule,
    SearchModule,
    TranslateModule,
    PetAvatarModule,
  ],
})
export class AppViewModule {}
