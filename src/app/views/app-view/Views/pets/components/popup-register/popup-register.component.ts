import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { AnimalsService } from 'src/api/services';
import { Select } from 'src/app/views/app-view/components/select/select';

@Component({
  selector: 'app-popup-register',
  templateUrl: './popup-register.component.html',
  styleUrls: ['./popup-register.component.scss'],
})
export class PopupRegisterComponent implements OnInit {
  registerPetsForm!: FormGroup;

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
      dataPetRegister: this._form.group({
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
      dataPersonRegister: this._form.group({
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

  public addPet(): void {
    // to test, basic implementation without
    this.animalApi
      .postAnimalRegistration({ body: this.registerPetsForm.value })
      .subscribe({
        next: () => {
          this.dialogRef.close();
        },
      });
  }
}
