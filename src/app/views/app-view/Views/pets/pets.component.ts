import { Component, OnInit } from '@angular/core';
import { ButtonFilter } from '../../components/button-filter/button-filter';
import { Select } from '../../components/select/select';

@Component({
  selector: 'app-pets',
  templateUrl: './pets.component.html',
  styleUrls: ['./pets.component.scss'],
})
export class PetsComponent implements OnInit {
  public filtersPets: ButtonFilter[] = [
    { id: 0, name: 'Przebywające' },
    { id: 1, name: 'Wydane' },
  ];
  public arrayOfSpecies: Select[] = [
    { id: 0, name: 'kot' },
    { id: 1, name: 'pies' },
  ];
  constructor() {}

  ngOnInit(): void {}

  add(event: number) {
    console.log(event);
  }
  chooseSelect(event: Select[]) {
    console.log(event);
  }
}
