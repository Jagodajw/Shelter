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
    this.detailPetsForm
      .get('registerAnimal')
      ?.get('date_vaccination')
      ?.disable();
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
        id_number: ['', Validators.required],
        commune: [''],
        area: [''],
        color: [''],
        size: ['', Validators.required],
        gender: ['', Validators.required],
        nr_chip: ['', Validators.required],
        date_of_birth: ['', Validators.required],
        description_animal: [''],
        vaccination: [''],
        date_vaccination: [
          { value: '', disabled: true },
          [Validators.required],
        ],
      }),
      registerPeople: this._form.group({
        name: [''],
        id_number: [''],
        pesel: [null],
        nip: [null],
        email: [''],
        telephone: [''],
        adress: [''],
        city: [''],
        zip_code: [''],
        commune: [''],
        province: [''],
        description: [''],
      }),
      register: this._form.group({
        date_of_registration: [ new Date() , [Validators.required]],
        quarantine: ['', Validators.required],
        sterilization: ['', Validators.required],
        date_sterilization: [
          { value: '', disabled: true },
          [Validators.required],
        ],
        registerType: [''],
        introduced_employees: [''],
        accepted_employees: [''],
        commentsRegister: [''],
      }),
    });
    this.detailPetsOutForm = this._form.group({
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
}
