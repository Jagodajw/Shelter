import { Component, OnInit } from '@angular/core';
import { AnimalTableResponse } from 'backend/src/models/AnimalsModel';
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
  public isLoading$: Observable<boolean>;
  constructor(private readonly root: PetsRootService) {
    this.pets$ = this.root.petsObservable$;
    this.status$ = this.root.status$.asObservable();
    this.isLoading$ = this.root.isLoading$.asObservable();
  }

  ngOnInit(): void {}

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
  
}
