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
    { ID: 0, name: 'kot' },
    { ID: 1, name: 'pies' },
  ];
  public sizeList: Select[] = [
    { ID: 'small', name: 'size.small' },
    { ID: 'medium', name: 'size.medium' },
    { ID: 'large', name: 'size.large' },
  ];

  public genderList: Select[] = [
    { ID: 'female', name: 'gender.female' },
    { ID: 'male', name: 'gender.male' },
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
}
