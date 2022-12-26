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
class ApiService extends __BaseService {
  static readonly getApiDocsPath = '/api-docs';
  static readonly getApiDocsSwaggerJsonPath = '/api-docs/swagger.json';
  static readonly getAnimalsPath = '/animals';
  static readonly getAnimalDataRegisterAnimalIdPath = '/animalDataRegister/{animalId}';
  static readonly getAnimalDataAdoptionAnimalIdPath = '/animalDataAdoption/{animalId}';
  static readonly postAnimalRegistrationPath = '/animalRegistration/';
  static readonly postLoginPath = '/login';
  static readonly getSettingsCitySheltersIdPath = '/settingsCity/{sheltersId}';
  static readonly getSettingsCommuneSheltersIdPath = '/settingsCommune/{sheltersId}';
  static readonly getSettingsSpeciesSheltersIdPath = '/settingsSpecies/{sheltersId}';
  static readonly getSettingsBreedSheltersIdPath = '/settingsBreed/{sheltersId}';
  static readonly getSettingsColorSheltersIdPath = '/settingsColor/{sheltersId}';
  static readonly getSettingsAreaSheltersIdPath = '/settingsArea/{sheltersId}';
  static readonly getSettingsTypeAdoptionSheltersIdPath = '/settingsTypeAdoption/{sheltersId}';
  static readonly deleteSettingsCityCityIdPath = '/settingsCity/{cityId}';
  static readonly deleteSettingsCommuneCommuneIdPath = '/settingsCommune/{communeId}';
  static readonly deleteSettingsSpeciesSpeciesIdPath = '/settingsSpecies/{speciesId}';
  static readonly deleteSettingsBreedBreedIdPath = '/settingsBreed/{breedId}';
  static readonly deleteSettingsColorColorIdPath = '/settingsColor/{colorId}';
  static readonly deleteSettingsAreaAreaIdPath = '/settingsArea/{areaId}';
  static readonly deleteSettingsTypeAdoptionTypeAdoptionIdPath = '/settingsTypeAdoption/{typeAdoptionId}';
  static readonly putSettingsTypeAdoptionTypeAdoptionIdPath = '/settingsTypeAdoption/{typeAdoptionId}';
  static readonly putSettingsCityIdCityIdPath = '/settingsCityId/{cityId}';
  static readonly putSettingsCommuneIdCommuneIdPath = '/settingsCommuneId/{communeId}';
  static readonly putSettingsSpeciesIdSpeciesIdPath = '/settingsSpeciesId/{speciesId}';
  static readonly putSettingsBreedIdBreedIdPath = '/settingsBreedId/{breedId}';
  static readonly putSettingsColorIdColorIdPath = '/settingsColorId/{colorId}';
  static readonly putSettingsAreaIdAreaIdPath = '/settingsAreaId/{areaId}';
  static readonly postSettingsAddCityPath = '/settingsAddCity/';
  static readonly postSettingsAddCommunePath = '/settingsAddCommune/';
  static readonly postSettingsAddSpeciesPath = '/settingsAddSpecies/';
  static readonly postSettingsAddColorPath = '/settingsAddColor/';
  static readonly postSettingsAddAreaPath = '/settingsAddArea/';
  static readonly postSettingsTypeAdoptionPath = '/settingsTypeAdoption/';
  static readonly getPeoplePath = '/people';
  static readonly getAnimalsOfPeopleGivingBackPeopleIdPath = '/animalsOfPeopleGivingBack/{peopleId}';
  static readonly getPeopleByIdPeopleIdPath = '/peopleById/{peopleId}';
  static readonly getSheltersPath = '/shelters';

