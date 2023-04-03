import { Component, Input, Self } from '@angular/core';
import { FormBuilder, FormGroup, NgControl } from '@angular/forms';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { ControlValueAccessorsAbstract } from 'src/app/shared/control-value-accesors.abstract';

@Component({
  selector: 'app-date-picker-range',
  templateUrl: './date-picker-range.component.html',
  styleUrls: ['./date-picker-range.component.scss'],
})
export class DatePickerRangeComponent extends ControlValueAccessorsAbstract {
  @Input() placeholder = '';
  @Input() set minDate(date: Date | string | null) {
    if (date === null) return;
    this.min = new Date(date);
  }
  public min!: Date;
  public dateGroup!: FormGroup;

  constructor(
    @Self() ngControl: NgControl,
    private readonly _form: FormBuilder
  ) {
    super(ngControl);
  }

  private initDateGroupByPickerType(): void {
    this.dateGroup = this._form.group({
      from: [null],
      to: [null],
    });
    return;
  }

  public changedDate(event: MatDatepickerInputEvent<Date>): void {
    this.value = this.dateGroup.value;
  }

  public clearForm(): void {
    this.dateGroup.reset();
    this.value = null;
  }

  override handleValueChangeFromOutside(): void {
    this.dateGroup === undefined && this.initDateGroupByPickerType();
    if (this.value === null) {
      this.dateGroup.get('from')?.patchValue(null);
      this.dateGroup.get('to')?.patchValue(null);
    }
  }
}
