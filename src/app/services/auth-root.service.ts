import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, tap } from 'rxjs';
// import { AuthService } from 'src/api/services';
import { Auth, LoginResponse } from '../views/auth-view/auth-view.interface';
import { AuthService } from './auth.service';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root',
})
export class AuthRootService {
  private readonly JWT_TOKEN_KEY = 'JWT_TOKEN_KEY';
  public isAuthorized: boolean = false;

  constructor(
    private readonly api: AuthService,
    private readonly storage: StorageService,
    private readonly router: Router
  ) {}

  public login(authParam: Auth): Observable<LoginResponse> {
    return this.api.login(authParam).pipe(
      tap(({ accessToken }: LoginResponse) => {
        this.setJwtToken(accessToken);
        this.isAuthorized = true;
      })
    );
  }

  public getJwtToken(): string | null {
    return this.storage.get(this.JWT_TOKEN_KEY);
  }

  public setJwtToken(token: string) {
    this.storage.set(this.JWT_TOKEN_KEY, token);
  }

  public logout(): void {
    this.storage.clear();
    this.isAuthorized = false;
    this.router.navigate(['/auth-view']);
  }
}
