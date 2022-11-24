import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

interface DateScope {
  From: Date | null;
  To: Date | null;
}

type DatePicker = DateScope | Date | null;

@Component({
  selector: 'app-data-picker',
  templateUrl: './data-picker.component.html',
  styleUrls: ['./data-picker.component.scss'],
})
export class DataPickerComponent<DatePicker> implements OnInit {
  @Input() placeholder = '';
  @Input() public pickerType: 'normal' | 'range' = 'normal';
  @Input() set minDate(date: Date | string | null) {
    if (date === null) return;
    this.min = new Date(date);
  }
  public min!: Date;
  public dateGroup!: FormGroup;

  constructor(private readonly _form: FormBuilder) {}

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
    // if (this.dateGroup.invalid) return;
    // Object.entries(this.dateGroup.value).forEach(
    //   ([key, value]: [string, Date]) => (this.dateGroup.value[key] = this._func.fixDate(value)),
    // );
    // if (this.pickerType === 'normal') return this.onChange(this.dateGroup.value.Value);
    // this.onChange(this.dateGroup.value);
  }
}
