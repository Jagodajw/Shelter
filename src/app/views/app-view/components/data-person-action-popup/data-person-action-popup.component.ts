import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-data-person-action-popup',
  templateUrl: './data-person-action-popup.component.html',
  styleUrls: ['./data-person-action-popup.component.scss'],
})
export class DataPersonActionPopupComponent implements OnInit {
  dataPersonTakeAwayEdit!: FormGroup;
  constructor(private readonly _form: FormBuilder) {}

  ngOnInit(): void {
    this.buildForm();
  }
  public buildForm(): void {
    this.dataPersonTakeAwayEdit = this._form.group({
      dataPersonTakeAway: this._form.group({
        personName: [''],
        IDnumber: [''],
        pesel: [''],
        email: [''],
        tel: [''],
        adress: [''],
        city: [''],
        zipCode: [''],
        province: [''],
        comments: [''],
      }),
    });
  }
}
