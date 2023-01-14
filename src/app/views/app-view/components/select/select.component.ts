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
  extends ControlValueAccessorsAbstract
  implements OnInit
{
  @Input() values: Select[] = [];
  @Input() placeholder: string = '';
  @Output() change: EventEmitter<string> = new EventEmitter<string>();
  public controlSelect = new FormControl('');

  constructor() {
    super();
  }
  public writeValue(value: unknown): void {}
  ngOnInit(): void {}

  selection(event: MatSelectChange): void {
    const valueId: string = (event.value as Select).id as string;
    this.change.emit(valueId);
    this.onChange(valueId);
  }
  public setDisabledState(isDisabled: boolean): void {
    if (isDisabled) return this.controlSelect.disable();
    this.controlSelect.enable();
  }
}
