import { Component, OnInit, SkipSelf } from '@angular/core';
import { ControlContainer } from '@angular/forms';
import { Select } from '../select/select';

@Component({
  selector: 'app-data-pet-out',
  templateUrl: './data-pet-out.component.html',
  styleUrls: ['./data-pet-out.component.scss'],
  viewProviders: [
    {
      provide: ControlContainer,
      useFactory: (container: ControlContainer) => container,
      deps: [[new SkipSelf(), ControlContainer]],
    },
  ],
})
export class DataPetOutComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
  public arrayOfSpecies: Select[] = [
    { id: 0, name: 'kot' },
    { id: 1, name: 'pies' },
  ];
  chooseSelect(event: Select) {
    console.log(event);
  }
  chooseAutocomplete(event: Select) {
    console.log(event);
  }
}
