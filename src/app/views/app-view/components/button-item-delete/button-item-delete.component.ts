import { Component, EventEmitter, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmPopupComponent } from '../confirm-popup/confirm-popup.component';

@Component({
  selector: 'app-button-item-delete',
  templateUrl: './button-item-delete.component.html',
  //   styleUrls: ['./button-item-delete.component.scss'],
})
export class ButtonItemDeleteComponent {
  @Output() onDelete: EventEmitter<void> = new EventEmitter<void>();

  constructor(public dialog: MatDialog) {}

  onSubmit(): void {}

  public sendToDelete(): void {
    this.dialog
      .open(ConfirmPopupComponent, {
        panelClass: 'modal__width',
        data: { message: 'deleteDialog.beSure' },
      })
      .afterClosed()
      .subscribe((isConfirm) => {
        if (isConfirm) this.onDelete.emit();
      });
  }
}