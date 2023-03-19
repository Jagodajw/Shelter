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
import { SettingsCityModule } from './settings-city/settings-city.module';
import { SettingsColorModule } from './settings-color/settings-color.module';

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
    SettingsCityModule,
    SettingsColorModule,
  ],
})
export class SettingsModule {}
