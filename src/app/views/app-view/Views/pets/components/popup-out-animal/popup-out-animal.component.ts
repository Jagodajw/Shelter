import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Select } from 'src/app/views/app-view/components/select/select';

@Component({
  selector: 'app-popup-out-animal',
  templateUrl: './popup-out-animal.component.html',
  styleUrls: ['./popup-out-animal.component.scss'],
})
export class PopupOutAnimalComponent implements OnInit {
  outPetForm!: FormGroup;
  constructor(private readonly _form: FormBuilder) {}

  ngOnInit(): void {
    this.buildForm();
  }
  public buildForm(): void {
    this.outPetForm = this._form.group({
      dataPetOut: this._form.group({
        name: ['', Validators.required],
        species: ['', Validators.required],
        typeOut: ['', Validators.required],
        dateOut: ['', Validators.required],
        introduced_employees: ['', Validators.required],
        accepted_employees: ['', Validators.required],
        commentsOut: [''],
      }),
      dataPersonTakeAway: this._form.group({
        name: [''],
        id_number: [''],
        pesel: [''],
        email: [''],
        telephone: [''],
        adress: [''],
        city: [''],
        zip_code: [''],
        commune: [''],
        province: [''],
        comments: [''],
      }),
    });
  }

  public arrayOfSpecies: Select[] = [
    { ID: 0, name: 'kot' },
    { ID: 1, name: 'pies' },
  ];
  chooseSelect(event: Select) {
    console.log(event);
  }
  chooseAutocomplete(event: Select) {
    console.log(event);
  }
}
