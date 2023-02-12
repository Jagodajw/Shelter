import { Location } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ActivatedRoute, Params } from '@angular/router';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import {
  AdoptDataByAnimalIdResponse,
  AnimalDetailResponse,
} from 'backend/src/models/AnimalsModel';
import {
  BehaviorSubject,
  catchError,
  filter,
  mergeMap,
  Observable,
  tap,
  throwError,
} from 'rxjs';
import { PetService } from '../../services/api/pet.service';
import { PetDetailService } from './pet-detail.service';
import { MatTabGroup } from '@angular/material/tabs';
import { PetBasicDataComponent } from './components/pet-basic-data/pet-basic-data.component';
import { PetOutDataComponent } from './components/pet-out-data/pet-out-data.component';

enum PetSteps {
  basicData = 0,
  outData = 1,
  files = 2,
}

@UntilDestroy()
@Component({
  selector: 'app-pet-detail',
  templateUrl: './pet-detail.component.html',
  styleUrls: ['./pet-detail.component.scss'],
  providers: [PetDetailService],
})
export class PetDetailComponent implements OnInit {
  @ViewChild('tabGroup') public tabGroup!: MatTabGroup;
  @ViewChild('basicDataRef') public basicDataRef?: PetBasicDataComponent;
  @ViewChild('outDataRef') public outDataRef?: PetOutDataComponent;
  public readonly isEditMode$: Observable<boolean>;
  public readonly petStepsEnum: typeof PetSteps = PetSteps;
  public isAdopted: boolean = false;
  public edit: boolean = false;
  public attachments: FormControl = new FormControl();
  public isLoading$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(
    true
  );
  public basicData$: BehaviorSubject<Nullable<AnimalDetailResponse>> =
    new BehaviorSubject<Nullable<AnimalDetailResponse>>(null);
  public adoptedData$: BehaviorSubject<Nullable<AdoptDataByAnimalIdResponse>> =
    new BehaviorSubject<Nullable<AdoptDataByAnimalIdResponse>>(null);

  constructor(
    private _location: Location,
    private readonly api: PetService,
    private readonly activatedRoute: ActivatedRoute,
    private readonly root: PetDetailService
  ) {
    this.isEditMode$ = this.root.isEditModeObservable$;
  }

  ngOnInit(): void {
    this.getPetData();
  }

  public backClicked() {
    this._location.back();
  }
  
  public editButtonClick() {
    this.root.toggleEditMode();
  }
  public saveEditButtonClick() {
    switch (this.tabGroup.selectedIndex) {
      case PetSteps.basicData:
        this.basicDataRef?.editPet();
        break;

      case PetSteps.outData:
        this.outDataRef?.editPetAdopted();
        break;
    }
  }

  private getPetData(): void {
    this.activatedRoute.params
      .pipe(
        filter((params: Params) => !!params['id']),
        mergeMap((params: Params) =>
          this.api.getPetById(params['id']).pipe(
            tap((pet: AnimalDetailResponse) => {
              this.basicData$.next(pet);
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
        error: () => this.isLoading$.next(false),
      });
  }
  private getPetAdoptData(): void {
    this.activatedRoute.params
      .pipe(
        filter((params: Params) => !!params['id']),
        mergeMap((params: Params) =>
          this.api.getPetAdoptDataById(params['id']).pipe(
            tap((petAdopted: AdoptDataByAnimalIdResponse) => {
              this.adoptedData$.next(petAdopted);
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
