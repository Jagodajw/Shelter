import { Component, OnInit, Self } from '@angular/core';
import { FormControl, NgControl } from '@angular/forms';
import { ProvinceResponse } from 'backend/src/views/DictionaryView';
import { map, Observable, tap } from 'rxjs';
import { ControlValueAccessorsAbstract } from 'src/app/shared/control-value-accesors.abstract';
import { DictionaryService } from '../../services/api/dictionary.service';
import { ShelterService } from '../../services/shelter.service';
import { Select } from '../select/select';

type ReturnValue = string | null | Select | ProvinceResponse;
@Component({
  selector: 'app-province-autocomplete',
  templateUrl: './province-autocomplete.component.html',
  styleUrls: ['./province-autocomplete.component.scss'],
  // providers: [
  //   {
  //     provide: NG_VALUE_ACCESSOR,
  //     useExisting: forwardRef(() => ProvinceAutocompleteComponent),
  //     multi: true,
  //   },
  // ],
})
export class ProvinceAutocompleteComponent
  extends ControlValueAccessorsAbstract<ReturnValue>
  implements OnInit
{
  public provinceList$!: Observable<Select[]>;
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
        if (value && typeof value === 'object') this.value = value.ID;
      },
    });
  }

  private shelterChangeDetector(): void {
    this.shelter.selectedShelterChangeDetector$
      .pipe(
        tap(() => {
          this.provinceList$ = this.api.getProvince().pipe(
            map(
              (provinceResponse: ProvinceResponse[]) =>
                provinceResponse.map((province: ProvinceResponse) => ({
                  ID: province.ID,
                  name: province.province,
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
    const value = this.value as ProvinceResponse;
    this.control.patchValue({ ...value, name: value.province });
  }
}
