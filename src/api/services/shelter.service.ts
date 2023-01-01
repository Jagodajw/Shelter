/* tslint:disable */
import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpResponse, HttpHeaders } from '@angular/common/http';
import { BaseService as __BaseService } from '../base-service';
import { ApiConfiguration as __Configuration } from '../api-configuration';
import { StrictHttpResponse as __StrictHttpResponse } from '../strict-http-response';
import { Observable as __Observable } from 'rxjs';
import { map as __map, filter as __filter } from 'rxjs/operators';

import { SheltersResponse } from '../models/shelters-response';
@Injectable({
  providedIn: 'root',
})
class ShelterService extends __BaseService {
  static readonly getSheltersPath = '/shelters';

  constructor(
    config: __Configuration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * @param authorization undefined
   * @return User successfully obtained.
   */
  getSheltersResponse(authorization?: string): __Observable<__StrictHttpResponse<SheltersResponse>> {
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
        return _r as __StrictHttpResponse<SheltersResponse>;
      })
    );
  }
  /**
   * @param authorization undefined
   * @return User successfully obtained.
   */
  getShelters(authorization?: string): __Observable<SheltersResponse> {
    return this.getSheltersResponse(authorization).pipe(
      __map(_r => _r.body as SheltersResponse)
    );
  }
}

module ShelterService {
}

export { ShelterService }
