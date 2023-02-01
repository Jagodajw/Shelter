import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { AnimalTableResponse } from 'backend/src/models/AnimalsModel';
import { BehaviorSubject, filter, mergeMap, Observable, tap } from 'rxjs';
import { PetService } from '../../../services/api/pet.service';
import { ShelterService } from '../../../services/shelter.service';
import { PopupOutAnimalComponent } from '../components/popup-out-animal/popup-out-animal.component';
import { PopupRegisterComponent } from '../components/popup-register/popup-register.component';
@UntilDestroy()
@Injectable()
export class PetsRootService {
  private readonly pets$: BehaviorSubject<AnimalTableResponse[]> =
    new BehaviorSubject<AnimalTableResponse[]>([]);
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
    this.shelter.selectedShelterChangeDetector$
      .pipe(
        mergeMap(() => this.api.getPets()),
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
}