import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Params } from '@angular/router';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import {
  AdoptDataByAnimalIdResponse,
  AnimalDetailResponse,
} from 'backend/src/views/AnimalsView';
import {
  BehaviorSubject,
  catchError,
  filter,
  mergeMap,
  tap,
  throwError,
} from 'rxjs';
import { PetService } from '../../services/api/pet.service';

@UntilDestroy()
@Component({
  selector: 'app-pet-detail',
  templateUrl: './pet-detail.component.html',
  styleUrls: ['./pet-detail.component.scss'],
})
export class PetDetailComponent implements OnInit {
  private pet: any = [];
  detailPetsForm!: FormGroup;
  detailPetsOutForm!: FormGroup;
  isEditMode$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  public isAdopted: boolean = false;
  public edit: boolean = false;
  public attachments: FormControl = new FormControl();
  public isLoading$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(
    true
  );
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
    this.editPet();
    this.edit = false;
    this.detailPetsForm.disable();
    this.detailPetsOutForm.disable();
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
              this.isAdopted = !!pet.registerAnimal?.adopted;
              if (this.isAdopted) this.getPetAdoptData();
            }),
            catchError((err) => {
              if (
                err.error.ERROR_CODE === 'REGISTRATION_OF_ANIMAL_DOESNT_EXIST'
              )
                this.backClicked();
              return throwError(err);
            })
          )
        ),
        untilDestroyed(this)
      )
      .subscribe({
        next: () => this.isLoading$.next(false),
        error: (err) => this.isLoading$.next(false),
      });
  }
  private getPetAdoptData(): void {
    this.activatedRoute.params
      .pipe(
        filter((params: Params) => !!params['id']),
        mergeMap((params: Params) =>
          this.api.getPetAdoptDataById(params['id']).pipe(
            tap((petAdopted: AdoptDataByAnimalIdResponse) => {
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

              this.detailPetsOutForm
                .get('dataPetOut')
                ?.get('name')
                ?.patchValue(
                  this.detailPetsForm.get('registerAnimal')?.get('name')?.value
                );
              this.detailPetsOutForm
                .get('dataPetOut')
                ?.get('species')
                ?.patchValue(
                  this.detailPetsForm.get('registerAnimal')?.get('species')
                    ?.value
                );
            }),
            catchError((err) => {
              if (err.error.ERROR_CODE === 'ADOPTION_OF_ANIMAL_DOESNT_EXIST')
                this.backClicked();
              return throwError(err);
            })
          )
        ),
        untilDestroyed(this)
      )
      .subscribe({
        next: () => this.isLoading$.next(false),
        error: (err) => this.isLoading$.next(false),
      });
  }

  private editPet(): void {
    this.api.editPet(this.detailPetsForm.value).subscribe({
      next: () => {
        this.isEditMode$.next(false);
      },
    });
  }

  downloadAttachment(attachmentId: string): void {
    // if (!this.data?.id) {
    //     this.notification.openFromComponent(NotificationComponent, {
    //         data: {
    //             title: this.translocoService.translate('settings.save'),
    //             variant: 'error',
    //         },
    //     });
    //     return;
    // }
    // this.customApi
    //     .documentAttachmentAttachmentIdGet(attachmentId, this.data.id)
    //     .subscribe((file: Blob) => FileSaver.saveAs(file));
  }

  deleteAttachment(attachmentId: string): void {
    // if (!this.data?.id) return;
    // this.iCApiDocumentService
    //     .documentDeleteDocumentIdAttachmentDelete(
    //         this.data.id,
    //         attachmentId,
    //     )
    //     .subscribe(() => {
    //         this.notification.openFromComponent(NotificationComponent, {
    //             data: {
    //                 title: this.translocoService.translate(
    //                     'common.delete-success',
    //                 ),
    //                 variant: 'success',
    //             },
    //         });
    //         this.sendModel.emit({ refreshPage: true });
    //     });
  }
}
