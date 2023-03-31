import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root',
})
export class SnackbarMessageService {
  private static readonly SNACK_BAR_DURATION: number = 2000;
  constructor(
    private readonly snackBar: MatSnackBar,
    private readonly translate: TranslateService
  ) {}

  public showMessageSnackBar(message: string): void {
    this.snackBar.open(this.translate.instant(message), 'X', {
      duration: SnackbarMessageService.SNACK_BAR_DURATION,
      horizontalPosition: 'right',
      verticalPosition: 'top',
    });
  }
}
