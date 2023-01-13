import { Component, forwardRef, OnInit } from '@angular/core';
import { FormControl, NG_VALUE_ACCESSOR } from '@angular/forms';
import { AreaResponse } from 'backend/src/models/DictionaryModel';
import { map,  Observable, tap } from 'rxjs';
import { ControlValueAccessorsAbstract } from 'src/app/shared/control-value-accesors.abstract';
import { DictionaryService } from '../../services/api/dictionary.service';
import { ShelterService } from '../../services/shelter.service';
import { Select } from '../select/select';

@Component({
  selector: 'app-area-autocomplete',
  templateUrl: './area-autocomplete.component.html',
  styleUrls: ['./area-autocomplete.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => AreaAutocompleteComponent),
      multi: true,
    },
  ],
})
export class AreaAutocompleteComponent
  extends ControlValueAccessorsAbstract
  implements OnInit
{
  public areaList$!: Observable<Select[]>;
  public readonly control: FormControl = new FormControl();
  constructor(
    private readonly api: DictionaryService,
    private readonly shelter: ShelterService
  ) {
    super();
  }

  ngOnInit(): void {
    this.shelterChangeDetector();
  }

  private shelterChangeDetector(): void {
    this.shelter.selectedShelterChangeDetector$
      .pipe(
        tap(() => {
          this.areaList$ = this.api.getArea().pipe(
            map(
              (areaResponse: AreaResponse[]) =>
                areaResponse.map((area: AreaResponse) => ({
                  id: area.ID,
                  name: area.area,
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
