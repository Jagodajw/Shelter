import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import {
  AdoptDataByAnimalIdResponse,
  AnimalDetailResponse,
} from 'backend/src/models/AnimalsModel';
import { PetDetailService } from '../../pet-detail.service';

@UntilDestroy()
@Component({
  selector: 'app-pet-out-data',
  templateUrl: './pet-out-data.component.html',
  styleUrls: ['./pet-out-data.component.scss'],
})
export class PetOutDataComponent implements OnInit {
  detailPetsOutForm!: FormGroup;

  @Input() set basicData(basicData: AnimalDetailResponse | null) {
    if (basicData === null) return;
    this.detailPetsOutForm
      .get('dataPetOut')
      ?.get('name')
      ?.patchValue(basicData.registerAnimal?.name);
    this.detailPetsOutForm
      .get('dataPetOut')
      ?.get('species')
      ?.patchValue(basicData.registerAnimal?.species);
  }

  @Input() set data(petAdopted: AdoptDataByAnimalIdResponse | null) {
    if (petAdopted === null) return;

    this.detailPetsOutForm.patchValue(petAdopted);
    this.detailPetsOutForm
      .get('dataPetOut')
      ?.get('accepted_employees_id')
      ?.patchValue(petAdopted.dataPetOut?.accepted_employees);
    this.detailPetsOutForm
      .get('dataPetOut')
      ?.get('introduced_employees_id')
      ?.patchValue(petAdopted.dataPetOut?.introduced_employees);
    this.detailPetsOutForm
      .get('dataPersonTakeAway')
      ?.get('province_id')
      ?.patchValue(petAdopted.dataPersonTakeAway?.province);
  }

  constructor(
    private readonly _form: FormBuilder,
    private readonly root: PetDetailService,
    private readonly activatedRoute: ActivatedRoute
  ) {
    this.buildForm();
  }

  ngOnInit(): void {
    this.root.isEditModeObservable$
      .pipe(untilDestroyed(this))
      .subscribe((isEditMode: boolean) => {
        if (isEditMode) this.detailPetsOutForm.enable();
        else this.detailPetsOutForm.disable();
      });
  }

  public buildForm(): void {
    this.detailPetsOutForm = this._form.group({
      dataPetOut: this._form.group({
        ID: [],
        name: ['', Validators.required],
        species: ['', Validators.required],
        typeAdoption: ['', Validators.required],
        date_of_adoption: [, Validators.required],
        introduced_employees_id: ['', Validators.required],
        accepted_employees_id: ['', Validators.required],
        description: [''],
        animals_id: [''],
      }),
      dataPersonTakeAway: this._form.group({
        ID: [],
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
        comments: [''],
      }),
    });
  }

  public editPetAdopted(): void {
    this.root.editAdoptPetData(this.detailPetsOutForm.value).subscribe({
      next: () => this.detailPetsOutForm.disable(),
      error: (err) => this.detailPetsOutForm.disable(),
    });
  }
}
