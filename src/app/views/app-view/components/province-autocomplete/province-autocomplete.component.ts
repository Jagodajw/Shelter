import { Component, forwardRef, OnInit } from '@angular/core';
import { FormControl, NG_VALUE_ACCESSOR } from '@angular/forms';
import { map, Observable, tap } from 'rxjs';
import { Select } from '../select/select';
import { ControlValueAccessorsAbstract } from 'src/app/shared/control-value-accesors.abstract';
import { DictionaryService } from '../../services/api/dictionary.service';
import { ProvinceResponse } from 'backend/src/models/DictionaryModel';
import { ShelterService } from '../../services/shelter.service';

type ReturnValue = string | null | Select;
@Component({
  selector: 'app-province-autocomplete',
  templateUrl: './province-autocomplete.component.html',
  styleUrls: ['./province-autocomplete.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => ProvinceAutocompleteComponent),
      multi: true,
    },
  ],
})
export class ProvinceAutocompleteComponent
  extends ControlValueAccessorsAbstract<ReturnValue>
  implements OnInit
{
  public provinceList$!: Observable<Select[]>;
  public readonly control: FormControl = new FormControl();
  constructor(
    private readonly api: DictionaryService,
    private readonly shelter: ShelterService
  ) {
    super();
  }

  ngOnInit(): void {
    this.shelterChangeDetector();
    this.control.valueChanges.subscribe({
      next: (value) => {
        if (this.onChange) this.onChange(value);
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
                  id: province.ID,
                  name: province.province,
                })) as Select[]
            )
          );
        })
      )
      .subscribe();
  }
  public writeValue(value: unknown): void {
    this.control.patchValue(value);
  }
  public setDisabledState(isDisabled: boolean): void {
    if (isDisabled) return this.control.disable();
    this.control.enable();
  }
}
