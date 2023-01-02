import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, tap } from 'rxjs';
import { AuthService } from 'src/api/services';
import { Auth } from '../views/auth-view/auth-view.interface';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root',
})
export class AuthRootService {
  private readonly JWT_TOKEN_KEY = 'JWT_TOKEN_KEY';
  constructor(
    private readonly api: AuthService,
    private readonly storage: StorageService,
    private readonly router: Router
  ) {}

  public login(authParam: Auth): Observable<any> {
    return this.api
      .postLogin(authParam)
      .pipe(tap((x: any) => this.setJwtToken(x.accessToken)));
  }

  public getJwtToken(): string | null {
    return this.storage.get(this.JWT_TOKEN_KEY);
  }

  public setJwtToken(token: string) {
    this.storage.set(this.JWT_TOKEN_KEY, token);
  }

  public logout(): void {
    this.storage.clear();
    this.router.navigate(['/auth-view']);
  }
}
