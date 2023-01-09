import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CityResponse } from 'backend/src/models/DictionaryModel';
import { Observable } from 'rxjs';
import { ApiService } from 'src/app/services/api.service';

@Injectable()
export class DictionaryService extends ApiService {
  constructor(public readonly http: HttpClient) {
    super();
  }

  // need to add CRUD for dictonary models like city. etc.

  public getCity(): Observable<CityResponse[]> {
    return this.http.get<CityResponse[]>(`${this.rootUrl}/cities`);
  }
}
