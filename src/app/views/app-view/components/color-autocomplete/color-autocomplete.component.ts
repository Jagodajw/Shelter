import { Component, OnInit, Self } from '@angular/core';
import { FormControl, NgControl } from '@angular/forms';
import { ColorResponse } from 'backend/src/views/DictionaryView';
import { map, Observable, tap } from 'rxjs';
import { ControlValueAccessorsAbstract } from 'src/app/shared/control-value-accesors.abstract';
import { DictionaryService } from '../../services/api/dictionary.service';
import { ShelterService } from '../../services/shelter.service';
import { Select } from '../select/select';

type ReturnValue = string | null | Select | ColorResponse;
@Component({
  selector: 'app-color-autocomplete',
  templateUrl: './color-autocomplete.component.html',
  styleUrls: ['./color-autocomplete.component.scss'],
  // providers: [
  //   {
  //     provide: NG_VALUE_ACCESSOR,
  //     useExisting: forwardRef(() => ColorAutocompleteComponent),
  //     multi: true,
  //   },
  // ],
})
export class ColorAutocompleteComponent
  extends ControlValueAccessorsAbstract<ReturnValue>
  implements OnInit
{
  public colorList$!: Observable<Select[]>;
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
          this.colorList$ = this.api.getColors().pipe(
            map(
              (colorResponse: ColorResponse[]) =>
                colorResponse.map((color: ColorResponse) => ({
                  ID: color.ID,
                  name: color.color,
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
    this.control.patchValue(
      this.isValueAsColorResponse(this.value)
        ? { ...this.value, name: this.value.color }
        : this.value
    );
  }

  private isValueAsColorResponse(value: ReturnValue): value is ColorResponse {
    return (value as ColorResponse)?.color !== undefined;
  }
}
