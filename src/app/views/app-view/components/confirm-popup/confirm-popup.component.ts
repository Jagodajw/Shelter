import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-confirm-popup',
  templateUrl: 'confirm-popup.component.html',
  styleUrls: ['confirm-popup.component.scss'],
})
export class ConfirmPopupComponent {
  constructor(
    public dialogRef: MatDialogRef<ConfirmPopupComponent>,
    @Inject(MAT_DIALOG_DATA)
    public data: { message: string; isTranslatedMessage?: false }
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }
}
