import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Location } from '@angular/common';
@Component({
  selector: 'app-pet-detail',
  templateUrl: './pet-detail.component.html',
  styleUrls: ['./pet-detail.component.scss'],
})
export class PetDetailComponent implements OnInit {
  detailPetsForm!: FormGroup;
  detailPetsOutForm!: FormGroup;
  public edit: boolean = false;
  constructor(
    private readonly _form: FormBuilder,
    private _location: Location
  ) {}

  ngOnInit(): void {
    this.buildForm();
    if (!this.edit) {
      this.detailPetsForm.disable();
      this.detailPetsOutForm.disable();
    }
  }
  backClicked() {
    this._location.back();
  }
  public editButtonClick() {
    this.edit = true;
    this.detailPetsForm.enable();
    this.detailPetsOutForm.enable();
  }
  public saveEditButtonClick() {
    this.edit = false;
    this.detailPetsForm.disable();
    this.detailPetsOutForm.disable();
  }
  public buildForm(): void {
    this.detailPetsForm = this._form.group({
      dataPetRegister: this._form.group({
        name: ['', Validators.required],
        species: ['', Validators.required],
        breed: ['', Validators.required],
        ID: ['', Validators.required],
        community: [''],
        area: [''],
        color: [''],
        size: ['', Validators.required],
        gender: ['', Validators.required],
        nrChip: ['', Validators.required],
        dateBirth: ['', Validators.required],
        description: [''],
        // DateGraft: [''],
      }),
      dataPersonRegister: this._form.group({
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
      dataRegister: this._form.group({
        dateRegister: ['', Validators.required],
        dateCuarantineTo: ['', Validators.required],
        castred: ['', Validators.required],
        dateCastred: ['', Validators.required],
        registerType: [''],
        introduced: [''],
        accepted: [''],
        commentsRegister: [''],
      }),
    });
    this.detailPetsOutForm = this._form.group({
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
        zipCode: [''],
        province: [''],
        comments: [''],
      }),
    });
  }
}