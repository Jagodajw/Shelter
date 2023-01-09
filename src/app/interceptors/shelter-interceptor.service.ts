import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { StorageService } from '../services/storage.service';
import { Shelters } from '../views/app-view/components/choose-shelter-popup/choose-shelter-popup';

@Injectable()
export class ShelterInterceptorService implements HttpInterceptor {
  constructor(private readonly storage: StorageService) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    if (request.headers.get('shelters_id') == null) {
      const shelter: Shelters | null = this.storage.get('shelter');

      if (shelter) {
        request = this.getRequestWithShelter(request, shelter.ID);
      }
    }

    return next.handle(request).pipe(
      catchError((error) => {
        return throwError(error);
      })
    );
  }

  private getRequestWithShelter(
    request: HttpRequest<unknown>,
    shelter: string
  ) {
    return request.clone({
      setHeaders: {
        shelters_id: `${shelter}`,
      },
    });
  }
}
