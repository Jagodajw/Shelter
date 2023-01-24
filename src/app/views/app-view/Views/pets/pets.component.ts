import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { RegisterAddAnimalRequest } from 'backend/src/models/AnimalsModel';
import { filter, mergeMap } from 'rxjs';
import { PetService } from '../../services/api/pet.service';
import { PopupRegisterComponent } from './components/popup-register/popup-register.component';

@Component({
  selector: 'app-pets',
  templateUrl: './pets.component.html',
  styleUrls: ['./pets.component.scss'],
})
export class PetsComponent implements OnInit {
  public status: boolean = false;

  constructor(private dialog: MatDialog, private readonly api: PetService) {}

  ngOnInit(): void {}

  public togglePetsView() {
    this.status = !this.status;
  }

  public addPet(): void {
    this.dialog
      .open(PopupRegisterComponent, {
        panelClass: ['input-70', 'modal-without-padding'],
        disableClose: true,
      })
      .afterClosed()
      .pipe(
        filter((data: RegisterAddAnimalRequest) => data !== undefined),
        mergeMap((data: RegisterAddAnimalRequest) => this.api.addPet(data))
      )
      .subscribe();
  }
}
