import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PeopleResponse, PeopleStatus } from 'backend/src/views/PeopleView';
import { Observable } from 'rxjs';
import { ApiService } from 'src/app/services/api.service';

@Injectable()
export class PeopleService extends ApiService {
  constructor(public readonly http: HttpClient) {
    super();
  }

  public getPeople(
    status: PeopleStatus = 'moving',
    areBlockedUsers: boolean
  ): Observable<PeopleResponse[]> {
    return this.http.get<PeopleResponse[]>(
      `${this.rootUrl}/people/${status}/${areBlockedUsers.toString()}`
    );
  }
}
