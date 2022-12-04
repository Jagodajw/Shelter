import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PopupRegisterComponent } from './components/popup-register/popup-register.component';

@Component({
  selector: 'app-pets',
  templateUrl: './pets.component.html',
  styleUrls: ['./pets.component.scss'],
})
export class PetsComponent implements OnInit {
  public status: boolean = false;

  constructor(public dialog: MatDialog) {}

  ngOnInit(): void {}

  clickEvent() {
    this.status = !this.status;
  }
  openDialog(): void {
    this.dialog.open(PopupRegisterComponent, {
      panelClass: ['input-70', 'modal-without-padding'],
      disableClose: true,
    });
  }
}
