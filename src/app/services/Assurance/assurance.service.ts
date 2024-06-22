import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Assurance } from 'src/app/models/Assurance';


@Injectable({
  providedIn: 'root',
})
export class AssuranceService {
  private apiUrl = `${environment.baseUrl}/AULSH/assurances`;

  constructor(private http: HttpClient) {}

  createAssurance(assurance: Assurance, file: File): Observable<Assurance> {
    const formData: FormData = new FormData();
    formData.append('file', file);
    formData.append('assurance', JSON.stringify(assurance));

    return this.http.post<Assurance>(this.apiUrl, formData);
  }

  getAssuranceById(id: number): Observable<Assurance> {
    return this.http.get<Assurance>(`${this.apiUrl}/${id}`);
  }

  getAllAssurances(): Observable<Assurance[]> {
    return this.http.get<Assurance[]>(this.apiUrl);
  }

  updateAssurance(id: number, assurance: Assurance, file: File): Observable<Assurance> {
    const formData: FormData = new FormData();
    formData.append('file', file);
    formData.append('assurance', JSON.stringify(assurance));

    return this.http.put<Assurance>(`${this.apiUrl}/${id}`, formData);
  }

  deleteAssurance(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
