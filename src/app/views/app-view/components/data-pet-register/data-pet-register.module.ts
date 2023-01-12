import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { AutocompleteModule } from '../autocomplete/autocomplete.module';
import { SelectModule } from '../select/select.module';
import { DataPickerModule } from '../../Views/pets/components/data-picker/data-picker.module';
import { DataPetRegisterComponent } from './data-pet-register.component';
import { PetAvatarModule } from '../pet-avatar/pet-avatar.module';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { SpeciesAutocompleteModule } from '../species-autocomplete/species-autocomplete.module';
import { AreaAutocompleteModule } from '../area-autocomplete/area-autocomplete.module';
import { CommunityAutocompleteModule } from '../community-autocomplete/community-autocomplete.module';
import { ColorAutocompleteModule } from '../color-autocomplete/color-autocomplete.module';
import { BreedAutocompleteModule } from '../breed-autocomplete/breed-autocomplete.module';

@NgModule({
  declarations: [DataPetRegisterComponent],
  exports: [DataPetRegisterComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    TranslateModule,
    MatSelectModule,
    MatFormFieldModule,
    MatInputModule,
    AutocompleteModule,
    SelectModule,
    DataPickerModule,
    PetAvatarModule,
    MatIconModule,
    SpeciesAutocompleteModule,
    AreaAutocompleteModule,
    CommunityAutocompleteModule,
    ColorAutocompleteModule,
    BreedAutocompleteModule,
  ],
})
export class DataPetRegisterModule {}
