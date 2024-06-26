import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/app/environments/environment';
import { Alerte } from 'src/app/models/Alerte';

@Injectable({
  providedIn: 'root'
})
export class AlertService {
  private apiUrl = `${environment.baseUrl}/AULSH/alertes`;

  constructor(private http: HttpClient) { }

  createAlerte(alerte: Alerte): Observable<Alerte> {
    return this.http.post<Alerte>(this.apiUrl, alerte);
  }

  getAlerteById(id: number): Observable<Alerte> {
    return this.http.get<Alerte>(`${this.apiUrl}/${id}`);
  }

  getAllAlertes(): Observable<Alerte[]> {
    return this.http.get<Alerte[]>(this.apiUrl);
  }

  updateAlerte(id: number, alerte: Alerte): Observable<Alerte> {
    return this.http.put<Alerte>(`${this.apiUrl}/${id}`, alerte);
  }

  deleteAlerte(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
