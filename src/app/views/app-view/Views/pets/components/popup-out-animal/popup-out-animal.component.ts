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
        introduced: ['', Validators.required],
        accepted: ['', Validators.required],
        commentsOut: [''],
      }),
      dataPersonTakeAway: this._form.group({
        personName: [''],
        IDnumber: [''],
        pesel: [''],
        email: [''],
        tel: [''],
        adress: [''],
        city: [''],
        commune: [''],
        zipCode: [''],
        province: [''],
        comments: [''],
      }),
    });
  }

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
