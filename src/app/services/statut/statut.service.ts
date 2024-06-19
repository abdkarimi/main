import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Statut } from 'src/app/models/Statut';

@Injectable({
  providedIn: 'root',
})
export class StatutService {
  private apiUrl = `${environment.baseUrl}/AULSH/statuts`;

  constructor(private http: HttpClient) {}

  createStatut(statut: Statut): Observable<Statut> {
    return this.http.post<Statut>(this.apiUrl, statut, this.httpOptions);
  }

  getStatutById(id: number): Observable<Statut> {
    return this.http.get<Statut>(`${this.apiUrl}/${id}`);
  }

  getAllStatuts(): Observable<Statut[]> {
    return this.http.get<Statut[]>(this.apiUrl);
  }

  updateStatut(id: number, statut: Statut): Observable<Statut> {
    return this.http.put<Statut>(`${this.apiUrl}/${id}`, statut, this.httpOptions);
  }

  deleteStatut(id: number): Observable<void> {
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
