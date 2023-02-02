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
import { PetService } from '../../../services/api/pet.service';
import { ShelterService } from '../../../services/shelter.service';
import { PopupOutAnimalComponent } from '../components/popup-out-animal/popup-out-animal.component';
import { PopupRegisterComponent } from '../components/popup-register/popup-register.component';
@UntilDestroy()
@Injectable()
export class PetsRootService {
  private readonly pets$: BehaviorSubject<AnimalTableResponse[]> =
    new BehaviorSubject<AnimalTableResponse[]>([]);
  public status$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(
    false
  );
  public readonly searchQuery$: BehaviorSubject<AnimalQuery | null> =
    new BehaviorSubject<AnimalQuery | null>(null);

  constructor(
    private dialog: MatDialog,
    private readonly api: PetService,
    private readonly shelter: ShelterService
  ) {
    this.shelterChangeDetector();
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
        mergeMap(() =>
          this.api.getPets().pipe(
            tap((petsData: AnimalTableResponse[]) => {
              this.pets$.next(petsData);
            })
          )
        )
      )

      .subscribe();
  }

  private shelterChangeDetector(): void {
    combineLatest(
      this.status$,
      this.searchQuery$,
      this.shelter.selectedShelterChangeDetector$
    )
      .pipe(
        map(
          ([status, searchQuery]) =>
            ({ status: status ? 'adopted' : 'staying', searchQuery } as {
              status: AnimalStatus;
              searchQuery: AnimalQuery | null;
            })
        ),
        mergeMap(
          ({
            status,
            searchQuery,
          }: {
            status: AnimalStatus;
            searchQuery: AnimalQuery | null;
          }) => {
            this.api.getPets(status);
            if (searchQuery !== null)
              return this.api.getPetsByQuery(searchQuery, status);
          }
        ),
        untilDestroyed(this)
      )
      .subscribe((petsData: AnimalTableResponse[]) =>
        this.pets$.next(petsData)
      );
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
        mergeMap(() =>
          this.api.getPets().pipe(
            tap((petsData: AnimalTableResponse[]) => {
              this.pets$.next(petsData);
            })
          )
        )
      )
      .subscribe();
  }

  public deletePosition(): void {}

  public get petsObservable$(): Observable<AnimalTableResponse[]> {
    return this.pets$.asObservable();
  }

  public getPetsByQuery(query: AnimalQuery): void {
    this.api.getPetsByQuery(query).subscribe({
      next: (query) => this.pets$.next(query),
    });
  }
}
