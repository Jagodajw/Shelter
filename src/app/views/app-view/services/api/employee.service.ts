import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EmployeeResponse } from 'backend/src/models/EmployeeModel';
import { Observable } from 'rxjs';
import { ApiService } from 'src/app/services/api.service';

@Injectable()
export class EmployeeService extends ApiService {
  constructor(private readonly http: HttpClient) {
    super();
  }

  public getEmployee(): Observable<EmployeeResponse[]> {
    return this.http.get<EmployeeResponse[]>(`${this.rootUrl}/employee`);
  }
}
