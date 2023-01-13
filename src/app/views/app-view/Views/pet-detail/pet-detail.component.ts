import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Location } from '@angular/common';
import { ApiService } from 'src/api/services';
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
    private _location: Location,
    private readonly api: ApiService
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
      registerAnimal: this._form.group({
        name: ['', Validators.required],
        species_id: ['', Validators.required],
        breed_id: ['', Validators.required],
        id_number: ['', Validators.required],
        commune_id: [''],
        area_id: [''],
        color_id: [''],
        size: ['', Validators.required],
        gender: ['', Validators.required],
        nr_chip: ['', Validators.required],
        date_of_birth: ['', Validators.required],
        description_animal: [''],
        // DateGraft: [''],
      }),
      registerPeople: this._form.group({
        name: [''],
        id_number: [''],
        pesel: [null],
        nip: [null],
        email: [''],
        telephone: [''],
        adress: [''],
        city_id: [''],
        province_id: [''],
        description: [''],
        //not sure, zipCode is in city object, or isn't?
        zipCode: [''],
      }),
      register: this._form.group({
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
