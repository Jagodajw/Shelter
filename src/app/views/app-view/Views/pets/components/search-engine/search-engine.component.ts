import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Select } from 'src/app/views/app-view/components/select/select';

@Component({
  selector: 'app-search-engine',
  templateUrl: './search-engine.component.html',
  styleUrls: ['./search-engine.component.scss'],
})
export class SearchEngineComponent implements OnInit {
  public searchEngineForm!: FormGroup;
  public arrayOfSpecies: Select[] = [
    { id: 0, name: 'kot' },
    { id: 1, name: 'pies' },
  ];
  public filtersAddPets: Select[] = [
    { id: 0, name: 'pets.filterNoCastrated' },
    { id: 1, name: 'pets.filterCastrated' },
  ];

  constructor(private _form: FormBuilder) {
    this.buildForm();
  }

  public buildForm(): void {
    this.searchEngineForm = this._form.group({
      species: [''],
      breed: [''],
      community: [''],
      area: [''],
      color: [''],
      gender: [''],
      size: [''],
      castred: [''],
      search: [''],
      cuarantine: [false],
      unvaccinated: [false],
      datePickerBirthFromTo: [''],
      datePickerAccepted: [''],
    });
  }

  ngOnInit(): void {}

  add(event: number) {
    console.log(event);
  }
  chooseSelect(event: Select) {
    console.log(event);
  }
  chooseAutocomplete(event: Select) {
    console.log(event);
  }
}