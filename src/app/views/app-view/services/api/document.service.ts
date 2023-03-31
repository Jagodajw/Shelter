import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DocumentResponse } from 'backend/src/views/DocumentView';
import { Observable } from 'rxjs';
import { ApiService } from 'src/app/services/api.service';

@Injectable()
export class DocumentService extends ApiService {
  constructor(public readonly http: HttpClient) {
    super();
  }

  public addDocument(model: FormData): Observable<DocumentResponse> {
    return this.http.post<DocumentResponse>(`${this.rootUrl}/document`, model);
  }

  public getDocumentsByPetId(petId: string): Observable<DocumentResponse[]> {
    return this.http.get<DocumentResponse[]>(
      `${this.rootUrl}/document/${petId}`
    );
  }

  public getDocuments(): Observable<DocumentResponse[]> {
    return this.http.get<DocumentResponse[]>(`${this.rootUrl}/document`);
  }

  public deleteDocument(documentId: string): Observable<void> {
    return this.http.delete<void>(`${this.rootUrl}/document/${documentId}`);
  }

  public getFile(documentId: string): Observable<Blob> {
    return this.http.get<Blob>(`${this.rootUrl}/documentFile/${documentId}`, {
      responseType: 'blob' as 'json',
    });
  }
}
