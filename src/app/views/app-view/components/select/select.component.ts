import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatSelectChange } from '@angular/material/select';
import { Select } from './select';

@Component({
  selector: 'app-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.scss'],
})
export class SelectComponent implements OnInit {
  @Input() values: Select[] = [];
  @Input() placeholder: string = '';
  @Output() change: EventEmitter<Select[]> = new EventEmitter<
    Select[]
  >();
  

  public control = new FormControl('');
  constructor() {}

  ngOnInit(): void {}

  selection(event: MatSelectChange): void {
    this.change.emit(event.value);
  }
}
