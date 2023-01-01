import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { AuthService } from 'src/api/services';
import { StorageService } from '../../services/storage.service';
import { Auth } from './auth-view.interface';

@Injectable({
  providedIn: 'root',
})
export class AuthViewService {
  private readonly JWT_TOKEN_KEY = 'JWT_TOKEN_KEY';
  constructor(
    private readonly _api: AuthService,
    private readonly storage: StorageService
  ) {}

  public login(authParam: Auth): Observable<any> {
    return this._api
      .postLogin(authParam)
      .pipe(tap((x: any) => this.setJwtToken(x.accessToken)));
  }

  public getJwtToken(): string | null {
    return this.storage.get(this.JWT_TOKEN_KEY);
  }
  public setJwtToken(token: string) {
    this.storage.set(this.JWT_TOKEN_KEY, token);
  }
}
