import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSliderModule } from '@angular/material/slider';
import { MatToolbarModule } from '@angular/material/toolbar';
import { TranslateModule } from '@ngx-translate/core';
import { SanitizerModule } from 'src/app/pipes/sanitizer/sanitizer.module';
import { SettingsBreedPopupModule } from '../app-view/Views/settings/settings-breed/settings-breed-popup/settings-breed-popup.module';
import { ChooseShelterPopupComponenet } from '../app-view/components/choose-shelter-popup/choose-shelter-popup.componenet';
import { ImgFileGetterModule } from '../app-view/components/choose-shelter-popup/img-file-getter/img-file-getter.module';
import { AuthViewRoutingModule } from './auth-view-routing.module';
import { AuthViewComponent } from './auth-view.component';

@NgModule({
  declarations: [AuthViewComponent, ChooseShelterPopupComponenet],
  imports: [
    CommonModule,
    AuthViewRoutingModule,
    MatFormFieldModule,
    MatSliderModule,
    MatIconModule,
    MatInputModule,
    ReactiveFormsModule,
    FormsModule,
    MatButtonModule,
    MatToolbarModule,
    MatCardModule,
    TranslateModule,
    SettingsBreedPopupModule,
    ImgFileGetterModule,
    SanitizerModule,
  ],
})
export class AuthViewModule {}
