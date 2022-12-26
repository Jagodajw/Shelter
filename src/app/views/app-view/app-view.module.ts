import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AppViewRoutingModule } from './app-view-routing.module';
import { AppViewComponent } from './app-view.component';
import { HeaderComponent } from './components/header/header.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatTabsModule } from '@angular/material/tabs';
import { SearchModule } from './components/search/search.module';
import { TranslateModule } from '@ngx-translate/core';
import { PetAvatarModule } from './components/pet-avatar/pet-avatar.module';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { ShelterInterceptorService } from 'src/app/interceptors/shelter-interceptor.service';

@NgModule({
  declarations: [AppViewComponent, HeaderComponent],
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
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ShelterInterceptorService,
      multi: true,
    },
  ],
})
export class AppViewModule {}
