import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { genderList, sizeList } from 'src/app/data/data-list';
import { Select } from 'src/app/views/app-view/components/select/select';

@Component({
  selector: 'app-search-engine',
  templateUrl: './search-engine.component.html',
  styleUrls: ['./search-engine.component.scss'],
})
export class SearchEngineComponent implements OnInit {
  public searchEngineForm!: FormGroup;
  public sizeList: Select[] = sizeList;
  public genderList: Select[] = genderList;

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
}
