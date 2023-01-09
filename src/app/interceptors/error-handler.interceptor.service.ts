import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TranslateService } from '@ngx-translate/core';
import { catchError, Observable, throwError } from 'rxjs';
import { AuthRootService } from '../services/auth-root.service';

@Injectable()
export class ErrorHandlerInteceptorService implements HttpInterceptor {
  private static readonly SNACK_BAR_DURATION: number = 2000;

  constructor(
    private readonly snackBar: MatSnackBar,
    private readonly translate: TranslateService,
    private readonly auth: AuthRootService
  ) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      catchError((requestError) => {
        if (requestError instanceof HttpErrorResponse) {
          switch (requestError.status) {
            case 401: {
              this.showErrorSnackBar(
                requestError.error?.ERROR_CODE,
                'UNAUTHORIZED'
              );
              this.auth.logout();
              break;
            }

            case 403: {
              this.showErrorSnackBar(
                requestError.error?.ERROR_CODE,
                'FORBIDDEN'
              );
              this.auth.logout();
              break;
            }

            case 500:
              this.showErrorSnackBar(
                requestError.error?.ERROR_CODE,
                'INTERNAL_SERVER_ERROR'
              );
              break;
            default:
              this.showErrorSnackBar(requestError.error?.ERROR_CODE);
          }
        }

        return throwError(requestError);
      })
    );
  }

  private showErrorSnackBar(
    errorCode?: string,
    defaultError: string = 'UNKNOWN_ERROR'
  ): void {
    const errorMessage: string = `errors.${errorCode ?? defaultError}`;

    this.snackBar.open(this.translate.instant(errorMessage), 'X', {
      duration: ErrorHandlerInteceptorService.SNACK_BAR_DURATION,
      horizontalPosition: 'right',
      verticalPosition: 'top',
    });
  }
}
