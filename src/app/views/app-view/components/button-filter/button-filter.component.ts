import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatButtonToggleChange } from '@angular/material/button-toggle';
import { ButtonFilter } from './button-filter';

@Component({
  selector: 'app-button-filter',
  templateUrl: './button-filter.component.html',
  styleUrls: ['./button-filter.component.scss']
})
export class ButtonFilterComponent implements OnInit {
  @Input() filters: ButtonFilter[] = [];
  @Output() change: EventEmitter<number> = new EventEmitter<number>();

  
  constructor() { }

  ngOnInit(): void {
  }

  onChange(event: MatButtonToggleChange): void {
    this.change.emit(event.value)
  }

}