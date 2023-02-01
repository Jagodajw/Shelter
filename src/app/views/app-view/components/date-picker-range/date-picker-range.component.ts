import { Component, Input, OnInit, Self } from '@angular/core';
import { FormBuilder, FormGroup, NgControl, Validators } from '@angular/forms';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { ControlValueAccessorsAbstract } from 'src/app/shared/control-value-accesors.abstract';

@Component({
  selector: 'app-date-picker-range',
  templateUrl: './date-picker-range.component.html',
  styleUrls: ['./date-picker-range.component.scss'],
})
export class DatePickerRangeComponent
  extends ControlValueAccessorsAbstract
  implements OnInit
{
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

  ngOnInit(): void {
    this.initDateGroupByPickerType();
    this.handleSetDisabledStateFromOutside();
  }
  private initDateGroupByPickerType(): void {
    this.dateGroup = this._form.group({
      From: [null],
      To: [null],
    });
    return;
  }
  public changedDate(event: MatDatepickerInputEvent<Date>): void {
    this.value = event.value;
  }
  public clearForm(): void {
    //zrobic wyszukiwanie tutaj po kliku + errror
    this.dateGroup.reset();
    this.value = null;
  }
}