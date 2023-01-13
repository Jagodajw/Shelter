import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { RegisterAddAnimalRequest } from 'backend/src/models/AnimalsModel';
import { AnimalsService, ShelterService } from 'src/api/services';
import { Select } from 'src/app/views/app-view/components/select/select';
import { PetService } from 'src/app/views/app-view/services/api/pet.service';

type PersonType = 'private' | 'legal' | 'none';
interface Data {
  shelter: ShelterService;
}
@Component({
  selector: 'app-popup-register',
  templateUrl: './popup-register.component.html',
  styleUrls: ['./popup-register.component.scss'],
})
export class PopupRegisterComponent implements OnInit {
  public registerPetsForm!: FormGroup<RegisterAddAnimalRequest>;
  private typePerson!: PersonType;

  constructor(
    private readonly _form: FormBuilder,
    private readonly animalApi: AnimalsService,
    private readonly dialogRef: MatDialogRef<PopupRegisterComponent, undefined>,
    @Inject(MAT_DIALOG_DATA) private readonly data: Data,
  ) {}

  ngOnInit(): void {
    this.buildForm();
  }

  public buildForm(): void {
    this.registerPetsForm = this._form.group({
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
  }
  public personType(event: PersonType) {
    this.typePerson = event;
  }

  public arrayOfSpecies: Select[] = [
    { id: 0, name: 'kot' },
    { id: 1, name: 'pies' },
  ];

  public sizeList: Select[] = [
    { id: 'small', name: 'size.small' },
    { id: 'medium', name: 'size.medium' },
    { id: 'large', name: 'size.large' },
  ];

  public genderList: Select[] = [
    { id: 'female', name: 'gender.female' },
    { id: 'male', name: 'gender.male' },
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
            type_of_person: this.personType,
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
