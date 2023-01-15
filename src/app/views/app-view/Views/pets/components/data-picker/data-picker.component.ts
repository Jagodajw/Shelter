import { Component, forwardRef, Input, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  NG_VALUE_ACCESSOR,
  Validators,
} from '@angular/forms';
import { DateRange } from '@angular/material/datepicker';
import { ControlValueAccessorsAbstract } from 'src/app/shared/control-value-accesors.abstract';

interface DateScope {
  From: Date | null;
  To: Date | null;
}

type DatePicker = DateScope | Date | null;

@Component({
  selector: 'app-data-picker',
  templateUrl: './data-picker.component.html',
  styleUrls: ['./data-picker.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => DataPickerComponent),
      multi: true,
    },
  ],
})
export class DataPickerComponent<DatePicker>
  extends ControlValueAccessorsAbstract
  implements OnInit
{
  @Input() placeholder = '';
  @Input() public pickerType: 'normal' | 'range' = 'normal';
  @Input() set minDate(date: Date | string | null) {
    if (date === null) return;
    this.min = new Date(date);
  }
  public min!: Date;
  public dateGroup!: FormGroup;

  constructor(private readonly _form: FormBuilder) {
    super();
  }

  ngOnInit(): void {
    this.initDateGroupByPickerType();
  }

  private initDateGroupByPickerType(): void {
    if (this.pickerType === 'range') {
      this.dateGroup = this._form.group({
        From: [null, Validators.required],
        To: [null, Validators.required],
      });
      return;
    }

    this.dateGroup = this._form.group({ Value: [null] });
  }

  public writeValue(value: DatePicker): void {
    if (value === null) return this.dateGroup.reset();

    if (this.pickerType === 'range')
      return this.dateGroup.patchValue(value as any);
    this.dateGroup.patchValue({ Value: value });
  }

  public changedDate(): void {
    if (this.pickerType === 'normal')
      return this.onChange(this.dateGroup.value.Value);
    this.onChange(this.dateGroup.value);
  }

  public setDisabledState(isDisabled: boolean): void {
    console.log(isDisabled);
    if (isDisabled) return this.dateGroup.disable();
    this.dateGroup.enable();
  }
}
