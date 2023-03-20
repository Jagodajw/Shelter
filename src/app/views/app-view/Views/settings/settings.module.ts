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
import { SettingsCommuneModule } from './settings-community/settings-commune.module';
import { SettingsAreaModule } from './settings-area/settings-area.module';
import { SettingsAcceptanceTypeModule } from './settings-acceptance-type/settings-acceptance-type.module';
import { SettingsAdoptionTypeModule } from './settings-adoption-type/settings-adoption-type.module';
import { SettingsBreedModule } from './settings-breed/settings-breed.module';


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
    SettingsCommuneModule,
    SettingsAreaModule,
    SettingsAcceptanceTypeModule,
    SettingsAdoptionTypeModule,
    SettingsBreedModule
  ],
})
export class SettingsModule {}
