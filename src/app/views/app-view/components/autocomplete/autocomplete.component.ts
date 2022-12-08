import {
  Component,
  EventEmitter,
  forwardRef,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { FormControl, NG_VALUE_ACCESSOR } from '@angular/forms';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { Select } from '../select/select';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { ControlValueAccessorsAbstract } from 'src/app/shared/control-value-accesors.abstract';

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
  extends ControlValueAccessorsAbstract
  implements OnInit
{
  @Input() placeholder: string = '';
  @Input() values: Select[] = [];
  @Output() change: EventEmitter<Select> = new EventEmitter<Select>();
  constructor() {
    super();
  }

  public writeValue(value: unknown): void {}
  public controlAutoSelect = new FormControl('');

  selection(event: MatAutocompleteSelectedEvent): void {
    this.change.emit(event.option.value);
  }

  filteredValues!: Observable<Select[]>;

  ngOnInit() {
    this.filteredValues = this.controlAutoSelect.valueChanges.pipe(
      startWith(''),
      map((value) => this._filter(value || ''))
    );
  }

  private _filter(value: string | Select): Select[] {
    const filterValue =
      typeof value === 'object'
        ? value.name.toLowerCase()
        : value.toLowerCase();

    return this.values.filter((value) =>
      value.name.toLowerCase().includes(filterValue)
    );
  }

  public displayFn(value: Select): string {
    return value ? value.name : '';
  }

  public setDisabledState(isDisabled: boolean): void {
    if (isDisabled) return this.controlAutoSelect.disable();
    this.controlAutoSelect.enable();
  }
}
