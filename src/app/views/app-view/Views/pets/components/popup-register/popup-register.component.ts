import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { AnimalsService } from 'src/api/services';
import { Select } from 'src/app/views/app-view/components/select/select';

type PersonType = 'private' | 'legal' | 'none';
@Component({
  selector: 'app-popup-register',
  templateUrl: './popup-register.component.html',
  styleUrls: ['./popup-register.component.scss'],
})
export class PopupRegisterComponent implements OnInit {
  public registerPetsForm!: FormGroup;
  private typePerson!: PersonType;

  constructor(
    private readonly _form: FormBuilder,
    private readonly animalApi: AnimalsService,
    private readonly dialogRef: MatDialogRef<PopupRegisterComponent, undefined>
  ) {}

  ngOnInit(): void {
    this.buildForm();
  }

  public buildForm(): void {
    this.registerPetsForm = this._form.group({
      registerAnimal: this._form.group({
        name: ['', Validators.required],
        species: ['', Validators.required],
        breed: ['', Validators.required],
        id_number: [{ value: '', disabled: true }],
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
        date_of_registration: [new Date(), Validators.required],
        quarantine: ['', Validators.required],
        sterilization: ['', Validators.required],
        date_sterilization: [
          { value: '', disabled: true },
          [Validators.required],
        ],
        registerType: [''],
        introduced_employees_id: [''],
        accepted_employees_id: [''],
        commentsRegister: [''],
      }),
    });
  }
  public personType(event: PersonType) {
    this.typePerson = event;
  }

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

  chooseSelect(event: Select) {
    console.log(event);
  }

  chooseAutocomplete(event: Select) {
    console.log(event);
  }

  public addPet(): void {
    // to test, basic implementation without
    this.animalApi
      .postAnimalRegistration({
        body: {
          ...this.registerPetsForm.value,
          registerPeople: {
            ...this.registerPetsForm.value.registerPeople,
            type_of_person: this.typePerson,
          },
        },
      })
      .subscribe({
        next: () => {
          this.dialogRef.close();
        },
      });
  }

  public close(): void {
    this.dialogRef.close();
  }
}
