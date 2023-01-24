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
        id_number: [''],
        commune: [''],
        area: [''],
        color: [''],
        size: ['', Validators.required],
        gender: ['', Validators.required],
        nr_chip: ['', Validators.required],
        date_of_birth: ['', Validators.required],
        description_animal: [''],
        vaccination: [false],
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
        city: [''],
        commune: [{ ID: 1, name: 'Commune' }],
        province: [''],
        description: [''],
        //not sure, zipCode is in city object, or isn't?
        zipCode: [''],
      }),
      register: this._form.group({
        date_of_registration: ['', Validators.required],
        dateCuarantineTo: ['', Validators.required],
        castred: ['', Validators.required],
        dateCastred: ['', Validators.required],
        registerType: [''],
        introduced: [''],
        accepted: [''],
        commentsRegister: [''],
        sterilization: [false],
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
            // type_of_person: this.personType,
          },
        },
      })
      .subscribe({
        next: () => {
          this.dialogRef.close();
        },
      });
  }
}
