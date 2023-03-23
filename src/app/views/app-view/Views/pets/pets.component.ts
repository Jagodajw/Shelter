import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { AnimalTableResponse } from 'backend/src/views/AnimalsView';
import { Observable } from 'rxjs';
import { PetsRootService } from './services/pets-root.service';

@Component({
  selector: 'app-pets',
  templateUrl: './pets.component.html',
  styleUrls: ['./pets.component.scss'],
  providers: [PetsRootService],
})
export class PetsComponent implements OnInit {
  public readonly status$: Observable<boolean>;
  public readonly pets$: Observable<AnimalTableResponse[]>;
  public readonly isAlertActive$: Observable<boolean>;
  public isLoading$: Observable<boolean>;
  public numberOfAnimalsVaccinationChecks$: Observable<number>;
  public numberOfAnimalsReleaseControl$: Observable<number>;
  public alertControl: FormControl;

  constructor(private readonly root: PetsRootService) {
    this.pets$ = this.root.petsObservable$;
    this.status$ = this.root.status$.asObservable();
    this.isLoading$ = this.root.isLoading$.asObservable();
    this.numberOfAnimalsReleaseControl$ =
      this.root.numberOfAnimalsReleaseControl$;
    this.numberOfAnimalsVaccinationChecks$ =
      this.root.numberOfAnimalsVaccinationChecks$;
    this.alertControl = this.root.alertControl;
    this.isAlertActive$ = this.root.isAlertActive$;
  }

  ngOnInit(): void {
    this.isAlertActive$.subscribe();
  }

  public togglePetsView() {
    this.root.status$.next(!this.root.status$.value);
  }

  public addPet(): void {
    this.root.addPet();
  }

  public outPet(petId: string): void {
    this.root.outPet(petId);
  }

  public deletePosition(petId: string): void {
    this.root.deletePet(petId);
  }

  public getAnimalsReleaseControl(): void {
    this.root.getAnimalsReleaseControl();
  }

  public getAnimalsToVaccinationChecks(): void {
    this.root.getAnimalsToVaccinationChecks();
  }
}
