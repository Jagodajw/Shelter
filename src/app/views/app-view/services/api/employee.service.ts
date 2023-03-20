import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  EmployeeRequest,
  EmployeeResponse,
} from 'backend/src/views/EmployeeView';
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

  public addEmployee(model: EmployeeRequest): Observable<EmployeeResponse> {
    return this.http.post<EmployeeResponse>(`${this.rootUrl}/employee`, model);
  }

  public deleteEmployee(employeeId: string): Observable<EmployeeResponse> {
    return this.http.delete<EmployeeResponse>(
      `${this.rootUrl}/employee/${employeeId}`
    );
  }

  public editEmployee(
    employeeId: string,
    model: EmployeeRequest
  ): Observable<EmployeeResponse> {
    return this.http.put<EmployeeResponse>(
      `${this.rootUrl}/employee/${employeeId}`,
      model
    );
  }
}
