import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { AnimalDetailResponse } from 'backend/src/models/AnimalsModel';
import { PetDetailService } from '../../pet-detail.service';

@UntilDestroy()
@Component({
  selector: 'app-pet-basic-data',
  templateUrl: './pet-basic-data.component.html',
  styleUrls: ['./pet-basic-data.component.scss'],
})
export class PetBasicDataComponent implements OnInit {
  public detailPetsForm!: FormGroup;

  @Input() set data(basicData: AnimalDetailResponse | null) {
    if (basicData === null) return;

    this.detailPetsForm.patchValue(basicData);
    this.detailPetsForm
      .get('register')
      ?.get('accepted_employees_id')
      ?.patchValue(basicData.register?.accepted_employees);
    this.detailPetsForm
      .get('register')
      ?.get('introduced_employees_id')
      ?.patchValue(basicData.register?.introduced_employees);
    this.detailPetsForm
      .get('registerPeople')
      ?.get('province_id')
      ?.patchValue(basicData.registerPeople?.province);
    this.cd.markForCheck();
  }

  constructor(
    private readonly _form: FormBuilder,
    private readonly root: PetDetailService,
    private readonly cd: ChangeDetectorRef
  ) {
    this.buildForm();
    this.detailPetsForm.disable();
  }

  ngOnInit(): void {
    this.root.isEditModeObservable$
      .pipe(untilDestroyed(this))
      .subscribe((isEditMode: boolean) => {
        const dateVaccination = this.detailPetsForm
          .get('registerAnimal')
          ?.get('date_vaccination');

        const dateSterilization = this.detailPetsForm
          .get('register')
          ?.get('date_sterilization');

        if (isEditMode) {
          this.detailPetsForm.enable();
          this.detailPetsForm
            .get('registerAnimal')
            ?.get('id_number')
            ?.disable();
          if (dateSterilization?.value) {
            dateSterilization.enable;
          } else {
            dateSterilization?.disable();
          }
          if (dateVaccination?.value) {
            dateVaccination?.enable();
          } else {
            dateVaccination?.disable();
          }
        } else {
          this.detailPetsForm.disable();
        }
      });
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
        pesel: [null, Validators.pattern('[0-9]{11}')],
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
  }

  public editPet(): void {
    this.root.editPet(this.detailPetsForm.value).subscribe({
      next: () => this.detailPetsForm.disable(),
      error: () => this.detailPetsForm.disable(),
    });
  }
}
