import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatButtonToggleChange } from '@angular/material/button-toggle';
import { ButtonFilter, ButtonFilterDefaultID } from './button-filter';

@Component({
  selector: 'app-button-filter',
  templateUrl: './button-filter.component.html',
  styleUrls: ['./button-filter.component.scss'],
})
export class ButtonFilterComponent<T = ButtonFilterDefaultID>
  implements OnInit
{
  @Input() filters: ButtonFilter<T>[] = [];
  @Input() disabled: boolean = false;
  @Input() initialValue!: T;
  @Output() change: EventEmitter<T> = new EventEmitter<T>();

  constructor() {}

  ngOnInit(): void {}

  onChange(event: MatButtonToggleChange): void {
    this.change.emit(event.value);
  }
}
