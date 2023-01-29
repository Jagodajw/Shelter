import { Component, forwardRef, OnInit, Self } from '@angular/core';
import { FormControl, NgControl, NG_VALUE_ACCESSOR } from '@angular/forms';
import { AreaResponse } from 'backend/src/models/DictionaryModel';
import { map, Observable, tap } from 'rxjs';
import { ControlValueAccessorsAbstract } from 'src/app/shared/control-value-accesors.abstract';
import { DictionaryService } from '../../services/api/dictionary.service';
import { ShelterService } from '../../services/shelter.service';
import { Select } from '../select/select';

type ReturnValue = string | null | Select | AreaResponse;
@Component({
  selector: 'app-area-autocomplete',
  templateUrl: './area-autocomplete.component.html',
  styleUrls: ['./area-autocomplete.component.scss'],
  // providers: [
  //   {
  //     provide: NG_VALUE_ACCESSOR,
  //     useExisting: forwardRef(() => AreaAutocompleteComponent),
  //     multi: true,
  //   },
  // ],
})
export class AreaAutocompleteComponent
  extends ControlValueAccessorsAbstract<ReturnValue>
  implements OnInit
{
  public areaList$!: Observable<Select[]>;
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
          this.areaList$ = this.api.getArea().pipe(
            map(
              (areaResponse: AreaResponse[]) =>
                areaResponse.map((area: AreaResponse) => ({
                  ID: area.ID,
                  name: area.area,
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
    const value = this.value as AreaResponse;
    this.control.patchValue({ ...value, name: value.area });
  }
}
