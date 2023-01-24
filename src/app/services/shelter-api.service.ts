import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ShelterResponse } from 'backend/src/models/ShelterModel';
import { Observable } from 'rxjs';
import { ApiService } from 'src/app/services/api.service';

@Injectable({
  providedIn: 'root',
})
export class ShelterApiService extends ApiService {
  constructor(private readonly http: HttpClient) {
    super();
  }

  public getShelters(): Observable<ShelterResponse[]> {
    return this.http.get<ShelterResponse[]>(`${this.rootUrl}/shelters`);
  }
}
