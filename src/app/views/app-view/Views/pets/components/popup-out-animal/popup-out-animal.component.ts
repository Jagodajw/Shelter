import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { UntilDestroy } from '@ngneat/until-destroy';
import { PetService } from 'src/app/views/app-view/services/api/pet.service';

type PersonType = 'private' | 'legal' | 'none';
@UntilDestroy()
@Component({
  selector: 'app-popup-out-animal',
  templateUrl: './popup-out-animal.component.html',
  styleUrls: ['./popup-out-animal.component.scss'],
})
export class PopupOutAnimalComponent implements OnInit {
  outPetForm!: FormGroup;
  private typePerson: PersonType = 'private';
  constructor(
    private readonly api: PetService,
    private readonly _form: FormBuilder,
    @Inject(MAT_DIALOG_DATA)
    private data: { name: string; species: any | null | undefined; ID: string },
    private readonly dialogRef: MatDialogRef<
      PopupOutAnimalComponent,
      { isAdoption: boolean }
    >
  ) {}

  ngOnInit(): void {
    this.buildForm();
  }
  public buildForm(): void {
    this.outPetForm = this._form.group({
      dataPetOut: this._form.group({
        name: [{ value: this.data.name, disabled: true }],
        species: [{ value: this.data.species, disabled: true }],
        type_adoption: ['', Validators.required],
        date_of_adoption: [new Date(), Validators.required],
        introduced_employees_id: ['', Validators.required],
        accepted_employees_id: ['', Validators.required],
        description: [''],
      }),
      dataPersonTakeAway: this._form.group({
        name: [''],
        id_number: ['', [Validators.minLength(9), Validators.maxLength(9)]],
        pesel: ['', Validators.pattern('[0-9]{11}')],
        nip: [null],
        email: ['', Validators.email],
        telephone: ['', [Validators.minLength(9), Validators.maxLength(9)]],
        adress: [''],
        city: [''],
        zip_code: [''],
        commune: [''],
        province_id: [''],
        description: [''],
        type_of_person: [{ value: 'private', disabled: true }],
      }),
    });
  }

  public outPet(): void {
    this.api
      .adoptPet(this.data.ID, {
        dataPetOut: this.outPetForm.value.dataPetOut,
        dataPersonTakeAway: {
          ...this.outPetForm.value.dataPersonTakeAway,
          type_of_person: this.typePerson,
        },
      })
      .subscribe({
        next: () => {
          this.dialogRef.close({ isAdoption: true });
        },
      });
  }
  public close(): void {
    this.dialogRef.close({ isAdoption: false });
  }
}
