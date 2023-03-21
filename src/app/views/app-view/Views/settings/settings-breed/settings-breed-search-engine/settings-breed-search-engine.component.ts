import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-settings-breed-search-engine',
  templateUrl: './settings-breed-search-engine.component.html',
})
export class SettingsBreedSearchEngineComponent {
  @Output() private searchParams: EventEmitter<String> =
    new EventEmitter<String>();
  constructor() {}

  public onInput(event: Event): void {
    const value = (event.target as HTMLInputElement).value;
    this.searchParams.emit(value);
  }
}
