import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Marque } from 'src/app/models/Marque';

@Injectable({
  providedIn: 'root',
})
export class MarqueService {
  private apiUrl = `${environment.baseUrl}/AULSH/marques`;

  constructor(private http: HttpClient) {}

  createMarque(marque: Marque): Observable<Marque> {
    return this.http.post<Marque>(this.apiUrl, marque, this.httpOptions);
  }

  getMarqueById(id: number): Observable<Marque> {
    return this.http.get<Marque>(`${this.apiUrl}/${id}`);
  }

  getAllMarques(): Observable<Marque[]> {
    return this.http.get<Marque[]>(this.apiUrl);
  }

  updateMarque(id: number, marque: Marque): Observable<Marque> {
    return this.http.put<Marque>(
      `${this.apiUrl}/${id}`,
      marque,
      this.httpOptions
    );
  }

  deleteMarque(id: number): Observable<void> {
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
