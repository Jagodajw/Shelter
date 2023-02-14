import { Injectable } from '@angular/core';
import {
  AdoptionResponse,
  EditAnimalAdoptionRequest,
  RegisterAddAnimalResponse,
  RegisterEditAnimalRequest,
  RegisterPersonEditRequest,
} from 'backend/src/models/AnimalsModel';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { PetService } from '../../services/api/pet.service';

@Injectable()
export class PetDetailService {
  private isEditMode$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(
    false
  );

  constructor(private readonly api: PetService) {}

  public editPet(
    value: RegisterEditAnimalRequest
  ): Observable<RegisterAddAnimalResponse> {
    return this.api.editPet(value).pipe(
      tap(() => {
        this.isEditMode$.next(false);
      })
    );
  }

  public editAdoptPetData(model: {
    dataPetOut: EditAnimalAdoptionRequest;
    dataPersonTakeAway: RegisterPersonEditRequest;
  }): Observable<AdoptionResponse> {
    return this.api.editAdoptPetData(model).pipe(
      tap(() => {
        this.isEditMode$.next(false);
      })
    );
  }

  public get isEditModeObservable$(): Observable<boolean> {
    return this.isEditMode$.asObservable();
  }

  public toggleEditMode(): void {
    this.isEditMode$.next(!this.isEditMode$.value);
  }

  public setPetAvater(petId: string, avatar: FormData): Observable<void> {
    return this.api.setPetAvatar(petId, avatar);
  }
}
