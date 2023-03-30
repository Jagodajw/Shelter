import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { forkJoin, Observable, of, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { AuthRootService } from './auth-root.service';
import { AuthService } from './auth.service';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root',
})
export class AppInitService {
  constructor(
    private readonly router: Router,
    private readonly storage: StorageService,
    private readonly api: AuthService,
    private readonly auth: AuthRootService
  ) {}

  private isAuthorized(): Observable<unknown> {
    const token: Nullable<string> | undefined =
      this.storage.get('JWT_TOKEN_KEY');
    if (token == null) {
      this.auth.isAuthorized = false;
      return of(null);
    }
    return this.api.checkAuthorization(token).pipe(
      tap(() => (this.auth.isAuthorized = true)),
      catchError((err) => {
        this.auth.isAuthorized = false;
        return throwError(err);
      })
    );
  }

  public init(): Observable<unknown> {
    return forkJoin([this.isAuthorized()]).pipe(
      tap(() => this.router.initialNavigation())
    );
  }
}
