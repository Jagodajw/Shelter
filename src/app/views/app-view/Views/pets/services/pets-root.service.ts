import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import {
  AnimalQuery,
  AnimalStatus,
  AnimalTableResponse,
} from 'backend/src/models/AnimalsModel';
import {
  BehaviorSubject,
  combineLatest,
  filter,
  map,
  mergeMap,
  Observable,
  tap,
} from 'rxjs';
import { ConfirmPopupComponent } from '../../../components/confirm-popup/confirm-popup.component';
import { PetService } from '../../../services/api/pet.service';
import { ShelterService } from '../../../services/shelter.service';
import { PopupOutAnimalComponent } from '../components/popup-out-animal/popup-out-animal.component';
import { PopupRegisterComponent } from '../components/popup-register/popup-register.component';

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
  public readonly searchQuery$: BehaviorSubject<AnimalQuery | null> =
    new BehaviorSubject<AnimalQuery | null>(null);

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
        tap((x) => this.searchQuery$.next(null))
      )
    )
      .pipe(
        tap(() => this.isLoading$.next(true)),
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
          this.pets$.next(petsData);
          this.isLoading$.next(false);
        },
        error: (err) => this.isLoading$.next(false),
      });
  }

  public outPet(petId: string): void {
    const pet = this.pets$.value.find((pets) => pets.ID === petId);

    this.dialog
      .open(PopupOutAnimalComponent, {
        panelClass: ['input-70', 'modal-without-padding'],
        data: { name: pet?.name, species: pet?.species, ID: petId },
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

  private refreschGet(): Observable<AnimalTableResponse[]> {
    return this.api.getPets().pipe(
      tap((petsData: AnimalTableResponse[]) => {
        this.pets$.next(petsData);
      })
    );
  }
}
