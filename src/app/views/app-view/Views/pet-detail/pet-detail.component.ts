import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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
    this.detailPetsForm
      .get('registerAnimal')
      ?.get('date_vaccination')
      ?.disable();
    this.detailPetsForm.get('registerAnimal')?.get('id_number')?.disable();
    this.detailPetsForm.get('register')?.get('date_sterilization')?.disable();
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
        species: ['', Validators.required],
        breed: ['', Validators.required],
        id_number: [{ value: '', disabled: true }],
        commune: ['', Validators.required],
        area: ['', Validators.required],
        color: ['', Validators.required],
        size: ['', Validators.required],
        gender: ['', Validators.required],
        nr_chip: ['', Validators.required],
        date_of_birth: ['', Validators.required],
        description_animal: [''],
        vaccination: [false],
        date_vaccination: [{ value: '', disabled: true }],
      }),
      registerPeople: this._form.group({
        name: ['', Validators.required],
        id_number: [''],
        pesel: [null],
        nip: [null],
        email: [''],
        telephone: [''],
        adress: ['', Validators.required],
        city: ['', Validators.required],
        zip_code: [''],
        commune: ['', Validators.required],
        province: ['', Validators.required],
        description: [''],
      }),
      register: this._form.group({
        date_of_registration: [new Date(), Validators.required],
        quarantine: ['', Validators.required],
        sterilization: [false],
        date_sterilization: [{ value: '', disabled: true }],
        type_of_acceptance: [''],
        introduced_employees_id: [''],
        accepted_employees_id: [''],
        commentsRegister: [''],
      }),
    });
    this.detailPetsOutForm = this._form.group({
      dataPetOut: this._form.group({
        name: ['', Validators.required],
        species: ['', Validators.required],
        typeOut: ['', Validators.required],
        dateOut: ['', Validators.required],
        introduced_employees_id: ['', Validators.required],
        accepted_employees_id: ['', Validators.required],
        commentsOut: [''],
      }),
      dataPersonTakeAway: this._form.group({
        name: ['', Validators.required],
        id_number: [''],
        pesel: [null],
        nip: [null],
        email: [''],
        telephone: [''],
        adress: ['', Validators.required],
        city: ['', Validators.required],
        zip_code: [''],
        commune: ['', Validators.required],
        province: ['', Validators.required],
        comments: [''],
      }),
    });
  }
}
