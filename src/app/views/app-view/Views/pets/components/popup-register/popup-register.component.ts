import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { EMPTY, mergeMap } from 'rxjs';
import { PetService } from 'src/app/views/app-view/services/api/pet.service';

type PersonType = 'private' | 'legal' | 'none';
@Component({
  selector: 'app-popup-register',
  templateUrl: './popup-register.component.html',
  styleUrls: ['./popup-register.component.scss'],
})
export class PopupRegisterComponent implements OnInit {
  public registerPetsForm!: FormGroup;
  private typePerson!: PersonType;
  public quarantineDate!: Date;

  constructor(
    private readonly _form: FormBuilder,
    private readonly api: PetService,
    private readonly dialogRef: MatDialogRef<
      PopupRegisterComponent,
      { isAdded: boolean }
    >
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
        date_vaccination: [{ value: '', disabled: true }],
        avatar: [],
      }),
      registerPeople: this._form.group({
        name: ['', Validators.required],
        id_number: ['', [Validators.minLength(9), Validators.maxLength(9)]],
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
        date_of_registration: [new Date(), Validators.required],
        quarantine: [this.setQuarantineDate(), Validators.required],
        sterilization: [false],
        date_sterilization: [{ value: '', disabled: true }],
        type_of_acceptance: [''],
        introduced_employees_id: [''],
        accepted_employees_id: [''],
        commentsRegister: [''],
      }),
    });
  }
  public personType(event: PersonType) {
    this.typePerson = event;
  }

  public addPet(): void {
    const isAvatarChosen: boolean = !!this.registerPetsForm.get(
      'registerAnimal.avatar'
    )!.value;

    this.api
      .addPet({
        ...this.registerPetsForm.value,
        registerPeople: {
          ...this.registerPetsForm.value.registerPeople,
          type_of_person: this.typePerson,
        },
      })
      .pipe(
        mergeMap((register) =>
          isAvatarChosen
            ? this.api.setPetAvatar(
                register.registerAnimal.ID,
                this.registerPetsForm.get('registerAnimal.avatar')!.value
              )
            : EMPTY
        )
      )
      .subscribe({
        next: () => this.successfulCloseDialog(),
        complete: () => this.successfulCloseDialog(),
      });
  }

  private successfulCloseDialog(): void {
    this.dialogRef.close({ isAdded: true });
  }

  public close(): void {
    this.dialogRef.close({ isAdded: false });
  }

  private setQuarantineDate(): Date {
    this.quarantineDate = new Date();
    const day = this.quarantineDate.getDate() + 14;
    this.quarantineDate.setDate(day);
    return this.quarantineDate;
  }
}
