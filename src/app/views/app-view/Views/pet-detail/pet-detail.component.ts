import { Location } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatTabGroup } from '@angular/material/tabs';
import { ActivatedRoute, Params } from '@angular/router';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import {
  AdoptDataByAnimalIdResponse,
  AnimalDetailResponse,
} from 'backend/src/views/AnimalsView';
import { DocumentResponse } from 'backend/src/views/DocumentView';
import FileSaver from 'file-saver';
import {
  BehaviorSubject,
  Observable,
  catchError,
  filter,
  mergeMap,
  tap,
  throwError,
} from 'rxjs';
import { SnackbarMessageService } from 'src/app/services/snackbar-message.service';
import { FileReaderDialogComponent } from '../../components/file-reader-dialog/component/file-reader-dialog.component';
import { DocumentService } from '../../services/api/document.service';
import { PetService } from '../../services/api/pet.service';
import { PetBasicDataComponent } from './components/pet-basic-data/pet-basic-data.component';
import { PetOutDataComponent } from './components/pet-out-data/pet-out-data.component';
import { PetDetailService } from './pet-detail.service';

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
  public avatar$: BehaviorSubject<Blob | null> =
    new BehaviorSubject<Blob | null>(null);
  public documents$: Observable<DocumentResponse[]>;

  constructor(
    private _location: Location,
    private readonly api: PetService,
    private readonly activatedRoute: ActivatedRoute,
    private readonly root: PetDetailService,
    private readonly documentApi: DocumentService,
    private readonly snackBarMessage: SnackbarMessageService,
    private readonly dialog: MatDialog
  ) {
    this.isEditMode$ = this.root.isEditModeObservable$;
    this.documents$ = this.getDocuments$;
  }

  ngOnInit(): void {
    this.getPetData();

    this.attachments.valueChanges
      .pipe(untilDestroyed(this))
      .subscribe((files: FormData[]) => {
        files.forEach((file: FormData) => {
          file.set('animals_id', this.activatedRoute.snapshot.params['id']);
          this.documentApi.addDocument(file).subscribe({
            next: () => {
              this.snackBarMessage.showMessageSnackBar(
                'pets.documentHasBeenAdd'
              );

              this.documents$ = this.getDocuments$;
            },
          });
        });
      });
  }

  private get getDocuments$(): Observable<DocumentResponse[]> {
    return this.documentApi.getDocumentsByPetId(
      this.activatedRoute.snapshot.params['id']
    );
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
        mergeMap((petResponse: AnimalDetailResponse) =>
          this.api
            .getPetAvatar(petResponse.registerAnimal!.ID)
            .pipe(tap((avatar: Blob) => this.avatar$.next(avatar)))
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

  public updateAvatar(updatedAvatar: FormData | null): void {
    const petId = this.activatedRoute.snapshot.params['id'];
    if (petId === null) return;
    if (updatedAvatar === null) {
      this.root.deletePetAvatar(petId).subscribe();
      return;
    }
    this.root.setPetAvater(petId, updatedAvatar).subscribe();
  }

  downloadAttachment({ ID, name }: { ID: string; name: string }): void {
    this.documentApi.getFile(ID).subscribe({
      next: (file: Blob) => {
        FileSaver.saveAs(file, name);
        this.snackBarMessage.showMessageSnackBar('pets.downloadDocumet');
      },
    });
  }

  deleteAttachment({ ID }: { ID: string; name: string }): void {
    this.documentApi.deleteDocument(ID).subscribe({
      next: () => {
        this.snackBarMessage.showMessageSnackBar('pets.deletedDocument');
        this.documents$ = this.getDocuments$;
      },
    });
  }

  showAttachment({ ID, name }: { ID: string; name: string }): void {
    this.documentApi
      .getFile(ID)
      .pipe(
        mergeMap((file: Blob) =>
          this.dialog
            .open(FileReaderDialogComponent, { data: { file, fileName: name } })
            .afterClosed()
        )
      )
      .subscribe();
  }
}
