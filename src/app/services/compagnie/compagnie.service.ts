import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Compagnie } from 'src/app/models/Compagnie';

@Injectable({
  providedIn: 'root',
})
export class CompagnieService {
  private apiUrl = `${environment.baseUrl}/AULSH/compagnies`;

  constructor(private http: HttpClient) {}

  createCompagnie(compagnie: Compagnie): Observable<Compagnie> {
    return this.http.post<Compagnie>(this.apiUrl, compagnie, this.httpOptions);
  }

  getCompagnieById(id: number): Observable<Compagnie> {
    return this.http.get<Compagnie>(`${this.apiUrl}/${id}`);
  }

  getAllCompagnies(): Observable<Compagnie[]> {
    return this.http.get<Compagnie[]>(this.apiUrl);
  }

  updateCompagnie(id: number, compagnie: Compagnie): Observable<Compagnie> {
    return this.http.put<Compagnie>(
      `${this.apiUrl}/${id}`,
      compagnie,
      this.httpOptions
    );
  }

  deleteCompagnie(id: number): Observable<void> {
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
