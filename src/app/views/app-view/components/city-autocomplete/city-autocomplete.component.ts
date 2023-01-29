import { Component, forwardRef, OnInit, Self } from '@angular/core';
import { FormControl, NgControl, NG_VALUE_ACCESSOR } from '@angular/forms';
import { CityResponse } from 'backend/src/models/DictionaryModel';
import { map, Observable, tap } from 'rxjs';
import { ControlValueAccessorsAbstract } from 'src/app/shared/control-value-accesors.abstract';
import { DictionaryService } from '../../services/api/dictionary.service';
import { ShelterService } from '../../services/shelter.service';
import { Select } from '../select/select';

type ReturnValue = string | null | Select | CityResponse;
@Component({
  selector: 'app-city-autocomplete',
  templateUrl: './city-autocomplete.component.html',
  styleUrls: ['./city-autocomplete.component.scss'],
  // providers: [
  //   {
  //     provide: NG_VALUE_ACCESSOR,
  //     useExisting: forwardRef(() => CityAutocompleteComponent),
  //     multi: true,
  //   },
  // ],
})
export class CityAutocompleteComponent
  extends ControlValueAccessorsAbstract<ReturnValue>
  implements OnInit
{
  public cityList$!: Observable<Select[]>;
  public readonly control: FormControl = new FormControl();
  constructor(
    @Self() ngControl: NgControl,
    private readonly api: DictionaryService,
    private readonly shelter: ShelterService
  ) {
    super(ngControl);
  }

  ngOnInit(): void {
    this.shelterChangeDetector();
    this.control.valueChanges.subscribe({
      next: (value) => {
        if (value) this.value = value;
      },
    });
  }

  private shelterChangeDetector(): void {
    this.shelter.selectedShelterChangeDetector$
      .pipe(
        tap(() => {
          this.cityList$ = this.api.getCity().pipe(
            map(
              (cityResponse: CityResponse[]) =>
                cityResponse.map((city: CityResponse) => ({
                  ID: city.ID,
                  // name: `${city.city} ${city.zip_code}`,
                  name: city.city,
                  zip_code: city.zip_code,
                })) as Select[]
            )
          );
        })
      )
      .subscribe();
  }

  protected override handleSetDisabledStateFromOutside(): void {
    if (this.isDisabled) return this.control.disable();
    this.control.enable();
  }
  override handleValueChangeFromOutside(): void {
    const value = this.value as CityResponse;
    this.control.patchValue({ ...value, name: value.city });
  }
}
