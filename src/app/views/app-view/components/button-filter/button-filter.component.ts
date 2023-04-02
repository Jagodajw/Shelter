import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  Self,
} from '@angular/core';
import { MatButtonToggleChange } from '@angular/material/button-toggle';
import { ButtonFilter, ButtonFilterDefaultID } from './button-filter';
import { ControlValueAccessorsAbstract } from 'src/app/shared/control-value-accesors.abstract';
import { NgControl } from '@angular/forms';

type ReturnValue = any;
@Component({
  selector: 'app-button-filter',
  templateUrl: './button-filter.component.html',
  styleUrls: ['./button-filter.component.scss'],
})
export class ButtonFilterComponent<T = ButtonFilterDefaultID>
  extends ControlValueAccessorsAbstract<ReturnValue>
  implements OnInit
{
  @Output() change: EventEmitter<T> = new EventEmitter<T>();
  @Input() filters: ButtonFilter<T>[] = [];
  @Input() disabled: boolean = false;
  @Input() initialValue!: T;

  constructor(@Self() ngControl: NgControl) {
    super(ngControl);
  }

  ngOnInit(): void {}

  onChange(event: MatButtonToggleChange): void {
    this.value = event.value;
    this.change.emit(event.value);
  }
}
