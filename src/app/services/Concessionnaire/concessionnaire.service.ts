import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Concessionnaire } from 'src/app/models/Concessionnaire';


@Injectable({
  providedIn: 'root',
})
export class ConcessionnaireService {
  private apiUrl = `${environment.baseUrl}/AULSH/concessionnaires`;

  constructor(private http: HttpClient) {}

  createConcessionnaire(concessionnaire: Concessionnaire): Observable<Concessionnaire> {
    return this.http.post<Concessionnaire>(this.apiUrl, concessionnaire, this.httpOptions);
  }

  getConcessionnaireById(id: number): Observable<Concessionnaire> {
    return this.http.get<Concessionnaire>(`${this.apiUrl}/${id}`);
  }

  getAllConcessionnaires(): Observable<Concessionnaire[]> {
    return this.http.get<Concessionnaire[]>(this.apiUrl);
  }

  updateConcessionnaire(id: number, concessionnaire: Concessionnaire): Observable<Concessionnaire> {
    return this.http.put<Concessionnaire>(`${this.apiUrl}/${id}`, concessionnaire, this.httpOptions);
  }

  deleteConcessionnaire(id: number): Observable<void> {
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
