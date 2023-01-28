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

}
