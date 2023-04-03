import { Injectable } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import {
  AnimalQuery,
  AnimalStatus,
  AnimalTableResponse,
} from 'backend/src/views/AnimalsView';
import {
  BehaviorSubject,
  Observable,
  combineLatest,
  filter,
  map,
  mergeMap,
  tap,
} from 'rxjs';
import { PetService } from '../../../services/api/pet.service';
import { ShelterService } from '../../../services/shelter.service';
import { PopupOutAnimalComponent } from '../components/popup-out-animal/popup-out-animal.component';
import { PopupRegisterComponent } from '../components/popup-register/popup-register.component';
import { delay } from 'rxjs/operators';

interface ChangesParams {
  status: AnimalStatus;
  searchQuery: AnimalQuery | null;
}
@UntilDestroy()
@Injectable()
export class PetsRootService {
  private readonly pets$: BehaviorSubject<AnimalTableResponse[]> =
    new BehaviorSubject<AnimalTableResponse[]>([]);
  public status$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(
    false
  );
  public isLoading$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(
    true
  );
  public numberOfAnimalsVaccinationChecks$!: Observable<number>;
  public numberOfAnimalsReleaseControl$!: Observable<number>;
  public readonly searchQuery$: BehaviorSubject<AnimalQuery | null> =
    new BehaviorSubject<AnimalQuery | null>(null);
  public readonly alertControl: FormControl = new FormControl([false]);

  constructor(
    private dialog: MatDialog,
    private readonly api: PetService,
    private readonly shelter: ShelterService
  ) {
    this.changeDetector();
  }

  public addPet(): void {
    this.dialog
      .open(PopupRegisterComponent, {
        panelClass: ['input-70', 'modal-without-padding'],
        disableClose: true,
      })
      .afterClosed()
      .pipe(
        filter((data: { isAdded: boolean }) => data.isAdded === true),
        mergeMap(() => this.refreschGet())
      )

      .subscribe();
  }

  private changeDetector(): void {
    combineLatest(
      this.status$,
      this.searchQuery$,
      this.shelter.selectedShelterChangeDetector$.pipe(
        tap(() => this.searchQuery$.next(null))
      )
    )
      .pipe(
        tap(() => {
          this.isLoading$.next(true);
          this.setNumberOfAnimals();
        }),
        map(
          ([status, searchQuery]) =>
            ({
              status: status ? 'adopted' : 'staying',
              searchQuery,
            } as ChangesParams)
        ),
        mergeMap(({ status, searchQuery }: ChangesParams) => {
          if (searchQuery !== null)
            return this.api.getPetsByQuery(searchQuery, status);
          return this.api.getPets(status);
        }),
        untilDestroyed(this)
      )
      .subscribe({
        next: (petsData: AnimalTableResponse[]) => {
          this.alertControl.patchValue([false]);
          this.pets$.next(petsData);
          this.isLoading$.next(false);
        },
        error: () => this.isLoading$.next(false),
      });
  }

  public outPet(petId: string): void {
    const pet = this.pets$.value.find((pets) => pets.ID === petId);

    this.dialog
      .open(PopupOutAnimalComponent, {
        panelClass: ['input-70', 'modal-without-padding'],
        data: { name: pet?.name, species: pet?.species_object, ID: petId },
        disableClose: true,
      })
      .afterClosed()
      .pipe(
        filter((data: { isAdoption: boolean }) => data.isAdoption === true),
        mergeMap(() => this.refreschGet())
      )
      .subscribe();
  }

  public deletePet(petId: string): void {
    this.api
      .deletePet(petId)
      .pipe(mergeMap(() => this.refreschGet()))
      .subscribe();
  }

  public get petsObservable$(): Observable<AnimalTableResponse[]> {
    return this.pets$.asObservable();
  }

  public getPetsByQuery(query: AnimalQuery): void {
    this.api.getPetsByQuery(query).subscribe({
      next: (query) => this.pets$.next(query),
    });
  }

  public getAnimalsToVaccinationChecks(): void {
    const alertValue: boolean | undefined = this.alertControl.value[0];
    if (alertValue === undefined || alertValue === false) {
      this.refreschGet().subscribe({
        next: () => this.isLoading$.next(false),
        error: () => this.isLoading$.next(false),
      });
      return;
    }
    this.isLoading$.next(true);
    this.api.getAnimalsToVaccinationChecks().subscribe({
      next: (pets: AnimalTableResponse[]) => {
        this.pets$.next(pets), this.isLoading$.next(false);
      },
    });
  }

  public getAnimalsReleaseControl(): void {
    const alertValue: boolean | undefined = this.alertControl.value[0];
    if (alertValue === undefined || alertValue === false) {
      this.isLoading$.next(true);
      this.api
        .getPets('adopted')
        .pipe(
          tap((petsData: AnimalTableResponse[]) => {
            this.pets$.next(petsData);
          })
        )
        .subscribe({
          next: () => this.isLoading$.next(false),
          error: () => this.isLoading$.next(false),
        });
      return;
    }

    this.api.getAnimalsToReleaseControl().subscribe({
      next: (pets: AnimalTableResponse[]) => this.pets$.next(pets),
    });
  }

  private refreschGet(): Observable<AnimalTableResponse[]> {
    return this.api.getPets(this.getPetStatus(this.status$.value)).pipe(
      tap((petsData: AnimalTableResponse[]) => {
        this.pets$.next(petsData);
      })
    );
  }

  private setNumberOfAnimals(): void {
    this.numberOfAnimalsVaccinationChecks$ =
      this.api.getNumberOfAnimalsVaccinationChecks();

    this.numberOfAnimalsReleaseControl$ =
      this.api.getNumberOfAnimalsReleaseControl();
  }

  public get isAlertActive$(): Observable<boolean> {
    return this.alertControl.valueChanges.pipe(
      map(([alertStatus]: [boolean | undefined]) => !alertStatus)
    );
  }
  private getPetStatus(status: boolean): AnimalStatus {
    return status ? 'adopted' : 'staying';
  }
}
