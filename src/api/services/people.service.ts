/* tslint:disable */
import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpResponse, HttpHeaders } from '@angular/common/http';
import { BaseService as __BaseService } from '../base-service';
import { ApiConfiguration as __Configuration } from '../api-configuration';
import { StrictHttpResponse as __StrictHttpResponse } from '../strict-http-response';
import { Observable as __Observable } from 'rxjs';
import { map as __map, filter as __filter } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
class PeopleService extends __BaseService {
  static readonly getPeoplePath = '/people';
  static readonly getAnimalsOfPeopleGivingBackPeopleIdPath = '/animalsOfPeopleGivingBack/{peopleId}';
  static readonly getPeopleByIdPeopleIdPath = '/peopleById/{peopleId}';

  constructor(
    config: __Configuration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * @param authorization undefined
   */
  getPeopleResponse(authorization?: string): __Observable<__StrictHttpResponse<null>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (authorization != null) __headers = __headers.set('authorization', authorization.toString());
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/people`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<null>;
      })
    );
  }
  /**
   * @param authorization undefined
   */
  getPeople(authorization?: string): __Observable<null> {
    return this.getPeopleResponse(authorization).pipe(
      __map(_r => _r.body as null)
    );
  }

  /**
   * @param params The `PeopleService.GetAnimalsOfPeopleGivingBackPeopleIdParams` containing the following parameters:
   *
   * - `peopleId`:
   *
   * - `authorization`:
   */
  getAnimalsOfPeopleGivingBackPeopleIdResponse(params: PeopleService.GetAnimalsOfPeopleGivingBackPeopleIdParams): __Observable<__StrictHttpResponse<null>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    if (params.authorization != null) __headers = __headers.set('authorization', params.authorization.toString());
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/animalsOfPeopleGivingBack/${encodeURIComponent(String(params.peopleId))}`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<null>;
      })
    );
  }
  /**
   * @param params The `PeopleService.GetAnimalsOfPeopleGivingBackPeopleIdParams` containing the following parameters:
   *
   * - `peopleId`:
   *
   * - `authorization`:
   */
  getAnimalsOfPeopleGivingBackPeopleId(params: PeopleService.GetAnimalsOfPeopleGivingBackPeopleIdParams): __Observable<null> {
    return this.getAnimalsOfPeopleGivingBackPeopleIdResponse(params).pipe(
      __map(_r => _r.body as null)
    );
  }

  /**
   * @param params The `PeopleService.GetPeopleByIdPeopleIdParams` containing the following parameters:
   *
   * - `peopleId`:
   *
   * - `authorization`:
   */
  getPeopleByIdPeopleIdResponse(params: PeopleService.GetPeopleByIdPeopleIdParams): __Observable<__StrictHttpResponse<null>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    if (params.authorization != null) __headers = __headers.set('authorization', params.authorization.toString());
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/peopleById/${encodeURIComponent(String(params.peopleId))}`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<null>;
      })
    );
  }
  /**
   * @param params The `PeopleService.GetPeopleByIdPeopleIdParams` containing the following parameters:
   *
   * - `peopleId`:
   *
   * - `authorization`:
   */
  getPeopleByIdPeopleId(params: PeopleService.GetPeopleByIdPeopleIdParams): __Observable<null> {
    return this.getPeopleByIdPeopleIdResponse(params).pipe(
      __map(_r => _r.body as null)
    );
  }
}

module PeopleService {

  /**
   * Parameters for getAnimalsOfPeopleGivingBackPeopleId
   */
  export interface GetAnimalsOfPeopleGivingBackPeopleIdParams {
    peopleId: string;
    authorization?: string;
  }

  /**
   * Parameters for getPeopleByIdPeopleId
   */
  export interface GetPeopleByIdPeopleIdParams {
    peopleId: string;
    authorization?: string;
  }
}

export { PeopleService }
