import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { TCarburant } from 'src/app/models/TCarburant';

@Injectable({
  providedIn: 'root',
})
export class TcarburantService {
  private apiUrl = `${environment.baseUrl}/AULSH/typecarburants`;

  constructor(private http: HttpClient) {}

  createTypeCarburant(typeCarburant: TCarburant): Observable<TCarburant> {
    return this.http.post<TCarburant>(this.apiUrl, typeCarburant, this.httpOptions);
  }

  getTypeCarburantById(id: number): Observable<TCarburant> {
    return this.http.get<TCarburant>(`${this.apiUrl}/${id}`);
  }

  getAllTypeCarburants(): Observable<TCarburant[]> {
    return this.http.get<TCarburant[]>(this.apiUrl);
  }

  updateTypeCarburant(id: number, typeCarburant: TCarburant): Observable<TCarburant> {
    return this.http.put<TCarburant>(`${this.apiUrl}/${id}`, typeCarburant, this.httpOptions);
  }

  deleteTypeCarburant(id: number): Observable<void> {
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
