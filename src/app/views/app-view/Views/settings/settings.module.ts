import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatTabsModule } from '@angular/material/tabs';
import { TranslateModule } from '@ngx-translate/core';
import { SettingsRoutingModule } from './settings-routing.module';
import { SettingsComponent } from './settings.component';
import { SettingsEmployeesPopupModule } from './settings-employees/settings-employees-popup/settings-employees-popup.module';
import { SettingsEmployeesModule } from './settings-employees/settings-employees.module';
import { SettingsSpeciesModule } from './settings-species/settings-species.module';
import { SettingsSpeciesPopupModule } from './settings-species/settings-species-popup/settings-species-popup.module';

@NgModule({
  declarations: [SettingsComponent],
  imports: [
    CommonModule,
    SettingsRoutingModule,
    TranslateModule,
    SettingsEmployeesPopupModule,
    MatTabsModule,
    SettingsEmployeesModule,
    SettingsSpeciesModule,
    SettingsSpeciesPopupModule,
  ],
})
export class SettingsModule {}
