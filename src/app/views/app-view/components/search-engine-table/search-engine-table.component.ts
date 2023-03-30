import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-search-engine-table',
  templateUrl: './search-engine-table.component.html',
  styleUrls: ['./search-engine-table.component.scss'],
})
export class SearchEngineTableComponent {
  @Input() public width: string = 'input-third';
  @Output() private searchParams: EventEmitter<String> =
    new EventEmitter<String>();
  constructor() {}

  public onInput(event: Event): void {
    const value = (event.target as HTMLInputElement).value;
    this.searchParams.emit(value);
  }
}
