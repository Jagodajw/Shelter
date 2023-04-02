import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  PeopleRawResponse,
  RegisterPeopleResponse,
  RegisterPersonEditRequest,
} from 'backend/src/views/AnimalsView';
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
      `${this.rootUrl}/people?status=${status}&areBlockedUsers=${areBlockedUsers}`
    );
  }

  public getToggleBlackListState(
    peopleId: number,
    areBlockedUsers: boolean
  ): Observable<boolean> {
    return this.http.get<boolean>(
      `${this.rootUrl}/people/${peopleId}/${areBlockedUsers}`
    );
  }

  public getPerson(personId: number): Observable<RegisterPeopleResponse> {
    return this.http.get<RegisterPeopleResponse>(
      `${this.rootUrl}/person/${personId}`
    );
  }

  public updatePerson(
    personId: number,
    personModel: RegisterPersonEditRequest
  ): Observable<PeopleRawResponse> {
    return this.http.put<PeopleRawResponse>(
      `${this.rootUrl}/person/${personId}`,
      personModel
    );
  }
}
