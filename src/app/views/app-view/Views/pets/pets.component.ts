import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ButtonFilter } from '../../components/button-filter/button-filter';
import { Select } from '../../components/select/select';

@Component({
  selector: 'app-pets',
  templateUrl: './pets.component.html',
  styleUrls: ['./pets.component.scss'],
})
export class PetsComponent implements OnInit {
  status: boolean = false;
  public filtersPets: ButtonFilter[] = [
    { id: 0, name: 'pets.current' },
    { id: 1, name: 'pets.past' },
  ];
  public arrayOfSpecies: Select[] = [
    { id: 0, name: 'kot' },
    { id: 1, name: 'pies' },
  ];
  public filtersAddPets: Select[] = [
    { id: 0, name: 'pets.filterNoCastrated' },
    { id: 1, name: 'pets.filterCastrated' },
  ];
  constructor(private _formBuilder: FormBuilder) {}
  toppings = this._formBuilder.group({
    cuarantine: false,
    unvaccinated: false,
  });

  ngOnInit(): void {}

  add(event: number) {
    console.log(event);
  }
  chooseSelect(event: Select[]) {
    console.log(event);
  }
  clickEvent() {
    this.status = !this.status;
  }
}
