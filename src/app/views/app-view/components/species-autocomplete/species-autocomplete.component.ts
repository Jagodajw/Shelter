import {
  Component,
  forwardRef,
  OnInit,
} from '@angular/core';
import { FormControl, NG_VALUE_ACCESSOR } from '@angular/forms';
import { SpeciesResponse } from 'backend/src/models/DictionaryModel';
import { map, Observable } from 'rxjs';
import { ControlValueAccessorsAbstract } from 'src/app/shared/control-value-accesors.abstract';
import { DictionaryService } from '../../services/api/dictionary.service';
import { Select } from '../select/select';

@Component({
  selector: 'app-species-autocomplete',
  templateUrl: './species-autocomplete.component.html',
  styleUrls: ['./species-autocomplete.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => SpeciesAutocompleteComponent),
      multi: true,
    },
  ],
})
export class SpeciesAutocompleteComponent
  extends ControlValueAccessorsAbstract
  implements OnInit
{
  public readonly speciesList$: Observable<Select[]>;
  public readonly control: FormControl = new FormControl();
  constructor(private readonly api: DictionaryService) {
    super();
    this.speciesList$ = this.api.getSpecies().pipe(
      map(
        (speciesResponse: SpeciesResponse[]) =>
          speciesResponse.map((species: SpeciesResponse) => ({
            id: species.ID,
            name: species.species,
          })) as Select[]
      )
    );
  }

  ngOnInit(): void {}

  public writeValue(value: unknown): void {
    this.control.patchValue(value);
  }
}
