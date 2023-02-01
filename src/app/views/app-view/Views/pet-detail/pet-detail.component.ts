import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params } from '@angular/router';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { AnimalDetailResponse } from 'backend/src/models/AnimalsModel';
import { BehaviorSubject, filter, mergeMap, tap } from 'rxjs';
import { PetService } from '../../services/api/pet.service';
@UntilDestroy()
@Component({
  selector: 'app-pet-detail',
  templateUrl: './pet-detail.component.html',
  styleUrls: ['./pet-detail.component.scss'],
})
export class PetDetailComponent implements OnInit {
  pet: any = [];
  detailPetsForm!: FormGroup;
  detailPetsOutForm!: FormGroup;
  isEditMode$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  public edit: boolean = false;
  constructor(
    private readonly _form: FormBuilder,
    private _location: Location,
    private readonly api: PetService,
    private readonly activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.buildForm();
    if (!this.edit) {
      this.detailPetsForm.disable();
      this.detailPetsOutForm.disable();
    }
    this.getPetData();
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
    this.isEditMode$.next(true);
  }
  public saveEditButtonClick() {
    this.edit = false;
    this.detailPetsForm.disable();
    this.detailPetsOutForm.disable();
    this.editPet();
  }
  public buildForm(): void {
    this.detailPetsForm = this._form.group({
      registerAnimal: this._form.group({
        ID: [],
        shelters_id: [],
        name: ['', Validators.required],
        species: ['', Validators.required],
        breed: ['', Validators.required],
        id_number: [{ value: '', disabled: true }],
        commune: ['', Validators.required],
        area: ['', Validators.required],
        color: ['', Validators.required],
        size: ['', Validators.required],
        gender: ['', Validators.required],
        nr_chip: [
          '',
          [
            Validators.required,
            Validators.minLength(15),
            Validators.maxLength(15),
          ],
        ],
        date_of_birth: [''],
        description_animal: [''],
        vaccination: [false],
        date_vaccination: [{ value: null, disabled: true }],
      }),
      registerPeople: this._form.group({
        ID: [],
        shelters_id: [],
        name: ['', Validators.required],
        id_number: [''],
        pesel: [null, [Validators.minLength(9), Validators.maxLength(9)]],
        nip: [null],
        email: ['', Validators.email],
        telephone: ['', [Validators.minLength(9), Validators.maxLength(9)]],
        adress: ['', Validators.required],
        city: ['', Validators.required],
        zip_code: [''],
        commune: ['', Validators.required],
        province_id: ['', Validators.required],
        description: [''],
      }),
      register: this._form.group({
        ID: [],
        shelters_id: [],
        date_of_registration: ['', Validators.required],
        quarantine: ['', Validators.required],
        sterilization: [false],
        date_sterilization: [{ value: null, disabled: true }],
        type_of_acceptance: [''],
        introduced_employees_id: [''],
        accepted_employees_id: [''],
        commentsRegister: [''],
      }),
    });
    this.detailPetsOutForm = this._form.group({
      dataPetOut: this._form.group({
        ID: [],
        name: ['', Validators.required],
        species: ['', Validators.required],
        type_adoption: ['', Validators.required],
        date_of_adoption: [, Validators.required],
        introduced_employees_id: ['', Validators.required],
        accepted_employees_id: ['', Validators.required],
        description: [''],
      }),
      dataPersonTakeAway: this._form.group({
        ID: [],
        name: ['', Validators.required],
        id_number: [''],
        pesel: [null, [Validators.minLength(9), Validators.maxLength(9)]],
        nip: [null],
        email: ['', Validators.email],
        telephone: ['', [Validators.minLength(9), Validators.maxLength(9)]],
        adress: ['', Validators.required],
        city: ['', Validators.required],
        zip_code: [''],
        commune: ['', Validators.required],
        province_id: ['', Validators.required],
        comments: [''],
      }),
    });
  }

  private getPetData(): void {
    this.activatedRoute.params
      .pipe(
        filter((params: Params) => !!params['id']),
        mergeMap((params: Params) =>
          this.api.getPetById(params['id']).pipe(
            tap((pet: AnimalDetailResponse) => {
              this.detailPetsForm.patchValue(pet);
              this.detailPetsForm
                .get('register')
                ?.get('accepted_employees_id')
                ?.patchValue(pet.register?.accepted_employees);
              this.detailPetsForm
                .get('register')
                ?.get('introduced_employees_id')
                ?.patchValue(pet.register?.introduced_employees);
              this.detailPetsForm
                .get('registerPeople')
                ?.get('province_id')
                ?.patchValue(pet.registerPeople?.province);
            })
          )
        ),
        untilDestroyed(this)
      )
      .subscribe();
  }

  private editPet(): void {
    this.api.editPet(this.detailPetsForm.value).subscribe({
      next: () => {
        this.isEditMode$.next(false);
      },
    });
  }
}
