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
class AnimalsService extends __BaseService {
  static readonly getAnimalsPath = '/animals';
  static readonly getAnimalDataRegisterAnimalIdPath = '/animalDataRegister/{animalId}';
  static readonly getAnimalDataAdoptionAnimalIdPath = '/animalDataAdoption/{animalId}';
  static readonly postAnimalRegistrationPath = '/animalRegistration/';

  constructor(
    config: __Configuration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * @param authorization undefined
   */
  getAnimalsResponse(authorization?: string): __Observable<__StrictHttpResponse<null>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (authorization != null) __headers = __headers.set('authorization', authorization.toString());
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/animals`,
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
  getAnimals(authorization?: string): __Observable<null> {
    return this.getAnimalsResponse(authorization).pipe(
      __map(_r => _r.body as null)
    );
  }

  /**
   * @param params The `AnimalsService.GetAnimalDataRegisterAnimalIdParams` containing the following parameters:
   *
   * - `animalId`:
   *
   * - `authorization`:
   */
  getAnimalDataRegisterAnimalIdResponse(params: AnimalsService.GetAnimalDataRegisterAnimalIdParams): __Observable<__StrictHttpResponse<null>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    if (params.authorization != null) __headers = __headers.set('authorization', params.authorization.toString());
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/animalDataRegister/${encodeURIComponent(String(params.animalId))}`,
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
   * @param params The `AnimalsService.GetAnimalDataRegisterAnimalIdParams` containing the following parameters:
   *
   * - `animalId`:
   *
   * - `authorization`:
   */
  getAnimalDataRegisterAnimalId(params: AnimalsService.GetAnimalDataRegisterAnimalIdParams): __Observable<null> {
    return this.getAnimalDataRegisterAnimalIdResponse(params).pipe(
      __map(_r => _r.body as null)
    );
  }

  /**
   * @param params The `AnimalsService.GetAnimalDataAdoptionAnimalIdParams` containing the following parameters:
   *
   * - `animalId`:
   *
   * - `authorization`:
   */
  getAnimalDataAdoptionAnimalIdResponse(params: AnimalsService.GetAnimalDataAdoptionAnimalIdParams): __Observable<__StrictHttpResponse<null>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    if (params.authorization != null) __headers = __headers.set('authorization', params.authorization.toString());
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/animalDataAdoption/${encodeURIComponent(String(params.animalId))}`,
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
   * @param params The `AnimalsService.GetAnimalDataAdoptionAnimalIdParams` containing the following parameters:
   *
   * - `animalId`:
   *
   * - `authorization`:
   */
  getAnimalDataAdoptionAnimalId(params: AnimalsService.GetAnimalDataAdoptionAnimalIdParams): __Observable<null> {
    return this.getAnimalDataAdoptionAnimalIdResponse(params).pipe(
      __map(_r => _r.body as null)
    );
  }

  /**
   * @param params The `AnimalsService.PostAnimalRegistrationParams` containing the following parameters:
   *
   * - `body`:
   *
   * - `authorization`:
   */
  postAnimalRegistrationResponse(params: AnimalsService.PostAnimalRegistrationParams): __Observable<__StrictHttpResponse<null>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = params.body;
    if (params.authorization != null) __headers = __headers.set('authorization', params.authorization.toString());
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/animalRegistration/`,
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
   * @param params The `AnimalsService.PostAnimalRegistrationParams` containing the following parameters:
   *
   * - `body`:
   *
   * - `authorization`:
   */
  postAnimalRegistration(params: AnimalsService.PostAnimalRegistrationParams): __Observable<null> {
    return this.postAnimalRegistrationResponse(params).pipe(
      __map(_r => _r.body as null)
    );
  }
}

module AnimalsService {

  /**
   * Parameters for getAnimalDataRegisterAnimalId
   */
  export interface GetAnimalDataRegisterAnimalIdParams {
    animalId: string;
    authorization?: string;
  }

  /**
   * Parameters for getAnimalDataAdoptionAnimalId
   */
  export interface GetAnimalDataAdoptionAnimalIdParams {
    animalId: string;
    authorization?: string;
  }

  /**
   * Parameters for postAnimalRegistration
   */
  export interface PostAnimalRegistrationParams {
    body?: {registerAnimal?: any, registerPeople?: any, register?: any};
    authorization?: string;
  }
}

export { AnimalsService }
