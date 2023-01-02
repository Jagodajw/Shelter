import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { AuthRootService } from '../services/auth-root.service';

@Injectable()
export class TokenApiRestInterceptorService implements HttpInterceptor {
  constructor(private readonly auth: AuthRootService) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    if (request.headers.get('authorization') == null) {
      const token = this.auth.getJwtToken() ?? 'UNKNOWN_TOKEN';

      if (token) {
        request = this.getRequestWithToken(request, token);
      }
    }

    return next.handle(request).pipe(
      catchError((error) => {
        return throwError(error);
      })
    );
  }

  private getRequestWithToken(request: HttpRequest<unknown>, token: string) {
    return request.clone({
      setHeaders: {
        authorization: `Bear ${token}`,
      },
    });
  }
}
