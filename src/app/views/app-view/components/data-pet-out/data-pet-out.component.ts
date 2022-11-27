import { Component, OnInit } from '@angular/core';
import { Select } from '../select/select';

@Component({
  selector: 'app-data-pet-out',
  templateUrl: './data-pet-out.component.html',
  styleUrls: ['./data-pet-out.component.scss'],
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
