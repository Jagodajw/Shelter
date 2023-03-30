import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Auth, LoginResponse } from '../views/auth-view/auth-view.interface';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService extends ApiService {
  constructor(private readonly http: HttpClient) {
    super();
  }

  public login(authParam: Auth): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${this.rootUrl}/login`, authParam);
  }

  public checkAuthorization(token: string): Observable<void> {
    const headers = new HttpHeaders();
    headers.set('authorization', token);

    return this.http.head<void>(`${this.rootUrl}/authorization`, { headers });
  }
}
