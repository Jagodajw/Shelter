import {
  ChangeDetectorRef,
  Component,
  EventEmitter,
  forwardRef,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { FormControl, NG_VALUE_ACCESSOR } from '@angular/forms';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { ControlValueAccessorsAbstract } from 'src/app/shared/control-value-accesors.abstract';
import { Select } from '../select/select';

@Component({
  selector: 'app-autocomplete',
  templateUrl: './autocomplete.component.html',
  styleUrls: ['./autocomplete.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => AutocompleteComponent),
      multi: true,
    },
  ],
})
export class AutocompleteComponent
  extends ControlValueAccessorsAbstract<Select | string | null>
  implements OnInit
{
  @Input() placeholder: string = '';
  @Input() set values(newValues: Select[]) {
    this.filteredValues = this.controlAutoSelect.valueChanges.pipe(
      startWith(''),
      map((value) => this._filter(newValues, value || ''))
    );
    this.cd.markForCheck();
  }
  @Output() change: EventEmitter<Select> = new EventEmitter<Select>();
  public controlAutoSelect = new FormControl('');
  public filteredValues!: Observable<Select[]>;

  constructor(private readonly cd: ChangeDetectorRef) {
    super();
  }

  ngOnInit() {}

  public selection(event: MatAutocompleteSelectedEvent): void {
    const value: Select = event.option.value as Select;
    this.change.emit(value);
    this.onChange(value);
  }

  public inputValue(event: Event): void {
    this.onChange((event.target as HTMLInputElement).value);
  }
  private _filter(values: Select[], value: string | Select): Select[] {
    const filterValue =
      typeof value === 'object'
        ? value.name.toLowerCase()
        : value.toLowerCase();
    return values.filter((value) =>
      value.name.toLowerCase().includes(filterValue)
    );
  }

  public displayFn(value: Select): string {
    return value ? value.name : '';
  }

  public writeValue(value: any): void {
    this.controlAutoSelect.patchValue(value);
  }

  public setDisabledState(isDisabled: boolean): void {
    if (isDisabled) return this.controlAutoSelect.disable();
    this.controlAutoSelect.enable();
  }
}
