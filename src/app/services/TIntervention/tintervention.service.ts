import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { TIntervention } from 'src/app/models/TIntervention';

@Injectable({
  providedIn: 'root',
})
export class TinterventionService {
  private apiUrl = `${environment.baseUrl}/AULSH/typeinterventions`;

  constructor(private http: HttpClient) {}

  createTypeIntervention(typeIntervention: TIntervention): Observable<TIntervention> {
    return this.http.post<TIntervention>(this.apiUrl, typeIntervention, this.httpOptions);
  }

  getTypeInterventionById(id: number): Observable<TIntervention> {
    return this.http.get<TIntervention>(`${this.apiUrl}/${id}`);
  }

  getAllTypeInterventions(): Observable<TIntervention[]> {
    return this.http.get<TIntervention[]>(this.apiUrl);
  }

  updateTypeIntervention(id: number, typeIntervention: TIntervention): Observable<TIntervention> {
    return this.http.put<TIntervention>(`${this.apiUrl}/${id}`, typeIntervention, this.httpOptions);
  }

  deleteTypeIntervention(id: number): Observable<void> {
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
