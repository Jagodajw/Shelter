import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UntilDestroy } from '@ngneat/until-destroy';

@UntilDestroy()
@Component({
  selector: 'app-popup-out-animal',
  templateUrl: './popup-out-animal.component.html',
  styleUrls: ['./popup-out-animal.component.scss'],
})
export class PopupOutAnimalComponent implements OnInit {
  outPetForm!: FormGroup;
  constructor(
    private readonly _form: FormBuilder,
    @Inject(MAT_DIALOG_DATA) private data: { name: string; species: string }
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
        id_number: [''],
        pesel: [null, [Validators.minLength(9), Validators.maxLength(9)]],
        nip: [null],
        email: ['', Validators.email],
        telephone: ['', [Validators.minLength(9), Validators.maxLength(9)]],
        adress: [''],
        city: [''],
        zip_code: [''],
        commune: [''],
        province_id: [''],
        comments: [''],
      }),
    });
  }
}
