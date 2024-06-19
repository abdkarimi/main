import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Enumeration } from 'src/app/models/Enumeration';

@Injectable({
  providedIn: 'root',
})
export class EnumerationService {
  private apiUrl = `${environment.baseUrl}/AULSH/enumerations`;

  constructor(private http: HttpClient) {}

  createEnumeration(enumeration: Enumeration): Observable<Enumeration> {
    return this.http.post<Enumeration>(this.apiUrl, enumeration, this.httpOptions);
  }

  getEnumerationById(id: number): Observable<Enumeration> {
    return this.http.get<Enumeration>(`${this.apiUrl}/${id}`);
  }

  getAllEnumerations(): Observable<Enumeration[]> {
    return this.http.get<Enumeration[]>(this.apiUrl);
  }

  updateEnumeration(id: number, enumeration: Enumeration): Observable<Enumeration> {
    return this.http.put<Enumeration>(`${this.apiUrl}/${id}`, enumeration, this.httpOptions);
  }

  deleteEnumeration(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  private get httpOptions() {
    return {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    };
  }
}
