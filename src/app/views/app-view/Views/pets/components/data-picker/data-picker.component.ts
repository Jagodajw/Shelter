import { Component, forwardRef, Input, OnInit, Self } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  NgControl,
  NG_VALUE_ACCESSOR,
  Validators,
} from '@angular/forms';
import {
  DateRange,
  MatDatepickerInputEvent,
} from '@angular/material/datepicker';
import { Data } from '@angular/router';
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
  // providers: [
  //   {
  //     provide: NG_VALUE_ACCESSOR,
  //     useExisting: forwardRef(() => DataPickerComponent),
  //     multi: true,
  //   },
  // ],
})
export class DataPickerComponent<DatePicker>
  extends ControlValueAccessorsAbstract
  implements OnInit
{
  @Input() required: boolean = false;
  @Input() placeholder = '';
  @Input() public pickerType: 'normal' | 'range' = 'normal';
  @Input() set minDate(date: Date | string | null) {
    if (date === null) return;
    this.min = new Date(date);
  }
  public min!: Date;

  constructor(
    @Self() ngControl: NgControl,
    private readonly _form: FormBuilder
  ) {
    super(ngControl);
  }

  ngOnInit(): void {
    this.handleSetDisabledStateFromOutside();
  }

  public changedDate(event: MatDatepickerInputEvent<unknown>): void {
    this.value = event.value;
  }

  // protected override handleSetDisabledStateFromOutside(): void {
  //   if (this.isDisabled) return this.dateGroup.disable();
  //   this.dateGroup.enable();
  // }
}
