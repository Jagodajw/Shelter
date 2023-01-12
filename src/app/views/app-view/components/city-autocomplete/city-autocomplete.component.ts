import { Component, forwardRef, OnInit } from '@angular/core';
import { FormControl, NG_VALUE_ACCESSOR } from '@angular/forms';
import { CityResponse } from 'backend/src/models/DictionaryModel';
import { map, Observable } from 'rxjs';
import { ControlValueAccessorsAbstract } from 'src/app/shared/control-value-accesors.abstract';
import { DictionaryService } from '../../services/api/dictionary.service';
import { Select } from '../select/select';

@Component({
  selector: 'app-city-autocomplete',
  templateUrl: './city-autocomplete.component.html',
  styleUrls: ['./city-autocomplete.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CityAutocompleteComponent),
      multi: true,
    },
  ],
})
export class CityAutocompleteComponent
  extends ControlValueAccessorsAbstract
  implements OnInit
{
  public readonly cityList$: Observable<Select[]>;
  public readonly control: FormControl = new FormControl();
  constructor(private readonly api: DictionaryService) {
    super();
    this.cityList$ = this.api.getCity().pipe(
      map(
        (cityResponse: CityResponse[]) =>
          cityResponse.map((city: CityResponse) => ({
            id: city.ID,
            name: `${city.city} ${city.zip_code}`,
          })) as Select[]
      )
    );
  }

  
  ngOnInit(): void {}

  public writeValue(value: unknown): void {
    this.control.patchValue(value);
  }
}