  constructor(
    config: __Configuration,
    http: HttpClient
  ) {
    super(config, http);
  }
  getApiDocsResponse(): __Observable<__StrictHttpResponse<null>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/api-docs`,
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
  }  getApiDocs(): __Observable<null> {
    return this.getApiDocsResponse().pipe(
      __map(_r => _r.body as null)
    );
  }
  getApiDocsSwaggerJsonResponse(): __Observable<__StrictHttpResponse<null>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/api-docs/swagger.json`,
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
  }  getApiDocsSwaggerJson(): __Observable<null> {
    return this.getApiDocsSwaggerJsonResponse().pipe(
      __map(_r => _r.body as null)
    );
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
   * @param params The `ApiService.GetAnimalDataRegisterAnimalIdParams` containing the following parameters:
   *
   * - `animalId`:
   *
   * - `authorization`:
   */
  getAnimalDataRegisterAnimalIdResponse(params: ApiService.GetAnimalDataRegisterAnimalIdParams): __Observable<__StrictHttpResponse<null>> {
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
   * @param params The `ApiService.GetAnimalDataRegisterAnimalIdParams` containing the following parameters:
   *
   * - `animalId`:
   *
   * - `authorization`:
   */
  getAnimalDataRegisterAnimalId(params: ApiService.GetAnimalDataRegisterAnimalIdParams): __Observable<null> {
    return this.getAnimalDataRegisterAnimalIdResponse(params).pipe(
      __map(_r => _r.body as null)
    );
  }

  /**
   * @param params The `ApiService.GetAnimalDataAdoptionAnimalIdParams` containing the following parameters:
   *
   * - `animalId`:
   *
   * - `authorization`:
   */
  getAnimalDataAdoptionAnimalIdResponse(params: ApiService.GetAnimalDataAdoptionAnimalIdParams): __Observable<__StrictHttpResponse<null>> {
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
   * @param params The `ApiService.GetAnimalDataAdoptionAnimalIdParams` containing the following parameters:
   *
   * - `animalId`:
   *
   * - `authorization`:
   */
  getAnimalDataAdoptionAnimalId(params: ApiService.GetAnimalDataAdoptionAnimalIdParams): __Observable<null> {
    return this.getAnimalDataAdoptionAnimalIdResponse(params).pipe(
      __map(_r => _r.body as null)
    );
  }

  /**
   * @param params The `ApiService.PostAnimalRegistrationParams` containing the following parameters:
   *
   * - `body`:
   *
   * - `authorization`:
   */
  postAnimalRegistrationResponse(params: ApiService.PostAnimalRegistrationParams): __Observable<__StrictHttpResponse<null>> {
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
   * @param params The `ApiService.PostAnimalRegistrationParams` containing the following parameters:
   *
   * - `body`:
   *
   * - `authorization`:
   */
  postAnimalRegistration(params: ApiService.PostAnimalRegistrationParams): __Observable<null> {
    return this.postAnimalRegistrationResponse(params).pipe(
      __map(_r => _r.body as null)
    );
  }

  /**
   * @param body undefined
   */
  postLoginResponse(body?: {login?: any, password?: any}): __Observable<__StrictHttpResponse<null>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = body;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/login`,
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
   * @param body undefined
   */
  postLogin(body?: {login?: any, password?: any}): __Observable<null> {
    return this.postLoginResponse(body).pipe(
      __map(_r => _r.body as null)
    );
  }

  /**
   * @param params The `ApiService.GetSettingsCitySheltersIdParams` containing the following parameters:
   *
   * - `sheltersId`:
   *
   * - `authorization`:
   */
  getSettingsCitySheltersIdResponse(params: ApiService.GetSettingsCitySheltersIdParams): __Observable<__StrictHttpResponse<null>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    if (params.authorization != null) __headers = __headers.set('authorization', params.authorization.toString());
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/settingsCity/${encodeURIComponent(String(params.sheltersId))}`,
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
   * @param params The `ApiService.GetSettingsCitySheltersIdParams` containing the following parameters:
   *
   * - `sheltersId`:
   *
   * - `authorization`:
   */
  getSettingsCitySheltersId(params: ApiService.GetSettingsCitySheltersIdParams): __Observable<null> {
    return this.getSettingsCitySheltersIdResponse(params).pipe(
      __map(_r => _r.body as null)
    );
  }

  /**
   * @param params The `ApiService.GetSettingsCommuneSheltersIdParams` containing the following parameters:
   *
   * - `sheltersId`:
   *
   * - `authorization`:
   */
  getSettingsCommuneSheltersIdResponse(params: ApiService.GetSettingsCommuneSheltersIdParams): __Observable<__StrictHttpResponse<null>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    if (params.authorization != null) __headers = __headers.set('authorization', params.authorization.toString());
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/settingsCommune/${encodeURIComponent(String(params.sheltersId))}`,
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
   * @param params The `ApiService.GetSettingsCommuneSheltersIdParams` containing the following parameters:
   *
   * - `sheltersId`:
   *
   * - `authorization`:
   */
  getSettingsCommuneSheltersId(params: ApiService.GetSettingsCommuneSheltersIdParams): __Observable<null> {
    return this.getSettingsCommuneSheltersIdResponse(params).pipe(
      __map(_r => _r.body as null)
    );
  }

  /**
   * @param params The `ApiService.GetSettingsSpeciesSheltersIdParams` containing the following parameters:
   *
   * - `sheltersId`:
   *
   * - `authorization`:
   */
  getSettingsSpeciesSheltersIdResponse(params: ApiService.GetSettingsSpeciesSheltersIdParams): __Observable<__StrictHttpResponse<null>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    if (params.authorization != null) __headers = __headers.set('authorization', params.authorization.toString());
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/settingsSpecies/${encodeURIComponent(String(params.sheltersId))}`,
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
   * @param params The `ApiService.GetSettingsSpeciesSheltersIdParams` containing the following parameters:
   *
   * - `sheltersId`:
   *
   * - `authorization`:
   */
  getSettingsSpeciesSheltersId(params: ApiService.GetSettingsSpeciesSheltersIdParams): __Observable<null> {
    return this.getSettingsSpeciesSheltersIdResponse(params).pipe(
      __map(_r => _r.body as null)
    );
  }

  /**
   * @param params The `ApiService.GetSettingsBreedSheltersIdParams` containing the following parameters:
   *
   * - `sheltersId`:
   *
   * - `authorization`:
   */
  getSettingsBreedSheltersIdResponse(params: ApiService.GetSettingsBreedSheltersIdParams): __Observable<__StrictHttpResponse<null>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    if (params.authorization != null) __headers = __headers.set('authorization', params.authorization.toString());
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/settingsBreed/${encodeURIComponent(String(params.sheltersId))}`,
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
   * @param params The `ApiService.GetSettingsBreedSheltersIdParams` containing the following parameters:
   *
   * - `sheltersId`:
   *
   * - `authorization`:
   */
  getSettingsBreedSheltersId(params: ApiService.GetSettingsBreedSheltersIdParams): __Observable<null> {
    return this.getSettingsBreedSheltersIdResponse(params).pipe(
      __map(_r => _r.body as null)
    );
  }

  /**
   * @param params The `ApiService.GetSettingsColorSheltersIdParams` containing the following parameters:
   *
   * - `sheltersId`:
   *
   * - `authorization`:
   */
  getSettingsColorSheltersIdResponse(params: ApiService.GetSettingsColorSheltersIdParams): __Observable<__StrictHttpResponse<null>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    if (params.authorization != null) __headers = __headers.set('authorization', params.authorization.toString());
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/settingsColor/${encodeURIComponent(String(params.sheltersId))}`,
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
   * @param params The `ApiService.GetSettingsColorSheltersIdParams` containing the following parameters:
   *
   * - `sheltersId`:
   *
   * - `authorization`:
   */
  getSettingsColorSheltersId(params: ApiService.GetSettingsColorSheltersIdParams): __Observable<null> {
    return this.getSettingsColorSheltersIdResponse(params).pipe(
      __map(_r => _r.body as null)
    );
  }

  /**
   * @param params The `ApiService.GetSettingsAreaSheltersIdParams` containing the following parameters:
   *
   * - `sheltersId`:
   *
   * - `authorization`:
   */
  getSettingsAreaSheltersIdResponse(params: ApiService.GetSettingsAreaSheltersIdParams): __Observable<__StrictHttpResponse<null>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    if (params.authorization != null) __headers = __headers.set('authorization', params.authorization.toString());
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/settingsArea/${encodeURIComponent(String(params.sheltersId))}`,
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
   * @param params The `ApiService.GetSettingsAreaSheltersIdParams` containing the following parameters:
   *
   * - `sheltersId`:
   *
   * - `authorization`:
   */
  getSettingsAreaSheltersId(params: ApiService.GetSettingsAreaSheltersIdParams): __Observable<null> {
    return this.getSettingsAreaSheltersIdResponse(params).pipe(
      __map(_r => _r.body as null)
    );
  }

  /**
   * @param params The `ApiService.GetSettingsTypeAdoptionSheltersIdParams` containing the following parameters:
   *
   * - `sheltersId`:
   *
   * - `authorization`:
   */
  getSettingsTypeAdoptionSheltersIdResponse(params: ApiService.GetSettingsTypeAdoptionSheltersIdParams): __Observable<__StrictHttpResponse<null>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    if (params.authorization != null) __headers = __headers.set('authorization', params.authorization.toString());
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/settingsTypeAdoption/${encodeURIComponent(String(params.sheltersId))}`,
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
   * @param params The `ApiService.GetSettingsTypeAdoptionSheltersIdParams` containing the following parameters:
   *
   * - `sheltersId`:
   *
   * - `authorization`:
   */
  getSettingsTypeAdoptionSheltersId(params: ApiService.GetSettingsTypeAdoptionSheltersIdParams): __Observable<null> {
    return this.getSettingsTypeAdoptionSheltersIdResponse(params).pipe(
      __map(_r => _r.body as null)
    );
  }

  /**
   * @param params The `ApiService.DeleteSettingsCityCityIdParams` containing the following parameters:
   *
   * - `cityId`:
   *
   * - `authorization`:
   */
  deleteSettingsCityCityIdResponse(params: ApiService.DeleteSettingsCityCityIdParams): __Observable<__StrictHttpResponse<null>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    if (params.authorization != null) __headers = __headers.set('authorization', params.authorization.toString());
    let req = new HttpRequest<any>(
      'DELETE',
      this.rootUrl + `/settingsCity/${encodeURIComponent(String(params.cityId))}`,
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
   * @param params The `ApiService.DeleteSettingsCityCityIdParams` containing the following parameters:
   *
   * - `cityId`:
   *
   * - `authorization`:
   */
  deleteSettingsCityCityId(params: ApiService.DeleteSettingsCityCityIdParams): __Observable<null> {
    return this.deleteSettingsCityCityIdResponse(params).pipe(
      __map(_r => _r.body as null)
    );
  }

  /**
   * @param params The `ApiService.DeleteSettingsCommuneCommuneIdParams` containing the following parameters:
   *
   * - `communeId`:
   *
   * - `authorization`:
   */
  deleteSettingsCommuneCommuneIdResponse(params: ApiService.DeleteSettingsCommuneCommuneIdParams): __Observable<__StrictHttpResponse<null>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    if (params.authorization != null) __headers = __headers.set('authorization', params.authorization.toString());
    let req = new HttpRequest<any>(
      'DELETE',
      this.rootUrl + `/settingsCommune/${encodeURIComponent(String(params.communeId))}`,
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
   * @param params The `ApiService.DeleteSettingsCommuneCommuneIdParams` containing the following parameters:
   *
   * - `communeId`:
   *
   * - `authorization`:
   */
  deleteSettingsCommuneCommuneId(params: ApiService.DeleteSettingsCommuneCommuneIdParams): __Observable<null> {
    return this.deleteSettingsCommuneCommuneIdResponse(params).pipe(
      __map(_r => _r.body as null)
    );
  }

  /**
   * @param params The `ApiService.DeleteSettingsSpeciesSpeciesIdParams` containing the following parameters:
   *
   * - `speciesId`:
   *
   * - `authorization`:
   */
  deleteSettingsSpeciesSpeciesIdResponse(params: ApiService.DeleteSettingsSpeciesSpeciesIdParams): __Observable<__StrictHttpResponse<null>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    if (params.authorization != null) __headers = __headers.set('authorization', params.authorization.toString());
    let req = new HttpRequest<any>(
      'DELETE',
      this.rootUrl + `/settingsSpecies/${encodeURIComponent(String(params.speciesId))}`,
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
   * @param params The `ApiService.DeleteSettingsSpeciesSpeciesIdParams` containing the following parameters:
   *
   * - `speciesId`:
   *
   * - `authorization`:
   */
  deleteSettingsSpeciesSpeciesId(params: ApiService.DeleteSettingsSpeciesSpeciesIdParams): __Observable<null> {
    return this.deleteSettingsSpeciesSpeciesIdResponse(params).pipe(
      __map(_r => _r.body as null)
    );
  }

  /**
   * @param params The `ApiService.DeleteSettingsBreedBreedIdParams` containing the following parameters:
   *
   * - `breedId`:
   *
   * - `authorization`:
   */
  deleteSettingsBreedBreedIdResponse(params: ApiService.DeleteSettingsBreedBreedIdParams): __Observable<__StrictHttpResponse<null>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    if (params.authorization != null) __headers = __headers.set('authorization', params.authorization.toString());
    let req = new HttpRequest<any>(
      'DELETE',
      this.rootUrl + `/settingsBreed/${encodeURIComponent(String(params.breedId))}`,
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
   * @param params The `ApiService.DeleteSettingsBreedBreedIdParams` containing the following parameters:
   *
   * - `breedId`:
   *
   * - `authorization`:
   */
  deleteSettingsBreedBreedId(params: ApiService.DeleteSettingsBreedBreedIdParams): __Observable<null> {
    return this.deleteSettingsBreedBreedIdResponse(params).pipe(
      __map(_r => _r.body as null)
    );
  }

  /**
   * @param params The `ApiService.DeleteSettingsColorColorIdParams` containing the following parameters:
   *
   * - `colorId`:
   *
   * - `authorization`:
   */
  deleteSettingsColorColorIdResponse(params: ApiService.DeleteSettingsColorColorIdParams): __Observable<__StrictHttpResponse<null>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    if (params.authorization != null) __headers = __headers.set('authorization', params.authorization.toString());
    let req = new HttpRequest<any>(
      'DELETE',
      this.rootUrl + `/settingsColor/${encodeURIComponent(String(params.colorId))}`,
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
   * @param params The `ApiService.DeleteSettingsColorColorIdParams` containing the following parameters:
   *
   * - `colorId`:
   *
   * - `authorization`:
   */
  deleteSettingsColorColorId(params: ApiService.DeleteSettingsColorColorIdParams): __Observable<null> {
    return this.deleteSettingsColorColorIdResponse(params).pipe(
      __map(_r => _r.body as null)
    );
  }

  /**
   * @param params The `ApiService.DeleteSettingsAreaAreaIdParams` containing the following parameters:
   *
   * - `areaId`:
   *
   * - `authorization`:
   */
  deleteSettingsAreaAreaIdResponse(params: ApiService.DeleteSettingsAreaAreaIdParams): __Observable<__StrictHttpResponse<null>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    if (params.authorization != null) __headers = __headers.set('authorization', params.authorization.toString());
    let req = new HttpRequest<any>(
      'DELETE',
      this.rootUrl + `/settingsArea/${encodeURIComponent(String(params.areaId))}`,
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
   * @param params The `ApiService.DeleteSettingsAreaAreaIdParams` containing the following parameters:
   *
   * - `areaId`:
   *
   * - `authorization`:
   */
  deleteSettingsAreaAreaId(params: ApiService.DeleteSettingsAreaAreaIdParams): __Observable<null> {
    return this.deleteSettingsAreaAreaIdResponse(params).pipe(
      __map(_r => _r.body as null)
    );
  }

  /**
   * @param params The `ApiService.DeleteSettingsTypeAdoptionTypeAdoptionIdParams` containing the following parameters:
   *
   * - `typeAdoptionId`:
   *
   * - `authorization`:
   */
  deleteSettingsTypeAdoptionTypeAdoptionIdResponse(params: ApiService.DeleteSettingsTypeAdoptionTypeAdoptionIdParams): __Observable<__StrictHttpResponse<null>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    if (params.authorization != null) __headers = __headers.set('authorization', params.authorization.toString());
    let req = new HttpRequest<any>(
      'DELETE',
      this.rootUrl + `/settingsTypeAdoption/${encodeURIComponent(String(params.typeAdoptionId))}`,
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
   * @param params The `ApiService.DeleteSettingsTypeAdoptionTypeAdoptionIdParams` containing the following parameters:
   *
   * - `typeAdoptionId`:
   *
   * - `authorization`:
   */
  deleteSettingsTypeAdoptionTypeAdoptionId(params: ApiService.DeleteSettingsTypeAdoptionTypeAdoptionIdParams): __Observable<null> {
    return this.deleteSettingsTypeAdoptionTypeAdoptionIdResponse(params).pipe(
      __map(_r => _r.body as null)
    );
  }

  /**
   * @param params The `ApiService.PutSettingsTypeAdoptionTypeAdoptionIdParams` containing the following parameters:
   *
   * - `typeAdoptionId`:
   *
   * - `body`:
   *
   * - `authorization`:
   */
  putSettingsTypeAdoptionTypeAdoptionIdResponse(params: ApiService.PutSettingsTypeAdoptionTypeAdoptionIdParams): __Observable<__StrictHttpResponse<null>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    __body = params.body;
    if (params.authorization != null) __headers = __headers.set('authorization', params.authorization.toString());
    let req = new HttpRequest<any>(
      'PUT',
      this.rootUrl + `/settingsTypeAdoption/${encodeURIComponent(String(params.typeAdoptionId))}`,
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
   * @param params The `ApiService.PutSettingsTypeAdoptionTypeAdoptionIdParams` containing the following parameters:
   *
   * - `typeAdoptionId`:
   *
   * - `body`:
   *
   * - `authorization`:
   */
  putSettingsTypeAdoptionTypeAdoptionId(params: ApiService.PutSettingsTypeAdoptionTypeAdoptionIdParams): __Observable<null> {
    return this.putSettingsTypeAdoptionTypeAdoptionIdResponse(params).pipe(
      __map(_r => _r.body as null)
    );
  }

  /**
   * @param params The `ApiService.PutSettingsCityIdCityIdParams` containing the following parameters:
   *
   * - `cityId`:
   *
   * - `body`:
   *
   * - `authorization`:
   */
  putSettingsCityIdCityIdResponse(params: ApiService.PutSettingsCityIdCityIdParams): __Observable<__StrictHttpResponse<null>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    __body = params.body;
    if (params.authorization != null) __headers = __headers.set('authorization', params.authorization.toString());
    let req = new HttpRequest<any>(
      'PUT',
      this.rootUrl + `/settingsCityId/${encodeURIComponent(String(params.cityId))}`,
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
   * @param params The `ApiService.PutSettingsCityIdCityIdParams` containing the following parameters:
   *
   * - `cityId`:
   *
   * - `body`:
   *
   * - `authorization`:
   */
  putSettingsCityIdCityId(params: ApiService.PutSettingsCityIdCityIdParams): __Observable<null> {
    return this.putSettingsCityIdCityIdResponse(params).pipe(
      __map(_r => _r.body as null)
    );
  }

  /**
   * @param params The `ApiService.PutSettingsCommuneIdCommuneIdParams` containing the following parameters:
   *
   * - `communeId`:
   *
   * - `body`:
   *
   * - `authorization`:
   */
  putSettingsCommuneIdCommuneIdResponse(params: ApiService.PutSettingsCommuneIdCommuneIdParams): __Observable<__StrictHttpResponse<null>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    __body = params.body;
    if (params.authorization != null) __headers = __headers.set('authorization', params.authorization.toString());
    let req = new HttpRequest<any>(
      'PUT',
      this.rootUrl + `/settingsCommuneId/${encodeURIComponent(String(params.communeId))}`,
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
   * @param params The `ApiService.PutSettingsCommuneIdCommuneIdParams` containing the following parameters:
   *
   * - `communeId`:
   *
   * - `body`:
   *
   * - `authorization`:
   */
  putSettingsCommuneIdCommuneId(params: ApiService.PutSettingsCommuneIdCommuneIdParams): __Observable<null> {
    return this.putSettingsCommuneIdCommuneIdResponse(params).pipe(
      __map(_r => _r.body as null)
    );
  }

  /**
   * @param params The `ApiService.PutSettingsSpeciesIdSpeciesIdParams` containing the following parameters:
   *
   * - `speciesId`:
   *
   * - `body`:
   *
   * - `authorization`:
   */
  putSettingsSpeciesIdSpeciesIdResponse(params: ApiService.PutSettingsSpeciesIdSpeciesIdParams): __Observable<__StrictHttpResponse<null>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    __body = params.body;
    if (params.authorization != null) __headers = __headers.set('authorization', params.authorization.toString());
    let req = new HttpRequest<any>(
      'PUT',
      this.rootUrl + `/settingsSpeciesId/${encodeURIComponent(String(params.speciesId))}`,
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
   * @param params The `ApiService.PutSettingsSpeciesIdSpeciesIdParams` containing the following parameters:
   *
   * - `speciesId`:
   *
   * - `body`:
   *
   * - `authorization`:
   */
  putSettingsSpeciesIdSpeciesId(params: ApiService.PutSettingsSpeciesIdSpeciesIdParams): __Observable<null> {
    return this.putSettingsSpeciesIdSpeciesIdResponse(params).pipe(
      __map(_r => _r.body as null)
    );
  }

  /**
   * @param params The `ApiService.PutSettingsBreedIdBreedIdParams` containing the following parameters:
   *
   * - `breedId`:
   *
   * - `body`:
   *
   * - `authorization`:
   */
  putSettingsBreedIdBreedIdResponse(params: ApiService.PutSettingsBreedIdBreedIdParams): __Observable<__StrictHttpResponse<null>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    __body = params.body;
    if (params.authorization != null) __headers = __headers.set('authorization', params.authorization.toString());
    let req = new HttpRequest<any>(
      'PUT',
      this.rootUrl + `/settingsBreedId/${encodeURIComponent(String(params.breedId))}`,
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
   * @param params The `ApiService.PutSettingsBreedIdBreedIdParams` containing the following parameters:
   *
   * - `breedId`:
   *
   * - `body`:
   *
   * - `authorization`:
   */
  putSettingsBreedIdBreedId(params: ApiService.PutSettingsBreedIdBreedIdParams): __Observable<null> {
    return this.putSettingsBreedIdBreedIdResponse(params).pipe(
      __map(_r => _r.body as null)
    );
  }

  /**
   * @param params The `ApiService.PutSettingsColorIdColorIdParams` containing the following parameters:
   *
   * - `colorId`:
   *
   * - `body`:
   *
   * - `authorization`:
   */
  putSettingsColorIdColorIdResponse(params: ApiService.PutSettingsColorIdColorIdParams): __Observable<__StrictHttpResponse<null>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    __body = params.body;
    if (params.authorization != null) __headers = __headers.set('authorization', params.authorization.toString());
    let req = new HttpRequest<any>(
      'PUT',
      this.rootUrl + `/settingsColorId/${encodeURIComponent(String(params.colorId))}`,
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
   * @param params The `ApiService.PutSettingsColorIdColorIdParams` containing the following parameters:
   *
   * - `colorId`:
   *
   * - `body`:
   *
   * - `authorization`:
   */
  putSettingsColorIdColorId(params: ApiService.PutSettingsColorIdColorIdParams): __Observable<null> {
    return this.putSettingsColorIdColorIdResponse(params).pipe(
      __map(_r => _r.body as null)
    );
  }

  /**
   * @param params The `ApiService.PutSettingsAreaIdAreaIdParams` containing the following parameters:
   *
   * - `areaId`:
   *
   * - `body`:
   *
   * - `authorization`:
   */
  putSettingsAreaIdAreaIdResponse(params: ApiService.PutSettingsAreaIdAreaIdParams): __Observable<__StrictHttpResponse<null>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    __body = params.body;
    if (params.authorization != null) __headers = __headers.set('authorization', params.authorization.toString());
    let req = new HttpRequest<any>(
      'PUT',
      this.rootUrl + `/settingsAreaId/${encodeURIComponent(String(params.areaId))}`,
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
   * @param params The `ApiService.PutSettingsAreaIdAreaIdParams` containing the following parameters:
   *
   * - `areaId`:
   *
   * - `body`:
   *
   * - `authorization`:
   */
  putSettingsAreaIdAreaId(params: ApiService.PutSettingsAreaIdAreaIdParams): __Observable<null> {
    return this.putSettingsAreaIdAreaIdResponse(params).pipe(
      __map(_r => _r.body as null)
    );
  }

  /**
   * @param params The `ApiService.PostSettingsAddCityParams` containing the following parameters:
   *
   * - `shelters_id`:
   *
   * - `body`:
   *
   * - `authorization`:
   */
  postSettingsAddCityResponse(params: ApiService.PostSettingsAddCityParams): __Observable<__StrictHttpResponse<null>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (params.sheltersId != null) __headers = __headers.set('shelters_id', params.sheltersId.toString());
    __body = params.body;
    if (params.authorization != null) __headers = __headers.set('authorization', params.authorization.toString());
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/settingsAddCity/`,
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
   * @param params The `ApiService.PostSettingsAddCityParams` containing the following parameters:
   *
   * - `shelters_id`:
   *
   * - `body`:
   *
   * - `authorization`:
   */
  postSettingsAddCity(params: ApiService.PostSettingsAddCityParams): __Observable<null> {
    return this.postSettingsAddCityResponse(params).pipe(
      __map(_r => _r.body as null)
    );
  }

  /**
   * @param params The `ApiService.PostSettingsAddCommuneParams` containing the following parameters:
   *
   * - `shelters_id`:
   *
   * - `body`:
   *
   * - `authorization`:
   */
  postSettingsAddCommuneResponse(params: ApiService.PostSettingsAddCommuneParams): __Observable<__StrictHttpResponse<null>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (params.sheltersId != null) __headers = __headers.set('shelters_id', params.sheltersId.toString());
    __body = params.body;
    if (params.authorization != null) __headers = __headers.set('authorization', params.authorization.toString());
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/settingsAddCommune/`,
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
   * @param params The `ApiService.PostSettingsAddCommuneParams` containing the following parameters:
   *
   * - `shelters_id`:
   *
   * - `body`:
   *
   * - `authorization`:
   */
  postSettingsAddCommune(params: ApiService.PostSettingsAddCommuneParams): __Observable<null> {
    return this.postSettingsAddCommuneResponse(params).pipe(
      __map(_r => _r.body as null)
    );
  }

  /**
   * @param params The `ApiService.PostSettingsAddSpeciesParams` containing the following parameters:
   *
   * - `shelters_id`:
   *
   * - `body`:
   *
   * - `authorization`:
   */
  postSettingsAddSpeciesResponse(params: ApiService.PostSettingsAddSpeciesParams): __Observable<__StrictHttpResponse<null>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (params.sheltersId != null) __headers = __headers.set('shelters_id', params.sheltersId.toString());
    __body = params.body;
    if (params.authorization != null) __headers = __headers.set('authorization', params.authorization.toString());
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/settingsAddSpecies/`,
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
   * @param params The `ApiService.PostSettingsAddSpeciesParams` containing the following parameters:
   *
   * - `shelters_id`:
   *
   * - `body`:
   *
   * - `authorization`:
   */
  postSettingsAddSpecies(params: ApiService.PostSettingsAddSpeciesParams): __Observable<null> {
    return this.postSettingsAddSpeciesResponse(params).pipe(
      __map(_r => _r.body as null)
    );
  }

  /**
   * @param params The `ApiService.PostSettingsAddColorParams` containing the following parameters:
   *
   * - `shelters_id`:
   *
   * - `body`:
   *
   * - `authorization`:
   */
  postSettingsAddColorResponse(params: ApiService.PostSettingsAddColorParams): __Observable<__StrictHttpResponse<null>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (params.sheltersId != null) __headers = __headers.set('shelters_id', params.sheltersId.toString());
    __body = params.body;
    if (params.authorization != null) __headers = __headers.set('authorization', params.authorization.toString());
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/settingsAddColor/`,
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
   * @param params The `ApiService.PostSettingsAddColorParams` containing the following parameters:
   *
   * - `shelters_id`:
   *
   * - `body`:
   *
   * - `authorization`:
   */
  postSettingsAddColor(params: ApiService.PostSettingsAddColorParams): __Observable<null> {
    return this.postSettingsAddColorResponse(params).pipe(
      __map(_r => _r.body as null)
    );
  }

  /**
   * @param params The `ApiService.PostSettingsAddAreaParams` containing the following parameters:
   *
   * - `shelters_id`:
   *
   * - `body`:
   *
   * - `authorization`:
   */
  postSettingsAddAreaResponse(params: ApiService.PostSettingsAddAreaParams): __Observable<__StrictHttpResponse<null>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (params.sheltersId != null) __headers = __headers.set('shelters_id', params.sheltersId.toString());
    __body = params.body;
    if (params.authorization != null) __headers = __headers.set('authorization', params.authorization.toString());
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/settingsAddArea/`,
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
   * @param params The `ApiService.PostSettingsAddAreaParams` containing the following parameters:
   *
   * - `shelters_id`:
   *
   * - `body`:
   *
   * - `authorization`:
   */
  postSettingsAddArea(params: ApiService.PostSettingsAddAreaParams): __Observable<null> {
    return this.postSettingsAddAreaResponse(params).pipe(
      __map(_r => _r.body as null)
    );
  }

  /**
   * @param params The `ApiService.PostSettingsTypeAdoptionParams` containing the following parameters:
   *
   * - `shelters_id`:
   *
   * - `body`:
   *
   * - `authorization`:
   */
  postSettingsTypeAdoptionResponse(params: ApiService.PostSettingsTypeAdoptionParams): __Observable<__StrictHttpResponse<null>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (params.sheltersId != null) __headers = __headers.set('shelters_id', params.sheltersId.toString());
    __body = params.body;
    if (params.authorization != null) __headers = __headers.set('authorization', params.authorization.toString());
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/settingsTypeAdoption/`,
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
   * @param params The `ApiService.PostSettingsTypeAdoptionParams` containing the following parameters:
   *
   * - `shelters_id`:
   *
   * - `body`:
   *
   * - `authorization`:
   */
  postSettingsTypeAdoption(params: ApiService.PostSettingsTypeAdoptionParams): __Observable<null> {
    return this.postSettingsTypeAdoptionResponse(params).pipe(
      __map(_r => _r.body as null)
    );
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
   * @param params The `ApiService.GetAnimalsOfPeopleGivingBackPeopleIdParams` containing the following parameters:
   *
   * - `peopleId`:
   *
   * - `authorization`:
   */
  getAnimalsOfPeopleGivingBackPeopleIdResponse(params: ApiService.GetAnimalsOfPeopleGivingBackPeopleIdParams): __Observable<__StrictHttpResponse<null>> {
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
   * @param params The `ApiService.GetAnimalsOfPeopleGivingBackPeopleIdParams` containing the following parameters:
   *
   * - `peopleId`:
   *
   * - `authorization`:
   */
  getAnimalsOfPeopleGivingBackPeopleId(params: ApiService.GetAnimalsOfPeopleGivingBackPeopleIdParams): __Observable<null> {
    return this.getAnimalsOfPeopleGivingBackPeopleIdResponse(params).pipe(
      __map(_r => _r.body as null)
    );
  }

  /**
   * @param params The `ApiService.GetPeopleByIdPeopleIdParams` containing the following parameters:
   *
   * - `peopleId`:
   *
   * - `authorization`:
   */
  getPeopleByIdPeopleIdResponse(params: ApiService.GetPeopleByIdPeopleIdParams): __Observable<__StrictHttpResponse<null>> {
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
   * @param params The `ApiService.GetPeopleByIdPeopleIdParams` containing the following parameters:
   *
   * - `peopleId`:
   *
   * - `authorization`:
   */
  getPeopleByIdPeopleId(params: ApiService.GetPeopleByIdPeopleIdParams): __Observable<null> {
    return this.getPeopleByIdPeopleIdResponse(params).pipe(
      __map(_r => _r.body as null)
    );
  }

  /**
   * @param authorization undefined
   */
  getSheltersResponse(authorization?: string): __Observable<__StrictHttpResponse<null>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (authorization != null) __headers = __headers.set('authorization', authorization.toString());
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/shelters`,
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
  getShelters(authorization?: string): __Observable<null> {
    return this.getSheltersResponse(authorization).pipe(
      __map(_r => _r.body as null)
    );
  }
}

module ApiService {

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

  /**
   * Parameters for getSettingsCitySheltersId
   */
  export interface GetSettingsCitySheltersIdParams {
    sheltersId: string;
    authorization?: string;
  }

  /**
   * Parameters for getSettingsCommuneSheltersId
   */
  export interface GetSettingsCommuneSheltersIdParams {
    sheltersId: string;
    authorization?: string;
  }

  /**
   * Parameters for getSettingsSpeciesSheltersId
   */
  export interface GetSettingsSpeciesSheltersIdParams {
    sheltersId: string;
    authorization?: string;
  }

  /**
   * Parameters for getSettingsBreedSheltersId
   */
  export interface GetSettingsBreedSheltersIdParams {
    sheltersId: string;
    authorization?: string;
  }

  /**
   * Parameters for getSettingsColorSheltersId
   */
  export interface GetSettingsColorSheltersIdParams {
    sheltersId: string;
    authorization?: string;
  }

  /**
   * Parameters for getSettingsAreaSheltersId
   */
  export interface GetSettingsAreaSheltersIdParams {
    sheltersId: string;
    authorization?: string;
  }

  /**
   * Parameters for getSettingsTypeAdoptionSheltersId
   */
  export interface GetSettingsTypeAdoptionSheltersIdParams {
    sheltersId: string;
    authorization?: string;
  }

  /**
   * Parameters for deleteSettingsCityCityId
   */
  export interface DeleteSettingsCityCityIdParams {
    cityId: string;
    authorization?: string;
  }

  /**
   * Parameters for deleteSettingsCommuneCommuneId
   */
  export interface DeleteSettingsCommuneCommuneIdParams {
    communeId: string;
    authorization?: string;
  }

  /**
   * Parameters for deleteSettingsSpeciesSpeciesId
   */
  export interface DeleteSettingsSpeciesSpeciesIdParams {
    speciesId: string;
    authorization?: string;
  }

  /**
   * Parameters for deleteSettingsBreedBreedId
   */
  export interface DeleteSettingsBreedBreedIdParams {
    breedId: string;
    authorization?: string;
  }

  /**
   * Parameters for deleteSettingsColorColorId
   */
  export interface DeleteSettingsColorColorIdParams {
    colorId: string;
    authorization?: string;
  }

  /**
   * Parameters for deleteSettingsAreaAreaId
   */
  export interface DeleteSettingsAreaAreaIdParams {
    areaId: string;
    authorization?: string;
  }

  /**
   * Parameters for deleteSettingsTypeAdoptionTypeAdoptionId
   */
  export interface DeleteSettingsTypeAdoptionTypeAdoptionIdParams {
    typeAdoptionId: string;
    authorization?: string;
  }

  /**
   * Parameters for putSettingsTypeAdoptionTypeAdoptionId
   */
  export interface PutSettingsTypeAdoptionTypeAdoptionIdParams {
    typeAdoptionId: string;
    body?: {type_adoption?: any};
    authorization?: string;
  }

  /**
   * Parameters for putSettingsCityIdCityId
   */
  export interface PutSettingsCityIdCityIdParams {
    cityId: string;
    body?: {city?: any, zip_code?: any};
    authorization?: string;
  }

  /**
   * Parameters for putSettingsCommuneIdCommuneId
   */
  export interface PutSettingsCommuneIdCommuneIdParams {
    communeId: string;
    body?: {commune?: any};
    authorization?: string;
  }

  /**
   * Parameters for putSettingsSpeciesIdSpeciesId
   */
  export interface PutSettingsSpeciesIdSpeciesIdParams {
    speciesId: string;
    body?: {species?: any};
    authorization?: string;
  }

  /**
   * Parameters for putSettingsBreedIdBreedId
   */
  export interface PutSettingsBreedIdBreedIdParams {
    breedId: string;
    body?: {breed?: any};
    authorization?: string;
  }

  /**
   * Parameters for putSettingsColorIdColorId
   */
  export interface PutSettingsColorIdColorIdParams {
    colorId: string;
    body?: {color?: any};
    authorization?: string;
  }

  /**
   * Parameters for putSettingsAreaIdAreaId
   */
  export interface PutSettingsAreaIdAreaIdParams {
    areaId: string;
    body?: {area?: any};
    authorization?: string;
  }

  /**
   * Parameters for postSettingsAddCity
   */
  export interface PostSettingsAddCityParams {
    sheltersId?: string;
    body?: {city?: any, zip_code?: any};
    authorization?: string;
  }

  /**
   * Parameters for postSettingsAddCommune
   */
  export interface PostSettingsAddCommuneParams {
    sheltersId?: string;
    body?: {commune?: any};
    authorization?: string;
  }

  /**
   * Parameters for postSettingsAddSpecies
   */
  export interface PostSettingsAddSpeciesParams {
    sheltersId?: string;
    body?: {species?: any};
    authorization?: string;
  }

  /**
   * Parameters for postSettingsAddColor
   */
  export interface PostSettingsAddColorParams {
    sheltersId?: string;
    body?: {color?: any};
    authorization?: string;
  }

  /**
   * Parameters for postSettingsAddArea
   */
  export interface PostSettingsAddAreaParams {
    sheltersId?: string;
    body?: {area?: any};
    authorization?: string;
  }

  /**
   * Parameters for postSettingsTypeAdoption
   */
  export interface PostSettingsTypeAdoptionParams {
    sheltersId?: string;
    body?: {type_adoption?: any};
    authorization?: string;
  }

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

export { ApiService }
