import {
  Component,
  EventEmitter,
  forwardRef,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { FormControl, NG_VALUE_ACCESSOR } from '@angular/forms';
import { MatSelectChange } from '@angular/material/select';
import { ControlValueAccessorsAbstract } from 'src/app/shared/control-value-accesors.abstract';
import { Select } from './select';

@Component({
  selector: 'app-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => SelectComponent),
      multi: true,
    },
  ],
})
export class SelectComponent
  extends ControlValueAccessorsAbstract<string | number | null>
  implements OnInit
{
  @Input() values: Select[] = [];
  @Input() placeholder: string = '';
  @Output() change: EventEmitter<string | number | null> = new EventEmitter<
    string | number | null
  >();
  public controlSelect: FormControl<string | number | null> = new FormControl(
    null
  );

  constructor() {
    super();
  }

  ngOnInit(): void {}

  selection(event: MatSelectChange): void {
    const value: string | number = (event.value as Select).ID;
    this.change.emit(value);
    this.onChange(value);
  }

  public writeValue(value: string | number | null): void {
    this.controlSelect.patchValue(value);
  }

  public setDisabledState(isDisabled: boolean): void {
    if (isDisabled) return this.controlSelect.disable();
    this.controlSelect.enable();
  }
}
