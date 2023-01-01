import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { of } from 'rxjs';
import { tap } from 'rxjs/operators';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root',
})
export class AppInitService {
  constructor(
    private readonly router: Router,
    private readonly storage: StorageService
  ) {}

  public init(): Promise<unknown> {
    const token: Nullable<string> = this.storage.get('JWT_TOKEN_KEY');
    return of(token)
      .pipe(
        tap(() => this.router.initialNavigation()),
        tap((token: Nullable<string>) => {
          if (token !== null) this.router.navigate(['app-view']);
          else this.router.navigate(['auth-view']);
        })
      )
      .toPromise();
  }
}
