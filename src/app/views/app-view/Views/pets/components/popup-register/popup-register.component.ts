import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Select } from 'src/app/views/app-view/components/select/select';

@Component({
  selector: 'app-popup-register',
  templateUrl: './popup-register.component.html',
  styleUrls: ['./popup-register.component.scss'],
})
export class PopupRegisterComponent implements OnInit {
  registerPetsForm!: FormGroup;

  constructor(private readonly _form: FormBuilder) {}

  ngOnInit(): void {
    this.buildForm();
  }

  public buildForm(): void {
    this.registerPetsForm = this._form.group({
      Species: ['', Validators.required],
      Age: ['', Validators.required],
      Size: ['', Validators.required],
      Description: [''],
      Breed: ['', Validators.required],
      Gender: ['', Validators.required],
      Color: [''],
      Comments: [''],
      ID: ['', Validators.required],
      Name: ['', Validators.required],
      NrChip: ['', Validators.required],
      Area: [''],
      Community: [''],
      DateGraft: [''],
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
